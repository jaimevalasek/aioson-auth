import { prisma } from '../lib/prisma.js';
import { AuthError } from '../lib/auth-error.js';
import { revokeUserTokens } from './TokenRevocationAction.js';
import { setAppAccess } from './AppAccessAction.js';
import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

async function ensureLegacyRoleProfile(
  bindingId: string,
  role: { id: string; name: string; description: string },
  tx: Prisma.TransactionClient,
) {
  const profile = await tx.appProfile.upsert({
    where: { binding_id_name: { binding_id: bindingId, name: role.name } },
    create: {
      id: `legacy:${bindingId}:${role.id}`,
      binding_id: bindingId,
      name: role.name,
      description: role.description,
    },
    update: { description: role.description, archived_at: null },
  });
  const rolePermissions = await tx.rolePermission.findMany({
    where: { binding_id: bindingId, role_id: role.id, permission: { retired_at: null } },
    select: { permission_id: true },
  });
  await tx.appProfilePermission.deleteMany({ where: { profile_id: profile.id } });
  if (rolePermissions.length > 0) {
    await tx.appProfilePermission.createMany({
      data: rolePermissions.map(({ permission_id }) => ({
        id: uuidv4(),
        profile_id: profile.id,
        permission_id,
      })),
    });
  }
  return profile;
}

export async function requireOwnedBinding(bindingId: string, playId: string) {
  const binding = await prisma.appBinding.findFirst({
    where: { id: bindingId, aioson_play_id: playId },
    select: {
      id: true, app_name: true, app_slug: true, enable_rbac: true,
      auth_mode: true, manifest_sync_status: true, manifest_sync_error: true,
      manifest_synced_at: true, allowed_origins_json: true,
    },
  });
  if (!binding) throw new AuthError('ownership_conflict');
  return binding;
}

export async function getOwnerBindingAdministration(bindingId: string, playId: string) {
  const binding = await requireOwnedBinding(bindingId, playId);
  const [assignments, roles, permissions] = await Promise.all([
    prisma.userRole.findMany({
      where: { binding_id: bindingId },
      include: { user: true, role: true },
      orderBy: { created_at: 'desc' },
    }),
    prisma.role.findMany({
      where: { name: { not: 'owner' } },
      orderBy: { created_at: 'asc' },
    }),
    prisma.bindingPermission.findMany({
      where: { binding_id: bindingId },
      orderBy: { resource: 'asc' },
    }),
  ]);

  const operators = new Map<string, {
    id: string; email: string; name: string; created_at: Date; updated_at: Date;
    roles: Array<{ id: string; name: string; description: string }>;
  }>();
  for (const assignment of assignments) {
    const operator = operators.get(assignment.user.id) ?? {
      id: assignment.user.id,
      email: assignment.user.email,
      name: assignment.user.name,
      created_at: assignment.user.created_at,
      updated_at: assignment.user.updated_at,
      roles: [],
    };
    operator.roles.push({
      id: assignment.role.id,
      name: assignment.role.name,
      description: assignment.role.description,
    });
    operators.set(operator.id, operator);
  }

  return { binding, operators: [...operators.values()], roles, permissions };
}

export async function listOwnedBindingUsers(bindingId: string, playId: string) {
  await requireOwnedBinding(bindingId, playId);
  return prisma.globalUser.findMany({
    where: {
      OR: [
        {
          aioson_play_origin_id: playId,
          user_roles: { none: { aioson_play_origin_id: { not: playId } } },
        },
        {
          aioson_play_origin_id: null,
          user_roles: { none: {} },
        },
      ],
    },
    select: { id: true, email: true, name: true },
    orderBy: { name: 'asc' },
  });
}

async function requireInstallationManagedUser(
  userId: string,
  playId: string,
  db: Pick<typeof prisma, 'globalUser'> = prisma,
  options: { adoptUnassignedLegacy?: boolean; allowLegacyBindingAssignment?: boolean } = {},
) {
  const user = await db.globalUser.findFirst({
    where: {
      id: userId,
      OR: [
        { aioson_play_origin_id: playId },
        { user_roles: { some: { aioson_play_origin_id: playId } } },
      ],
    },
    select: {
      id: true,
      aioson_play_origin_id: true,
      user_roles: {
        where: { aioson_play_origin_id: { not: null } },
        select: { aioson_play_origin_id: true },
      },
    },
  });
  if (!user) throw new AuthError('ownership_conflict');

  const hasForeignAssignment = user.user_roles.some(
    (assignment) => assignment.aioson_play_origin_id !== null
      && assignment.aioson_play_origin_id !== playId,
  );
  if (user.aioson_play_origin_id === playId && !hasForeignAssignment) return user;

  const isUnassignedLegacy = user.aioson_play_origin_id === null && user.user_roles.length === 0;
  if (isUnassignedLegacy && options.adoptUnassignedLegacy) {
    await db.globalUser.update({
      where: { id: userId },
      data: { aioson_play_origin_id: playId },
    });
    return { ...user, aioson_play_origin_id: playId };
  }

  const isLegacyBindingAssignment = user.aioson_play_origin_id === null && !hasForeignAssignment;
  if (isLegacyBindingAssignment && options.allowLegacyBindingAssignment) return user;

  throw new AuthError('ownership_conflict');
}

