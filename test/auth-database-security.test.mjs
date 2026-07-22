import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

test('journal persists only credential reference and replays idempotently', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'auth-db-journal-'));
  process.env.AIOSON_AUTH_STATE_DIR = dir;
  const { runIdempotentMigrationOperation, readJournal } = await import(`../src/services/auth-database-migration-journal.ts?${Date.now()}`);
  let calls = 0;
  const create = async () => ({
    operationId: 'op-1', idempotencyKey: 'key-1', installationId: 'play-1', ownerId: 'owner-1',
    credentialReference: 'auth-db:staged:1', provider: 'postgresql', state: 'diagnosed',
    classification: 'empty', updatedAt: new Date().toISOString(),
  });
  const scope = { idempotencyKey: 'key-1', installationId: 'play-1', ownerId: 'owner-1', credentialReference: 'auth-db:staged:1', provider: 'postgresql' };
  const first = await runIdempotentMigrationOperation(scope, async () => { calls++; return create(); });
  const second = await runIdempotentMigrationOperation(scope, async () => { calls++; return create(); });
  assert.equal(calls, 1);
  assert.deepEqual(second, first);
  assert.equal((await readJournal(scope)).credentialReference, 'auth-db:staged:1');
  assert.equal(JSON.stringify(await readJournal(scope)).includes('postgresql://'), false);
  await rm(dir, { recursive: true, force: true });
});

test('concurrent different operations are locked', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'auth-db-lock-'));
  process.env.AIOSON_AUTH_STATE_DIR = dir;
  const { runIdempotentMigrationOperation } = await import(`../src/services/auth-database-migration-journal.ts?lock=${Date.now()}`);
  let release;
  const scopeA = { idempotencyKey: 'key-a', installationId: 'p', ownerId: 'owner-a', credentialReference: 'r', provider: 'mysql' };
  const pending = runIdempotentMigrationOperation(scopeA, () => new Promise((resolve) => { release = resolve; }));
  for (let attempt = 0; attempt < 20 && typeof release !== 'function'; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  await assert.rejects(() => runIdempotentMigrationOperation({ ...scopeA, idempotencyKey: 'key-b' }, async () => ({})), /locked/);
  release({ operationId:'a', idempotencyKey:'key-a', installationId:'p', ownerId:'owner-a', credentialReference:'r', provider:'mysql', state:'diagnosed', updatedAt:new Date().toISOString() });
  await pending;
  await rm(dir, { recursive: true, force: true });
});

test('journal is isolated by installation and owner scope', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'auth-db-scope-'));
  process.env.AIOSON_AUTH_STATE_DIR = dir;
  const { runIdempotentMigrationOperation, readJournal } = await import(`../src/services/auth-database-migration-journal.ts?scope=${Date.now()}`);
  const firstScope = { idempotencyKey: 'same-key', installationId: 'play-a', ownerId: 'owner-a', credentialReference: 'ref-a', provider: 'postgresql' };
  const secondScope = { idempotencyKey: 'same-key', installationId: 'play-b', ownerId: 'owner-b', credentialReference: 'ref-b', provider: 'postgresql' };
  const journal = (scope) => ({ operationId: scope.installationId, ...scope, state: 'diagnosed', classification: 'empty', updatedAt: new Date().toISOString() });
  await runIdempotentMigrationOperation(firstScope, async () => journal(firstScope));
  await runIdempotentMigrationOperation(secondScope, async () => journal(secondScope));
  assert.equal((await readJournal(firstScope)).installationId, 'play-a');
  assert.equal((await readJournal(secondScope)).installationId, 'play-b');
  await rm(dir, { recursive: true, force: true });
});
