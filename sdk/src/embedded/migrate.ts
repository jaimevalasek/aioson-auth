import { AIOSON_AUTH_TABLES, CONFLICT_TABLE_NAMES, getMigrationStatements } from './schema.js';
import type { DbProvider, MigrateOptions, MigrateResult, PrismaClientLike } from './types.js';

export async function detectProvider(prisma: PrismaClientLike): Promise<DbProvider> {
  try {
    await prisma.$queryRawUnsafe<unknown[]>('SELECT sqlite_version()');
    return 'sqlite';
  } catch { /* not sqlite */ }

  try {
    const rows = await prisma.$queryRawUnsafe<Array<{ v: string }>>(
      'SELECT version() AS v'
    );
    const version = String(rows[0]?.v ?? '').toLowerCase();
    if (version.includes('postgres')) return 'postgresql';
    return 'mysql';
  } catch { /* fallback */ }

  return 'sqlite';
}

async function listExistingTables(
  prisma: PrismaClientLike,
  provider: DbProvider,
  names: readonly string[],
): Promise<string[]> {
  if (names.length === 0) return [];

  const placeholders = names.map((_, i) => `$${i + 1}`).join(', ');
  let rows: Array<{ name: string }>;

  switch (provider) {
    case 'sqlite': {
      const inClause = names.map(n => `'${n}'`).join(', ');
      rows = await prisma.$queryRawUnsafe<Array<{ name: string }>>(
        `SELECT name FROM sqlite_master WHERE type='table' AND name IN (${inClause})`
      );
      break;
    }
    case 'postgresql': {
      const inClause = names.map(n => `'${n}'`).join(', ');
      rows = await prisma.$queryRawUnsafe<Array<{ name: string }>>(
        `SELECT tablename AS name FROM pg_tables WHERE schemaname = 'public' AND tablename IN (${inClause})`
      );
      break;
    }
    case 'mysql': {
      const inClause = names.map(n => `'${n}'`).join(', ');
      rows = await prisma.$queryRawUnsafe<Array<{ name: string }>>(
        `SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (${inClause})`
      );
      break;
    }
  }

  return rows.map(r => r.name);
}

export async function runEmbeddedMigrations(opts: MigrateOptions): Promise<MigrateResult> {
  const { prisma } = opts;
  const provider = opts.provider ?? await detectProvider(prisma);
  const statements = getMigrationStatements(provider);

  const conflicts = await listExistingTables(prisma, provider, CONFLICT_TABLE_NAMES);
  if (conflicts.length > 0) {
    console.warn(
      `[aioson-auth/embedded] Warning: tables without aioson_auth_ prefix found: ${conflicts.join(', ')}. ` +
      'These will NOT be overwritten. The SDK uses prefixed tables to avoid collisions.'
    );
  }

  const existingBefore = await listExistingTables(
    prisma,
    provider,
    AIOSON_AUTH_TABLES,
  );

  for (const stmt of statements) {
    await prisma.$executeRawUnsafe(stmt);
  }

  const existingAfter = await listExistingTables(
    prisma,
    provider,
    AIOSON_AUTH_TABLES,
  );

  const tablesCreated = existingAfter.filter(t => !existingBefore.includes(t));
  const alreadyExisted = existingBefore.filter(t => existingAfter.includes(t));

  if (tablesCreated.length > 0) {
    console.log(`[aioson-auth/embedded] Created ${tablesCreated.length} table(s): ${tablesCreated.join(', ')}`);
  } else {
    console.log('[aioson-auth/embedded] All tables already exist — migration is a no-op.');
  }

  return { provider, tablesCreated, conflicts, alreadyExisted };
}
