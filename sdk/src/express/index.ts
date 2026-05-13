import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthError } from '../errors.js';
import { decodeJwtPayload, isTokenExpired } from '../jwt.js';
import type { TokenPayload } from '../types.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      /** Populado por `requireAuth()` quando o token é válido. */
      auth?: TokenPayload;
    }
  }
}

export interface MiddlewareOptions {
  /** URL base do aioson-auth (default: env `AIOSON_AUTH_URL` ou `http://localhost:3001`). */
  baseUrl?: string;
  /** UUID do binding (default: env `AIOSON_AUTH_BINDING_ID`). */
  bindingId?: string;
  /**
   * Se `false`, não chama `/me` no servidor — confia apenas no `decodeJwtPayload`
   * local + checagem de `exp`. Default `true` (recomendado: consulta o servidor,
   * que valida assinatura + TokenRevocation).
   */
  validateOnServer?: boolean;
  /** Custom fetch (default: globalThis.fetch). */
  fetch?: typeof fetch;
}

interface ResolvedOptions {
  baseUrl: string;
  bindingId: string;
  validateOnServer: boolean;
  fetch: typeof fetch;
}

function resolveOptions(opts: MiddlewareOptions = {}): ResolvedOptions {
  const baseUrl = (
    opts.baseUrl ??
    process.env['AIOSON_AUTH_URL'] ??
    'http://localhost:3001'
  ).replace(/\/+$/, '');
  const bindingId = opts.bindingId ?? process.env['AIOSON_AUTH_BINDING_ID'];
  if (!bindingId) {
    throw new Error(
      '[aioson/auth-sdk] bindingId not provided and AIOSON_AUTH_BINDING_ID env is unset'
    );
  }
  return {
    baseUrl,
    bindingId,
    validateOnServer: opts.validateOnServer ?? true,
    fetch: opts.fetch ?? globalThis.fetch.bind(globalThis),
  };
}

function extractToken(req: Request): string | null {
  // Padrão: Authorization: Bearer <token>
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim();
  }
  // Fallback legado: ?token=
  const q = req.query['token'];
  if (typeof q === 'string') return q;
  return null;
}

function unauthorized(res: Response, message = 'Unauthorized'): void {
  res.status(401).json({ error: message });
}

function forbidden(res: Response, message = 'Forbidden'): void {
  res.status(403).json({ error: message });
}

async function validateRemote(
  resolved: ResolvedOptions,
  token: string
): Promise<TokenPayload | null> {
  const url = `${resolved.baseUrl}/api/auth/${resolved.bindingId}/me?token=${encodeURIComponent(token)}`;
  try {
    const response = await resolved.fetch(url);
    if (!response.ok) return null;
    return (await response.json()) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Express middleware: exige token válido. Popula `req.auth` com o payload do JWT.
 *
 * @example
 * ```ts
 * import { requireAuth } from '@aioson/auth-sdk/express';
 *
 * app.use('/api/private', requireAuth({ baseUrl, bindingId }));
 * app.get('/api/private/me', (req, res) => res.json(req.auth));
 * ```
 */
export function requireAuth(opts?: MiddlewareOptions): RequestHandler {
  const resolved = resolveOptions(opts);

  return async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) return unauthorized(res, 'Missing token');

    // Validação local rápida (rejeita lixo + tokens expirados sem ir ao server).
    const localPayload = decodeJwtPayload(token);
    if (!localPayload) return unauthorized(res, 'Invalid token');
    if (isTokenExpired(localPayload)) return unauthorized(res, 'Token expired');

    if (!resolved.validateOnServer) {
      req.auth = localPayload;
      return next();
    }

    const serverPayload = await validateRemote(resolved, token);
    if (!serverPayload) return unauthorized(res, 'Invalid token');

    req.auth = serverPayload;
    next();
  };
}

/**
 * Exige permission específica. **Usa o claim `permissions` do JWT** (Slice A) —
 * zero requests adicionais. Se o token não carrega o claim (binding sem RBAC,
 * token antigo), nega por padrão. Para apps que precisam de fallback ao
 * `/rbac/check`, use o cliente diretamente.
 *
 * Deve ser aplicado **depois** de `requireAuth()`.
 *
 * @example
 * ```ts
 * app.delete('/api/orders/:id',
 *   requireAuth(opts),
 *   requirePermission('orders:delete', opts),
 *   handler
 * );
 * ```
 */
export function requirePermission(
  permission: string,
  opts?: MiddlewareOptions
): RequestHandler {
  // opts é só pra simetria com requireAuth — usado se chamarmos server check no futuro.
  void opts;
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = req.auth;
    if (!payload) return unauthorized(res, 'requireAuth must run before requirePermission');
    const perms = payload.permissions;
    if (!perms || !Array.isArray(perms)) {
      return forbidden(res, 'No permissions in token');
    }
    if (!perms.includes(permission)) {
      return forbidden(res, `Missing permission: ${permission}`);
    }
    next();
  };
}

export { AuthError };
