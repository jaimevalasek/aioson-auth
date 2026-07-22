// Compatibility facade for the retired federation database-client API.
// Auth now has one operational provider per process. These aliases preserve
// old imports without creating a second Prisma client or divergent fallback.
import { prisma } from './prisma.js';

export const localPrisma = prisma;
export let mainPrisma = prisma;

export async function reloadMainPrismaFromConfig(connectionString?: string | null): Promise<void> {
  const activeUrl = process.env['AUTH_DATABASE_URL'] ?? process.env['DATABASE_URL'];
  if (connectionString && connectionString !== activeUrl) {
    throw new Error('runtime_database_provider_switch_requires_restart');
  }
  mainPrisma = prisma;
}

export function getMainPrismaTargetUrl(): string {
  return process.env['AUTH_DATABASE_URL'] ?? process.env['DATABASE_URL'] ?? 'file:./dev.db';
}
