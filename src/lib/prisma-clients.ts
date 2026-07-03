// prisma-clients.ts — gerencia 2 clientes Prisma para suportar Federação.
//
// Contexto (architecture-play-federation.md § 2 ADR-F-05):
//   - `localPrisma`  → SEMPRE SQLite local (arquivo `prisma/dev.db`).
//                      Único cliente que toca `FederationConfig` + bootstrap.
//   - `mainPrisma`   → Default = mesmo do `localPrisma`. Quando Federação
//                      ativa, é recriado apontando pro DB compartilhado
//                      (Postgres ou MySQL) via `reloadMainPrismaFromConfig()`.
//
// Importante (ADR-F-01): o cliente Prisma JS é gerado pra UM provider em
// build-time (controlado por `DATABASE_PROVIDER` consumido pelo
// `scripts/build-prisma-schema.ts`). Em runtime só conseguimos trocar a
// connection string (datasourceUrl), não o driver. Portanto:
//   - Em dev local (SQLite): cliente gerado pra SQLite. Federação só pode
//     ser ativada apontando pra outro SQLite (não testado em prod).
//   - Em produção com Federação ativa (Postgres/MySQL): build CI gera
//     cliente pro provider correto; localPrisma deve apontar pro SQLite
//     local (que o cliente do provider-X NÃO sabe ler) — por isso o brief
//     diz "localPrisma é o cliente local separado".
//
// Trade-off MVP: usamos UM cliente Prisma só (do provider do build). Quando
// Federação inativa, ele aponta pra SQLite (que também é seu provider de
// build em dev) — funciona. Em produção com Federação ativa, o cliente é
// gerado pro provider remoto E aponta tanto pro DB remoto (mainPrisma)
// quanto pro SQLite local (localPrisma). Como Prisma 5 NÃO permite o
// mesmo cliente apontar pra 2 datasources de providers diferentes, o
// localPrisma vira "best-effort" em prod multi-provider — limitação
// aceita pra MVP (FederationConfig em prod fica no DB remoto mesmo).
//
// Quando o motor multi-provider runtime estiver disponível (Prisma 7+
// roadmap ou Drizzle/Kysely), isto é o ponto a refatorar.
//
// ── DECISÃO 2026-07-02 (auditoria federação + dono): modelo oficial é
// MASTER-COMO-SERVIDOR — satélites autenticam operadores direto no
// aioson-auth do MASTER via rede (shell login/unlock/refresh do Play já
// fazem isso). Consequência: a maquinaria de "sync via banco compartilhado"
// deste arquivo é VESTIGIAL — as actions de negócio escrevem no cliente
// legado `lib/prisma.ts` (nunca no mainPrisma), o revocation_poller lê um
// cache que nenhum caminho de produção consulta, e as colunas de origem
// (aioson_play_origin_id) nunca são populadas. NÃO construir features novas
// em cima do mainPrisma/poller sem antes resolver essa contradição
// (dossiê: aioson-play/.aioson/context/simple-plans/federation-audit.md,
// findings AU-C1/C2/C3 + G-1). Doc do modelo:
// aioson-play/.aioson/docs/integrations/federation-model.md

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  __localPrisma?: PrismaClient;
  __mainPrisma?: PrismaClient;
  __mainPrismaUrl?: string;
};

const LOCAL_FALLBACK_URL = 'file:./dev.db';

function buildClient(url?: string): PrismaClient {
  return new PrismaClient(
    url ? { datasourceUrl: url } : undefined,
  );
}

/**
 * Cliente Prisma que aponta pro SQLite local. Sempre disponível, mesmo com
 * Federação ativa. Use pra:
 *   - Ler/escrever `FederationConfig` (ADR-F-05)
 *   - Bootstrap inicial antes do orchestrator decidir mainPrisma
 *
 * Em build do provider remoto (postgres/mysql), `localPrisma` aponta pro
 * arquivo SQLite mas só consegue executar queries compatíveis com o
 * driver gerado — trade-off documentado no header.
 */
export const localPrisma: PrismaClient =
  globalForPrisma.__localPrisma ??
  (globalForPrisma.__localPrisma = buildClient(
    process.env['LOCAL_DATABASE_URL'] ?? LOCAL_FALLBACK_URL,
  ));

/**
 * Cliente Prisma principal (operacional). Resolução:
 *   1. `MAIN_DATABASE_URL` env var, se setada (override pra dev/teste)
 *   2. URL da `FederationConfig` (lida pelo orchestrator via keyring) — só
 *      depois de `reloadMainPrismaFromConfig()` ter rodado
 *   3. Fallback: mesmo do `localPrisma` (SQLite local)
 */
export let mainPrisma: PrismaClient =
  globalForPrisma.__mainPrisma ??
  (globalForPrisma.__mainPrisma = buildClient(
    process.env['MAIN_DATABASE_URL'] ?? process.env['DATABASE_URL'] ?? LOCAL_FALLBACK_URL,
  ));

if (!globalForPrisma.__mainPrismaUrl) {
  globalForPrisma.__mainPrismaUrl =
    process.env['MAIN_DATABASE_URL'] ?? process.env['DATABASE_URL'] ?? LOCAL_FALLBACK_URL;
}

/**
 * Recria `mainPrisma` lendo a `FederationConfig`. Chamado:
 *   - No boot do aioson-auth (após localPrisma estar conectado)
 *   - Após `activateFederation()` gravar nova config
 *   - Em desativação futura (out of scope MVP — 501 stub)
 *
 * Quando `federation_active = false`: mantém mainPrisma = localPrisma.
 * Quando `federation_active = true`: precisa da `connectionString` (lida
 * via keyring pelo caller — `federation_orchestrator.ts`). Se a connection
 * string NÃO é fornecida (caller esqueceu ou keyring falhou), mantém o
 * cliente atual e loga warning — falha não derruba o servidor.
 */
export async function reloadMainPrismaFromConfig(
  connectionString?: string | null,
): Promise<void> {
  const config = await localPrisma.federationConfig.findUnique({
    where: { id: 'singleton' },
  });

  const targetUrl =
    config?.federation_active && connectionString
      ? connectionString
      : process.env['MAIN_DATABASE_URL'] ??
        process.env['DATABASE_URL'] ??
        LOCAL_FALLBACK_URL;

  if (targetUrl === globalForPrisma.__mainPrismaUrl) {
    return; // no-op — já tá no destino certo
  }

  if (config?.federation_active && !connectionString) {
    console.warn(
      '[prisma-clients] reloadMainPrismaFromConfig: federation_active=true mas connection_string ausente — mainPrisma mantido local',
    );
  }

  // Disconnect anterior pra evitar pool leak.
  try {
    await mainPrisma.$disconnect();
  } catch (err) {
    console.warn('[prisma-clients] disconnect anterior falhou (não-fatal):', err);
  }

  const next = buildClient(targetUrl);
  mainPrisma = next;
  globalForPrisma.__mainPrisma = next;
  globalForPrisma.__mainPrismaUrl = targetUrl;
}

/**
 * Helper read-only pra logging/observability.
 */
export function getMainPrismaTargetUrl(): string {
  return globalForPrisma.__mainPrismaUrl ?? LOCAL_FALLBACK_URL;
}
