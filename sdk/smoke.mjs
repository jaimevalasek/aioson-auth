// Smoke test do @aioson/auth-sdk contra um aioson-auth real.
// Roda assumindo:
//   - aioson-auth em http://127.0.0.1:3002 (PORT=3002)
//   - User smoke-sdk@test.local com role 'operator' e permissions tickets:read/write
//   - bindingId conhecido (atendimento dev: cmouhv55w00015rzuf97e0kq1)

import { createAuthClient, AuthError, decodeJwtPayload } from './dist/index.js';

const BASE = process.env.SMOKE_BASE_URL ?? 'http://127.0.0.1:3002';
const BINDING = process.env.SMOKE_BINDING_ID ?? 'cmouhv55w00015rzuf97e0kq1';
const EMAIL = 'smoke-sdk@test.local';
const PWD = 'smoke1234';

function header(t) { console.log(`\n── ${t} ──`); }
function ok(m) { console.log(`  ✅ ${m}`); }
function fail(m, err) { console.error(`  ❌ ${m}`, err ?? ''); process.exitCode = 1; }

const auth = createAuthClient({ baseUrl: BASE, bindingId: BINDING });

header('1. login');
let session;
try {
  session = await auth.login({ email: EMAIL, password: PWD });
  ok(`accessToken length=${session.accessToken.length}, refreshToken length=${session.refreshToken.length}`);
  ok(`user.email = ${session.user.email}`);
} catch (err) {
  fail('login failed', err instanceof AuthError ? `${err.code}: ${err.message}` : err);
  process.exit(1);
}

header('2. payload do JWT');
const payload = decodeJwtPayload(session.accessToken);
console.log('  ', JSON.stringify(payload, null, 2));
if (payload?.binding_id === BINDING) ok('binding_id presente');
else fail('binding_id ausente ou incorreto');
if (Array.isArray(payload?.permissions)) ok(`permissions=${JSON.stringify(payload.permissions)}`);
else fail('permissions ausente');

header('3. hasPermission (síncrono, lê do JWT)');
if (auth.hasPermission('tickets:read') === true) ok('tickets:read → true');
else fail('tickets:read não foi reconhecido');
if (auth.hasPermission('foo:bar') === false) ok('foo:bar → false (não tem)');
else fail('foo:bar deveria ser false');

header('4. getPermissions');
const perms = auth.getPermissions();
console.log('  ', perms);

header('5. /me');
try {
  const me = await auth.me();
  console.log('  ', JSON.stringify(me, null, 2));
  if (me?.binding_id === BINDING && Array.isArray(me?.permissions)) ok('/me carrega binding_id + permissions');
  else fail('/me incompleto');
} catch (err) {
  fail('me failed', err);
}

header('6. check (defense-in-depth server-side)');
try {
  const allowed = await auth.check('tickets:read');
  if (allowed) ok('check(tickets:read) → true');
  else fail('check(tickets:read) deveria ser true');
  const denied = await auth.check('foo:bar');
  if (!denied) ok('check(foo:bar) → false');
  else fail('check(foo:bar) deveria ser false');
} catch (err) {
  fail('check failed', err);
}

header('7. refresh (re-agrega permissions e rotaciona refresh token)');
try {
  // Espera 1.1s pra garantir que o `iat` do JWT (em segundos) muda — caso
  // contrário login+refresh sub-segundo geram bytes idênticos no access token.
  await new Promise((r) => setTimeout(r, 1100));
  const session2 = await auth.refresh();
  const payload2 = decodeJwtPayload(session2.accessToken);
  if (session2.refreshToken !== session.refreshToken) ok('refresh token rotacionou');
  else fail('refresh token deveria rotacionar (one-time use)');
  if (session2.accessToken !== session.accessToken) ok('access token rotacionou');
  else fail('access token não rotacionou (iat colidiu? aumente o sleep)');
  if (Array.isArray(payload2?.permissions) && payload2.permissions.length === 2) ok('permissions re-agregadas');
  else fail('permissions ausentes após refresh');
} catch (err) {
  fail('refresh failed', err);
}

header('8. logout');
try {
  await auth.logout();
  if (await auth.getSession() === null) ok('sessão limpa após logout');
  else fail('sessão deveria ser null');
} catch (err) {
  fail('logout failed', err);
}

console.log('\nSmoke completo.');
