import assert from 'node:assert/strict';
import http from 'node:http';
import { after, afterEach, describe, it } from 'node:test';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createApp } from '../src/app.ts';
import { forgotPassword } from '../src/actions/AuthAction.ts';
import { stopRevocationCleanup } from '../src/actions/TokenRevocationAction.ts';
import { authRouter } from '../src/routes/auth.ts';
import { rbacRouter } from '../src/routes/rbac.ts';
import { buildCallbackUrl } from '../src/routes/sso.ts';
import { JWT_SECRET } from '../src/lib/jwt-secret.ts';
import { prisma } from '../src/lib/prisma.ts';
import { requestContext } from '../src/lib/request-context.ts';
import {
  assignOwnedBindingRole,
  getOwnerBindingAdministration,
  listOwnedBindingUsers,
  updateOwnedBindingOperator,
} from '../src/actions/OwnerBindingAdministrationAction.ts';

const originalAllowedOrigins = process.env.ALLOWED_ORIGINS;
const restoreOperations = [];

function stub(target, key, implementation) {
  const previous = target[key];
  target[key] = implementation;
  restoreOperations.push(() => {
    target[key] = previous;
  });
}

async function withServer(app, callback) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Test server did not expose a TCP port');
  }

  try {
    return await callback(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

async function request(app, path, init = {}) {
  return withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}${path}`, init);
    const body = await response.json().catch(() => null);
    return { response, body };
  });
}

function createAuthApi() {
  const app = express();
  app.use(requestContext);
  app.use(express.json());
  app.use('/api/auth', authRouter);
  app.use('/api/auth', rbacRouter);
  return app;
}

function issueAccessToken(bindingId, issuedAtMs = Date.now()) {
  return jwt.sign(
    { sub: 'operator-1', email: 'operator@example.test', binding_id: bindingId, issued_at_ms: issuedAtMs },
    JWT_SECRET,
    { expiresIn: '15m' },
  );
}

function stubActiveToken() {
  stub(prisma.tokenRevocation, 'count', async () => 0);
}

function stubRefreshSession(bindingId) {
  let deleteCount = 0;
  let createCount = 0;
  const session = {
    id: 'session-1',
    user_id: 'operator-1',
    token: 'refresh-secret-for-test',
    binding_id: bindingId,
    expires_at: new Date(Date.now() + 60_000),
  };

  stub(prisma.authSession, 'findFirst', async () => session);
  stub(prisma, '$transaction', async (operation) => {
    if (typeof operation === 'function') return operation(prisma);
    return Promise.all(operation);
  });
  stub(prisma.authSession, 'delete', async () => {
    deleteCount += 1;
    if (deleteCount > 1) throw new Error('Refresh session already consumed');
  });
  stub(prisma.authSession, 'create', async () => {
    createCount += 1;
    return { ...session, id: `session-${createCount + 1}` };
  });
  stub(prisma.globalUser, 'findUnique', async () => ({
    id: 'operator-1',
    email: 'operator@example.test',
    name: 'Operator',
    disabled_at: null,
  }));
  stub(prisma.appBinding, 'findUnique', async () => ({ id: bindingId, enable_rbac: true }));
  stub(prisma.appAccess, 'findUnique', async () => ({
    id: 'access-1',
    binding_id: bindingId,
    profile_id: 'profile-1',
    status: 'active',
    profile: { id: 'profile-1', binding_id: bindingId, archived_at: null, permissions: [] },
  }));

  return {
    getCreateCount: () => createCount,
  };
}

afterEach(() => {
  while (restoreOperations.length > 0) {
    restoreOperations.pop()();
  }
});

after(() => {
  stopRevocationCleanup();
  if (originalAllowedOrigins === undefined) delete process.env.ALLOWED_ORIGINS;
  else process.env.ALLOWED_ORIGINS = originalAllowedOrigins;
});

describe('AIOSON Auth security contract', () => {
  it('AC-AAR-07 rejects a binding owned by another installation before reading administration data', async () => {
    let assignmentReads = 0;
    stub(prisma.appBinding, 'findFirst', async () => null);
    stub(prisma.userRole, 'findMany', async () => {
      assignmentReads += 1;
      return [];
    });

    await assert.rejects(
      () => getOwnerBindingAdministration('binding-other', 'play-owner'),
      (error) => error?.code === 'ownership_conflict' && error?.status === 403,
    );
    assert.equal(assignmentReads, 0);
  });

  it('AC-AAR-07 rejects the reserved owner role without mutating assignments', async () => {
    let writes = 0;
    stub(prisma.appBinding, 'findFirst', async () => ({
      id: 'binding-a', app_name: 'App A', app_slug: 'app-a', enable_rbac: true,
    }));
    stub(prisma.role, 'findUnique', async () => ({ id: 'role-owner', name: 'owner' }));
    stub(prisma.userRole, 'upsert', async () => {
      writes += 1;
    });

    await assert.rejects(
      () => assignOwnedBindingRole('binding-a', 'play-owner', 'operator-1', 'role-owner'),
      (error) => error?.code === 'owner_role_reserved' && error?.status === 403,
    );
    assert.equal(writes, 0);
  });

  it('AC-AAR-06 isolates play-a from shared play-b user PII and global mutations', async () => {
    let listFilter;
    let globalWrites = 0;
    let roleWrites = 0;
    const users = [
      {
        id: 'user-a', email: 'a@example.test', name: 'Operator A',
        aioson_play_origin_id: 'play-a', user_roles: [{ aioson_play_origin_id: 'play-a' }],
      },
      {
        id: 'user-shared', email: 'shared@example.test', name: 'Shared Operator',
        aioson_play_origin_id: 'play-a',
        user_roles: [{ aioson_play_origin_id: 'play-a' }, { aioson_play_origin_id: 'play-b' }],
      },
    ];
    stub(prisma.appBinding, 'findFirst', async () => ({
      id: 'binding-a', app_name: 'App A', app_slug: 'app-a', enable_rbac: true,
    }));
    stub(prisma.globalUser, 'findMany', async (query) => {
      listFilter = query.where;
      return users
        .filter((user) => user.aioson_play_origin_id === 'play-a')
        .filter((user) => !user.user_roles.some((role) => role.aioson_play_origin_id !== 'play-a'))
        .map(({ id, email, name }) => ({ id, email, name }));
    });
    stub(prisma.userRole, 'findFirst', async () => ({
      id: 'assignment-a', binding_id: 'binding-a', user_id: 'user-shared',
    }));
    stub(prisma.globalUser, 'findFirst', async () => ({
      id: 'user-shared',
      aioson_play_origin_id: 'play-a',
      user_roles: [
        { aioson_play_origin_id: 'play-a' },
        { aioson_play_origin_id: 'play-b' },
      ],
    }));
    stub(prisma.globalUser, 'update', async () => {
      globalWrites += 1;
    });
    stub(prisma.role, 'findUnique', async () => ({ id: 'role-editor', name: 'editor' }));
    stub(prisma.userRole, 'deleteMany', async () => {
      roleWrites += 1;
      return { count: 1 };
    });
    stub(prisma.userRole, 'create', async () => {
      roleWrites += 1;
    });

    const visibleUsers = await listOwnedBindingUsers('binding-a', 'play-a');
    assert.deepEqual(visibleUsers, [{ id: 'user-a', email: 'a@example.test', name: 'Operator A' }]);
    assert.deepEqual(listFilter, { OR: [
      { aioson_play_origin_id: 'play-a', user_roles: { none: { aioson_play_origin_id: { not: 'play-a' } } } },
      { aioson_play_origin_id: null, user_roles: { none: {} } },
    ] });
    assert.equal(JSON.stringify(visibleUsers).includes('play-b'), false);

    await assert.rejects(
      () => updateOwnedBindingOperator('binding-a', 'play-a', 'user-shared', { name: 'changed-by-a' }),
      (error) => error?.code === 'ownership_conflict' && error?.status === 403,
    );
    assert.equal(globalWrites, 0);

    await assert.rejects(
      () => updateOwnedBindingOperator('binding-a', 'play-a', 'user-shared', { roleId: 'role-editor' }),
      (error) => error?.code === 'ownership_conflict' && error?.status === 403,
    );
    assert.equal(roleWrites, 0);
  });

  it('adopts an unassigned legacy user only during an explicit owner link', async () => {
    let adoptedPlayId = null;
    let assignmentWrites = 0;
    stub(prisma.appBinding, 'findFirst', async () => ({
      id: 'binding-a', app_name: 'App A', app_slug: 'app-a', enable_rbac: true,
    }));
    stub(prisma.role, 'findUnique', async () => ({ id: 'role-operator', name: 'operator', description: '' }));
    stub(prisma.globalUser, 'findFirst', async () => ({
      id: 'legacy-user', aioson_play_origin_id: null, user_roles: [],
    }));
    stub(prisma.globalUser, 'update', async ({ data }) => {
      adoptedPlayId = data.aioson_play_origin_id;
      return { id: 'legacy-user' };
    });
    stub(prisma.userRole, 'upsert', async () => {
      assignmentWrites += 1;
    });
    stub(prisma.appProfile, 'upsert', async () => ({ id: 'profile-operator' }));
    stub(prisma.appProfile, 'findFirst', async () => ({ id: 'profile-operator', binding_id: 'binding-a' }));
    stub(prisma.rolePermission, 'findMany', async () => []);
    stub(prisma.appProfilePermission, 'deleteMany', async () => ({ count: 0 }));
    stub(prisma.appAccess, 'upsert', async () => ({ id: 'access-legacy-user' }));
    stub(prisma.tokenRevocation, 'deleteMany', async () => ({ count: 0 }));
    stub(prisma.tokenRevocation, 'create', async () => ({ id: 'revocation-1' }));
    stub(prisma, '$transaction', async (operation) => typeof operation === 'function'
      ? operation(prisma)
      : Promise.all(operation));

    await assignOwnedBindingRole('binding-a', 'play-a', 'legacy-user', 'role-operator');

    assert.equal(adoptedPlayId, 'play-a');
    assert.equal(assignmentWrites, 1);
  });

  it('refuses to adopt a legacy user that already has an ambiguous assignment', async () => {
    let assignmentWrites = 0;
    stub(prisma.appBinding, 'findFirst', async () => ({
      id: 'binding-a', app_name: 'App A', app_slug: 'app-a', enable_rbac: true,
    }));
    stub(prisma.role, 'findUnique', async () => ({ id: 'role-operator', name: 'operator' }));
    stub(prisma.globalUser, 'findFirst', async () => ({
      id: 'legacy-user', aioson_play_origin_id: null,
      user_roles: [{ aioson_play_origin_id: null }],
    }));
    stub(prisma.userRole, 'upsert', async () => {
      assignmentWrites += 1;
    });
    stub(prisma, '$transaction', async (operation) => operation(prisma));

    await assert.rejects(
      () => assignOwnedBindingRole('binding-a', 'play-a', 'legacy-user', 'role-operator'),
      (error) => error?.code === 'ownership_conflict' && error?.status === 403,
    );
    assert.equal(assignmentWrites, 0);
  });

  it('AC-AAR-11 loads owner administration with a constant number of aggregate queries', async () => {
    const calls = { bindings: 0, assignments: 0, roles: 0, permissions: 0 };
    stub(prisma.appBinding, 'findFirst', async () => {
      calls.bindings += 1;
      return { id: 'binding-a', app_name: 'App A', app_slug: 'app-a', enable_rbac: true };
    });
    stub(prisma.userRole, 'findMany', async () => {
      calls.assignments += 1;
      return [];
    });
    stub(prisma.role, 'findMany', async () => {
      calls.roles += 1;
      return [];
    });
    stub(prisma.bindingPermission, 'findMany', async () => {
      calls.permissions += 1;
      return [];
    });

    const result = await getOwnerBindingAdministration('binding-a', 'play-owner');
    assert.deepEqual(calls, { bindings: 1, assignments: 1, roles: 1, permissions: 1 });
    assert.deepEqual(result.operators, []);
  });

  it('AC-auth-play-01 rejects a valid token used against another binding', async () => {
    stubActiveToken();
    const requestId = 'cross-binding-request';
    const { response, body } = await request(
      createAuthApi(),
      '/api/auth/binding-b/me',
      {
        headers: {
          Authorization: `Bearer ${issueAccessToken('binding-a')}`,
          'X-Request-Id': requestId,
        },
      },
    );

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'binding_mismatch');
    assert.equal(body?.error?.requestId, requestId);
  });

  it('SEC-SBD-03 revokes only older tokens from the affected binding', async () => {
    const revokedAtMs = Date.now() - 60_000;
    const inspectedQueries = [];
    stub(prisma.tokenRevocation, 'count', async ({ where }) => {
      inspectedQueries.push(where);
      if (where.binding_id !== 'binding-a') return 0;
      return revokedAtMs >= where.revoked_at.gte.getTime() ? 1 : 0;
    });

    const oldToken = issueAccessToken('binding-a', revokedAtMs - 1_000);
    const newToken = issueAccessToken('binding-a', revokedAtMs + 1_000);
    const legacyNewToken = jwt.sign(
      { sub: 'operator-1', email: 'operator@example.test', binding_id: 'binding-a' },
      JWT_SECRET,
      { expiresIn: '15m' },
    );
    const otherBindingToken = issueAccessToken('binding-b', revokedAtMs - 1_000);

    const oldResult = await request(createAuthApi(), '/api/auth/binding-a/me', {
      headers: { Authorization: `Bearer ${oldToken}` },
    });
    const newResult = await request(createAuthApi(), '/api/auth/binding-a/me', {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    const legacyNewResult = await request(createAuthApi(), '/api/auth/binding-a/me', {
      headers: { Authorization: `Bearer ${legacyNewToken}` },
    });
    const otherBindingResult = await request(createAuthApi(), '/api/auth/binding-b/me', {
      headers: { Authorization: `Bearer ${otherBindingToken}` },
    });

    assert.equal(oldResult.response.status, 401);
    assert.equal(oldResult.body?.error?.code, 'revoked_token');
    assert.equal(newResult.response.status, 200);
    assert.equal(legacyNewResult.response.status, 200);
    assert.equal(otherBindingResult.response.status, 200);
    assert.deepEqual(inspectedQueries.map((query) => query.binding_id), ['binding-a', 'binding-a', 'binding-a', 'binding-b']);
  });

  it('AC-auth-play-01 rejects refresh against a binding other than the issuing binding', async () => {
    stubRefreshSession('binding-a');
    const { response, body } = await request(
      createAuthApi(),
      '/api/auth/binding-b/refresh',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Request-Id': 'refresh-binding-request' },
        body: JSON.stringify({ refreshToken: 'refresh-secret-for-test' }),
      },
    );

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'binding_mismatch');
    assert.equal(body?.error?.requestId, 'refresh-binding-request');
  });

  it('SEC-SBD-03 rejects login to an RBAC binding when the user has no assignment', async () => {
    const passwordHash = await bcrypt.hash('correct-password', 4);
    stub(prisma.appBinding, 'findUnique', async () => ({ id: 'binding-a', enable_rbac: true }));
    stub(prisma.globalUser, 'findUnique', async () => ({
      id: 'unlinked-user', email: 'unlinked@example.test', password_hash: passwordHash,
    }));
    stub(prisma.appAccess, 'findUnique', async () => null);

    const { response, body } = await request(createAuthApi(), '/api/auth/binding-a/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'unlinked@example.test', password: 'correct-password' }),
    });

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'invalid_credentials');
    assert.equal(body?.accessToken, undefined);
  });

  it('SEC-SBD-03 invalidates refresh when the user lost the binding assignment', async () => {
    const refreshSession = stubRefreshSession('binding-a');
    stub(prisma.appAccess, 'findUnique', async () => null);

    const { response, body } = await request(createAuthApi(), '/api/auth/binding-a/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'refresh-secret-for-test' }),
    });

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'refresh_invalid');
    assert.equal(refreshSession.getCreateCount(), 0);
  });

  it('SEC-SBD-03 blocks public registration on an RBAC-managed binding', async () => {
    let userWrites = 0;
    stub(prisma.appBinding, 'findUnique', async () => ({ id: 'binding-a', enable_rbac: true }));
    stub(prisma.globalUser, 'create', async () => {
      userWrites += 1;
    });

    const { response, body } = await request(createAuthApi(), '/api/auth/binding-a/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'new@example.test', password: 'correct-password' }),
    });

    assert.equal(response.status, 403);
    assert.equal(body?.error?.code, 'self_registration_disabled');
    assert.equal(userWrites, 0);
  });

  it('AC-auth-play-02 allows exactly one concurrent refresh and classifies the loser', async () => {
    const refreshSession = stubRefreshSession('binding-a');
    const app = createAuthApi();
    const makeRequest = () => request(app, '/api/auth/binding-a/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'refresh-secret-for-test' }),
    });

    const results = await Promise.all([makeRequest(), makeRequest()]);
    const successes = results.filter(({ response }) => response.status === 200);
    const failures = results.filter(({ response }) => response.status !== 200);

    assert.equal(successes.length, 1);
    assert.equal(failures.length, 1);
    assert.equal(failures[0].response.status, 401);
    assert.equal(failures[0].body?.error?.code, 'refresh_invalid');
    assert.equal(refreshSession.getCreateCount(), 1);
  });

  it('AC-auth-play-05 returns the stable missing_token envelope with the supplied request id', async () => {
    const requestId = 'missing-token-request';
    const { response, body } = await request(createAuthApi(), '/api/auth/binding-a/me', {
      headers: { 'X-Request-Id': requestId },
    });

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'missing_token');
    assert.equal(body?.error?.requestId, requestId);
    assert.equal(typeof body?.error?.message, 'string');
  });

  it('AC-auth-play-01 enforces the binding on permission and RBAC bearer routes', async () => {
    stubActiveToken();
    const token = issueAccessToken('binding-a');
    const paths = [
      '/api/auth/binding-b/me/permissions',
      '/api/auth/binding-b/rbac/check?permission=workspace.read',
    ];

    for (const path of paths) {
      const { response, body } = await request(createAuthApi(), path, {
        headers: { Authorization: `Bearer ${token}` },
      });
      assert.equal(response.status, 401, path);
      assert.equal(body?.error?.code, 'binding_mismatch', path);
    }
  });

  it('AC-auth-play-05 classifies an invalid authorization scheme as malformed_token', async () => {
    const { response, body } = await request(createAuthApi(), '/api/auth/binding-a/me', {
      headers: { Authorization: 'Token definitely-not-a-bearer-token' },
    });

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'malformed_token');
  });

  it('SEC-SBD-03 rejects access tokens supplied through the query string', async () => {
    const { response, body } = await request(createAuthApi(), `/api/auth/binding-a/me?token=${encodeURIComponent(issueAccessToken('binding-a'))}`);

    assert.equal(response.status, 401);
    assert.equal(body?.error?.code, 'malformed_token');
  });

  it('SEC-SBD-08 fails closed when OAuth provider proof is not server-verified', async () => {
    stub(prisma.appBinding, 'findUnique', async () => ({ id: 'binding-a' }));
    const { response, body } = await request(createAuthApi(), '/api/auth/binding-a/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'operator@example.test', provider: 'google', providerId: 'client-controlled' }),
    });

    assert.equal(response.status, 403);
    assert.equal(body?.error?.code, 'oauth_verification_required');
    assert.equal(body?.accessToken, undefined);
  });

  it('SEC-SBD-03 rejects SSO redirects outside local Play or configured origins', async () => {
    const { response, body } = await request(createApp(), '/sso/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'operator@example.test',
        password: 'password',
        binding_id: 'binding-a',
        redirect_uri: 'https://evil.invalid/collect',
      }),
    });

    assert.equal(response.status, 403);
    assert.equal(body?.error?.code, 'redirect_uri_not_allowed');
  });

  it('SEC-SBD-03 places SSO tokens in the URL fragment, never the query string', () => {
    const callback = buildCallbackUrl('http://localhost:3504/sso/callback', {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: { id: 'operator-1', email: 'operator@example.test', name: '' },
    });
    const url = new URL(callback);

    assert.equal(url.searchParams.has('token'), false);
    assert.equal(url.searchParams.has('refresh'), false);
    assert.equal(url.hash.includes('token=access-token'), true);
    assert.equal(url.hash.includes('refresh=refresh-token'), true);
  });

  it('SEC-SBD-08 rejects repeated invalid login attempts with a rate-limit response', async () => {
    stub(prisma.appBinding, 'findUnique', async () => ({ id: 'binding-a' }));
    stub(prisma.globalUser, 'findUnique', async () => null);
    const app = createAuthApi();
    const attempts = [];

    for (let attempt = 0; attempt < 12; attempt += 1) {
      attempts.push(await request(app, '/api/auth/binding-a/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'unknown@example.test', password: 'wrong-password' }),
      }));
    }

    const limitedAttempt = attempts.find(({ response }) => response.status === 429);
    assert.ok(limitedAttempt, `expected a rate-limit response, got ${attempts.map(({ response }) => response.status).join(', ')}`);
    assert.equal(limitedAttempt.body?.error?.code, 'rate_limited');
  });

  it('AC-auth-play-07 rejects a localhost prefix-confusion origin', async () => {
    delete process.env.ALLOWED_ORIGINS;
    const { response } = await request(createApp(), '/health', {
      headers: { Origin: 'http://localhost.evil:5173' },
    });

    assert.equal(response.headers.get('access-control-allow-origin'), null);
  });

  it('AC-auth-play-07 accepts valid local Play origins on dynamic ports', async () => {
    delete process.env.ALLOWED_ORIGINS;
    for (const origin of ['http://localhost:3504', 'http://127.0.0.1:5180']) {
      const { response } = await request(createApp(), '/health', { headers: { Origin: origin } });
      assert.equal(response.headers.get('access-control-allow-origin'), origin);
    }
  });

  it('AC-auth-play-06 never logs a generated recovery token', async () => {
    let createdData;
    stub(prisma.globalUser, 'findUnique', async () => ({ id: 'operator-1' }));
    stub(prisma.recoveryToken, 'create', async ({ data }) => {
      createdData = data;
      return { id: 'recovery-1' };
    });
    stub(prisma.globalSettings, 'findFirst', async () => ({
      google_client_id: null,
      google_client_secret: null,
      github_client_id: null,
      github_client_secret: null,
      smtp_host: 'smtp.example.test',
      smtp_port: null,
      smtp_user: null,
      smtp_pass: null,
      smtp_from_email: null,
    }));

    const messages = [];
    const originalConsoleLog = console.log;
    const originalConsoleInfo = console.info;
    console.log = (...args) => messages.push(args.join(' '));
    console.info = (...args) => messages.push(args.join(' '));
    try {
      await forgotPassword('operator@example.test');
    } finally {
      console.log = originalConsoleLog;
      console.info = originalConsoleInfo;
    }

    assert.equal(messages.some((message) => message.includes('token for')), false);
    assert.equal(messages.some((message) => message.includes('operator@example.test')), false);
    assert.equal(createdData.token.length, 64);
    assert.notEqual(createdData.token, 'operator@example.test');
  });
});
