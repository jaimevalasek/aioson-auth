import { AuthError, authErrorFromResponse } from './errors.js';
import type { MePayload } from './types.js';

export type RemoteBearerVerificationOptions = {
  baseUrl: string;
  bindingId: string;
  authorization?: string;
  requestId?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
};

export async function verifyRemoteBearer(
  options: RemoteBearerVerificationOptions,
): Promise<MePayload> {
  const authorization = options.authorization?.trim();
  if (!authorization) throw new AuthError('missing_token', 'A bearer token is required', 401);
  if (!/^Bearer\s+\S+$/i.test(authorization)) {
    throw new AuthError('malformed_token', 'The bearer token is malformed', 401);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 3_000);
  try {
    const response = await (options.fetch ?? globalThis.fetch)(
      `${options.baseUrl.replace(/\/+$/, '')}/api/auth/${encodeURIComponent(options.bindingId)}/me`,
      {
        headers: {
          authorization,
          ...(options.requestId ? { 'x-request-id': options.requestId } : {}),
        },
        signal: controller.signal,
      },
    );
    const text = await response.text();
    const data = text ? tryParseJson(text) : null;
    if (!response.ok) {
      throw authErrorFromResponse(response.status, data, response.headers.get('x-request-id'));
    }

    const payload = data as MePayload;
    if (!payload?.sub) throw new AuthError('invalid_token', 'The bearer token has no subject', 401);
    if (!payload.binding_id || payload.binding_id !== options.bindingId) {
      throw new AuthError('binding_mismatch', 'Token is not valid for this app binding', 401);
    }
    return payload;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('auth_unavailable', 'Authentication service is temporarily unavailable', 503);
  } finally {
    clearTimeout(timeout);
  }
}

function tryParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
