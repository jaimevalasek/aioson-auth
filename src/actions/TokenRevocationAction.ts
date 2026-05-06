// S1B.5 da feature aioson-play-identity (ADR-07).
//
// Revogação imediata de JWTs. Quando dono remove um operador, marcamos o
// user_id na tabela `TokenRevocation` por TTL=7d (= access TTL). Middleware
// de validação consulta aqui ANTES de aceitar JWT — token na lista → 401.
//
// `revokeUserTokens` é idempotente (UPSERT por user_id+binding_id; renova
// expires_at se já existia).
//
// Cleanup job remove entries expiradas (a cada 1h) — após `expires_at` o JWT
// já teria expirado pelo próprio campo `exp`, então a entry vira lixo.

import { prisma } from '../lib/prisma.js';

const ACCESS_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

/**
 * Revoga todos os JWTs ativos de um user num binding específico.
 * Idempotente: re-call atualiza `revoked_at` e estende `expires_at`.
 */
export async function revokeUserTokens(userId: string, bindingId: string): Promise<void> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ACCESS_TTL_MS);

  // SQLite upsert pela combinação user_id+binding_id (sem unique constraint
  // explícita — a tabela permite múltiplas entries em teoria; aqui forçamos
  // uma só por par via deleteMany + create).
  await prisma.$transaction([
    prisma.tokenRevocation.deleteMany({
      where: { user_id: userId, binding_id: bindingId },
    }),
    prisma.tokenRevocation.create({
      data: {
        user_id: userId,
        binding_id: bindingId,
        revoked_at: now,
        expires_at: expiresAt,
      },
    }),
  ]);
}

/**
 * Retorna true se há revogação ativa pra este user_id (em qualquer binding).
 * Cobre o caso comum: middleware valida JWT e checa revocation independente
 * do binding (revogação remove acesso global do user).
 */
export async function isUserRevoked(userId: string): Promise<boolean> {
  const now = new Date();
  const count = await prisma.tokenRevocation.count({
    where: { user_id: userId, expires_at: { gt: now } },
  });
  return count > 0;
}

/**
 * Remove entries expiradas. Roda em loop a cada 1h (`scheduleCleanup`).
 */
export async function cleanupExpiredRevocations(): Promise<number> {
  const now = new Date();
  const result = await prisma.tokenRevocation.deleteMany({
    where: { expires_at: { lt: now } },
  });
  return result.count;
}

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1h
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Agenda o cleanup pra rodar a cada 1h. Idempotente — se já está agendado,
 * não duplica. Chamado uma vez no startup (createApp).
 */
export function scheduleRevocationCleanup(): void {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    cleanupExpiredRevocations()
      .then((removed) => {
        if (removed > 0) {
          console.log(`[token-revocation] cleanup removed ${removed} expired entries`);
        }
      })
      .catch((err) => {
        console.warn('[token-revocation] cleanup failed:', err);
      });
  }, CLEANUP_INTERVAL_MS);
  // Roda 1x logo no startup pra limpar lixo acumulado entre restarts.
  void cleanupExpiredRevocations().catch(() => {
    /* best-effort */
  });
}

/** Para o cleanup job (testes, shutdown limpo). */
export function stopRevocationCleanup(): void {
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }
}
