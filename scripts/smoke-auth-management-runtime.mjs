import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { readFile, rm } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const databaseName = `.auth-management-runtime-${randomUUID()}.db`;
const databasePath = path.join(root, 'prisma', databaseName);
process.env.DATABASE_PROVIDER = 'sqlite';
process.env.DATABASE_URL = `file:./${databaseName}`;
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
let server;
let appPrisma;

function statements(sql) {
  return sql.split('\n').filter((line) => !line.trimStart().startsWith('--')).join('\n')
    .split(';').map((statement) => statement.trim()).filter(Boolean);
}

async function applyMigrations() {
  const directories = [
    '20260515130000_init_with_federation',
    '20260604120000_add_play_app_inventory',
    '20260710090000_add_auth_session_binding',
    '20260711070000_add_app_scoped_access',
  ];
  for (const directory of directories) {
    const sql = await readFile(path.join(root, 'prisma', 'migrations', 'sqlite', directory, 'migration.sql'), 'utf8');
    for (const statement of statements(sql)) await prisma.$executeRawUnsafe(statement);
  }
}

async function allocatePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => probe.listen(0, '127.0.0.1', (error) => error ? reject(error) : resolve()));
  const address = probe.address();
  if (!address || typeof address === 'string') throw new Error('Could not allocate port');
  await new Promise((resolve) => probe.close(resolve));
  return address.port;
}

async function waitFor(url) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try { const response = await fetch(url); if (response.ok) return response; } catch { /* booting */ }
    if (server?.exitCode !== null) throw new Error(`Auth exited during smoke (${server?.exitCode})`);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

try {
  await prisma.$connect();
  await applyMigrations();
  await prisma.appBinding.create({ data: {
    id: 'binding-flow', app_name: 'Flow Deck', app_slug: 'flow-deck', connection_name: 'Flow Deck',
    aioson_play_id: 'play-owner', enable_rbac: true, auth_mode: 'profiles_permissions',
  } });
  await prisma.bindingPermission.create({ data: {
    id: 'permission-read', binding_id: 'binding-flow', name: 'deck:read', resource: 'deck', action: 'read',
  } });
  await prisma.globalUser.create({ data: {
    id: 'user-owner', email: 'owner@example.test', name: 'Owner',
    password_hash: await bcrypt.hash('correct-password', 4), aioson_play_origin_id: 'play-owner',
  } });

  const {
    archiveOwnedProfile,
    createOwnedPerson,
    createOwnedProfile,
    deleteOwnedPerson,
    linkOwnedPerson,
    updateOwnedOrigins,
    updateOwnedPerson,
    updateOwnedProfile,
  } = await import('../src/actions/AppManagementAction.ts');
  ({ prisma: appPrisma } = await import('../src/lib/prisma.ts'));
  const { login } = await import('../src/actions/AuthAction.ts');
  const { registerBindingAuthManifest } = await import('../src/actions/AppBindingAction.ts');
  const profile = await createOwnedProfile({
    bindingId: 'binding-flow', playId: 'play-owner', name: 'Editor', description: '',
    permissionIds: ['permission-read'],
  });
  await updateOwnedProfile({
    bindingId: 'binding-flow', playId: 'play-owner', profileId: profile.id,
    name: 'Editor', description: 'Can edit the deck', permissionIds: ['permission-read'],
  });
  const temporaryProfile = await createOwnedProfile({
    bindingId: 'binding-flow', playId: 'play-owner', name: 'Temporary', description: '',
    permissionIds: [],
  });
  await archiveOwnedProfile('binding-flow', 'play-owner', temporaryProfile.id);
  assert.equal(await prisma.appProfile.count({ where: { id: temporaryProfile.id, archived_at: { not: null } } }), 1);

  const pendingPerson = await createOwnedPerson('play-owner', {
    email: 'pending@example.test', name: 'Pending',
  });
  assert.equal(pendingPerson.credential_status, 'pending');
  const activatedPerson = await updateOwnedPerson('play-owner', pendingPerson.id, {
    email: pendingPerson.email, name: 'Ready', password: 'safe-password',
  });
  assert.equal(activatedPerson.credential_status, 'active');
  await deleteOwnedPerson('play-owner', pendingPerson.id);
  assert.equal(await prisma.globalUser.count({ where: { id: pendingPerson.id } }), 0);

  await linkOwnedPerson({
    bindingId: 'binding-flow', playId: 'play-owner', email: 'owner@example.test', name: 'Owner', profileId: profile.id,
  });
  const session = await login('owner@example.test', 'correct-password', 'binding-flow');
  const payload = JSON.parse(Buffer.from(session.accessToken.split('.')[1], 'base64url').toString('utf8'));
  assert.deepEqual(payload.permissions, ['deck:read']);

  await registerBindingAuthManifest('binding-flow', { version: 1, permissions: [], policies: [] }, { fingerprint: 'b'.repeat(64) });
  assert.equal(await prisma.bindingPermission.count({ where: { retired_at: { not: null } } }), 1);
  await updateOwnedOrigins('binding-flow', 'play-owner', ['https://flow.example.com']);

  const port = await allocatePort();
  server = spawn(process.execPath, ['dist/server/server.js'], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  await waitFor(`http://127.0.0.1:${port}/health`);
  const ui = await fetch(`http://127.0.0.1:${port}/auth/apps`);
  assert.equal(ui.status, 200);
  const allowed = await fetch(`http://127.0.0.1:${port}/api/auth/binding-flow/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://flow.example.com' },
    body: JSON.stringify({ email: 'owner@example.test', password: 'correct-password' }),
  });
  assert.equal(allowed.status, 200);
  const denied = await fetch(`http://127.0.0.1:${port}/api/auth/binding-flow/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://flow.example.com.evil.test' },
    body: JSON.stringify({ email: 'owner@example.test', password: 'correct-password' }),
  });
  assert.equal(denied.status, 403);
  console.log('AC-AMS-18: real DB, person/profile CRUD, access, login, sync, boot/UI and exact-origin smoke passed.');
} finally {
  if (server?.exitCode === null) server.kill();
  if (server) await new Promise((resolve) => server.once('exit', resolve));
  await appPrisma?.$disconnect();
  await prisma.$disconnect();
  await rm(databasePath, { force: true });
  await rm(`${databasePath}-journal`, { force: true });
}
