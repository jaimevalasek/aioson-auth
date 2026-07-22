import type { DbProvider } from './multi_provider_client.js';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export type DatabaseClient = {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  $queryRawUnsafe<T = unknown>(query: string): Promise<T>;
  $executeRawUnsafe(query: string): Promise<number>;
  authDatabaseMetadata: {
    upsert(args: unknown): Promise<unknown>;
    findUnique(args: unknown): Promise<unknown>;
    update(args: unknown): Promise<unknown>;
  };
};

type ClientConstructor = new (options?: { datasourceUrl?: string }) => DatabaseClient;
type ClientLoader = () => Promise<{ PrismaClient: ClientConstructor }>;

function loadGeneratedClient(provider: DbProvider): Promise<{ PrismaClient: ClientConstructor }> {
  const entry = pathToFileURL(resolve(process.cwd(), 'src', 'generated', 'prisma', provider, 'index.js')).href;
  return import(entry) as Promise<{ PrismaClient: ClientConstructor }>;
}

const defaultLoaders: Record<DbProvider, ClientLoader> = {
  sqlite: () => loadGeneratedClient('sqlite'),
  postgresql: () => loadGeneratedClient('postgresql'),
  mysql: () => loadGeneratedClient('mysql'),
};

export class DatabaseProviderRegistry {
  private active?: { provider: DbProvider; client: DatabaseClient };
  private activationQueue: Promise<void> = Promise.resolve();

  constructor(private readonly loaders: Record<DbProvider, ClientLoader> = defaultLoaders) {}

  async activate(provider: DbProvider, datasourceUrl?: string): Promise<DatabaseClient> {
    const activation = this.activationQueue.then(() => this.activateExclusive(provider, datasourceUrl));
    this.activationQueue = activation.then(() => undefined, () => undefined);
    return activation;
  }

  private async activateExclusive(provider: DbProvider, datasourceUrl?: string): Promise<DatabaseClient> {
    if (this.active?.provider === provider) return this.active.client;
    if (this.active) await this.active.client.$disconnect();
    const module = await this.loaders[provider]();
    const client = new module.PrismaClient(datasourceUrl ? { datasourceUrl } : undefined);
    await client.$connect();
    this.active = { provider, client };
    return client;
  }

  getActive(): DatabaseClient {
    if (!this.active) throw new Error('auth_database_provider_not_initialized');
    return this.active.client;
  }

  getActiveProvider(): DbProvider | null {
    return this.active?.provider ?? null;
  }

  async disconnect(): Promise<void> {
    const operation = this.activationQueue.then(async () => {
      if (!this.active) return;
      await this.active.client.$disconnect();
      this.active = undefined;
    });
    this.activationQueue = operation.then(() => undefined, () => undefined);
    await operation;
  }
}

export function resolveActiveDatabaseProvider(value = process.env['AUTH_DATABASE_PROVIDER']): DbProvider {
  const provider = (value ?? 'sqlite').toLowerCase();
  if (provider === 'sqlite' || provider === 'postgresql' || provider === 'mysql') return provider;
  throw new Error(`unsupported_auth_database_provider:${provider}`);
}

export const databaseProviderRegistry = new DatabaseProviderRegistry();
