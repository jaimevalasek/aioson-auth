import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { prisma, authDatabaseProvider } from './prisma.js';

export async function ensureAuthDatabaseMetadataSchema(): Promise<void> {
  if (await hasMetadataTable()) return;
  const directory = authDatabaseProvider === 'postgresql' ? 'postgres' : authDatabaseProvider;
  const migration = await readFile(path.resolve(
    process.cwd(), 'prisma', 'migrations', directory,
    '20260711180000_add_auth_database_metadata', 'migration.sql',
  ), 'utf8');
  for (const statement of splitStatements(migration)) {
    try {
      await prisma.$executeRawUnsafe(statement);
    } catch (error) {
      if (!String(error).toLowerCase().includes('already exists')) throw error;
    }
  }
}

async function hasMetadataTable(): Promise<boolean> {
  if (authDatabaseProvider === 'sqlite') {
    const rows = await prisma.$queryRawUnsafe<Array<{ name?: string }>>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='AuthDatabaseMetadata'",
    );
    return rows.length > 0;
  }
  if (authDatabaseProvider === 'postgresql') {
    const rows = await prisma.$queryRawUnsafe<Array<{ count: bigint | number }>>(
      `SELECT COUNT(*)::bigint AS count FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = 'AuthDatabaseMetadata'`,
    );
    return Number(rows[0]?.count ?? 0) > 0;
  }
  return (await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>("SHOW TABLES LIKE 'AuthDatabaseMetadata'")).length > 0;
}

function splitStatements(sql: string): string[] {
  return sql.split('\n').filter((line) => !line.trimStart().startsWith('--')).join('\n')
    .split(';').map((statement) => statement.trim()).filter(Boolean);
}
