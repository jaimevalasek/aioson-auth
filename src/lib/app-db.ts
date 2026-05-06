import { PrismaClient } from '@prisma/client';

interface AppDbClient {
  prisma: PrismaClient;
  expiresAt: number;
}

const AIOSON_PLAY_HOST = process.env['AIOSON_PLAY_HOST'] || 'http://localhost:1420';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

const clientCache = new Map<string, AppDbClient>();

async function getConnectionDbUrl(connectionName: string): Promise<string | null> {
  const res = await fetch(
    `${AIOSON_PLAY_HOST}/internal/connections/${encodeURIComponent(connectionName)}`
  );
  if (!res.ok) return null;
  const conn = await res.json() as { prismaUrl?: string; filePath?: string; driver?: string };
  if (conn.prismaUrl) return conn.prismaUrl;
  if (conn.driver === 'sqlite' && conn.filePath) return `file:${conn.filePath}`;
  return null;
}

export async function getAppPrisma(connectionName: string): Promise<PrismaClient | null> {
  const cached = clientCache.get(connectionName);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.prisma;
  }

  const dbUrl = await getConnectionDbUrl(connectionName);
  if (!dbUrl) return null;

  const prisma = new PrismaClient({
    datasources: { db: { url: dbUrl } },
    log: [],
  });

  try {
    await prisma.$executeRawUnsafe('SELECT 1');
  } catch {
    return null;
  }

  clientCache.set(connectionName, { prisma, expiresAt: Date.now() + CACHE_TTL_MS });
  return prisma;
}

export async function getBindingDbUrl(bindingId: string): Promise<{ connectionName: string; dbUrl: string } | null> {
  const { prisma } = await import('../lib/prisma.js');
  const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
  if (!binding) return null;

  const dbUrl = await getConnectionDbUrl(binding.connection_name);
  if (!dbUrl) return null;

  return { connectionName: binding.connection_name, dbUrl };
}
