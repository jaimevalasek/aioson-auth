// revocation-cache.ts — cache em memória de tokens revogados (per-process).
//
// Consumido pelo middleware `verifyAccessToken` existente (ADR-07 do
// aioson-play-identity) ANTES de validar JWT. Fluxo:
//   1. JWT chega → extrai user_id + binding_id
//   2. Se `isRevoked(user_id, binding_id)` → 401 imediato
//   3. Senão valida JWT normalmente
//
// Populado pelo `revocation_poller.ts` a cada 30s consultando `mainPrisma`.
// Entries expiram via TTL — limpas pelo poller também.

interface CachedRevocation {
  user_id: string;
  binding_id: string;
  expires_at_ms: number;
}

const cache = new Map<string, CachedRevocation>();

function key(user_id: string, binding_id: string): string {
  return `${user_id}:${binding_id}`;
}

/**
 * Marca um token como revogado. `expiresAt` é o `TokenRevocation.expires_at`
 * — após esse ponto a entry vira lixo (JWT natural já expirou também).
 */
export function markRevoked(input: {
  user_id: string;
  binding_id: string;
  expires_at: Date;
}): void {
  cache.set(key(input.user_id, input.binding_id), {
    user_id: input.user_id,
    binding_id: input.binding_id,
    expires_at_ms: input.expires_at.getTime(),
  });
}

/**
 * Checa se (user_id, binding_id) está revogado. Ignora entries expiradas
 * (caller pode chamar `pruneExpired()` periodicamente — poller faz).
 */
export function isRevoked(user_id: string, binding_id: string): boolean {
  const entry = cache.get(key(user_id, binding_id));
  if (!entry) return false;
  if (entry.expires_at_ms <= Date.now()) {
    cache.delete(key(user_id, binding_id));
    return false;
  }
  return true;
}

/** Remove entries expiradas. Retorna quantidade removida. */
export function pruneExpired(): number {
  const now = Date.now();
  let removed = 0;
  for (const [k, entry] of cache.entries()) {
    if (entry.expires_at_ms <= now) {
      cache.delete(k);
      removed += 1;
    }
  }
  return removed;
}

/** Limpa tudo (testes / shutdown). */
export function clearRevocationCache(): void {
  cache.clear();
}

/** Tamanho atual (observability). */
export function revocationCacheSize(): number {
  return cache.size;
}
