import type { Request } from 'express';
import rateLimit from 'express-rate-limit';
import { AuthError, sendAuthError } from '../lib/auth-error.js';

const AUTH_RATE_LIMIT_WINDOW_MS = 60_000;
const AUTH_RATE_LIMIT = 10;

function getAuthOperation(req: Request): string {
  return req.path.split('/').filter(Boolean).pop() ?? 'auth';
}

function getAuthIdentifier(req: Request): string {
  const body = req.body as Record<string, unknown> | undefined;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  return email || 'anonymous';
}

function createAuthRateLimiter(keyGenerator: (req: Request) => string) {
  return rateLimit({
    windowMs: AUTH_RATE_LIMIT_WINDOW_MS,
    limit: AUTH_RATE_LIMIT,
    keyGenerator,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req, res) => {
      const bindingId = typeof req.params.bindingId === 'string' ? req.params.bindingId : undefined;
      sendAuthError(
        req,
        res,
        new AuthError('rate_limited'),
        getAuthOperation(req),
        bindingId,
      );
    },
  });
}

// Keep independent buckets so an attacker cannot trade identifier diversity
// for unlimited attempts from one IP, or rotate IPs against one identifier.
const authRateLimiterByIp = createAuthRateLimiter(
  (req) => `${getAuthOperation(req)}:${req.ip ?? 'unknown'}`,
);
const authRateLimiterByIdentifier = createAuthRateLimiter(
  (req) => `${getAuthOperation(req)}:${getAuthIdentifier(req)}`,
);

export const authRateLimiters = [authRateLimiterByIp, authRateLimiterByIdentifier];
