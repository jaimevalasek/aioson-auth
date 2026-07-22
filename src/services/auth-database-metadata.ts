import type { DatabaseClient } from './database-provider-registry.js';
import type { DbProvider } from './multi_provider_client.js';
import type { PrismaClient } from '@prisma/client';

export const AUTH_DATABASE_SCHEMA_VERSION = 1;

export async function ensureAuthDatabaseMetadata(
  client: DatabaseClient,
  provider: DbProvider,
  identity: { installationId?: string; ownerId?: string } = {},
): Promise<void> {
  await client.authDatabaseMetadata.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton', provider, schema_version: AUTH_DATABASE_SCHEMA_VERSION,
      installation_id: identity.installationId, owner_id: identity.ownerId,
    },
    update: {
      provider, schema_version: AUTH_DATABASE_SCHEMA_VERSION,
      installation_id: identity.installationId, owner_id: identity.ownerId,
    },
  });
}

export async function incrementAuthDatabaseRevision(client: DatabaseClient): Promise<void> {
  await client.authDatabaseMetadata.update({
    where: { id: 'singleton' },
    data: { data_revision: { increment: 1 } },
  });
}

const MUTATION_ACTIONS = new Set([
  'create', 'createMany', 'update', 'updateMany', 'upsert', 'delete', 'deleteMany',
]);

export function installAuthDatabaseRevisionTracking(client: PrismaClient): void {
  client.$use(async (params, next) => {
    const result = await next(params);
    if (params.model !== 'AuthDatabaseMetadata' && MUTATION_ACTIONS.has(params.action)) {
      await incrementAuthDatabaseRevision(client);
    }
    return result;
  });
}
