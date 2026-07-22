import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { prisma } from './prisma.js';

type DatabaseProvider = 'sqlite' | 'postgresql' | 'mysql';

export async function ensureAppScopedAccessSchema(): Promise<void> {
  const provider = resolveProvider();
  if (await hasAppAccessTable(provider)) return;

  const directory = provider === 'postgresql' ? 'postgres' : provider;
  const migrationPath = path.resolve(
    process.cwd(), 'prisma', 'migrations', directory,
    '20260711070000_add_app_scoped_access', 'migration.sql',
  );
  const migration = await readFile(migrationPath, 'utf8');
  for (const statement of splitStatements(migration)) {
    try {
      await prisma.$executeRawUnsafe(statement);
    } catch (error) {
      if (!isAlreadyApplied(error)) throw error;
    }
  }
  console.info(JSON.stringify({
    timestamp: new Date().toISOString(),
    component: 'aioson-auth',
    operation: 'app_scoped_access_migration',
    provider,
    status: 200,
  }));
}

function resolveProvider(): DatabaseProvider {
  const provider = (process.env['DATABASE_PROVIDER'] ?? 'sqlite').toLowerCase();
  if (provider === 'postgres' || provider === 'postgresql') return 'postgresql';
  if (provider === 'mysql') return 'mysql';
  return 'sqlite';
}

async function hasAppAccessTable(provider: DatabaseProvider): Promise<boolean> {
  if (provider === 'sqlite') {
    const rows = await prisma.$queryRawUnsafe<Array<{ name?: string }>>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='AppAccess'",
    );
    return rows.length > 0;
  }
  if (provider === 'postgresql') {
    const rows = await prisma.$queryRawUnsafe<Array<{ count: bigint | number }>>(
      `SELECT COUNT(*)::bigint AS count FROM information_schema.tables
       WHERE table_schema = current_schema() AND table_name = 'AppAccess'`,
    );
    return Number(rows[0]?.count ?? 0) > 0;
  }
  const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
    "SHOW TABLES LIKE 'AppAccess'",
  );
  return rows.length > 0;
}

function splitStatements(sql: string): string[] {
  return sql
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('--'))
    .join('\n')
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function isAlreadyApplied(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : '';
  return message.includes('duplicate column')
    || message.includes('already exists')
    || message.includes('duplicate key name');
}
