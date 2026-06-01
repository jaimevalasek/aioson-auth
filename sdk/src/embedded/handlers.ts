import { Router, json } from 'express';
import type { CookieOptions, Request, Response } from 'express';
import { createQueries } from './queries.js';
import { createRevocationChecker, type RevocationChecker } from './revocation-checker.js';
import type { DbProvider, PrismaClientLike } from './types.js';
import {
  loginCore,
  signupCore,
  refreshCore,
  logoutCore,
  meCore,
  passwordResetRequestCore,
  passwordResetConfirmCore,
  type FlowDeps,
} from '../core/flows.js';
import type { AuthResult } from '../core/result.js';

export { COOKIE_ACCESS, COOKIE_REFRESH } from '../core/cookies.js';

export interface EmbeddedHandlerConfig {
  prisma: PrismaClientLike;
  provider: DbProvider;
  jwtSecret: string;
  bindingId: string;
  /** Domain exato do cookie (AC-SE-15). Sem dot prefix. Se omitido, cookie fica sem Domain (browser usa request origin). */
  cookieDomain?: string;
  /** Default `true`. Setar `false` apenas em dev local sem HTTPS. */
  secureCookies?: boolean;
  /** D2 signup policy — when false AND a user already exists, signup is rejected. Default true. */
  allowSignup?: boolean;
  /** Role granted to the first user (bootstrap). Default 'admin'. */
  firstUserRole?: string;
  /** Role granted to subsequent signups. Default 'viewer'. */
  defaultRole?: string;
}

// ─── Cookie / transport translation (AC-SE-15) ──────────────────────────────

function cookieOpts(config: EmbeddedHandlerConfig, maxAgeSecs: number): CookieOptions {
  const opts: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: config.secureCookies ?? true,
    sameSite: 'lax',
    maxAge: maxAgeSecs * 1000,
  };
  if (config.cookieDomain) opts.domain = config.cookieDomain;
  return opts;
}

/** Translate a framework-neutral AuthResult into an Express response. */
function applyResult(res: Response, result: AuthResult, config: EmbeddedHandlerConfig): void {
  if (result.setCookies) {
    for (const c of result.setCookies) {
      res.cookie(c.name, c.value, cookieOpts(config, c.maxAgeSecs));
    }
  }
  if (result.clearCookies) {
    const opts = cookieOpts(config, 0);
    for (const name of result.clearCookies) res.clearCookie(name, opts);
  }
  res.status(result.status).json(result.body);
}

function extractBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7).trim();
  return null;
}

function fail500(res: Response, scope: string, e: unknown): void {
  console.error(`[aioson-auth/embedded] ${scope} error:`, e);
  res.status(500).json({ error: 'Internal server error' });
}

// ─── Router factory ─────────────────────────────────────────────────────────
//
// Thin Express adapter (architecture.md § 6, D1): every route delegates to the
// framework-neutral core in src/core/flows.ts and only translates transport.

export function createAuthRouter(config: EmbeddedHandlerConfig): Router {
  const router = Router();
  const checkRevocation = createRevocationChecker(config.prisma, config.provider) as RevocationChecker & {
    invalidate: (u: string) => void;
  };
  const deps: FlowDeps = {
    queries: createQueries(config.prisma, config.provider),
    jwtSecret: config.jwtSecret,
    bindingId: config.bindingId,
    checkRevocation,
    allowSignup: config.allowSignup,
    firstUserRole: config.firstUserRole,
    defaultRole: config.defaultRole,
  };

  router.use(json());

  // POST /login (AC-SE-05, AC-SE-06, AC-SE-15)
  router.post('/login', async (req: Request, res: Response) => {
    try {
      applyResult(res, await loginCore(deps, req.body ?? {}), config);
    } catch (e) { fail500(res, 'login', e); }
  });

  // POST /signup (D2 — standalone self-service registration)
  router.post('/signup', async (req: Request, res: Response) => {
    try {
      applyResult(res, await signupCore(deps, req.body ?? {}), config);
    } catch (e) { fail500(res, 'signup', e); }
  });

  // POST /refresh (AC-SE-06, AC-SE-15)
  router.post('/refresh', async (req: Request, res: Response) => {
    try {
      applyResult(res, await refreshCore(deps, req.body ?? {}), config);
    } catch (e) { fail500(res, 'refresh', e); }
  });

  // POST /logout (AC-SE-07, AC-SE-15)
  router.post('/logout', async (req: Request, res: Response) => {
    try {
      applyResult(res, await logoutCore(deps, { token: extractBearerToken(req) }), config);
    } catch (e) { fail500(res, 'logout', e); }
  });

  // GET /me (AC-SE-08)
  router.get('/me', async (req: Request, res: Response) => {
    try {
      applyResult(res, await meCore(deps, { token: extractBearerToken(req) }), config);
    } catch (e) { fail500(res, 'me', e); }
  });

  // POST /password-reset/request (AC-SE-10)
  router.post('/password-reset/request', async (req: Request, res: Response) => {
    try {
      applyResult(res, await passwordResetRequestCore(deps, req.body ?? {}), config);
    } catch (e) { fail500(res, 'password-reset/request', e); }
  });

  // POST /password-reset/confirm (AC-SE-11)
  router.post('/password-reset/confirm', async (req: Request, res: Response) => {
    try {
      applyResult(res, await passwordResetConfirmCore(deps, req.body ?? {}), config);
    } catch (e) { fail500(res, 'password-reset/confirm', e); }
  });

  return router;
}
