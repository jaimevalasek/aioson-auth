import assert from 'node:assert/strict';
import bcrypt from 'bcrypt';
import { afterEach, describe, it } from 'node:test';
import { requireActiveAppAccess, setAppAccess } from '../src/actions/AppAccessAction.ts';
import {
  createOwnedPerson,
  deleteOwnedPerson,
  normalizeAllowedOrigins,
  updateOwnedPerson,
} from '../src/actions/AppManagementAction.ts';
import { registerBindingAuthManifest } from '../src/actions/AppBindingAction.ts';
import { requireOwnedBinding } from '../src/actions/OwnerBindingAdministrationAction.ts';
import { extractBindingIdFromAuthPath, isLoopbackOrigin } from '../src/lib/app-origin.ts';
import { prisma } from '../src/lib/prisma.ts';

const restores = [];
function stub(target, key, implementation) {
  const previous = target[key];
  target[key] = implementation;
  restores.push(() => { target[key] = previous; });
}
afterEach(() => {
  while (restores.length) restores.pop()();
});

function accessDatabase(overrides = {}) {
  return {
    appBinding: { findUnique: async () => ({ id: 'binding-a' }) },
    globalUser: { findUnique: async () => ({ disabled_at: null }) },
    appAccess: {
      findUnique: async () => ({
        profile_id: 'profile-a', status: 'active',
        profile: {
          binding_id: 'binding-a', archived_at: null,
          permissions: [
            { permission: { binding_id: 'binding-a', name: 'deck:read', retired_at: null } },
            { permission: { binding_id: 'binding-a', name: 'deck:old', retired_at: new Date() } },
          ],
        },
      }),
      upsert: async () => ({ id: 'access-a' }),
    },
    appProfile: { findFirst: async () => ({ id: 'profile-a', binding_id: 'binding-a' }) },
    ...overrides,
  };
}

