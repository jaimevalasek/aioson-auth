/**
 * @aioson/auth-sdk core — flow behavioural test (jetstream-sdk-onda-1, slice 2)
 *
 * Exercises the framework-neutral flows (login/signup/refresh/logout/me/reset)
 * with an in-memory fake `queries` (no DB) + real bcrypt + real JWT.
 * Validates the new signupCore (D2) branches and that the migrated flows behave
 * exactly like the previous inline Express handlers.
 *
 * Run: node sdk/test/core-flows.test.mjs   (requires bcryptjs installed)
 */

import assert from 'node:assert/strict';
import {
  loginCore,
  signupCore,
  refreshCore,
  logoutCore,
  meCore,
  passwordResetRequestCore,
  passwordResetConfirmCore,
} from '../dist/core/index.js';

let passed = 0;
let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ✗ ${name}: ${err.message}`);
  }
}

function makeFakeQueries() {
  const users = new Map();        // id -> user
  const usersByEmail = new Map(); // email -> user
  const roles = new Map();        // name -> role
  const userRoles = [];           // { userId, roleId }
  const resetTokens = new Map();  // token_hash -> token row
  return {
    async findUserByEmail(email) { return usersByEmail.get(email) ?? null; },
    async findUserById(id) { return users.get(id) ?? null; },
    async insertUser(d) {
      const u = { id: d.id, email: d.email, password_hash: d.password_hash, name: d.name, email_verified: 0, created_at: 'now', last_login_at: null };
      users.set(d.id, u); usersByEmail.set(d.email, u);
    },
    async updateLastLogin(id) { const u = users.get(id); if (u) u.last_login_at = 'now'; },
    async updatePassword(id, h) { const u = users.get(id); if (u) u.password_hash = h; },
    async countUsers() { return users.size; },
    async findRoleByName(name) { return roles.get(name) ?? null; },
    async insertRole(d) { roles.set(d.name, { id: d.id, name: d.name, description: d.description, created_at: 'now' }); },
    async assignRoleToUser(d) { userRoles.push({ userId: d.userId, roleId: d.roleId }); },
    async getUserPermissions() { return []; },
    async insertRevocation() { /* not asserted here */ },
    async getActiveRevocations() { return []; },
    async insertResetToken(d) { resetTokens.set(d.tokenHash, { id: d.id, user_id: d.userId, token_hash: d.tokenHash, expires_at: d.expiresAt, used_at: null }); },
    async findValidResetToken(h) { const t = resetTokens.get(h); return t && !t.used_at ? t : null; },
    async markResetTokenUsed(id) { for (const t of resetTokens.values()) if (t.id === id) t.used_at = 'now'; },
    _state: { users, roles, userRoles, resetTokens },
  };
}

function makeDeps(overrides = {}) {
  const queries = overrides.queries ?? makeFakeQueries();
  return {
    queries,
    jwtSecret: 'test-secret-please-use-32+bytes-here!!',
    bindingId: 'test-binding',
    checkRevocation: Object.assign(async () => false, { invalidate() {} }),
    ...overrides,
  };
}

console.log('\n=== @aioson/auth-sdk core — flow behavioural test ===\n');

console.log('signup (D2):');

await test('first user → 201, granted admin role, auto-login cookies', async () => {
  const deps = makeDeps();
  const r = await signupCore(deps, { email: 'owner@x.com', password: 'pw12345678', name: 'Owner' });
  assert.equal(r.status, 201);
  assert.equal(r.body.user.email, 'owner@x.com');
  assert.ok(r.body.accessToken && r.body.refreshToken, 'tokens minted');
  assert.equal(r.setCookies?.length, 2, 'access+refresh cookies set');
  assert.ok(deps.queries._state.roles.has('admin'), "role 'admin' created");
  assert.equal(deps.queries._state.userRoles.length, 1, 'role assigned');
});

await test('duplicate email → 409', async () => {
  const deps = makeDeps();
  await signupCore(deps, { email: 'dup@x.com', password: 'pw12345678' });
  const r = await signupCore(deps, { email: 'dup@x.com', password: 'pw12345678' });
  assert.equal(r.status, 409);
});

await test('second user with allowSignup=false → 403', async () => {
  const deps = makeDeps({ allowSignup: false });
  await signupCore(deps, { email: 'first@x.com', password: 'pw12345678' }); // first always allowed
  const r = await signupCore(deps, { email: 'second@x.com', password: 'pw12345678' });
  assert.equal(r.status, 403);
});

await test('second user with default policy → 201, granted viewer role', async () => {
  const deps = makeDeps();
  await signupCore(deps, { email: 'first@x.com', password: 'pw12345678' });
  const r = await signupCore(deps, { email: 'second@x.com', password: 'pw12345678' });
  assert.equal(r.status, 201);
  assert.ok(deps.queries._state.roles.has('viewer'), "role 'viewer' created for non-first user");
});

await test('missing fields → 400', async () => {
  const r = await signupCore(makeDeps(), { email: 'x@x.com' });
  assert.equal(r.status, 400);
});

console.log('\nlogin:');

await test('correct credentials → 200 + tokens + cookies', async () => {
  const deps = makeDeps();
  await signupCore(deps, { email: 'u@x.com', password: 'secret12345', name: 'U' });
  const r = await loginCore(deps, { email: 'u@x.com', password: 'secret12345' });
  assert.equal(r.status, 200);
  assert.ok(r.body.accessToken, 'access token returned');
  assert.equal(r.setCookies?.length, 2);
});

await test('wrong password → 401', async () => {
  const deps = makeDeps();
  await signupCore(deps, { email: 'u@x.com', password: 'secret12345' });
  const r = await loginCore(deps, { email: 'u@x.com', password: 'wrong' });
  assert.equal(r.status, 401);
});

await test('unknown user → 401', async () => {
  const r = await loginCore(makeDeps(), { email: 'nobody@x.com', password: 'whatever' });
  assert.equal(r.status, 401);
});

console.log('\nrefresh / logout / me:');

await test('refresh with valid refresh token → 200 + new tokens', async () => {
  const deps = makeDeps();
  const signup = await signupCore(deps, { email: 'r@x.com', password: 'secret12345' });
  const r = await refreshCore(deps, { refreshToken: signup.body.refreshToken });
  assert.equal(r.status, 200);
  assert.ok(r.body.accessToken);
});

await test('refresh with an access token (wrong type) → 401', async () => {
  const deps = makeDeps();
  const signup = await signupCore(deps, { email: 'r@x.com', password: 'secret12345' });
  const r = await refreshCore(deps, { refreshToken: signup.body.accessToken });
  assert.equal(r.status, 401);
});

await test('me with no token → 401', async () => {
  const r = await meCore(makeDeps(), { token: null });
  assert.equal(r.status, 401);
});

await test('me with valid access token → 200 + claims', async () => {
  const deps = makeDeps();
  const signup = await signupCore(deps, { email: 'm@x.com', password: 'secret12345' });
  const r = await meCore(deps, { token: signup.body.accessToken });
  assert.equal(r.status, 200);
  assert.equal(r.body.email, 'm@x.com');
});

await test('logout → 200 + clears cookies', async () => {
  const deps = makeDeps();
  const signup = await signupCore(deps, { email: 'l@x.com', password: 'secret12345' });
  const r = await logoutCore(deps, { token: signup.body.accessToken });
  assert.equal(r.status, 200);
  assert.deepEqual(r.clearCookies, ['aioson_access', 'aioson_refresh']);
});

console.log('\npassword reset:');

await test('reset request for unknown email → 200 {sent:true} (anti-enumeration)', async () => {
  const r = await passwordResetRequestCore(makeDeps(), { email: 'ghost@x.com' });
  assert.equal(r.status, 200);
  assert.equal(r.body.sent, true);
});

await test('reset confirm with invalid token → 400', async () => {
  const r = await passwordResetConfirmCore(makeDeps(), { token: 'bogus', newPassword: 'newpass12345' });
  assert.equal(r.status, 400);
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
