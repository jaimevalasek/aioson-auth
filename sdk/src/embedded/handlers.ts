import { Router, json } from 'express';
import type { CookieOptions, Request, Response } from 'express';
import {
  generateId,
  generateResetToken,
  hashPassword,
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyJwt,
  verifyPassword,
  ACCESS_TTL_SECS,
  REFRESH_TTL_SECS,
  REVOCATION_TTL_SECS,
  RESET_TOKEN_TTL_SECS,
} from './auth-crypto.js';
import { createQueries } from './queries.js';
import { createRevocationChecker, type RevocationChecker } from './revocation-checker.js';
import type { DbProvider, PrismaClientLike } from './types.js';

export const COOKIE_ACCESS = 'aioson_access';
export const COOKIE_REFRESH = 'aioson_refresh';

export interface EmbeddedHandlerConfig {
  prisma: PrismaClientLike;
  provider: DbProvider;
  jwtSecret: string;
  bindingId: string;
  /** Domain exato do cookie (AC-SE-15). Sem dot prefix. Se omitido, cookie fica sem Domain (browser usa request origin). */
  cookieDomain?: string;
  /** Default `true`. Setar `false` apenas em dev local sem HTTPS. */
  secureCookies?: boolean;
}

// ─── Cookie helpers (AC-SE-15) ──────────────────────────────────────────────

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

function setAuthCookies(res: Response, accessToken: string, refreshToken: string, config: EmbeddedHandlerConfig): void {
  res.cookie(COOKIE_ACCESS, accessToken, cookieOpts(config, ACCESS_TTL_SECS));
  res.cookie(COOKIE_REFRESH, refreshToken, cookieOpts(config, REFRESH_TTL_SECS));
}

function clearAuthCookies(res: Response, config: EmbeddedHandlerConfig): void {
  const opts = cookieOpts(config, 0);
  res.clearCookie(COOKIE_ACCESS, opts);
  res.clearCookie(COOKIE_REFRESH, opts);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7).trim();
  return null;
}

function err(res: Response, status: number, message: string): void {
  res.status(status).json({ error: message });
}

// ─── Router factory ─────────────────────────────────────────────────────────

