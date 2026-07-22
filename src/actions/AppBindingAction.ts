import { prisma } from '../lib/prisma.js';
import { runConsumerMigrations, parsePermission, type SystemPermission } from '../lib/migration-engine.js';

export interface AppBindingInput {
  app_name: string;
  app_slug?: string;
  connection_name: string;
  enable_2fa: boolean;
  enable_rbac: boolean;
}

export interface AppBindingOutput {
  id: string;
  app_name: string;
  app_slug: string;
  connection_name: string;
  system_permissions: string;
  enable_2fa: boolean;
  enable_rbac: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BindingPermissionRegistrationInput {
  name: string;
  resource?: string | null;
  action?: string | null;
  label?: string | null;
  description?: string | null;
  source?: 'runtime' | 'auth_manifest';
}

export interface BindingAuthManifestInput {
  version: number;
  permissions: BindingPermissionRegistrationInput[];
  policies?: unknown[];
}

export interface BindingManifestSyncOptions {
  fingerprint?: string | null;
}

type StoredSystemPermission = SystemPermission & {
  label?: string;
  description?: string;
  source?: 'runtime' | 'auth_manifest';
};

export async function listAppBindings(): Promise<AppBindingOutput[]> {
  const bindings = await prisma.appBinding.findMany({
    orderBy: { created_at: 'desc' },
    include: { permissions: true },
  });
  return bindings;
}

export async function getBinding(id: string): Promise<AppBindingOutput | null> {
  return prisma.appBinding.findUnique({ where: { id } });
}

export async function createAppBinding(
  input: AppBindingInput,
  dbUrl: string
): Promise<AppBindingOutput> {
  // Cria tabela de sessões no consumer DB (mínimo necessário)
  await runConsumerMigrations(dbUrl);

  return prisma.appBinding.create({
    data: {
      app_name: input.app_name,
      app_slug: input.app_slug ?? '',
      connection_name: input.connection_name,
      system_permissions: '[]',
      enable_2fa: input.enable_2fa,
      enable_rbac: input.enable_rbac,
    },
  });
}

export async function deleteAppBinding(id: string): Promise<void> {
  // Cascade delete remove permissions automaticamente
  await prisma.appBinding.delete({ where: { id } });
}

export async function updateAppBinding(
  id: string,
  input: Partial<AppBindingInput>,
  dbUrl?: string
): Promise<AppBindingOutput> {
  if (dbUrl) {
    await runConsumerMigrations(dbUrl);
  }

  return prisma.appBinding.update({
    where: { id },
    data: {
      ...(input.app_name !== undefined ? { app_name: input.app_name } : {}),
      ...(input.app_slug !== undefined ? { app_slug: input.app_slug } : {}),
      ...(input.connection_name !== undefined ? { connection_name: input.connection_name } : {}),
      ...(input.enable_2fa !== undefined ? { enable_2fa: input.enable_2fa } : {}),
      ...(input.enable_rbac !== undefined ? { enable_rbac: input.enable_rbac } : {}),
    },
  });
}

// ─── Permission registration & merge ────────────────────────────────────────

function parseStoredSystemPermissions(raw: string): { entries: unknown[]; names: Set<string> } {
  let entries: unknown[] = [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    entries = Array.isArray(parsed) ? parsed : [];
  } catch {
    entries = [];
  }

  const names = new Set<string>();
  for (const entry of entries) {
    if (typeof entry === 'string' && entry.trim()) {
      names.add(entry.trim());
      continue;
    }

    if (
      entry &&
      typeof entry === 'object' &&
      'name' in entry &&
      typeof (entry as { name?: unknown }).name === 'string' &&
      (entry as { name: string }).name.trim()
    ) {
      names.add((entry as { name: string }).name.trim());
    }
  }

  return { entries, names };
}

function getStoredPermissionName(entry: unknown): string | null {
  if (typeof entry === 'string') return entry.trim() || null;
  if (
    entry &&
    typeof entry === 'object' &&
    'name' in entry &&
    typeof (entry as { name?: unknown }).name === 'string'
  ) {
    return (entry as { name: string }).name.trim() || null;
  }
  return null;
}

function normalizePermissionRegistrations(
  permissions: BindingPermissionRegistrationInput[],
): StoredSystemPermission[] {
  const byName = new Map<string, StoredSystemPermission>();

  for (const input of permissions) {
    const name = input.name.trim();
    if (!name) continue;
    const parsed = parsePermission(name);
    const resource = input.resource?.trim() || parsed.resource;
    const action = input.action?.trim() || parsed.action;
    const normalized: StoredSystemPermission = {
      name,
      resource,
      action,
      ...(input.label?.trim() ? { label: input.label.trim() } : {}),
      ...(input.description?.trim() ? { description: input.description.trim() } : {}),
      ...(input.source ? { source: input.source } : {}),
    };
    byName.set(name, normalized);
  }

  return Array.from(byName.values());
}

function mergeStoredPermissionEntries(
  entries: unknown[],
  permissions: StoredSystemPermission[],
): { entries: unknown[]; added: number } {
  const nextEntries = [...entries];
  let added = 0;

  for (const permission of permissions) {
    const existingIndex = nextEntries.findIndex((entry) => getStoredPermissionName(entry) === permission.name);
    if (existingIndex >= 0) {
      nextEntries[existingIndex] = {
        ...(typeof nextEntries[existingIndex] === 'object' && nextEntries[existingIndex] !== null
          ? nextEntries[existingIndex] as Record<string, unknown>
          : {}),
        ...permission,
      };
      continue;
    }

    nextEntries.push(permission);
    added++;
  }

  return { entries: nextEntries, added };
}

async function registerBindingPermissionEntries(
  bindingId: string,
  permissions: BindingPermissionRegistrationInput[],
): Promise<{ added: number; merged: boolean }> {
  const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
  if (!binding) throw new Error('Binding not found');

  const normalized = normalizePermissionRegistrations(permissions);
  const { entries } = parseStoredSystemPermissions(binding.system_permissions);
  const mergedEntries = mergeStoredPermissionEntries(entries, normalized);

  await prisma.$transaction(async (tx) => {
    await tx.appBinding.update({
      where: { id: bindingId },
      data: { system_permissions: JSON.stringify(mergedEntries.entries) },
    });

    // Catálogo canônico usado pela UI de Permissões/Perfis e pelo JWT.
    for (const permission of normalized) {
      await tx.bindingPermission.upsert({
        where: { binding_id_name: { binding_id: bindingId, name: permission.name } },
        create: {
          binding_id: bindingId,
          name: permission.name,
          resource: permission.resource,
          action: permission.action,
        },
        update: {
          resource: permission.resource,
          action: permission.action,
        },
      });
    }
  });

  return { added: mergedEntries.added, merged: mergedEntries.added > 0 };
}

export async function registerBindingPermissions(
  bindingId: string,
  newPermissions: string[]
): Promise<{ added: number; merged: boolean }> {
  return registerBindingPermissionEntries(
    bindingId,
    newPermissions.map((name) => ({ name, source: 'runtime' })),
  );
}

export async function registerBindingAuthManifest(
  bindingId: string,
  manifest: BindingAuthManifestInput,
  options: BindingManifestSyncOptions = {},
): Promise<{ added: number; merged: boolean }> {
  const normalized = normalizePermissionRegistrations(
    manifest.permissions.map((permission) => ({ ...permission, source: 'auth_manifest' })),
  );
  const names = normalized.map((permission) => permission.name);
  const now = new Date();

  try {
    return await prisma.$transaction(async (tx) => {
      const binding = await tx.appBinding.findUnique({ where: { id: bindingId } });
      if (!binding) throw new Error('Binding not found');

      const existing = await tx.bindingPermission.findMany({
        where: { binding_id: bindingId, retired_at: null },
        select: { name: true },
      });
      let added = 0;
      for (const permission of normalized) {
        if (!existing.some((entry) => entry.name === permission.name)) added++;
        await tx.bindingPermission.upsert({
          where: { binding_id_name: { binding_id: bindingId, name: permission.name } },
          create: {
            binding_id: bindingId,
            name: permission.name,
            resource: permission.resource,
            action: permission.action,
          },
          update: {
            resource: permission.resource,
            action: permission.action,
            retired_at: null,
          },
        });
      }

      await tx.bindingPermission.updateMany({
        where: {
          binding_id: bindingId,
          retired_at: null,
          ...(names.length > 0 ? { name: { notIn: names } } : {}),
        },
        data: { retired_at: now },
      });
      await tx.appProfile.upsert({
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
      await tx.appBinding.update({
        where: { id: bindingId },
        data: {
          system_permissions: JSON.stringify(normalized),
          enable_rbac: normalized.length > 0,
          auth_mode: normalized.length > 0 ? 'profiles_permissions' : 'authentication_only',
          manifest_fingerprint: options.fingerprint ?? null,
          manifest_sync_status: 'synced',
          manifest_sync_error: null,
          manifest_synced_at: now,
        },
      });
      return { added, merged: added > 0 };
    });
  } catch (error) {
    await prisma.appBinding.updateMany({
      where: { id: bindingId },
      data: {
        manifest_sync_status: 'failed',
        manifest_sync_error: error instanceof Error ? error.message.slice(0, 191) : 'manifest_sync_failed',
      },
    });
    throw error;
  }
}

export async function getBindingPermissions(bindingId: string): Promise<SystemPermission[]> {
  const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
  if (!binding) return [];
  try {
    return JSON.parse(binding.system_permissions) as SystemPermission[];
  } catch {
    return [];
  }
}
