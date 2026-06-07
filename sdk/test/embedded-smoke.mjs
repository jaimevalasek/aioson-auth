/**
 * @aioson/auth-sdk — embedded module smoke test
 *
 * Validates: exports, JWT lifecycle, password hashing, revocation logic,
 * migration SQL generation, bootstrap types.
 * No database required — tests crypto and logic in isolation.
 *
 * Run: node sdk/test/embedded-smoke.mjs
 */

import assert from 'node:assert/strict';

const sdk = await import('../dist/embedded/index.js');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ✗ ${name}: ${err.message}`);
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ✗ ${name}: ${err.message}`);
  }
}

console.log('=== @aioson/auth-sdk embedded — smoke test ===\n');

// ─── Exports ────────────────────────────────────────────────────────────────

console.log('Exports:');

test('runEmbeddedMigrations is a function', () => {
  assert.equal(typeof sdk.runEmbeddedMigrations, 'function');
});

test('createAuthRouter is a function', () => {
  assert.equal(typeof sdk.createAuthRouter, 'function');
});

test('createRevocationChecker is a function', () => {
  assert.equal(typeof sdk.createRevocationChecker, 'function');
});

test('bootstrap is a function', () => {
  assert.equal(typeof sdk.bootstrap, 'function');
});

test('createQueries is a function', () => {
  assert.equal(typeof sdk.createQueries, 'function');
});

test('createEmbeddedBackend is a function (AC-SE-01)', () => {
  assert.equal(typeof sdk.createEmbeddedBackend, 'function');
});

test('AIOSON_AUTH_TABLES has 7 entries', () => {
  assert.equal(sdk.AIOSON_AUTH_TABLES.length, 7);
});

test('all table names have aioson_auth_ prefix', () => {
  for (const t of sdk.AIOSON_AUTH_TABLES) {
    assert.ok(t.startsWith('aioson_auth_'), `${t} missing prefix`);
  }
});

// ─── Schema SQL ─────────────────────────────────────────────────────────────

console.log('\nSchema SQL:');

for (const provider of ['sqlite', 'postgresql', 'mysql']) {
  test(`getMigrationStatements(${provider}) returns statements`, () => {
    const stmts = sdk.getMigrationStatements(provider);
    assert.ok(Array.isArray(stmts));
    assert.ok(stmts.length >= 7, `expected ≥7 statements, got ${stmts.length}`);
    for (const s of stmts) {
      assert.ok(s.includes('aioson_auth_'), `statement missing prefix: ${s.slice(0, 60)}`);
    }
  });
}

function makeSqlitePrisma(initialTables = []) {
  const tables = new Set(initialTables);
  return {
    async $queryRawUnsafe(sql) {
      if (sql.includes('sqlite_version()')) return [{ sqlite_version: '3.45.0' }];
      if (sql.includes('sqlite_master')) {
        const names = [...tables].map(name => ({ name }));
        return names.filter(row => sql.includes(`'${row.name}'`));
      }
      return [];
    },
    async $executeRawUnsafe(sql) {
      const match = sql.match(/CREATE TABLE IF NOT EXISTS\s+([a-zA-Z0-9_]+)/i);
      if (match) tables.add(match[1]);
      return 0;
    },
    _tables: tables,
  };
}

console.log('\nMigration runner:');

await testAsync('runEmbeddedMigrations is idempotent and reports conflicts (AC-SE-02)', async () => {
  const prisma = makeSqlitePrisma(['users']);
  const first = await sdk.runEmbeddedMigrations({ prisma });
  assert.equal(first.provider, 'sqlite');
  assert.deepEqual(first.conflicts, ['users']);
  assert.equal(first.tablesCreated.length, 7);

  const second = await sdk.runEmbeddedMigrations({ prisma });
  assert.equal(second.tablesCreated.length, 0);
  assert.equal(second.alreadyExisted.length, 7);
});

await testAsync('createEmbeddedBackend accepts prismaClient alias (AC-SE-01)', async () => {
  const prismaClient = makeSqlitePrisma();
  const backend = await sdk.createEmbeddedBackend({
    prismaClient,
    jwtSecret: 'backend-secret-32-chars-minimum!!',
    bindingId: 'binding-1',
    provider: 'sqlite',
  });
  assert.equal(typeof backend.migrate, 'function');
  assert.equal(typeof backend.bootstrap, 'function');
  assert.equal(typeof backend.checkRevocation, 'function');
});