export async function assignOwnedBindingRole(
  bindingId: string,
  playId: string,
  userId: string,
  roleId: string,
) {
  await requireOwnedBinding(bindingId, playId);
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) throw new AuthError('role_not_found');
  if (role.name === 'owner') throw new AuthError('owner_role_reserved');
  await prisma.$transaction(async (tx) => {
    await requireInstallationManagedUser(userId, playId, tx, { adoptUnassignedLegacy: true });
    await tx.userRole.upsert({
      where: { user_id_role_id_binding_id: { user_id: userId, role_id: roleId, binding_id: bindingId } },
      create: { user_id: userId, role_id: roleId, binding_id: bindingId, aioson_play_origin_id: playId },
      update: {},
    });
    const profile = await ensureLegacyRoleProfile(bindingId, role, tx);
    await setAppAccess({ bindingId, userId, profileId: profile.id, playId }, tx);
  });
  await revokeUserTokens(userId, bindingId);
}

export async function createOwnedBindingOperator(bindingId: string, playId: string, input: { email: string; name: string; roleId: string }) {
  await requireOwnedBinding(bindingId, playId);
  const role = await prisma.role.findUnique({ where: { id: input.roleId } });
  if (!role) throw new AuthError('role_not_found');
  if (role.name === 'owner') throw new AuthError('owner_role_reserved');
  return prisma.$transaction(async (tx) => {
    const email = input.email.toLowerCase();
    const existing = await tx.globalUser.findUnique({ where: { email }, select: { id: true } });
    if (existing) await requireInstallationManagedUser(existing.id, playId, tx, { adoptUnassignedLegacy: true });
    const user = existing
      ? await tx.globalUser.update({ where: { id: existing.id }, data: { name: input.name } })
      : await tx.globalUser.create({ data: { email, name: input.name, aioson_play_origin_id: playId } });
    await tx.userRole.upsert({
      where: { user_id_role_id_binding_id: { user_id: user.id, role_id: role.id, binding_id: bindingId } },
      create: { user_id: user.id, role_id: role.id, binding_id: bindingId, aioson_play_origin_id: playId },
      update: {},
    });
    const profile = await ensureLegacyRoleProfile(bindingId, role, tx);
    await setAppAccess({ bindingId, userId: user.id, profileId: profile.id, playId }, tx);
    return user;
  });
}

export async function updateOwnedBindingOperator(bindingId: string, playId: string, userId: string, input: { name?: string; roleId?: string }) {
  await requireOwnedBinding(bindingId, playId);
  const assignment = await prisma.userRole.findFirst({ where: { binding_id: bindingId, user_id: userId } });
  if (!assignment) throw new AuthError('user_not_found');
  await requireInstallationManagedUser(userId, playId, prisma, input.name !== undefined
    ? {}
    : { allowLegacyBindingAssignment: true });
  if (input.roleId) {
    const role = await prisma.role.findUnique({ where: { id: input.roleId } });
    if (!role) throw new AuthError('role_not_found');
    if (role.name === 'owner') throw new AuthError('owner_role_reserved');
    await prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({ where: { binding_id: bindingId, user_id: userId } });
      await tx.userRole.create({ data: { binding_id: bindingId, user_id: userId, role_id: role.id, aioson_play_origin_id: playId } });
      const profile = await ensureLegacyRoleProfile(bindingId, role, tx);
      await setAppAccess({ bindingId, userId, profileId: profile.id, playId }, tx);
    });
    await revokeUserTokens(userId, bindingId);
  }
  if (input.name !== undefined) await prisma.globalUser.update({ where: { id: userId }, data: { name: input.name } });
}

export async function deactivateOwnedBindingOperator(bindingId: string, playId: string, userId: string) {
  await requireOwnedBinding(bindingId, playId);
  const removed = await prisma.$transaction(async (tx) => {
    const access = await tx.appAccess.deleteMany({ where: { binding_id: bindingId, user_id: userId } });
    const legacy = await tx.userRole.deleteMany({ where: { binding_id: bindingId, user_id: userId } });
    return access.count + legacy.count;
  });
  if (!removed) throw new AuthError('user_not_found');
  await revokeUserTokens(userId, bindingId);
}
