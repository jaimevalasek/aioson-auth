import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { getRequestId } from './request-context.js';

export type AuthErrorCode =
  | 'missing_token'
  | 'malformed_token'
  | 'invalid_token'
  | 'expired_token'
  | 'revoked_token'
  | 'binding_mismatch'
  | 'refresh_invalid'
  | 'session_reauthentication_required'
  | 'auth_unavailable'
  | 'rate_limited'
  | 'invalid_credentials'
  | 'validation_failed'
  | 'binding_not_found'
  | 'ownership_conflict'
  | 'email_already_registered'
  | 'person_has_accesses'
  | 'owner_role_reserved'
  | 'self_registration_disabled'
  | 'role_not_found'
  | 'user_not_found'
  | 'forbidden'
  | 'oauth_verification_required'
  | 'redirect_uri_not_allowed'
  | 'cors_origin_not_allowed';

const ERROR_STATUS: Record<AuthErrorCode, number> = {
  missing_token: 401,
  malformed_token: 401,
  invalid_token: 401,
  expired_token: 401,
  revoked_token: 401,
  binding_mismatch: 401,
  refresh_invalid: 401,
  session_reauthentication_required: 401,
  auth_unavailable: 503,
  rate_limited: 429,
  invalid_credentials: 401,
  validation_failed: 400,
  binding_not_found: 404,
  ownership_conflict: 403,
  email_already_registered: 409,
  person_has_accesses: 409,
  owner_role_reserved: 403,
  self_registration_disabled: 403,
  role_not_found: 404,
  user_not_found: 404,
  forbidden: 403,
  oauth_verification_required: 403,
  redirect_uri_not_allowed: 403,
  cors_origin_not_allowed: 403,
};

const ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  missing_token: 'A bearer token is required',
  malformed_token: 'The bearer token is malformed',
  invalid_token: 'The bearer token is invalid',
  expired_token: 'The bearer token has expired',
  revoked_token: 'The bearer token has been revoked',
  binding_mismatch: 'Token is not valid for this app binding',
  refresh_invalid: 'The refresh token is invalid or already consumed',
  session_reauthentication_required: 'This session must be reauthenticated',
  auth_unavailable: 'Authentication service is temporarily unavailable',
  rate_limited: 'Too many authentication attempts; try again later',
  invalid_credentials: 'Invalid credentials',
  validation_failed: 'Request validation failed',
  binding_not_found: 'App binding was not found',
  ownership_conflict: 'The app binding does not belong to this installation',
  email_already_registered: 'A person with this email already exists',
  person_has_accesses: 'Unlink this person from every app before deleting the account',
  owner_role_reserved: 'The owner role is reserved and cannot be assigned',
  self_registration_disabled: 'Self-registration is disabled for this app binding',
  role_not_found: 'Role was not found',
  user_not_found: 'User was not found',
  forbidden: 'Permission denied',
  oauth_verification_required: 'OAuth provider verification is required',
  redirect_uri_not_allowed: 'The SSO redirect URI is not allowed',
  cors_origin_not_allowed: 'Origin is not allowed',
};

export class AuthError extends Error {
  readonly status: number;

  constructor(readonly code: AuthErrorCode, message = ERROR_MESSAGES[code]) {
    super(message);
    this.name = 'AuthError';
    this.status = ERROR_STATUS[code];
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function toAuthError(error: unknown): AuthError {
  if (isAuthError(error)) return error;
  if (error instanceof ZodError) return new AuthError('validation_failed');

  const message = error instanceof Error ? error.message.toLowerCase() : '';
  if (message.includes('binding mismatch')) return new AuthError('binding_mismatch');
  if (message.includes('reauthentication required')) {
    return new AuthError('session_reauthentication_required');
  }
  if (message.includes('refresh') || message.includes('session already consumed')) {
    return new AuthError('refresh_invalid');
  }
  if (message.includes('invalid credentials')) return new AuthError('invalid_credentials');
  if (message.includes('binding not found')) return new AuthError('binding_not_found');
  if (message.includes('permission denied') || message.includes('(403)')) {
    return new AuthError('forbidden');
  }
  return new AuthError('auth_unavailable');
}

export function sendAuthError(
  req: Request,
  res: Response,
  error: unknown,
  operation: string,
  bindingId?: string,
) {
  const authError = toAuthError(error);
  const requestId = getRequestId(res);
  logAuthEvent({
    requestId,
    operation,
    bindingId,
    status: authError.status,
    errorCode: authError.code,
  });
  return res.status(authError.status).json({
    error: {
      code: authError.code,
      message: authError.message,
      requestId,
    },
  });
}

export function logAuthEvent(event: {
  requestId: string;
  operation: string;
  bindingId?: string;
  status?: number;
  errorCode?: AuthErrorCode;
  durationMs?: number;
}): void {
  console.info(JSON.stringify({
    timestamp: new Date().toISOString(),
    component: 'aioson-auth',
    ...event,
  }));
}