await testAsync('createEmbeddedBackend rejects dot-prefixed cookieDomain (AC-SE-15)', async () => {
  const prisma = makeSqlitePrisma();
  await assert.rejects(
    () => sdk.createEmbeddedBackend({
      prisma,
      jwtSecret: 'backend-secret-32-chars-minimum!!',
      bindingId: 'binding-1',
      provider: 'sqlite',
      cookieDomain: '.cliente.com',
    }),
    /exact host/,
  );
});

function makeBootstrapPrisma() {
  const state = {
    users: new Map(),
    usersByEmail: new Map(),
    roles: new Map(),
    resetTokens: new Map(),
    userRoles: [],
  };
  return {
    async $queryRawUnsafe(sql, ...values) {
      if (sql.includes('COUNT(*) AS c')) return [{ c: state.users.size }];
      if (sql.includes('FROM aioson_auth_roles WHERE name')) {
        const role = state.roles.get(values[0]);
        return role ? [role] : [];
      }
      if (sql.includes('FROM aioson_auth_users WHERE email')) {
        const user = state.usersByEmail.get(values[0]);
        return user ? [user] : [];
      }
      if (sql.includes('FROM aioson_auth_users WHERE id')) {
        const user = state.users.get(values[0]);
        return user ? [user] : [];
      }
      return [];
    },
    async $executeRawUnsafe(sql, ...values) {
      if (sql.includes('INSERT INTO aioson_auth_users')) {
        const [id, email, password_hash, name] = values;
        const user = { id, email, password_hash, name, email_verified: 0, created_at: 'now', last_login_at: null };
        state.users.set(id, user);
        state.usersByEmail.set(email, user);
      } else if (sql.includes('INSERT INTO aioson_auth_roles')) {
        const [id, name, description] = values;
        state.roles.set(name, { id, name, description, created_at: 'now' });
      } else if (sql.includes('INSERT INTO aioson_auth_user_roles')) {
        const [id, userId, roleId, grantedBy] = values;
        state.userRoles.push({ id, userId, roleId, grantedBy });
      } else if (sql.includes('INSERT INTO aioson_auth_password_reset_tokens')) {
        const [id, userId, tokenHash, expiresAt] = values;
        state.resetTokens.set(tokenHash, { id, user_id: userId, token_hash: tokenHash, expires_at: expiresAt, used_at: null });
      }
      return 0;
    },
    _state: state,
  };
}

console.log('\nBootstrap:');

await testAsync('bootstrap creates first admin and second call no-ops (AC-SE-03/04)', async () => {
  const prisma = makeBootstrapPrisma();
  const first = await sdk.bootstrap({
    prisma,
    provider: 'sqlite',
    ownerEmail: 'owner@example.com',
    ownerRole: 'admin',
  });
  assert.equal(first.created, true);
  assert.equal(first.tempPassword.length, 16);
  assert.equal(typeof first.resetToken, 'string');
  assert.equal(prisma._state.users.size, 1);
  assert.equal(prisma._state.roles.has('admin'), true);
  assert.equal(prisma._state.resetTokens.size, 1);

  const second = await sdk.bootstrap({
    prisma,
    provider: 'sqlite',
    ownerEmail: 'owner2@example.com',
    ownerRole: 'admin',
  });
  assert.deepEqual(second, { created: false });
  assert.equal(prisma._state.users.size, 1);
});

// ─── JWT lifecycle ──────────────────────────────────────────────────────────

console.log('\nJWT lifecycle:');

test('signJwt + verifyJwt round-trip', () => {
  const secret = 'test-secret-32-chars-minimum!!!!!';
  const token = sdk.signJwt(
    { sub: 'u1', email: 'a@b.com', binding_id: 'b1', permissions: ['x:read'], type: 'access' },
    secret,
    300,
  );
  assert.ok(typeof token === 'string');
  assert.ok(token.split('.').length === 3);

  const payload = sdk.verifyJwt(token, secret);
  assert.ok(payload);
  assert.equal(payload.sub, 'u1');
  assert.equal(payload.email, 'a@b.com');
  assert.equal(payload.binding_id, 'b1');
  assert.deepEqual(payload.permissions, ['x:read']);
  assert.equal(payload.type, 'access');
  assert.ok(payload.iat > 0);
  assert.ok(payload.exp > payload.iat);
});

