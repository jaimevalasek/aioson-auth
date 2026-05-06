import { prisma } from '../lib/prisma.js';
import { getBinding } from './AppBindingAction.js';
import { v4 as uuidv4 } from 'uuid';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface GlobalUser {
  id: string;
  email: string;
  name: string;
  password_hash: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface BindingPermission {
  id: string;
  binding_id: string;
  name: string;
  resource: string;
  action: string;
  created_at: Date;
}

// ─── Users (global) ─────────────────────────────────────────────────────────

export async function listGlobalUsers(): Promise<Omit<GlobalUser, 'password_hash'>[]> {
  return prisma.globalUser.findMany({
    select: { id: true, email: true, name: true, password_hash: false, created_at: true, updated_at: true },
    orderBy: { created_at: 'desc' },
  });
}

export async function getGlobalUserById(userId: string): Promise<GlobalUser | null> {
  return prisma.globalUser.findUnique({ where: { id: userId } });
}

export async function getGlobalUserByEmail(email: string): Promise<GlobalUser | null> {
  return prisma.globalUser.findUnique({ where: { email } });
}

export async function createGlobalUser(
  email: string,
  passwordHash: string,
  name?: string
): Promise<GlobalUser> {
  return prisma.globalUser.create({
    data: { id: uuidv4(), email, password_hash: passwordHash, name: name ?? '' },
  });
}

export async function updateGlobalUser(
  userId: string,
  data: { email?: string; name?: string; password_hash?: string }
): Promise<GlobalUser> {
  return prisma.globalUser.update({ where: { id: userId }, data });
}

export async function deleteGlobalUser(userId: string): Promise<void> {
  await prisma.globalUser.delete({ where: { id: userId } });
}

// ─── Roles (global) ────────────────────────────────────────────────────────

export async function listRoles(): Promise<Role[]> {
  return prisma.role.findMany({
    orderBy: { created_at: 'asc' },
    include: { permissions: { include: { permission: true } } },
  });
}

export async function createRole(name: string, description?: string): Promise<Role> {
  return prisma.role.create({
    data: { id: uuidv4(), name, description: description ?? '' },
  });
}

export async function updateRole(roleId: string, name: string, description?: string): Promise<Role> {
  return prisma.role.update({
    where: { id: roleId },
    data: { name, description: description ?? '' },
  });
}

export async function deleteRole(roleId: string): Promise<void> {
  await prisma.rolePermission.deleteMany({ where: { role_id: roleId } });
  await prisma.userRole.deleteMany({ where: { role_id: roleId } });
  await prisma.role.delete({ where: { id: roleId } });
}

// ─── Permissions (per binding) ─────────────────────────────────────────────

export async function listBindingPermissions(bindingId: string): Promise<BindingPermission[]> {
  await requireBinding(bindingId);
  return prisma.bindingPermission.findMany({
    where: { binding_id: bindingId },
    orderBy: { resource: 'asc' },
  });
}

export async function createBindingPermission(
  bindingId: string,
  name: string,
  resource: string,
  action: string
): Promise<BindingPermission> {
  await requireBinding(bindingId);
  return prisma.bindingPermission.upsert({
    where: { binding_id_name: { binding_id: bindingId, name } },
    create: { id: uuidv4(), binding_id: bindingId, name, resource, action },
    update: { resource, action },
  });
}

export async function deleteBindingPermission(bindingId: string, permissionId: string): Promise<void> {
  await requireBinding(bindingId);
  await prisma.rolePermission.deleteMany({ where: { permission_id: permissionId } });
  await prisma.bindingPermission.delete({ where: { id: permissionId, binding_id: bindingId } });
}

// ─── Role ↔ Permission (per binding) ───────────────────────────────────────

export async function assignPermissionToRole(
  roleId: string,
  permissionId: string,
  bindingId: string
): Promise<void> {
  await requireBinding(bindingId);
  await prisma.rolePermission.upsert({
    where: { role_id_permission_id_binding_id: { role_id: roleId, permission_id: permissionId, binding_id: bindingId } },
    create: { id: uuidv4(), role_id: roleId, permission_id: permissionId, binding_id: bindingId },
    update: {},
  });
}

export async function removePermissionFromRole(
  roleId: string,
  permissionId: string,
  bindingId: string
): Promise<void> {
  await prisma.rolePermission.deleteMany({
    where: { role_id: roleId, permission_id: permissionId, binding_id: bindingId },
  });
}

export async function getRolePermissionsForBinding(roleId: string, bindingId: string) {
  await requireBinding(bindingId);
  const rolePerms = await prisma.rolePermission.findMany({
    where: { role_id: roleId, binding_id: bindingId },
    include: { permission: true },
  });
  return rolePerms.map((rp) => rp.permission);
}

// ─── User ↔ Role (per binding) ─────────────────────────────────────────────

export async function assignUserRole(
  userId: string,
  roleId: string,
  bindingId: string
): Promise<void> {
  await requireBinding(bindingId);
  await prisma.userRole.upsert({
    where: { user_id_role_id_binding_id: { user_id: userId, role_id: roleId, binding_id: bindingId } },
    create: { id: uuidv4(), user_id: userId, role_id: roleId, binding_id: bindingId },
    update: {},
  });
}

export async function removeUserRole(userId: string, roleId: string, bindingId: string): Promise<void> {
  await prisma.userRole.deleteMany({
    where: { user_id: userId, role_id: roleId, binding_id: bindingId },
  });
}

export async function getUserRolesForBinding(userId: string, bindingId: string): Promise<Role[]> {
  await requireBinding(bindingId);
  const userRoles = await prisma.userRole.findMany({
    where: { user_id: userId, binding_id: bindingId },
  });
  if (userRoles.length === 0) return [];
  const roleIds = userRoles.map((ur) => ur.role_id);
  return prisma.role.findMany({ where: { id: { in: roleIds } } });
}

export async function getUserPermissionsForBinding(
  userId: string,
  bindingId: string
): Promise<string[]> {
  await requireBinding(bindingId);
  const roles = await getUserRolesForBinding(userId, bindingId);
  if (roles.length === 0) return [];
  const roleIds = roles.map((r) => r.id);
  const rolePerms = await prisma.rolePermission.findMany({
    where: { role_id: { in: roleIds }, binding_id: bindingId },
  });
  if (rolePerms.length === 0) return [];
  const permIds = rolePerms.map((rp) => rp.permission_id);
  const perms = await prisma.bindingPermission.findMany({ where: { id: { in: permIds } } });
  return perms.map((p) => p.name);
}

// ─── Check permission (for app runtime) ────────────────────────────────────

export async function checkUserPermissionForBinding(
  userId: string,
  bindingId: string,
  permission: string
): Promise<boolean> {
  const perms = await getUserPermissionsForBinding(userId, bindingId);
  return perms.includes(permission) || perms.includes('*');
}

// ─── User roles + permissions for a specific binding ──────────────────────

export async function getUserBindingRolesWithPerms(userId: string, bindingId: string) {
  await requireBinding(bindingId);
  const userRoles = await prisma.userRole.findMany({
    where: { user_id: userId, binding_id: bindingId },
    include: { role: { include: { permissions: { where: { binding_id: bindingId }, include: { permission: true } } } } },
  });
  return userRoles.map((ur) => ({
    role: { id: ur.role.id, name: ur.role.name, description: ur.role.description },
    permissions: ur.role.permissions.map((rp) => rp.permission.name),
  }));
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function requireBinding(bindingId: string) {
  const binding = await getBinding(bindingId);
  if (!binding) throw new Error('Binding not found');
  if (!binding.enable_rbac) throw new Error('RBAC is not enabled for this binding (403)');
}
