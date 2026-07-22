import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const prismaDirectory = path.join(repositoryRoot, 'prisma');
const suffix = randomUUID();
const temporarySchemaPath = path.join(prismaDirectory, `.auth-session-legacy-${suffix}.prisma`);
const temporaryDatabaseName = `.auth-session-binding-${suffix}.db`;
const temporaryDatabasePath = path.join(prismaDirectory, temporaryDatabaseName);
const databaseUrl = `file:./${temporaryDatabaseName}`;
let client;

function runPrismaPush() {
  const result = spawnSync(
    process.execPath,
    [
      path.join(repositoryRoot, 'node_modules', 'prisma', 'build', 'index.js'),
      'db',
      'push',
      '--schema',
      temporarySchemaPath,
      '--skip-generate',
      '--accept-data-loss',
    ],
    {
      cwd: repositoryRoot,
      encoding: 'utf8',
      env: { ...process.env, DATABASE_URL: databaseUrl },
    },
  );

  if (result.status !== 0) {
    throw new Error(
      `Could not prepare legacy schema:\n${result.stdout ?? ''}\n${result.stderr ?? ''}\n${result.error?.message ?? ''}`,
    );
  }
}

async function createLegacyDatabase() {
  const generatedSchema = await readFile(path.join(prismaDirectory, 'schema.prisma'), 'utf8');
  const legacySchema = generatedSchema
    .replace(/^\s*binding_id\s+String\?\s*\r?\n/m, '')
    .replace(/^\s*@@index\(\[binding_id\]\)\s*\r?\n/m, '')
    .replace(/^\s*@@index\(\[token, binding_id\]\)\s*\r?\n/m, '');

  await writeFile(temporarySchemaPath, legacySchema, 'utf8');
  runPrismaPush();
}

async function applyMigration() {
  const migrationPath = path.join(
    prismaDirectory,
    'migrations',
    'sqlite',
    '20260710090000_add_auth_session_binding',
    'migration.sql',
  );
  const statements = (await readFile(migrationPath, 'utf8'))
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('--'))
    .join('\n')
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await client.$executeRawUnsafe(statement);
  }
}

try {
  await createLegacyDatabase();
  client = new PrismaClient({ datasourceUrl: databaseUrl });
  await client.$connect();

  await applyMigration();
  const columns = await client.$queryRawUnsafe("PRAGMA table_info('AuthSession')");
  assert.ok(columns.some((column) => column.name === 'binding_id'));

  await client.globalUser.create({
    data: { id: 'migration-user', email: 'migration@example.test', name: '', password_hash: null },
  });
  await client.authSession.create({
    data: {
      id: 'legacy-session',
      user_id: 'migration-user',
      token: 'legacy-refresh-token',
      binding_id: null,
      expires_at: new Date(Date.now() + 60_000),
    },
  });
  await client.authSession.create({
    data: {
      id: 'bound-session',
      user_id: 'migration-user',
      token: 'bound-refresh-token',
      binding_id: 'binding-a',
      expires_at: new Date(Date.now() + 60_000),
    },
  });

  const sessions = await client.authSession.findMany({ orderBy: { id: 'asc' } });
  assert.deepEqual(
    sessions.map((session) => [session.id, session.binding_id]),
    [['bound-session', 'binding-a'], ['legacy-session', null]],
  );
  console.log('AuthSession binding migration passed on an ephemeral SQLite database.');
} finally {
  await client?.$disconnect();
  await rm(temporarySchemaPath, { force: true });
  await rm(temporaryDatabasePath, { force: true });
  await rm(`${temporaryDatabasePath}-journal`, { force: true });
}
