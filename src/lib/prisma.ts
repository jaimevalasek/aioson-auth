import type { PrismaClient } from '@prisma/client';
import {
  databaseProviderRegistry,
  resolveActiveDatabaseProvider,
} from '../services/database-provider-registry.js';

const activeProvider = resolveActiveDatabaseProvider();
const datasourceUrl = process.env['AUTH_DATABASE_URL'] ?? process.env['DATABASE_URL'];

// One provider is loaded for the process. Provider switches happen only through
// an explicit service restart after the Play coordinator changes the pointer.
export const prisma = await databaseProviderRegistry.activate(
  activeProvider,
  datasourceUrl,
) as unknown as PrismaClient;

export { activeProvider as authDatabaseProvider };
