import type { TokenPayload } from './types.js';

/**
 * Decodifica payload do JWT SEM verificar assinatura. Use APENAS para ler
 * claims (binding_id, permissions, sub, email) no client. Validação real
 * acontece no servidor — `AuthClient.check()` ou `/me` consulta DB +
 * TokenRevocation.
 *
 * Compatível com browser e Node sem deps externas.
 */
export function decodeJwtPayload(token: string): TokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '==='.slice((base64.length + 3) % 4);
    const json =
      typeof atob === 'function'
        ? atob(padded)
        : Buffer.from(padded, 'base64').toString('utf-8');
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}

/** True se `payload.exp` já passou (com 5s de skew). */
export function isTokenExpired(payload: TokenPayload | null, skewSecs = 5): boolean {
  if (!payload?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now + skewSecs;
}
