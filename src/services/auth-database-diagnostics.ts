import net from 'node:net';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { lookup } from 'node:dns/promises';
import { assertTlsForRemote, detectProvider, type DbProvider } from './multi_provider_client.js';

export type DestinationClassification = 'empty' | 'compatible' | 'incompatible';
export type DiagnosisResult = {
  provider: Exclude<DbProvider, 'sqlite'>;
  host: string;
  classification: DestinationClassification;
  schemaVersion: number | null;
};

type ReadOnlyProbe = (provider: Exclude<DbProvider, 'sqlite'>, connectionString: string, signal?: AbortSignal) => Promise<{
  tables: string[];
  schemaVersion?: number | null;
  installationId?: string | null;
  ownerId?: string | null;
}>;

export function validateRemoteDestination(connectionString: string): { provider: 'postgresql' | 'mysql'; host: string } {
  assertTlsForRemote(connectionString);
  const provider = detectProvider(connectionString);
  if (provider === 'sqlite') throw new Error('remote_destination_required');
  const url = new URL(connectionString.replace(/^postgres:\/\//, 'postgresql://'));
  if (!url.hostname || isPrivateHost(url.hostname)) throw new Error('private_or_invalid_destination_host');
  return { provider, host: url.hostname };
}

export async function diagnoseAuthDatabase(
  connectionString: string,
  probe: ReadOnlyProbe = defaultReadOnlyProbe,
  expectedIdentity?: { installationId: string; ownerId: string },
  resolveHost: (host: string, signal?: AbortSignal) => Promise<string[]> = resolveHostAddresses,
  timeoutMs = 5_000,
): Promise<DiagnosisResult> {
  return withTimeout(async (signal) => {
    const { provider, host } = validateRemoteDestination(connectionString);
    await assertPublicResolvedHost(host, resolveHost, signal);
    const result = await probe(provider, connectionString, signal);
    const tables = new Set(result.tables.map((table) => table.toLowerCase()));
    const hasMetadata = tables.has('authdatabasemetadata');
    const hasAuthTables = tables.has('globaluser') || tables.has('appbinding');
    const identityMatches = !expectedIdentity || (
      result.installationId === expectedIdentity.installationId && result.ownerId === expectedIdentity.ownerId
    );
    const classification: DestinationClassification = tables.size === 0
      ? 'empty'
      : hasMetadata && hasAuthTables && result.schemaVersion === 1 && identityMatches
        ? 'compatible'
        : 'incompatible';
    return { provider, host, classification, schemaVersion: result.schemaVersion ?? null };
  }, timeoutMs);
}

async function resolveHostAddresses(host: string, signal?: AbortSignal): Promise<string[]> {
  signal?.throwIfAborted();
  return (await lookup(host, { all: true, verbatim: true })).map(({ address }) => address);
}

async function assertPublicResolvedHost(host: string, resolver: (host: string, signal?: AbortSignal) => Promise<string[]>, signal?: AbortSignal): Promise<void> {
  signal?.throwIfAborted();
  const addresses = await resolver(host, signal);
  signal?.throwIfAborted();
  if (!addresses.length || addresses.some((address) => isPrivateHost(address.replace(/^::ffff:/, '')))) {
    throw new Error('private_or_invalid_destination_host');
  }
}

async function withTimeout<T>(operation: (signal: AbortSignal) => Promise<T>, timeoutMs: number): Promise<T> {
  const controller = new AbortController();
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort(new Error('diagnosis_timeout'));
      reject(new Error('diagnosis_timeout'));
    }, timeoutMs);
  });
  const task = operation(controller.signal);
  try { return await Promise.race([task, timeout]); }
  finally {
    if (timer) clearTimeout(timer);
    if (!controller.signal.aborted) controller.abort();
    // Observe a late probe rejection after the timeout so it cannot become an
    // unhandled rejection while the caller has already received a bounded error.
    void task.catch(() => undefined);
  }
}

function isPrivateHost(host: string): boolean {
  const normalized = host.toLowerCase();
  if (normalized === 'localhost' || normalized.endsWith('.localhost') || normalized === '::1') return true;
  const family = net.isIP(normalized);
  if (!family) return false;
  if (family === 4) {
    const [a, b] = normalized.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  return normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80:');
}

async function defaultReadOnlyProbe(provider: 'postgresql' | 'mysql', connectionString: string, signal?: AbortSignal) {
  const entry = pathToFileURL(resolve(process.cwd(), 'src', 'generated', 'prisma', provider, 'index.js')).href;
  const { PrismaClient } = await import(entry) as { PrismaClient: new (options: { datasourceUrl: string }) => {
    $connect(): Promise<void>; $disconnect(): Promise<void>; $queryRawUnsafe<T>(query: string): Promise<T>;
  }};
  const client = new PrismaClient({ datasourceUrl: connectionString });
  const abortDisconnect = () => { void client.$disconnect().catch(() => undefined); };
  signal?.addEventListener('abort', abortDisconnect, { once: true });
  try {
    signal?.throwIfAborted();
    await client.$connect();
    signal?.throwIfAborted();
    const rows = provider === 'postgresql'
      ? await client.$queryRawUnsafe<Array<{ table_name: string }>>(`SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema()`)
      : await client.$queryRawUnsafe<Array<{ TABLE_NAME: string }>>(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = DATABASE()`);
    const tables = rows.map((row) => 'table_name' in row ? row.table_name : row.TABLE_NAME);
    signal?.throwIfAborted();
    let schemaVersion: number | null = null;
    let installationId: string | null = null;
    let ownerId: string | null = null;
    if (tables.some((table) => table.toLowerCase() === 'authdatabasemetadata')) {
      const metadata = await client.$queryRawUnsafe<Array<{ schema_version: number; installation_id: string | null; owner_id: string | null }>>(`SELECT schema_version, installation_id, owner_id FROM AuthDatabaseMetadata WHERE id = 'singleton'`);
      schemaVersion = Number(metadata[0]?.schema_version ?? 0);
      installationId = metadata[0]?.installation_id ?? null;
      ownerId = metadata[0]?.owner_id ?? null;
    }
    return { tables, schemaVersion, installationId, ownerId };
  } finally {
    signal?.removeEventListener('abort', abortDisconnect);
    await client.$disconnect();
  }
}
