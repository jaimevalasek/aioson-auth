// QA Lane 2 — unit tests pra revocation-cache + federation_orchestrator.testConnection.
// Standalone (aioson-auth não tem vitest). Roda via `npx tsx scripts/verify-lane-2-units.ts`.

import {
  markRevoked,
  isRevoked,
  pruneExpired,
  clearRevocationCache,
  revocationCacheSize,
} from '../src/lib/revocation-cache.js';
import { testConnection } from '../src/services/federation_orchestrator.js';

let pass = 0;
let fail = 0;

function assert(cond: boolean, label: string): void {
  if (cond) {
    console.log(`✓ ${label}`);
    pass += 1;
  } else {
    console.log(`✗ ${label}`);
    fail += 1;
  }
}

function suite(name: string, fn: () => void): void {
  console.log(`\n── ${name} ──`);
  fn();
}

// ──────────────────────────────────────────────────────────────────────
// revocation-cache
// ──────────────────────────────────────────────────────────────────────

suite('revocation-cache: markRevoked + isRevoked', () => {
  clearRevocationCache();
  const future = new Date(Date.now() + 3600 * 1000);

  markRevoked({ user_id: 'u1', binding_id: 'b1', expires_at: future });
  assert(isRevoked('u1', 'b1') === true, 'isRevoked true após markRevoked');
  assert(isRevoked('u1', 'b2') === false, 'binding diferente não revoga');
  assert(isRevoked('u2', 'b1') === false, 'user diferente não revoga');
  assert(revocationCacheSize() === 1, 'size === 1 após 1 mark');
});

suite('revocation-cache: expires_at no passado é auto-removida', () => {
  clearRevocationCache();
  const past = new Date(Date.now() - 1000);
  markRevoked({ user_id: 'u1', binding_id: 'b1', expires_at: past });
  assert(revocationCacheSize() === 1, 'entry adicionada mesmo com expires no passado');
  assert(isRevoked('u1', 'b1') === false, 'isRevoked retorna false pra entry expirada');
  assert(revocationCacheSize() === 0, 'entry expirada é purgada na consulta');
});

suite('revocation-cache: pruneExpired', () => {
  clearRevocationCache();
  const future = new Date(Date.now() + 3600 * 1000);
  const past = new Date(Date.now() - 1000);
  markRevoked({ user_id: 'u1', binding_id: 'b1', expires_at: future });
  markRevoked({ user_id: 'u2', binding_id: 'b2', expires_at: past });
  markRevoked({ user_id: 'u3', binding_id: 'b3', expires_at: past });
  const removed = pruneExpired();
  assert(removed === 2, `pruneExpired retorna 2 (removidas)`);
  assert(revocationCacheSize() === 1, 'só ativa permanece após prune');
  assert(isRevoked('u1', 'b1') === true, 'ativa segue revogada');
});

suite('revocation-cache: markRevoked idempotente (mesma chave sobrescreve)', () => {
  clearRevocationCache();
  const t1 = new Date(Date.now() + 1000);
  const t2 = new Date(Date.now() + 3600 * 1000);
  markRevoked({ user_id: 'u1', binding_id: 'b1', expires_at: t1 });
  markRevoked({ user_id: 'u1', binding_id: 'b1', expires_at: t2 });
  assert(revocationCacheSize() === 1, 'size === 1 (mesma chave)');
  assert(isRevoked('u1', 'b1') === true, 'ainda revogada com nova expiry');
});

// ──────────────────────────────────────────────────────────────────────
// federation_orchestrator.testConnection (logic — não toca DB nem keyring)
// ──────────────────────────────────────────────────────────────────────

suite('testConnection: rejeita formato malformado', () => {
  const r = testConnection('not-a-connection-string');
  assert(r.ok === false, 'ok=false');
  assert(r.code === 'invalid_connection_string', `code=invalid_connection_string (got: ${r.code})`);
});

suite('testConnection: rejeita SQLite (não é Federation remota)', () => {
  const r = testConnection('file:./dev.db');
  assert(r.ok === false, 'ok=false');
  assert(r.code === 'invalid_connection_string', `code=invalid_connection_string (got: ${r.code})`);
});

suite('testConnection: rejeita Postgres sem TLS', () => {
  const r = testConnection('postgresql://user:pass@host:5432/db');
  assert(r.ok === false, 'ok=false');
  assert(r.code === 'tls_required', `code=tls_required (got: ${r.code})`);
});

suite('testConnection: rejeita MySQL sem TLS', () => {
  const r = testConnection('mysql://user:pass@host:3306/db');
  assert(r.ok === false, 'ok=false');
  assert(r.code === 'tls_required', `code=tls_required (got: ${r.code})`);
});

suite('testConnection: aceita Postgres com sslmode=require (mas falha em build_mismatch sob build sqlite)', () => {
  // O build de SQLite ainda dispara build_mismatch antes — mas testConnection
  // continua passando pela validação completa, então o code esperado depende
  // do DATABASE_PROVIDER. Em ambiente de smoke (sqlite), bate build_mismatch.
  const r = testConnection('postgresql://user:pass@host:5432/db?sslmode=require');
  const buildProvider = (process.env['DATABASE_PROVIDER'] ?? 'sqlite').toLowerCase();
  if (buildProvider === 'postgresql') {
    assert(r.ok === true, 'ok=true em build postgresql');
  } else {
    assert(r.ok === false, 'ok=false em build não-postgres (build_mismatch)');
    assert(r.code === 'build_mismatch', `code=build_mismatch (got: ${r.code})`);
  }
});

suite('testConnection: error code mapping cobre as 3 categorias relevantes', () => {
  const r1 = testConnection('');
  assert(r1.code === 'invalid_connection_string', `vazio → invalid_connection_string`);
  const r2 = testConnection('postgresql://no-ssl-host/db');
  assert(r2.code === 'tls_required', `sem ssl → tls_required`);
});

// ──────────────────────────────────────────────────────────────────────
// Summary
// ──────────────────────────────────────────────────────────────────────

console.log(`\n${pass}/${pass + fail} pass`);
if (fail > 0) process.exit(1);
