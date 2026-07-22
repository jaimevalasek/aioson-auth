import assert from 'node:assert/strict';
import test from 'node:test';
import { diagnoseAuthDatabase, validateRemoteDestination } from '../src/services/auth-database-diagnostics.ts';

const pg = 'postgresql://user:secret@db.example.com/auth?sslmode=verify-full';
const mysql = 'mysql://user:secret@db.example.com/auth?sslaccept=strict';
const publicDns = async () => ['203.0.113.10'];

test('rejects private destinations and TLS downgrade', () => {
  assert.throws(() => validateRemoteDestination('postgresql://u:p@127.0.0.1/a?sslmode=require'), /private/);
  assert.throws(() => validateRemoteDestination('mysql://u:p@db.example.com/a'), /TLS|ssl/i);
});

test('classifies an empty destination using read-only probe output', async () => {
  const result = await diagnoseAuthDatabase(pg, async () => ({ tables: [] }), undefined, publicDns);
  assert.equal(result.classification, 'empty');
  assert.equal(result.host, 'db.example.com');
});

test('classifies only matching metadata as compatible', async () => {
  const compatible = await diagnoseAuthDatabase(mysql, async () => ({
    tables: ['AuthDatabaseMetadata', 'GlobalUser', 'AppBinding'], schemaVersion: 1,
    installationId: 'play-1', ownerId: 'owner-1',
  }), { installationId: 'play-1', ownerId: 'owner-1' }, publicDns);
  assert.equal(compatible.classification, 'compatible');
  const incompatible = await diagnoseAuthDatabase(pg, async () => ({ tables: ['GlobalUser'], schemaVersion: null }), undefined, publicDns);
  assert.equal(incompatible.classification, 'incompatible');
});

test('rejects compatible metadata owned by another installation', async () => {
  const result = await diagnoseAuthDatabase(pg, async () => ({
    tables: ['AuthDatabaseMetadata', 'GlobalUser'], schemaVersion: 1,
    installationId: 'other-play', ownerId: 'other-owner',
  }), { installationId: 'play-1', ownerId: 'owner-1' }, publicDns);
  assert.equal(result.classification, 'incompatible');
});

test('aborts a slow read-only probe at the bounded timeout', async () => {
  let aborted = false;
  await assert.rejects(
    () => diagnoseAuthDatabase(
      pg,
      async (_provider, _connectionString, signal) => new Promise((resolve) => {
        signal?.addEventListener('abort', () => {
          aborted = true;
          resolve({ tables: [] });
        }, { once: true });
      }),
      undefined,
      publicDns,
      25,
    ),
    /diagnosis_timeout/,
  );
  assert.equal(aborted, true);
});