test('verifyJwt rejects wrong secret', () => {
  const token = sdk.signJwt(
    { sub: 'u1', email: 'a@b.com', binding_id: 'b1', permissions: [], type: 'access' },
    'correct-secret-32-chars-minimum!!',
    300,
  );
  const payload = sdk.verifyJwt(token, 'wrong-secret-32-chars-minimum!!!');
  assert.equal(payload, null);
});

test('verifyJwt rejects expired token', () => {
  const token = sdk.signJwt(
    { sub: 'u1', email: 'a@b.com', binding_id: 'b1', permissions: [], type: 'access' },
    'test-secret-32-chars-minimum!!!!!',
    -1, // already expired
  );
  const payload = sdk.verifyJwt(token, 'test-secret-32-chars-minimum!!!!!');
  assert.equal(payload, null);
});

test('signAccessToken produces verifiable token', () => {
  const secret = 'access-secret-32-chars-minimum!!!';
  const token = sdk.signAccessToken({ id: 'u2', email: 'b@c.com' }, 'bind-1', ['orders:read'], secret);
  const payload = sdk.verifyJwt(token, secret);
  assert.ok(payload);
  assert.equal(payload.type, 'access');
  assert.deepEqual(payload.permissions, ['orders:read']);
});

test('signRefreshToken produces verifiable token with type=refresh', () => {
  const secret = 'refresh-secret-32-chars-minimum!!';
  const token = sdk.signRefreshToken({ id: 'u3', email: 'c@d.com' }, 'bind-2', secret);
  const payload = sdk.verifyJwt(token, secret);
  assert.ok(payload);
  assert.equal(payload.type, 'refresh');
});

// ─── Password hashing ──────────────────────────────────────────────────────

console.log('\nPassword hashing:');

await testAsync('hashPassword + verifyPassword round-trip', async () => {
  const hash = await sdk.hashPassword('MyP@ss123');
  assert.ok(typeof hash === 'string');
  assert.ok(hash.startsWith('$2'));
  const ok = await sdk.verifyPassword('MyP@ss123', hash);
  assert.equal(ok, true);
});

await testAsync('verifyPassword rejects wrong password', async () => {
  const hash = await sdk.hashPassword('correct');
  const ok = await sdk.verifyPassword('wrong', hash);
  assert.equal(ok, false);
});

// ─── Token generation ───────────────────────────────────────────────────────

console.log('\nToken generation:');

test('generateId returns UUID format', () => {
  const id = sdk.generateId();
  assert.ok(typeof id === 'string');
  assert.ok(id.length >= 32);
});

test('generateResetToken returns raw + hash pair', () => {
  const { raw, hash } = sdk.generateResetToken();
  assert.ok(raw.length === 64); // 32 bytes hex
  assert.ok(hash.length === 64); // sha256 hex
  assert.notEqual(raw, hash);
});

test('hashToken matches generateResetToken hash', () => {
  const { raw, hash } = sdk.generateResetToken();
  assert.equal(sdk.hashToken(raw), hash);
});

test('generateTempPassword returns 16-char string', () => {
  const pw = sdk.generateTempPassword();
  assert.equal(pw.length, 16);
});

// ─── Constants ──────────────────────────────────────────────────────────────

console.log('\nConstants:');

test('ACCESS_TTL_SECS is 15 minutes', () => {
  assert.equal(sdk.ACCESS_TTL_SECS, 15 * 60);
});

test('REFRESH_TTL_SECS is 7 days', () => {
  assert.equal(sdk.REFRESH_TTL_SECS, 7 * 24 * 60 * 60);
});

test('RESET_TOKEN_TTL_SECS is 15 minutes', () => {
  assert.equal(sdk.RESET_TOKEN_TTL_SECS, 15 * 60);
});

// ─── Summary ────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
