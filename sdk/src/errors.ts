/**
 * Erro normalizado do aioson-auth. Use `code` para fluxos programáticos;
 * `message` é a string original do servidor (pode ser exposta ao usuário
 * em pt-BR ou em).
 */
export class AuthError extends Error {
  readonly code: AuthErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: AuthErrorCode, message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export type AuthErrorCode =
  | 'invalid_credentials'
  | 'token_expired'
  | 'token_invalid'
  | 'refresh_failed'
  | 'binding_not_found'
  | 'rbac_disabled'
  | 'forbidden'
  | 'validation_failed'
  | 'network'
  | 'unknown';

export function inferErrorCode(status: number, message: string): AuthErrorCode {
  const lower = message.toLowerCase();
  if (status === 401 && lower.includes('expired')) return 'token_expired';
  if (status === 401) return 'token_invalid';
  if (status === 403 && lower.includes('rbac')) return 'rbac_disabled';
  if (status === 403) return 'forbidden';
  if (status === 404 && lower.includes('binding')) return 'binding_not_found';
  if (status === 400 && lower.includes('credentials')) return 'invalid_credentials';
  if (status === 400) return 'validation_failed';
  return 'unknown';
}
