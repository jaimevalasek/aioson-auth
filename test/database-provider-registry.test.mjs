import assert from 'node:assert/strict';
import test from 'node:test';
import { DatabaseProviderRegistry, resolveActiveDatabaseProvider } from '../src/services/database-provider-registry.ts';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

function loader(events, name) {
  return async () => ({ PrismaClient: class {
    async $connect() { events.push(`connect:${name}`); }
    async $disconnect() { events.push(`disconnect:${name}`); }
  }});
}

test('defaults to sqlite and rejects unknown providers', () => {
  assert.equal(resolveActiveDatabaseProvider(undefined), 'sqlite');
  assert.throws(() => resolveActiveDatabaseProvider('oracle'), /unsupported_auth_database_provider/);
});

test('keeps exactly one active provider and disconnects on switch', async () => {
  const events = [];
  const registry = new DatabaseProviderRegistry({
    sqlite: loader(events, 'sqlite'), postgresql: loader(events, 'postgresql'), mysql: loader(events, 'mysql'),
  });
  const sqlite = await registry.activate('sqlite');
  assert.equal(await registry.activate('sqlite'), sqlite);
  await registry.activate('postgresql', 'postgresql://redacted');
  assert.deepEqual(events, ['connect:sqlite', 'disconnect:sqlite', 'connect:postgresql']);
  assert.equal(registry.getActiveProvider(), 'postgresql');
});

test('serializes concurrent provider activation', async () => {
  const events = [];
  const registry = new DatabaseProviderRegistry({
    sqlite: loader(events, 'sqlite'), postgresql: loader(events, 'postgresql'), mysql: loader(events, 'mysql'),
  });
  await Promise.all([registry.activate('sqlite'), registry.activate('mysql', 'mysql://redacted')]);
  assert.deepEqual(events, ['connect:sqlite', 'disconnect:sqlite', 'connect:mysql']);
  assert.equal(registry.getActiveProvider(), 'mysql');
});

test('all isolated generated outputs export a PrismaClient constructor', async () => {
  for (const provider of ['sqlite', 'postgresql', 'mysql']) {
    const entry = pathToFileURL(resolve('src', 'generated', 'prisma', provider, 'index.js')).href;
    const generated = await import(entry);
    assert.equal(typeof generated.PrismaClient, 'function', provider);
  }
});
