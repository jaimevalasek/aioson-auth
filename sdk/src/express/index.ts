import { createHmac } from 'node:crypto';
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
   * Ignorado em embedded mode (`jwtSecret` set).
   */
  validateOnServer?: boolean;
  /** Custom fetch (default: globalThis.fetch). */
  fetch?: typeof fetch;

  /**
   * Embedded mode (AC-SE-08): quando definido, verifica assinatura JWT localmente
   * (HS256) em vez de chamar o servidor. Dispensa `baseUrl` e `bindingId`.
   */
  jwtSecret?: string;
  /**
   * Embedded mode: callback que checa se o token foi revogado. Usar
   * `createRevocationChecker()` do `@aioson/auth-sdk/embedded`.
   */
  checkRevocation?: (userId: string, tokenIat: number) => Promise<boolean>;
}

interface ResolvedOptions {
  baseUrl: string;
  bindingId: string | undefined;
  validateOnServer: boolean;
  fetch: typeof fetch;
  jwtSecret?: string;
  checkRevocation?: (userId: string, tokenIat: number) => Promise<boolean>;
}

function resolveOptions(opts: MiddlewareOptions = {}): ResolvedOptions {
  const baseUrl = (
    opts.baseUrl ??
    process.env['AIOSON_AUTH_URL'] ??
    'http://localhost:3001'
  ).replace(/\/+$/, '');
  const bindingId = opts.bindingId ?? process.env['AIOSON_AUTH_BINDING_ID'];

  if (!opts.jwtSecret && !bindingId) {
    throw new Error(
      '[aioson/auth-sdk] bindingId not provided and AIOSON_AUTH_BINDING_ID env is unset'
    );
  }

  return {
    baseUrl,
    bindingId,
    validateOnServer: opts.validateOnServer ?? true,
    fetch: opts.fetch ?? globalThis.fetch.bind(globalThis),
    jwtSecret: opts.jwtSecret,
    checkRevocation: opts.checkRevocation,
  };
}

function parseCookieValue(req: Request, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1] ?? '') : null;
}

function extractToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim();
  }
  const q = req.query['token'];
  if (typeof q === 'string') return q;
  // Fallback: read from aioson_access cookie (embedded mode)
  return parseCookieValue(req, 'aioson_access');
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

function verifyJwtLocal(token: string, secret: string): TokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [h, b, sig] = parts as [string, string, string];
  const expected = createHmac('sha256', secret).update(`${h}.${b}`).digest('base64url');
  if (sig !== expected) return null;
  try {
    return JSON.parse(Buffer.from(b, 'base64url').toString('utf8')) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Express middleware: exige token válido. Popula `req.auth` com o payload do JWT.
 *
 * **Service mode** (default): valida via servidor aioson-auth remoto.
 * **Embedded mode** (`jwtSecret` set): verifica assinatura HS256 localmente + revocation check.
 *
 * @example
 * ```ts
 * // Service mode
 * app.use('/api', requireAuth({ baseUrl, bindingId }));
 *
 * // Embedded mode
 * import { createRevocationChecker } from '@aioson/auth-sdk/embedded';
 * const checkRevocation = createRevocationChecker(prisma, 'sqlite');
 * app.use('/api', requireAuth({ jwtSecret: SECRET, checkRevocation }));
 * ```
 */
export function requireAuth(opts?: MiddlewareOptions): RequestHandler {
  const resolved = resolveOptions(opts);

  return async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) return unauthorized(res, 'Missing token');

    // ── Embedded mode: local JWT verify + revocation ──────────────────────
    if (resolved.jwtSecret) {
      const payload = verifyJwtLocal(token, resolved.jwtSecret);
      if (!payload) return unauthorized(res, 'Invalid token');
      if (isTokenExpired(payload)) return unauthorized(res, 'Token expired');

      if (resolved.checkRevocation) {
        const revoked = await resolved.checkRevocation(payload.sub, payload.iat ?? 0);
        if (revoked) return unauthorized(res, 'Token revoked');
      }

      req.auth = payload;
      return next();
    }

    // ── Service mode: decode + optional remote validation ─────────────────
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
 * Exige permission específica. Usa o claim `permissions` do JWT (AC-SE-09) —
 * zero requests adicionais. Mesmo comportamento em service e embedded mode.
 *
 * Deve ser aplicado **depois** de `requireAuth()`.
 */
export function requirePermission(
  permission: string,
  opts?: MiddlewareOptions
): RequestHandler {
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