describe('auth-management-simplification', () => {
  it('AC-AMS-02/04 AMS-access requires an active app-scoped association and emits active permissions only', async () => {
    const context = await requireActiveAppAccess('user-a', 'binding-a', accessDatabase());
    assert.deepEqual(context.permissions, ['deck:read']);
    await assert.rejects(
      () => requireActiveAppAccess('user-a', 'binding-a', accessDatabase({
        appAccess: { findUnique: async () => null },
      })),
      (error) => error?.code === 'invalid_credentials',
    );
  });

  it('AC-AMS-05 AMS-access rejects disabled people and cross-binding profiles uniformly', async () => {
    await assert.rejects(
      () => requireActiveAppAccess('user-a', 'binding-a', accessDatabase({
        globalUser: { findUnique: async () => ({ disabled_at: new Date() }) },
      })),
      (error) => error?.code === 'invalid_credentials',
    );
    await assert.rejects(
      () => requireActiveAppAccess('user-a', 'binding-a', accessDatabase({
        appAccess: { findUnique: async () => ({
          profile_id: 'profile-b', status: 'active',
          profile: { binding_id: 'binding-b', archived_at: null, permissions: [] },
        }) },
      })),
      (error) => error?.code === 'invalid_credentials',
    );
  });

  it('AC-AMS-01/03 AMS-ownership rejects foreign owner and profile before mutation', async () => {
    stub(prisma.appBinding, 'findFirst', async () => null);
    await assert.rejects(
      () => requireOwnedBinding('binding-a', 'play-b'),
      (error) => error?.code === 'ownership_conflict',
    );
    let writes = 0;
    const db = accessDatabase({
      appProfile: { findFirst: async () => null },
      appAccess: { upsert: async () => { writes++; } },
    });
    await assert.rejects(
      () => setAppAccess({ bindingId: 'binding-a', userId: 'user-a', profileId: 'profile-b', playId: 'play-a' }, db),
      (error) => error?.code === 'validation_failed',
    );
    assert.equal(writes, 0);
  });

  it('AC-AMS-06/07/08 AMS-sync accepts draft and zero-permission exact manifests and retires removed entries', async () => {
    const updates = [];
    stub(prisma.appBinding, 'findUnique', async () => ({ id: 'binding-a', system_permissions: '[]' }));
    stub(prisma.bindingPermission, 'findMany', async () => [{ name: 'deck:old' }]);
    stub(prisma.bindingPermission, 'upsert', async () => ({}));
    stub(prisma.bindingPermission, 'updateMany', async ({ where, data }) => {
      updates.push({ where, data }); return { count: 1 };
    });
    stub(prisma.appProfile, 'upsert', async () => ({ id: 'system:access:binding-a' }));
    stub(prisma.appBinding, 'update', async ({ data }) => { updates.push({ data }); return {}; });
    stub(prisma.appBinding, 'updateMany', async () => ({ count: 0 }));
    stub(prisma, '$transaction', async (operation) => operation(prisma));

    await registerBindingAuthManifest('binding-a', { version: 1, permissions: [], policies: [] }, { fingerprint: 'a'.repeat(64) });
    assert.equal(updates[0].where.binding_id, 'binding-a');
    assert.equal(updates[0].where.name, undefined);
    assert.ok(updates[0].data.retired_at instanceof Date);
    assert.equal(updates[1].data.auth_mode, 'authentication_only');
    assert.equal(updates[1].data.manifest_sync_status, 'synced');
  });

  it('AC-AMS-09/10/11 AMS-management validates exact origins and future HTTPS domains', () => {
    assert.deepEqual(normalizeAllowedOrigins([
      'https://flow.example.com', 'http://127.0.0.1:3501', 'https://flow.example.com',
    ]), ['https://flow.example.com', 'http://127.0.0.1:3501']);
    assert.throws(() => normalizeAllowedOrigins(['https://*.example.com']));
    assert.throws(() => normalizeAllowedOrigins(['http://flow.example.com']));
  });

  it('AC-AMS-14 AMS-origin rejects prefix confusion and extracts only app binding routes', () => {
    assert.equal(isLoopbackOrigin('http://127.0.0.1:3501'), true);
    assert.equal(isLoopbackOrigin('http://localhost.evil.test:3501'), false);
    assert.equal(extractBindingIdFromAuthPath('/api/auth/binding-a/login'), 'binding-a');
    assert.equal(extractBindingIdFromAuthPath('/api/auth/admin/bindings'), null);
  });

  it('AC-AMS-10/11 AMS-people creates an owner-scoped pending person without exposing a password hash', async () => {
    let createdData;
    stub(prisma.globalUser, 'findUnique', async () => null);
    stub(prisma.globalUser, 'create', async ({ data }) => {
      createdData = data;
      return { id: 'user-a', disabled_at: null, ...data };
    });

    const person = await createOwnedPerson('play-a', {
      email: '  PERSON@Example.Test ', name: 'Person',
    });

    assert.equal(createdData.email, 'person@example.test');
    assert.equal(createdData.password_hash, null);
    assert.deepEqual(person, {
      id: 'user-a', email: 'person@example.test', name: 'Person',
      disabled_at: null, credential_status: 'pending',
    });
  });

  it('AC-AMS-10/11 AMS-people updates credentials and revokes existing sessions', async () => {
    let updatedData;
    let sessionsDeleted = 0;
    stub(prisma.globalUser, 'findFirst', async () => ({
      id: 'user-a', email: 'old@example.test', name: 'Old', password_hash: null,
      disabled_at: null, aioson_play_origin_id: 'play-a', app_accesses: [], user_roles: [],
    }));
    stub(prisma.globalUser, 'findUnique', async () => null);
    stub(prisma.globalUser, 'update', async ({ data }) => {
      updatedData = data;
      return { id: 'user-a', email: data.email, name: data.name, disabled_at: null, password_hash: data.password_hash };
    });
    stub(prisma.authSession, 'deleteMany', async () => { sessionsDeleted++; return { count: 1 }; });

    const person = await updateOwnedPerson('play-a', 'user-a', {
      email: 'new@example.test', name: 'New', password: 'safe-password',
    });

    assert.equal(await bcrypt.compare('safe-password', updatedData.password_hash), true);
    assert.equal(sessionsDeleted, 1);
    assert.equal(person.credential_status, 'active');
  });

  it('AC-AMS-10 AMS-people refuses deletion while app access is still linked', async () => {
    let deletes = 0;
    stub(prisma.globalUser, 'findFirst', async () => ({
      id: 'user-a', email: 'person@example.test', name: 'Person', password_hash: null,
      disabled_at: null, aioson_play_origin_id: 'play-a',
      app_accesses: [{ binding_id: 'binding-a', aioson_play_origin_id: 'play-a' }],
      user_roles: [],
    }));
    stub(prisma.globalUser, 'delete', async () => { deletes++; });

    await assert.rejects(
      () => deleteOwnedPerson('play-a', 'user-a'),
      (error) => error?.code === 'person_has_accesses',
    );
    assert.equal(deletes, 0);
  });
});
