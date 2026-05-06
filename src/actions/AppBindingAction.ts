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

export async function registerBindingPermissions(
  bindingId: string,
  newPermissions: string[]
): Promise<{ added: number; merged: boolean }> {
  const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
  if (!binding) throw new Error('Binding not found');

  // Parse existing
  let existing: SystemPermission[] = [];
  try {
    existing = JSON.parse(binding.system_permissions) as SystemPermission[];
  } catch {
    existing = [];
  }

  const existingNames = new Set(existing.map((p) => p.name));

  // Merge: adiciona só as novas
  let added = 0;
  for (const name of newPermissions) {
    if (!existingNames.has(name)) {
      existing.push(parsePermission(name));
      added++;
    }
  }

  await prisma.appBinding.update({
    where: { id: bindingId },
    data: { system_permissions: JSON.stringify(existing) },
  });

  return { added, merged: added > 0 };
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
