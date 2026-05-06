// Verifica se um `aioson_play_id` pertence ao user_id do Bearer aioson.com
// fornecido. Usado pelo middleware `validate_owner_bearer` (S1B.4 / ADR-02)
// pra rejeitar tentativas de criar binding em instalação alheia.
//
// Implementação: chama `GET aioson.com/api/aioson-play/installations/by-id/:id`
// (entregue por agent-2 em Sprint 1A) com o Bearer recebido. aioson-com já
// retorna 403 ownership_conflict se o user do Bearer não bate com o dono da
// instalação; aqui só propagamos o status como resultado booleano.
//
// Cache TTL = 5min (mais permissivo que o validator de Bearer em si — owner
// raramente muda; install records são singletons quase imutáveis).

const AIOSON_COM_BASE_URL =
  process.env['AIOSON_COM_BASE_URL'] ?? 'https://aioson.com';

const CACHE_TTL_MS = 5 * 60_000;
const HTTP_TIMEOUT_MS = 8_000;

export type OwnershipResult = 'matches' | 'mismatch' | 'not_found' | 'unavailable';

interface CacheEntry {
  result: OwnershipResult;
  expires_at_ms: number;
}

const cache = new Map<string, CacheEntry>();

function cacheKey(jwt: string, aiosonPlayId: string): string {
  return `${jwt}::${aiosonPlayId}`;
}

export async function checkInstallationOwnership(
  jwt: string,
  aiosonPlayId: string
): Promise<OwnershipResult> {
  if (!jwt || !aiosonPlayId) return 'mismatch';

  const key = cacheKey(jwt, aiosonPlayId);
  const cached = cache.get(key);
  if (cached && cached.expires_at_ms > Date.now()) {
    return cached.result;
  }
  if (cached) cache.delete(key);

  let response: Response;
  try {
    response = await fetch(
      `${AIOSON_COM_BASE_URL}/api/aioson-play/installations/by-id/${encodeURIComponent(aiosonPlayId)}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${jwt}` },
        signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
      }
    );
  } catch (err) {
    console.warn('[install_validator] aioson.com unreachable:', err);
    return 'unavailable';
  }

  let result: OwnershipResult;
  if (response.status === 200) {
    result = 'matches';
  } else if (response.status === 403) {
    result = 'mismatch';
  } else if (response.status === 404) {
    result = 'not_found';
  } else {
    console.warn(`[install_validator] unexpected HTTP ${response.status}`);
    return 'unavailable';
  }

  cache.set(key, {
    result,
    expires_at_ms: Date.now() + CACHE_TTL_MS,
  });

  return result;
}

export function clearInstallationOwnershipCache(): void {
  cache.clear();
}
