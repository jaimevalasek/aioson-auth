// S1B.3 da feature aioson-play-identity (ADR-04).
//
// Valida Bearer aioson.com chamando `GET /api/app-auth/me` (entregue por
// agent-2 em Sprint 1A). Resposta cacheada em memória com TTL = 60s — TTL
// conservador (60s) porque aioson-auth é o gatekeeper das bindings; aioson-play
// usa cache de 5min porque tem outro layer de validação local.
//
// Cache miss → HTTP call. 401 → `null` (token inválido/expirado).
// rede off → `null` + log; chamadores decidem o fallback (admin endpoints
// rejeitam; outros devem propagar 503).

const AIOSON_COM_BASE_URL =
  process.env['AIOSON_COM_BASE_URL'] ?? 'https://aioson.com';

const CACHE_TTL_MS = 60_000;
const HTTP_TIMEOUT_MS = 8_000;

export interface AiosonComUser {
  user_id: string;
  email: string;
  plan: 'free' | 'jedi';
  expires_at: string | null;
}

interface CacheEntry {
  user: AiosonComUser;
  expires_at_ms: number;
}

const cache = new Map<string, CacheEntry>();

function now(): number {
  return Date.now();
}

/**
 * Resolve `Bearer aioson.com:<jwt>` ou `Bearer <jwt>` (frontend pode passar
 * nu) — retorna o JWT cru. Mantém uma interface única pros chamadores não
 * precisarem cuidar do prefixo `aioson-com:` do ADR-01.
 */
export function extractAiosonComToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) return null;
  const trimmed = authorizationHeader.trim();
  // Formatos aceitos:
  //   "Bearer aioson-com:<jwt>"  — padrão ADR-01 (apps cross-tenant)
  //   "aioson-com:<jwt>"          — header X-Authorization-Style
  //   "Bearer <jwt>"               — Bearer cru
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('bearer ')) {
    const after = trimmed.slice(7).trim();
    if (after.toLowerCase().startsWith('aioson-com:')) {
      return after.slice('aioson-com:'.length).trim() || null;
    }
    return after || null;
  }
  if (lower.startsWith('aioson-com:')) {
    return trimmed.slice('aioson-com:'.length).trim() || null;
  }
  return null;
}

/**
 * Valida o Bearer aioson.com. Retorna o `AiosonComUser` (user_id, email,
 * plan, expires_at) ou `null` se inválido/expirado/aioson.com inacessível.
 *
 * - Cache hit (TTL=60s) → retorna sem HTTP call.
 * - Cache miss → `GET {base}/api/app-auth/me` com Authorization: Bearer <jwt>.
 *   200 → grava no cache + retorna.
 *   401 → invalida o cache pra esse token + retorna null.
 *   outros → log + retorna null.
 */
export async function validateAiosonComBearer(jwt: string): Promise<AiosonComUser | null> {
  if (!jwt) return null;

  const cached = cache.get(jwt);
  if (cached && cached.expires_at_ms > now()) {
    return cached.user;
  }
  if (cached) {
    cache.delete(jwt);
  }

  let response: Response;
  try {
    response = await fetch(`${AIOSON_COM_BASE_URL}/api/app-auth/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwt}` },
      signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
    });
  } catch (err) {
    console.warn('[aioson_com_validator] aioson.com unreachable:', err);
    return null;
  }

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    console.warn(
      `[aioson_com_validator] unexpected HTTP ${response.status} from /api/app-auth/me`
    );
    return null;
  }

  let body: AiosonComUser;
  try {
    body = (await response.json()) as AiosonComUser;
  } catch (err) {
    console.warn('[aioson_com_validator] invalid JSON from aioson.com:', err);
    return null;
  }

  if (!body || !body.user_id || !body.email) {
    console.warn('[aioson_com_validator] payload missing user_id/email');
    return null;
  }

  cache.set(jwt, {
    user: body,
    expires_at_ms: now() + CACHE_TTL_MS,
  });

  return body;
}

/** Limpa o cache pra um token específico (ex: logout explícito). */
export function invalidateAiosonComCache(jwt: string): void {
  cache.delete(jwt);
}

/** Limpa todo o cache (testes / shutdown). */
export function clearAiosonComCache(): void {
  cache.clear();
}
