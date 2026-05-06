import { Prisma } from '@prisma/client';

// ─── Schema for consumer app DB ─────────────────────────────────────────────
// O consumer app só recebe uma tabela de sessões para validação local.
// Users, roles, permissions ficam no DB interno do aioson-auth.

const CONSUMER_SCHEMA = `
model auth_sessions {
  id           String   @id @default(cuid())
  user_id      String
  binding_id   String
  token        String   @unique
  expires_at   DateTime
  created_at   DateTime @default(now())
}
`;

// ─── Full schema builders ──────────────────────────────────────────────────

export function buildPrismaSchema(dbUrl: string): string {
  return `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "${dbUrl}"
}

${CONSUMER_SCHEMA}
`.trim();
}

// ─── Run migrations on consumer app DB ─────────────────────────────────────

export async function runConsumerMigrations(dbUrl: string): Promise<void> {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });

  try {
    await prisma.$executeRawUnsafe(`SELECT 1`);
  } catch {
    throw new Error(`Failed to connect to consumer database: ${dbUrl}`);
  }

  // Cria auth_sessions se não existir
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS auth_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        binding_id TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
  } catch {
    // table may already exist
  }

  await prisma.$disconnect();
}

// ─── Register permissions from system manifest ────────────────────────────────

export interface SystemPermission {
  name: string;    // "orders:create"
  resource: string; // "orders"
  action: string;   // "create"
}

export function parsePermission(name: string): SystemPermission {
  const [resource, action] = name.split(':');
  return { name, resource: resource ?? name, action: action ?? '*' };
}
