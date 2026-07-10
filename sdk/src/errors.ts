/**
 * Erro normalizado do aioson-auth. Use `code` para fluxos programáticos;
 * `message` é a string original do servidor (pode ser exposta ao usuário
 * em pt-BR ou em).
 */
export class AuthError extends Error {
  readonly code: AuthErrorCode;
  readonly status: number;
  readonly details?: unknown;
  readonly requestId?: string;

  constructor(code: AuthErrorCode, message: string, status: number, details?: unknown, requestId?: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.requestId = requestId;
  }
}

export type AuthErrorCode =
  | 'invalid_credentials'
  | 'missing_token'
  | 'malformed_token'
  | 'invalid_token'
  | 'token_expired'
  | 'token_invalid'
  | 'expired_token'
  | 'revoked_token'
  | 'binding_mismatch'
  | 'refresh_invalid'
  | 'session_reauthentication_required'
  | 'auth_unavailable'
  | 'refresh_failed'
  | 'binding_not_found'
  | 'rbac_disabled'
  | 'forbidden'
  | 'validation_failed'
  | 'network'
  | 'unknown';

type ErrorEnvelope = {
  error?: {
    code?: unknown;
    message?: unknown;
    requestId?: unknown;
  } | unknown;
};

function isAuthErrorCode(value: unknown): value is AuthErrorCode {
  return typeof value === 'string' && [
    'invalid_credentials', 'missing_token', 'malformed_token', 'invalid_token',
    'token_expired', 'token_invalid', 'expired_token', 'revoked_token',
    'binding_mismatch', 'refresh_invalid', 'session_reauthentication_required',
    'auth_unavailable', 'refresh_failed', 'binding_not_found', 'rbac_disabled',
    'forbidden', 'validation_failed', 'network', 'unknown',
  ].includes(value);
}

export function authErrorFromResponse(status: number, data: unknown, requestId?: string | null): AuthError {
  const envelope = data as ErrorEnvelope;
  if (envelope?.error && typeof envelope.error === 'object') {
    const error = envelope.error as { code?: unknown; message?: unknown; requestId?: unknown };
    const message = typeof error.message === 'string' ? error.message : `HTTP ${status}`;
    const code = isAuthErrorCode(error.code) ? error.code : inferErrorCode(status, message);
    const responseRequestId = typeof error.requestId === 'string' ? error.requestId : requestId ?? undefined;
    return new AuthError(code, message, status, data, responseRequestId);
  }

  const message = extractErrorMessage(data) ?? `HTTP ${status}`;
  return new AuthError(inferErrorCode(status, message), message, status, data, requestId ?? undefined);
}

export function inferErrorCode(status: number, message: string): AuthErrorCode {
  const lower = message.toLowerCase();
  if (status === 503) return 'auth_unavailable';
  if (status === 401 && lower.includes('missing')) return 'missing_token';
  if (status === 401 && lower.includes('malformed')) return 'malformed_token';
  if (status === 401 && lower.includes('binding')) return 'binding_mismatch';
  if (status === 401 && lower.includes('refresh')) return 'refresh_invalid';
  if (status === 401 && lower.includes('revoked')) return 'revoked_token';
  if (status === 401 && lower.includes('expired')) return 'token_expired';
  if (status === 401) return 'token_invalid';
  if (status === 403 && lower.includes('rbac')) return 'rbac_disabled';
  if (status === 403) return 'forbidden';
  if (status === 404 && lower.includes('binding')) return 'binding_not_found';
  if (status === 400 && lower.includes('credentials')) return 'invalid_credentials';
  if (status === 400) return 'validation_failed';
  return 'unknown';
}

function extractErrorMessage(data: unknown): string | null {
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object' && 'error' in data) {
    const error = (data as { error: unknown }).error;
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as { message?: unknown }).message;
      if (typeof message === 'string') return message;
    }
  }
  return null;
}
