import type { Request } from 'express';
import { assertAccessTokenBinding, verifyAccessToken, type TokenPayload } from '../actions/AuthAction.js';
import { AuthError } from './auth-error.js';

export async function authenticateBindingRequest(
  req: Request,
  bindingId: string,
): Promise<TokenPayload> {
  const token = readBearerToken(req);
  const payload = await verifyAccessToken(token);
  assertAccessTokenBinding(payload, bindingId);
  return payload;
}

function readBearerToken(req: Request): string {
  const authorization = req.header('authorization');
  if (authorization) {
    const match = /^Bearer\s+(.+)$/i.exec(authorization.trim());
    if (!match || !match[1].trim()) throw new AuthError('malformed_token');
    return match[1].trim();
  }

  if (req.query['token'] !== undefined) throw new AuthError('malformed_token');
  throw new AuthError('missing_token');
}