export function createAuthRouter(config: EmbeddedHandlerConfig): Router {
  const router = Router();
  const q = createQueries(config.prisma, config.provider);
  const checkRevocation: RevocationChecker & { invalidate: (u: string) => void } =
    createRevocationChecker(config.prisma, config.provider) as RevocationChecker & { invalidate: (u: string) => void };
  const { jwtSecret, bindingId } = config;

  router.use(json());

  // POST /login (AC-SE-05, AC-SE-06, AC-SE-15)
  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body ?? {};
      if (!email || !password) return err(res, 400, 'Email and password required');

      const user = await q.findUserByEmail(String(email));
      if (!user) return err(res, 401, 'Invalid credentials');

      const valid = await verifyPassword(String(password), user.password_hash);
      if (!valid) return err(res, 401, 'Invalid credentials');

      const permissions = await q.getUserPermissions(user.id, bindingId);
      const accessToken = signAccessToken({ id: user.id, email: user.email }, bindingId, permissions, jwtSecret);
      const refreshToken = signRefreshToken({ id: user.id, email: user.email }, bindingId, jwtSecret);

      await q.updateLastLogin(user.id);
      setAuthCookies(res, accessToken, refreshToken, config);

      res.status(200).json({
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (e) {
      console.error('[aioson-auth/embedded] login error:', e);
      err(res, 500, 'Internal server error');
    }
  });

  // POST /refresh (AC-SE-06, AC-SE-15)
  router.post('/refresh', async (req: Request, res: Response) => {
    try {
      const { refreshToken: rt } = req.body ?? {};
      if (!rt) return err(res, 400, 'Refresh token required');

      const payload = verifyJwt(String(rt), jwtSecret);
      if (!payload || payload.type !== 'refresh') return err(res, 401, 'Invalid refresh token');

      if (await checkRevocation(payload.sub, payload.iat)) return err(res, 401, 'Token revoked');

      const user = await q.findUserById(payload.sub);
      if (!user) return err(res, 401, 'User not found');

      const permissions = await q.getUserPermissions(user.id, bindingId);
      const accessToken = signAccessToken({ id: user.id, email: user.email }, bindingId, permissions, jwtSecret);
      const newRefreshToken = signRefreshToken({ id: user.id, email: user.email }, bindingId, jwtSecret);

      setAuthCookies(res, accessToken, newRefreshToken, config);

      res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (e) {
      console.error('[aioson-auth/embedded] refresh error:', e);
      err(res, 500, 'Internal server error');
    }
  });

  // POST /logout (AC-SE-07, AC-SE-15)
  router.post('/logout', async (req: Request, res: Response) => {
    try {
      const token = extractBearerToken(req);
      if (token) {
        const payload = verifyJwt(token, jwtSecret);
        if (payload) {
          const expiresAt = new Date(Date.now() + REVOCATION_TTL_SECS * 1000);
          await q.insertRevocation({
            id: generateId(),
            userId: payload.sub,
            reason: 'logout',
            expiresAt,
          });
          checkRevocation.invalidate(payload.sub);
        }
      }
      clearAuthCookies(res, config);
      res.status(200).json({ success: true });
    } catch (e) {
      console.error('[aioson-auth/embedded] logout error:', e);
      err(res, 500, 'Internal server error');
    }
  });

  // GET /me (AC-SE-08)
  router.get('/me', async (req: Request, res: Response) => {
    try {
      const token = extractBearerToken(req);
      if (!token) return err(res, 401, 'Missing token');

      const payload = verifyJwt(token, jwtSecret);
      if (!payload) return err(res, 401, 'Invalid or expired token');

      if (await checkRevocation(payload.sub, payload.iat)) return err(res, 401, 'Token revoked');

      res.status(200).json({
        sub: payload.sub,
        email: payload.email,
        binding_id: payload.binding_id,
        permissions: payload.permissions,
      });
    } catch (e) {
      console.error('[aioson-auth/embedded] me error:', e);
      err(res, 500, 'Internal server error');
    }
  });

  // POST /password-reset/request (AC-SE-10)
  router.post('/password-reset/request', async (req: Request, res: Response) => {
    try {
      const { email } = req.body ?? {};
      if (!email) return err(res, 400, 'Email required');

      const user = await q.findUserByEmail(String(email));
      if (user) {
        const { raw, hash } = generateResetToken();
        const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_SECS * 1000);
        await q.insertResetToken({
          id: generateId(),
          userId: user.id,
          tokenHash: hash,
          expiresAt,
        });
        console.log(`[aioson-auth/embedded] Password reset token generated for ${email}: ${raw}`);
      }

      res.status(200).json({ sent: true });
    } catch (e) {
      console.error('[aioson-auth/embedded] password-reset/request error:', e);
      err(res, 500, 'Internal server error');
    }
  });

  // POST /password-reset/confirm (AC-SE-11)
  router.post('/password-reset/confirm', async (req: Request, res: Response) => {
    try {
      const { token: rawToken, newPassword } = req.body ?? {};
      if (!rawToken || !newPassword) return err(res, 400, 'Token and newPassword required');

      const tokenHash = hashToken(String(rawToken));
      const resetEntry = await q.findValidResetToken(tokenHash);
      if (!resetEntry) return err(res, 400, 'Invalid or expired token');

      const newHash = await hashPassword(String(newPassword));
      await q.updatePassword(resetEntry.user_id, newHash);
      await q.markResetTokenUsed(resetEntry.id);

      const expiresAt = new Date(Date.now() + REVOCATION_TTL_SECS * 1000);
      await q.insertRevocation({
        id: generateId(),
        userId: resetEntry.user_id,
        reason: 'password_change',
        expiresAt,
      });
      checkRevocation.invalidate(resetEntry.user_id);

      clearAuthCookies(res, config);
      res.status(200).json({ success: true });
    } catch (e) {
      console.error('[aioson-auth/embedded] password-reset/confirm error:', e);
      err(res, 500, 'Internal server error');
    }
  });

  return router;
}
