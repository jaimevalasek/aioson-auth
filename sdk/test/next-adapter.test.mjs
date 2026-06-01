/**
 * @aioson/auth-sdk/next — route handler test (jetstream-sdk-onda-1, slice 3)
 *
 * Tests the Next route handler (the thin Web-API translation layer) in plain
 * Node using Web Request/Response — no running Next server and no DB. Standalone
 * uses an in-memory fake `queries` (real bcrypt + JWT); client mode mocks fetch.
 * Imports the next-free `route-handler` build directly (the `./next` barrel pulls
 * next/server|headers|navigation, which only resolve inside the Next bundler).
 *
 * Run: node sdk/test/next-adapter.test.mjs   (requires bcryptjs installed)
 */

import assert from 'node:assert/strict';
import { createRouteHandlers } from '../dist/next/route-handler.js';

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

const request = (url, init) => new Request(url, init);

function makeFakeQueries() {
  const users = new Map();
  const usersByEmail = new Map();
  const roles = new Map();
  return {
    async findUserByEmail(email) { return usersByEmail.get(email) ?? null; },
    async findUserById(id) { return users.get(id) ?? null; },
    async insertUser(d) { const u = { ...d, email_verified: 0, created_at: 'now', last_login_at: null }; users.set(d.id, u); usersByEmail.set(d.email, u); },
    async updateLastLogin() {},
    async updatePassword() {},
    async countUsers() { return users.size; },
    async findRoleByName(name) { return roles.get(name) ?? null; },
    async insertRole(d) { roles.set(d.name, { ...d, created_at: 'now' }); },
    async assignRoleToUser() {},
    async getUserPermissions() { return []; },
    async insertRevocation() {},
    async getActiveRevocations() { return []; },
    async insertResetToken() {},
    async findValidResetToken() { return null; },
    async markResetTokenUsed() {},
  };
}

function standaloneCtx() {
  const deps = {
    queries: makeFakeQueries(),
    jwtSecret: 'test-secret-please-use-32+bytes-here!!',
    bindingId: 'b',
    checkRevocation: Object.assign(async () => false, { invalidate() {} }),
  };
  return { mode: 'standalone', basePath: '/api/auth', playHost: null, secureCookies: true, getDeps: async () => deps };
}

console.log('\n=== @aioson/auth-sdk/next — route handler test ===\n');

console.log('standalone:');

await test('POST /signup (first user) → 201 + 2 Set-Cookie (HttpOnly)', async () => {
  const { POST } = createRouteHandlers(standaloneCtx());
  const res = await POST(request('https://app.test/api/auth/signup', { method: 'POST', body: JSON.stringify({ email: 'a@x.com', password: 'pw12345678' }) }));
  assert.equal(res.status, 201);
  const setCookies = res.headers.getSetCookie();
  assert.equal(setCookies.length, 2, 'access + refresh cookies');
  assert.ok(setCookies.some(c => c.startsWith('aioson_access=')), 'access cookie present');
  assert.ok(setCookies.every(c => c.includes('HttpOnly')), 'cookies are HttpOnly');
});

await test('signup then POST /login → 200 + tokens', async () => {
  const ctx = standaloneCtx();
  const { POST } = createRouteHandlers(ctx);
  await POST(request('https://app.test/api/auth/signup', { method: 'POST', body: JSON.stringify({ email: 'b@x.com', password: 'pw12345678' }) }));
  const res = await POST(request('https://app.test/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'b@x.com', password: 'pw12345678' }) }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(body.accessToken, 'access token returned');
});

await test('POST /login wrong password → 401', async () => {
  const ctx = standaloneCtx();
  const { POST } = createRouteHandlers(ctx);
  await POST(request('https://app.test/api/auth/signup', { method: 'POST', body: JSON.stringify({ email: 'c@x.com', password: 'pw12345678' }) }));
  const res = await POST(request('https://app.test/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'c@x.com', password: 'nope' }) }));
  assert.equal(res.status, 401);
});

await test('GET /me with access cookie → 200', async () => {
  const ctx = standaloneCtx();
  const { GET, POST } = createRouteHandlers(ctx);
  const signup = await POST(request('https://app.test/api/auth/signup', { method: 'POST', body: JSON.stringify({ email: 'd@x.com', password: 'pw12345678' }) }));
  const accessCookie = signup.headers.getSetCookie().find(c => c.startsWith('aioson_access='));
  const token = decodeURIComponent(accessCookie.split(';')[0].split('=')[1]);
  const res = await GET(request('https://app.test/api/auth/me', { headers: { cookie: `aioson_access=${encodeURIComponent(token)}` } }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.email, 'd@x.com');
});

await test('POST /logout → 200 + clears cookies (Max-Age=0)', async () => {
  const { POST } = createRouteHandlers(standaloneCtx());
  const res = await POST(request('https://app.test/api/auth/logout', { method: 'POST', headers: { authorization: 'Bearer x' } }));
  assert.equal(res.status, 200);
  assert.ok(res.headers.getSetCookie().some(c => c.includes('Max-Age=0')), 'cookies cleared');
});

await test('GET unknown action → 404', async () => {
  const { GET } = createRouteHandlers(standaloneCtx());
  const res = await GET(request('https://app.test/api/auth/whatever'));
  assert.equal(res.status, 404);
});

await test('getDeps throwing → 500 (caught)', async () => {
  const ctx = { mode: 'standalone', basePath: '/api/auth', playHost: null, secureCookies: true, getDeps: async () => { throw new Error('no prisma'); } };
  const { POST } = createRouteHandlers(ctx);
  const res = await POST(request('https://app.test/api/auth/login', { method: 'POST', body: '{}' }));
  assert.equal(res.status, 500);
});

console.log('\nclient mode (D3 partial):');

const clientCtx = { mode: 'client', basePath: '/api/auth', playHost: 'https://play.test', secureCookies: true, getDeps: async () => { throw new Error('unused'); } };

await test('POST /login → 409 client_mode + redirect to Play', async () => {
  const { POST } = createRouteHandlers(clientCtx);
  const res = await POST(request('https://app.test/api/auth/login', { method: 'POST', body: '{}' }));
  assert.equal(res.status, 409);
  const body = await res.json();
  assert.equal(body.error, 'client_mode');
  assert.equal(body.redirect, 'https://play.test/auth/login');
});

await test('GET /me without token → 401', async () => {
  const { GET } = createRouteHandlers(clientCtx);
  const res = await GET(request('https://app.test/api/auth/me'));
  assert.equal(res.status, 401);
});

await test('GET /me with token → proxies to Play host', async () => {
  const { GET } = createRouteHandlers(clientCtx);
  const orig = globalThis.fetch;
  let calledUrl = null;
  globalThis.fetch = async (url, opts) => {
    calledUrl = String(url);
    assert.equal(opts.headers.authorization, 'Bearer abc');
    return new Response(JSON.stringify({ sub: 'u1', email: 'u@x.com' }), { status: 200 });
  };
  try {
    const res = await GET(request('https://app.test/api/auth/me', { headers: { authorization: 'Bearer abc' } }));
    assert.equal(res.status, 200);
    assert.equal(calledUrl, 'https://play.test/api/auth/me');
  } finally {
    globalThis.fetch = orig;
  }
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
