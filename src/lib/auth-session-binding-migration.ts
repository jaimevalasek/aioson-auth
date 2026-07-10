import { prisma } from './prisma.js';

type DatabaseProvider = 'sqlite' | 'postgresql' | 'mysql';

export async function ensureAuthSessionBindingSchema(): Promise<void> {
  const provider = resolveProvider();
  if (await hasBindingColumn(provider)) return;

  for (const statement of migrationStatements(provider)) {
    try {
      await prisma.$executeRawUnsafe(statement);
    } catch (error) {
      if (!isAlreadyApplied(error)) throw error;
    }
  }
  console.info(JSON.stringify({
    timestamp: new Date().toISOString(),
    component: 'aioson-auth',
    operation: 'auth_session_binding_migration',
    status: 200,
  }));
}

function resolveProvider(): DatabaseProvider {
  const provider = (process.env['DATABASE_PROVIDER'] ?? 'sqlite').toLowerCase();
  if (provider === 'postgres' || provider === 'postgresql') return 'postgresql';
  if (provider === 'mysql') return 'mysql';
  return 'sqlite';
}

async function hasBindingColumn(provider: DatabaseProvider): Promise<boolean> {
  if (provider === 'sqlite') {
    const columns = await prisma.$queryRawUnsafe<Array<{ name?: string }>>('PRAGMA table_info("AuthSession")');
    return columns.some((column) => column.name === 'binding_id');
  }
  if (provider === 'postgresql') {
    const columns = await prisma.$queryRawUnsafe<Array<{ count: bigint | number }>>(
      "SELECT COUNT(*)::bigint AS count FROM information_schema.columns WHERE table_name = 'AuthSession' AND column_name = 'binding_id'",
    );
    return Number(columns[0]?.count ?? 0) > 0;
  }
  const columns = await prisma.$queryRawUnsafe<Array<{ Field?: string }>>(
    "SHOW COLUMNS FROM `AuthSession` LIKE 'binding_id'",
  );
  return columns.length > 0;
}

function migrationStatements(provider: DatabaseProvider): string[] {
  if (provider === 'postgresql') {
    return [
      'ALTER TABLE "AuthSession" ADD COLUMN "binding_id" TEXT',
      'CREATE INDEX "AuthSession_binding_id_idx" ON "AuthSession"("binding_id")',
      'CREATE INDEX "AuthSession_token_binding_id_idx" ON "AuthSession"("token", "binding_id")',
    ];
  }
  if (provider === 'mysql') {
    return [
      'ALTER TABLE `AuthSession` ADD COLUMN `binding_id` VARCHAR(191) NULL',
      'CREATE INDEX `AuthSession_binding_id_idx` ON `AuthSession`(`binding_id`)',
      'CREATE INDEX `AuthSession_token_binding_id_idx` ON `AuthSession`(`token`, `binding_id`)',
    ];
  }
  return [
    'ALTER TABLE "AuthSession" ADD COLUMN "binding_id" TEXT',
    'CREATE INDEX "AuthSession_binding_id_idx" ON "AuthSession"("binding_id")',
    'CREATE INDEX "AuthSession_token_binding_id_idx" ON "AuthSession"("token", "binding_id")',
  ];
}

function isAlreadyApplied(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : '';
  return message.includes('duplicate column')
    || message.includes('already exists')
    || message.includes('duplicate key name');
}
