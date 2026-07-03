// federation_orchestrator.ts — coordena ativação de Federação no aioson-auth.
//
// Responsável por:
//   1. Validar provider/TLS da connection string (multi_provider_client).
//   2. Testar conectividade (probe SELECT 1) — opcional via testConnection().
//   3. Persistir FederationConfig no SQLite local (localPrisma).
//   4. Disparar reloadMainPrismaFromConfig() pra reapontar mainPrisma.
//   5. NÃO grava connection string (Lane 3/Tauri já gravou no keyring antes
//      de chamar este endpoint).
//
// Architecture-play-federation.md § 6.5 detalha o fluxo completo. Este
// módulo é o passo "aioson-auth side" do flow.

import { localPrisma, reloadMainPrismaFromConfig } from '../lib/prisma-clients.js';
import {
  ProviderValidationError,
  validateRemoteConnectionString,
  type DbProvider,
} from './multi_provider_client.js';
import {
  KeyringBridgeError,
  readConnectionString,
} from './connection_string_keyring.js';
import { startRevocationPoller, stopRevocationPoller } from './revocation_poller.js';

export type ActivationResult =
  | { ok: true; provider: DbProvider; activated_at: string }
  | { ok: false; error: string; code: ActivationErrorCode };

export type ActivationErrorCode =
  | 'invalid_connection_string'
  | 'tls_required'
  | 'build_mismatch'
  | 'keyring_unavailable'
  | 'keyring_empty'
  | 'probe_failed'
  | 'persist_failed'
  | 'internal_error';

export interface TestConnectionResult {
  ok: boolean;
  provider?: DbProvider;
  error?: string;
  code?: ActivationErrorCode;
}

/**
 * Probe leve: valida provider/TLS sem persistir. Usado pelo endpoint
 * `POST /api/auth/admin/federation/test-connection`.
 *
 * NÃO faz query real ao DB remoto no MVP — apenas valida shape da string +
 * TLS + provider match. Probe SQL `SELECT 1` ficaria viável após
 * `reloadMainPrismaFromConfig()`, mas isso teria efeito colateral (recria
 * mainPrisma). Trade-off MVP aceito: dono testa de novo na ativação real.
 */
export function testConnection(connectionString: string): TestConnectionResult {
  try {
    const { provider } = validateRemoteConnectionString(connectionString);
    return { ok: true, provider };
  } catch (err) {
    if (err instanceof ProviderValidationError) {
      const code =
        err.code === 'unknown_provider' || err.code === 'malformed'
          ? 'invalid_connection_string'
          : err.code === 'tls_required'
            ? 'tls_required'
            : 'build_mismatch';
      return { ok: false, error: err.message, code };
    }
    return {
      ok: false,
      error: (err as Error).message,
      code: 'internal_error',
    };
  }
}

/**
 * Ativa Federação:
 *   1. Lê connection string do keyring (Lane 3 gravou).
 *   2. Valida (provider + TLS + build match).
 *   3. Persiste FederationConfig (singleton).
 *   4. Recarrega mainPrisma apontando pra DB remoto.
 *
 * Idempotente: chamar 2x com mesma config é no-op no passo 4.
 *
 * Caller (admin-federation route) é responsável por:
 *   - Validar Bearer aioson.com OWNER (middleware)
 *   - Rate-limit (ADR-F-07)
 */
