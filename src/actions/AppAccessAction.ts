import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma.js';
import { AuthError } from '../lib/auth-error.js';

type AccessDatabase = typeof prisma | Prisma.TransactionClient;

export interface AppAccessContext {
  bindingId: string;
  profileId: string;
  permissions: string[];
}

export async function requireActiveAppAccess(
  userId: string,
  bindingId: string,
  db: AccessDatabase = prisma,
): Promise<AppAccessContext> {
  const [binding, user, access] = await Promise.all([
    db.appBinding.findUnique({ where: { id: bindingId }, select: { id: true } }),
    db.globalUser.findUnique({ where: { id: userId }, select: { disabled_at: true } }),
    db.appAccess.findUnique({
      where: { binding_id_user_id: { binding_id: bindingId, user_id: userId } },
      include: {
        profile: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    }),
  ]);

  if (!binding) throw new AuthError('binding_not_found');
  if (
    !user
    || user.disabled_at
    || !access
    || access.status !== 'active'
    || access.profile.binding_id !== bindingId
    || access.profile.archived_at
  ) {
    throw new AuthError('invalid_credentials');
  }

  return {
    bindingId,
    profileId: access.profile_id,
    permissions: access.profile.permissions
      .filter(({ permission }) => permission.binding_id === bindingId && !permission.retired_at)
      .map(({ permission }) => permission.name),
  };
}

export async function getAppPermissions(userId: string, bindingId: string): Promise<string[]> {
  return (await requireActiveAppAccess(userId, bindingId)).permissions;
}

export async function ensureSystemAccessProfile(
  bindingId: string,
  db: AccessDatabase = prisma,
) {
  return db.appProfile.upsert({
    where: { binding_id_name: { binding_id: bindingId, name: '__access__' } },
    create: {
      id: `system:access:${bindingId}`,
      binding_id: bindingId,
      name: '__access__',
      description: 'Authentication-only access',
      is_system: true,
    },
    update: { archived_at: null, is_system: true },
  });
}

export async function setAppAccess(input: {
  bindingId: string;
  userId: string;
  profileId?: string;
  playId: string;
}, db: AccessDatabase = prisma) {
  const profile = input.profileId
    ? await db.appProfile.findFirst({
      where: { id: input.profileId, binding_id: input.bindingId, archived_at: null },
    })
    : await ensureSystemAccessProfile(input.bindingId, db);
  if (!profile) throw new AuthError('validation_failed');

  return db.appAccess.upsert({
    where: { binding_id_user_id: { binding_id: input.bindingId, user_id: input.userId } },
    create: {
      id: uuidv4(),
      binding_id: input.bindingId,
      user_id: input.userId,
      profile_id: profile.id,
      status: 'active',
      aioson_play_origin_id: input.playId,
    },
    update: {
      profile_id: profile.id,
      status: 'active',
      aioson_play_origin_id: input.playId,
    },
  });
}
