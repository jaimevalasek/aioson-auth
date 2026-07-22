import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma.js';
import { AuthError } from '../lib/auth-error.js';
import { ensureSystemAccessProfile, setAppAccess } from './AppAccessAction.js';
import { requireOwnedBinding } from './OwnerBindingAdministrationAction.js';
import { revokeUserTokens } from './TokenRevocationAction.js';

export async function getOwnedAppManagement(bindingId: string, playId: string) {
  const binding = await requireOwnedBinding(bindingId, playId);
  const [profiles, accesses, permissions] = await Promise.all([
    prisma.appProfile.findMany({
      where: { binding_id: bindingId, archived_at: null },
      include: { permissions: { include: { permission: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.appAccess.findMany({
      where: { binding_id: bindingId },
      include: { user: true, profile: true },
      orderBy: { created_at: 'desc' },
    }),
    prisma.bindingPermission.findMany({
      where: { binding_id: bindingId, retired_at: null },
      orderBy: { name: 'asc' },
    }),
  ]);
  return { binding, profiles, accesses, permissions };
}

export async function listOwnedPeople(playId: string) {
  return prisma.globalUser.findMany({
    where: {
      OR: [
        { aioson_play_origin_id: playId },
        { app_accesses: { some: { aioson_play_origin_id: playId } } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      disabled_at: true,
      password_hash: true,
      app_accesses: {
        where: { aioson_play_origin_id: playId },
        select: {
          binding_id: true,
          status: true,
          profile: { select: { id: true, name: true } },
          binding: { select: { app_name: true, app_slug: true } },
        },
      },
    },
    orderBy: { name: 'asc' },
  }).then((people) => people.map(({ password_hash, ...person }) => ({
    ...person,
    credential_status: password_hash ? 'active' : 'pending',
  }))); 
}

async function requireOwnedPerson(playId: string, userId: string) {
  const user = await prisma.globalUser.findFirst({
    where: {
      id: userId,
      OR: [
        { aioson_play_origin_id: playId },
        { app_accesses: { some: { aioson_play_origin_id: playId } } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      password_hash: true,
      disabled_at: true,
      aioson_play_origin_id: true,
      app_accesses: { select: { binding_id: true, aioson_play_origin_id: true } },
      user_roles: { select: { binding_id: true, aioson_play_origin_id: true } },
    },
  });
  if (!user) throw new AuthError('ownership_conflict');
  const hasForeignAccess = user.app_accesses.some(
    (access) => access.aioson_play_origin_id && access.aioson_play_origin_id !== playId,
  );
  const hasForeignRole = user.user_roles.some(
    (role) => role.aioson_play_origin_id && role.aioson_play_origin_id !== playId,
  );
  if (hasForeignAccess || hasForeignRole) throw new AuthError('ownership_conflict');
  return user;
}

function personSummary(user: {
  id: string;
  email: string;
  name: string;
  password_hash: string | null;
  disabled_at: Date | null;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    disabled_at: user.disabled_at,
    credential_status: user.password_hash ? 'active' as const : 'pending' as const,
  };
}

async function revokePersonSessions(
  userId: string,
  accesses: Array<{ binding_id: string }>,
) {
  await prisma.authSession.deleteMany({ where: { user_id: userId } });
  const bindingIds = [...new Set(accesses.map((access) => access.binding_id))];
  await Promise.all(bindingIds.map((bindingId) => revokeUserTokens(userId, bindingId)));
}

export async function createOwnedPerson(
  playId: string,
  input: { email: string; name: string; password?: string },
) {
  const email = input.email.trim().toLowerCase();
  const existing = await prisma.globalUser.findUnique({
    where: { email },
    select: {
      id: true,
      aioson_play_origin_id: true,
      app_accesses: { select: { aioson_play_origin_id: true } },
    },
  });
  if (existing) {
    const belongsToPlay = existing.aioson_play_origin_id === playId
      || existing.app_accesses.some((access) => access.aioson_play_origin_id === playId);
    if (!belongsToPlay) throw new AuthError('ownership_conflict');
    throw new AuthError('email_already_registered');
  }

  const passwordHash = input.password ? await bcrypt.hash(input.password, 12) : null;
  const user = await prisma.globalUser.create({
    data: {
      email,
      name: input.name.trim(),
      password_hash: passwordHash,
      aioson_play_origin_id: playId,
    },
  });
  return personSummary(user);
}

export async function updateOwnedPerson(
  playId: string,
  userId: string,
  input: { email?: string; name?: string; password?: string },
) {
  const current = await requireOwnedPerson(playId, userId);
  const email = input.email?.trim().toLowerCase();
  if (email && email !== current.email) {
    const existing = await prisma.globalUser.findUnique({ where: { email }, select: { id: true } });
    if (existing && existing.id !== userId) throw new AuthError('email_already_registered');
  }

  const data: { email?: string; name?: string; password_hash?: string } = {};
  if (email !== undefined) data.email = email;
  if (input.name !== undefined) data.name = input.name.trim();
  if (input.password !== undefined) data.password_hash = await bcrypt.hash(input.password, 12);
  const updated = await prisma.globalUser.update({ where: { id: userId }, data });
  if (data.email !== undefined || data.password_hash !== undefined) {
    await revokePersonSessions(userId, current.app_accesses);
  }
  return personSummary(updated);
}

export async function deleteOwnedPerson(playId: string, userId: string) {
  const user = await requireOwnedPerson(playId, userId);
  if (user.app_accesses.length > 0 || user.user_roles.length > 0) {
    throw new AuthError('person_has_accesses');
  }
  await prisma.$transaction([
    prisma.authSession.deleteMany({ where: { user_id: userId } }),
    prisma.recoveryToken.deleteMany({ where: { user_id: userId } }),
    prisma.tokenRevocation.deleteMany({ where: { user_id: userId } }),
    prisma.globalUser.delete({ where: { id: userId } }),
  ]);
}

export async function linkOwnedPerson(input: {
  bindingId: string;
  playId: string;
  email: string;
  name: string;
  profileId?: string;
}) {
  const binding = await requireOwnedBinding(input.bindingId, input.playId);
  if (binding.enable_rbac && !input.profileId) throw new AuthError('validation_failed');

  const email = input.email.trim().toLowerCase();
  return prisma.$transaction(async (tx) => {
    const existing = await tx.globalUser.findUnique({
      where: { email },
      include: { app_accesses: { where: { aioson_play_origin_id: { not: null } } } },
    });
    if (
      existing
      && existing.aioson_play_origin_id !== null
      && existing.aioson_play_origin_id !== input.playId
    ) throw new AuthError('ownership_conflict');
    if (existing?.app_accesses.some((access) => access.aioson_play_origin_id !== input.playId)) {
      throw new AuthError('ownership_conflict');
    }

    const user = existing
      ? await tx.globalUser.update({
        where: { id: existing.id },
        data: { name: input.name, aioson_play_origin_id: input.playId },
      })
      : await tx.globalUser.create({
        data: { email, name: input.name, password_hash: null, aioson_play_origin_id: input.playId },
      });
    const profile = input.profileId
      ? input.profileId
      : (await ensureSystemAccessProfile(input.bindingId, tx)).id;
    await setAppAccess({
      bindingId: input.bindingId,
      userId: user.id,
      profileId: profile,
      playId: input.playId,
    }, tx);
    return { id: user.id, credential_status: user.password_hash ? 'active' : 'pending' };
  });
}

export async function setOwnedPersonDisabled(playId: string, userId: string, disabled: boolean) {
  const user = await requireOwnedPerson(playId, userId);
  await prisma.globalUser.update({
    where: { id: userId },
    data: { disabled_at: disabled ? new Date() : null },
  });
  if (disabled) await revokePersonSessions(userId, user.app_accesses);
}

export async function createOwnedProfile(input: {
  bindingId: string;
  playId: string;
  name: string;
  description: string;
  permissionIds: string[];
}) {
  await requireOwnedBinding(input.bindingId, input.playId);
  return prisma.$transaction(async (tx) => {
    const permissionCount = await tx.bindingPermission.count({
      where: { id: { in: input.permissionIds }, binding_id: input.bindingId, retired_at: null },
    });
    if (permissionCount !== new Set(input.permissionIds).size) throw new AuthError('validation_failed');
    const profile = await tx.appProfile.create({
      data: {
        id: uuidv4(),
        binding_id: input.bindingId,
        name: input.name,
        description: input.description,
      },
    });
    if (input.permissionIds.length > 0) {
      await tx.appProfilePermission.createMany({
        data: input.permissionIds.map((permissionId) => ({
          id: uuidv4(), profile_id: profile.id, permission_id: permissionId,
        })),
      });
    }
    return profile;
  });
}

export async function updateOwnedProfile(input: {
  bindingId: string;
  playId: string;
  profileId: string;
  name: string;
  description: string;
  permissionIds: string[];
}) {
  await requireOwnedBinding(input.bindingId, input.playId);
  const profile = await prisma.appProfile.findFirst({
    where: { id: input.profileId, binding_id: input.bindingId, archived_at: null },
  });
  if (!profile || profile.is_system) throw new AuthError('validation_failed');
  await prisma.$transaction(async (tx) => {
    const permissionCount = await tx.bindingPermission.count({
      where: { id: { in: input.permissionIds }, binding_id: input.bindingId, retired_at: null },
    });
    if (permissionCount !== new Set(input.permissionIds).size) throw new AuthError('validation_failed');
    await tx.appProfile.update({
      where: { id: input.profileId },
      data: { name: input.name, description: input.description },
    });
    await tx.appProfilePermission.deleteMany({ where: { profile_id: input.profileId } });
    if (input.permissionIds.length > 0) {
      await tx.appProfilePermission.createMany({
        data: input.permissionIds.map((permissionId) => ({
          id: uuidv4(), profile_id: input.profileId, permission_id: permissionId,
        })),
      });
    }
  });
  const affected = await prisma.appAccess.findMany({
    where: { binding_id: input.bindingId, profile_id: input.profileId }, select: { user_id: true },
  });
  await Promise.all(affected.map(({ user_id }) => revokeUserTokens(user_id, input.bindingId)));
}

export async function archiveOwnedProfile(bindingId: string, playId: string, profileId: string) {
  await requireOwnedBinding(bindingId, playId);
  const profile = await prisma.appProfile.findFirst({ where: { id: profileId, binding_id: bindingId } });
  if (!profile || profile.is_system) throw new AuthError('validation_failed');
  if (await prisma.appAccess.count({ where: { profile_id: profileId, status: 'active' } })) {
    throw new AuthError('validation_failed');
  }
  await prisma.appProfile.update({ where: { id: profileId }, data: { archived_at: new Date() } });
}

export function normalizeAllowedOrigins(origins: string[]): string[] {
  const normalized = [...new Set(origins.map((origin) => origin.trim()).filter(Boolean))];
  if (normalized.length > 8) throw new AuthError('validation_failed');
  for (const origin of normalized) {
    if (origin.includes('*')) throw new AuthError('validation_failed');
    let url: URL;
    try { url = new URL(origin); } catch { throw new AuthError('validation_failed'); }
    const loopback = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if ((!loopback && url.protocol !== 'https:') || (loopback && !['http:', 'https:'].includes(url.protocol))) {
      throw new AuthError('validation_failed');
    }
    if (url.origin !== origin || url.username || url.password) throw new AuthError('validation_failed');
  }
  if (JSON.stringify(normalized).length > 191) throw new AuthError('validation_failed');
  return normalized;
}

export async function updateOwnedOrigins(bindingId: string, playId: string, origins: string[]) {
  await requireOwnedBinding(bindingId, playId);
  const normalized = normalizeAllowedOrigins(origins);
  await prisma.appBinding.update({
    where: { id: bindingId }, data: { allowed_origins_json: JSON.stringify(normalized) },
  });
  return normalized;
}