export async function activateFederation(input: {
  aiosonPlayId: string;
  projectId: string;
  projectName?: string | null;
}): Promise<ActivationResult> {
  let connectionString: string | null;
  try {
    connectionString = await readConnectionString(input.aiosonPlayId);
  } catch (err) {
    if (err instanceof KeyringBridgeError) {
      return {
        ok: false,
        error: `keyring bridge: ${err.message}`,
        code: 'keyring_unavailable',
      };
    }
    return {
      ok: false,
      error: (err as Error).message,
      code: 'internal_error',
    };
  }
  if (!connectionString) {
    return {
      ok: false,
      error: 'connection string ausente no keyring — Tauri side ainda não gravou',
      code: 'keyring_empty',
    };
  }

  let provider: DbProvider;
  try {
    ({ provider } = validateRemoteConnectionString(connectionString));
  } catch (err) {
    if (err instanceof ProviderValidationError) {
      const code =
        err.code === 'tls_required'
          ? 'tls_required'
          : err.code === 'build_mismatch'
            ? 'build_mismatch'
            : 'invalid_connection_string';
      return { ok: false, error: err.message, code };
    }
    return {
      ok: false,
      error: (err as Error).message,
      code: 'internal_error',
    };
  }

  const now = new Date();
  try {
    await localPrisma.federationConfig.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        federation_active: true,
        project_id: input.projectId,
        project_name: input.projectName ?? null,
        db_provider: provider,
        db_connection_keyring_id: `aioson-play-federation/db-online-${input.aiosonPlayId}`,
        activated_at: now,
      },
      update: {
        federation_active: true,
        project_id: input.projectId,
        project_name: input.projectName ?? null,
        db_provider: provider,
        db_connection_keyring_id: `aioson-play-federation/db-online-${input.aiosonPlayId}`,
        activated_at: now,
      },
    });
  } catch (err) {
    return {
      ok: false,
      error: `falha ao persistir FederationConfig: ${(err as Error).message}`,
      code: 'persist_failed',
    };
  }

  try {
    await reloadMainPrismaFromConfig(connectionString);
  } catch (err) {
    return {
      ok: false,
      error: `reload mainPrisma falhou: ${(err as Error).message}`,
      code: 'probe_failed',
    };
  }

  // M-2 da auditoria 2026-07-02: a ativação em runtime não iniciava o poller
  // (só o boot iniciava) — status ficava "never_started" até reiniciar.
  try {
    startRevocationPoller(input.aiosonPlayId);
  } catch (err) {
    console.warn('[federation] activate: startRevocationPoller falhou (não-fatal):', err);
  }

  return {
    ok: true,
    provider,
    activated_at: now.toISOString(),
  };
}

/**
 * Desativa Federação (era 501 no MVP): marca `federation_active=false` no
 * SQLite local, para o poller e devolve o mainPrisma pro destino local.
 * Idempotente — desativar já-desativada é no-op ok.
 *
 * NÃO apaga a connection string do keyring — quem guarda/apaga é o lado
 * Tauri (Play), dono do keyring.
 */
export async function deactivateFederation(): Promise<
  { ok: true } | { ok: false; error: string; code: 'persist_failed' }
> {
  try {
    const existing = await localPrisma.federationConfig.findUnique({
      where: { id: 'singleton' },
    });
    if (existing?.federation_active) {
      await localPrisma.federationConfig.update({
        where: { id: 'singleton' },
        data: { federation_active: false },
      });
    }
  } catch (err) {
    return {
      ok: false,
      error: `falha ao persistir desativação: ${(err as Error).message}`,
      code: 'persist_failed',
    };
  }

  try {
    stopRevocationPoller();
  } catch (err) {
    console.warn('[federation] deactivate: stopRevocationPoller falhou (não-fatal):', err);
  }
  try {
    await reloadMainPrismaFromConfig();
  } catch (err) {
    console.warn(
      '[federation] deactivate: reload mainPrisma falhou (volta ao local no próximo boot):',
      err,
    );
  }
  return { ok: true };
}

/**
 * Status atual da Federação. Não toca DB remoto — só lê config local +
 * estado em memória do mainPrisma.
 */
export async function getFederationStatus(): Promise<{
  federation_active: boolean;
  db_provider: DbProvider | null;
  project_id: string | null;
  project_name: string | null;
  activated_at: string | null;
}> {
  const config = await localPrisma.federationConfig.findUnique({
    where: { id: 'singleton' },
  });
  if (!config) {
    return {
      federation_active: false,
      db_provider: null,
      project_id: null,
      project_name: null,
      activated_at: null,
    };
  }
  return {
    federation_active: config.federation_active,
    db_provider: (config.db_provider as DbProvider | null) ?? null,
    project_id: config.project_id,
    project_name: config.project_name,
    activated_at: config.activated_at?.toISOString() ?? null,
  };
}
