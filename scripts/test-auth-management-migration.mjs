import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const databaseName = `.auth-management-${randomUUID()}.db`;
const databasePath = path.join(root, 'prisma', databaseName);
const databaseUrl = `file:./${databaseName}`;
const migrations = [
  '20260515130000_init_with_federation',
  '20260604120000_add_play_app_inventory',
  '20260710090000_add_auth_session_binding',
  '20260711070000_add_app_scoped_access',
];
let client;

function statements(sql) {
  return sql
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('--'))
    .join('\n')
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);
}

async function executeSql(sql) {
  for (const statement of statements(sql)) {
    await client.$executeRawUnsafe(statement);
  }
}

async function readMigration(name) {
  return readFile(
    path.join(root, 'prisma', 'migrations', 'sqlite', name, 'migration.sql'),
    'utf8',
  );
}

async function seedLegacyData() {
  await client.$executeRawUnsafe(`INSERT INTO "AppBinding"
    ("id","app_name","app_slug","connection_name","updated_at") VALUES
    ('binding-permissions','Flow Deck','flow-deck','Flow Deck',CURRENT_TIMESTAMP),
    ('binding-auth-only','App simples','app-simples','App simples',CURRENT_TIMESTAMP)`);
  await client.$executeRawUnsafe(`INSERT INTO "GlobalUser"
    ("id","email","name","updated_at") VALUES
    ('user-multi','multi@example.test','Multi',CURRENT_TIMESTAMP),
    ('user-single','single@example.test','Single',CURRENT_TIMESTAMP)`);
  await client.$executeRawUnsafe(`INSERT INTO "BindingPermission"
    ("id","binding_id","name","resource","action") VALUES
    ('permission-read','binding-permissions','deck.read','deck','read'),
    ('permission-write','binding-permissions','deck.write','deck','write')`);
  await client.$executeRawUnsafe(`INSERT INTO "Role"
    ("id","name","description","updated_at") VALUES
    ('role-reader','Leitor','Pode ler',CURRENT_TIMESTAMP),
    ('role-writer','Editor','Pode editar',CURRENT_TIMESTAMP)`);
  await client.$executeRawUnsafe(`INSERT INTO "RolePermission"
    ("id","role_id","permission_id","binding_id") VALUES
    ('rp-read','role-reader','permission-read','binding-permissions'),
    ('rp-write','role-writer','permission-write','binding-permissions')`);
  await client.$executeRawUnsafe(`INSERT INTO "UserRole"
    ("id","user_id","role_id","binding_id","aioson_play_origin_id") VALUES
    ('ur-multi-read','user-multi','role-reader','binding-permissions','play-local'),
    ('ur-multi-write','user-multi','role-writer','binding-permissions','play-local'),
    ('ur-single','user-single','role-reader','binding-permissions','play-local')`);
}

try {
  client = new PrismaClient({ datasourceUrl: databaseUrl });
  await client.$connect();

  for (const migration of migrations.slice(0, -1)) {
    await executeSql(await readMigration(migration));
  }
  await seedLegacyData();

  const migrationSql = await readMigration(migrations.at(-1));
  await executeSql(migrationSql);

  const accesses = await client.$queryRawUnsafe(
    'SELECT user_id, profile_id, status FROM "AppAccess" ORDER BY user_id',
  );
  assert.deepEqual(accesses, [
    { user_id: 'user-multi', profile_id: 'legacy-set:binding-permissions:user-multi', status: 'active' },
    { user_id: 'user-single', profile_id: 'legacy:binding-permissions:role-reader', status: 'active' },
  ]);

  const multiPermissions = await client.$queryRawUnsafe(`SELECT bp.name
    FROM "AppProfilePermission" pp
    JOIN "BindingPermission" bp ON bp.id = pp.permission_id
    WHERE pp.profile_id = 'legacy-set:binding-permissions:user-multi'
    ORDER BY bp.name`);
  assert.deepEqual(multiPermissions.map(({ name }) => name), ['deck.read', 'deck.write']);

  const bindings = await client.$queryRawUnsafe(
    'SELECT id, auth_mode, manifest_sync_status FROM "AppBinding" ORDER BY id',
  );
  assert.deepEqual(bindings, [
    { id: 'binding-auth-only', auth_mode: 'authentication_only', manifest_sync_status: 'synced' },
    { id: 'binding-permissions', auth_mode: 'profiles_permissions', manifest_sync_status: 'synced' },
  ]);

  const systemProfiles = await client.$queryRawUnsafe(
    'SELECT COUNT(*) AS count FROM "AppProfile" WHERE is_system = true',
  );
  assert.equal(Number(systemProfiles[0].count), 2);

  const backfill = migrationSql.match(/-- BACKFILL-BEGIN([\s\S]*?)-- BACKFILL-END/)?.[1];
  assert.ok(backfill, 'a migration precisa expor o bloco de backfill idempotente');
  await executeSql(backfill);
  assert.equal(
    Number((await client.$queryRawUnsafe('SELECT COUNT(*) AS count FROM "AppAccess"'))[0].count),
    2,
  );

  console.log('AC-AMS-12: migração e backfill idempotente preservam acessos e união de permissões.');
} finally {
  await client?.$disconnect();
  await rm(databasePath, { force: true });
  await rm(`${databasePath}-journal`, { force: true });
}
