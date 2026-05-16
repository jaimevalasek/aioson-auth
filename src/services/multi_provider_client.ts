// multi_provider_client.ts — detection + validação de provider via connection string.
//
// O cliente Prisma JS é gerado pra UM provider em build-time (ADR-F-01 +
// scripts/build-prisma-schema.ts). Este módulo serve pra:
//   1. Detectar o provider real de uma connection string (validar antes de
//      gravar em keyring ou ativar).
//   2. Forçar TLS em connection strings remotas (BR-F-05 +
//      shared-decisions § "TLS obrigatório em connection string remota").
//   3. Comparar provider detectado com o provider do build (alerta cedo
//      em mismatch).

export type DbProvider = 'postgresql' | 'mysql' | 'sqlite';

export class ProviderValidationError extends Error {
  constructor(
    message: string,
    public readonly code:
      | 'unknown_provider'
      | 'tls_required'
      | 'malformed'
      | 'build_mismatch',
  ) {
    super(message);
    this.name = 'ProviderValidationError';
  }
}

/**
 * Detecta provider via prefixo da connection string. Postgres aceita
 * `postgres://` e `postgresql://` (Prisma trata os 2 como o mesmo).
 */
export function detectProvider(connectionString: string): DbProvider {
  const trimmed = connectionString.trim();
  if (
    trimmed.startsWith('postgresql://') ||
    trimmed.startsWith('postgres://')
  ) {
    return 'postgresql';
  }
  if (trimmed.startsWith('mysql://')) {
    return 'mysql';
  }
  if (trimmed.startsWith('file:') || trimmed.startsWith('sqlite:')) {
    return 'sqlite';
  }
  throw new ProviderValidationError(
    `connection string não bate com nenhum provider conhecido (postgresql/mysql/sqlite)`,
    'unknown_provider',
  );
}

/**
 * BR-F-05: connection string remota precisa exigir TLS. Postgres aceita
 * `sslmode=require` ou `sslmode=verify-full`; MySQL aceita `ssl=true` ou
 * `sslaccept=strict`. SQLite local (`file:`) é exempt.
 */
export function assertTlsForRemote(connectionString: string): void {
  const provider = detectProvider(connectionString);
  if (provider === 'sqlite') return;

  const lower = connectionString.toLowerCase();

  if (provider === 'postgresql') {
    const hasSslmode = /[?&]sslmode=(require|verify-ca|verify-full)/.test(lower);
    if (!hasSslmode) {
      throw new ProviderValidationError(
        'connection string Postgres requer sslmode=require (ou superior). Adicione ?sslmode=require ao final.',
        'tls_required',
      );
    }
    return;
  }

  if (provider === 'mysql') {
    // BR-F-05: `sslaccept=preferred` significa "tenta TLS, aceita plain se
    // servidor não tiver" — NÃO atende "TLS obrigatório". Apenas `strict`
    // (ou o legado `ssl=true` que falha em plain) cumpre o requisito.
    const hasSsl =
      /[?&]ssl=true/.test(lower) ||
      /[?&]sslaccept=strict/.test(lower);
    if (!hasSsl) {
      throw new ProviderValidationError(
        'connection string MySQL requer ssl=true ou sslaccept=strict (preferred é fallback permissivo, não atende BR-F-05). Adicione ?ssl=true ao final.',
        'tls_required',
      );
    }
    return;
  }
}

/**
 * Compara o provider DETECTADO da connection string com o provider do
 * BUILD (lido de `DATABASE_PROVIDER` env, mesmo consumido pelo
 * scripts/build-prisma-schema.ts). Alerta cedo se há mismatch — em prod
 * isso significa que o cliente Prisma gerado NÃO sabe falar com o DB
 * apontado pela connection string.
 *
 * Em dev local (SQLite + SQLite) é no-op.
 */
export function assertProviderMatchesBuild(connectionString: string): void {
  const detected = detectProvider(connectionString);
  const buildProvider = (process.env['DATABASE_PROVIDER'] ?? 'sqlite').toLowerCase();
  if (detected === buildProvider) return;

  // Mismatch real. Em dev, é OK ter SQLite build + apontar pra outro SQLite.
  // O alerta vale quando build é remoto e connection é local OU vice-versa.
  throw new ProviderValidationError(
    `provider mismatch: connection string aponta pra "${detected}" mas o cliente Prisma foi compilado pra "${buildProvider}". ` +
      `Re-gere o cliente com DATABASE_PROVIDER=${detected} antes de ativar Federação.`,
    'build_mismatch',
  );
}

/**
 * Validação completa pra connection string remota (Postgres/MySQL): detect
 * + TLS + build match. Lança `ProviderValidationError` na primeira falha.
 */
export function validateRemoteConnectionString(connectionString: string): {
  provider: DbProvider;
} {
  const provider = detectProvider(connectionString);
  if (provider === 'sqlite') {
    throw new ProviderValidationError(
      'connection string SQLite não é válida para Federação remota',
      'unknown_provider',
    );
  }
  assertTlsForRemote(connectionString);
  assertProviderMatchesBuild(connectionString);
  return { provider };
}
