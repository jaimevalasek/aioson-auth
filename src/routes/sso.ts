import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { getRefreshSessionUser, login, validateRefreshToken, type LoginOutput } from '../actions/AuthAction.js';
import { authRateLimiters } from '../middleware/auth-rate-limit.js';
import { AuthError, sendAuthError } from '../lib/auth-error.js';
import { isAllowedSsoRedirectUri } from '../lib/sso-redirect.js';

export const ssoRouter = Router();

const SSO_COOKIE = 'aioson_sso_session';
const SSO_COOKIE_TTL_SECS = 7 * 24 * 60 * 60;

const AuthorizeSchema = z.object({
  binding_id: z.string().min(1),
  redirect_uri: z.string().url(),
});

// GET /sso/authorize?binding_id=X&redirect_uri=https://app.domain.com/sso/callback
//
// If user has a valid SSO cookie, issue tokens for the binding and redirect
// back with the callback values in the URL fragment (never the query string).
// If not → redirect to /sso/login with the same params so the user logs in first.
ssoRouter.get('/authorize', async (req: Request, res: Response) => {
  const parsed = AuthorizeSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: 'binding_id and redirect_uri are required' });
  }

  const { binding_id, redirect_uri } = parsed.data;

  if (!isAllowedSsoRedirectUri(redirect_uri)) {
    return sendAuthError(req, res, new AuthError('redirect_uri_not_allowed'), 'sso_authorize', binding_id);
  }

  const binding = await prisma.appBinding.findUnique({ where: { id: binding_id } });
  if (!binding) {
    return res.status(404).json({ error: 'Binding not found' });
  }

  // Check for existing SSO session cookie
  const ssoCookie = req.cookies?.[SSO_COOKIE];
  if (ssoCookie) {
    try {
      const session = await validateRefreshToken(ssoCookie, binding_id);
      return redirectWithTokens(res, redirect_uri, session);
    } catch {
      // Cookie invalid/expired — clear it and show login
      res.clearCookie(SSO_COOKIE);
    }
  }

  // No valid session → redirect to login page
  const loginUrl = `/sso/login?binding_id=${encodeURIComponent(binding_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  return res.redirect(loginUrl);
});

// POST /sso/authenticate — called by the SsoLoginPage after user submits credentials.
// Sets the SSO cookie and redirects back to the app with tokens.
ssoRouter.post('/authenticate', ...authRateLimiters, async (req: Request, res: Response) => {
  const BodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    binding_id: z.string().min(1),
    redirect_uri: z.string().url(),
  });

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'invalid input' });
  }

  const { email, password, binding_id, redirect_uri } = parsed.data;

  if (!isAllowedSsoRedirectUri(redirect_uri)) {
    return sendAuthError(req, res, new AuthError('redirect_uri_not_allowed'), 'sso_authenticate', binding_id);
  }

  try {
    const binding = await prisma.appBinding.findUnique({ where: { id: binding_id } });
    if (!binding) throw new AuthError('binding_not_found');
    const session = await login(email, password, binding_id);

    // Set httpOnly SSO cookie with the refresh token
    res.cookie(SSO_COOKIE, session.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SSO_COOKIE_TTL_SECS * 1000,
      path: '/',
    });

    return res.json({
      ok: true,
      redirect: buildCallbackUrl(redirect_uri, session),
    });
  } catch (err) {
    return sendAuthError(req, res, err, 'sso_authenticate', binding_id);
  }
});

// GET /sso/status — check if the user has an active SSO session (for dashboard)
ssoRouter.get('/status', async (req: Request, res: Response) => {
  const ssoCookie = req.cookies?.[SSO_COOKIE];
  if (!ssoCookie) {
    return res.json({ authenticated: false });
  }

  try {
    const user = await getRefreshSessionUser(ssoCookie);
    return res.json({
      authenticated: true,
      user,
    });
  } catch {
    res.clearCookie(SSO_COOKIE);
    return res.json({ authenticated: false });
  }
});

// POST /sso/logout — clear the SSO cookie
ssoRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie(SSO_COOKIE);
  return res.json({ ok: true });
});

function redirectWithTokens(res: Response, redirectUri: string, session: LoginOutput) {
  const url = buildCallbackUrl(redirectUri, session);
  return res.redirect(url);
}

export function buildCallbackUrl(redirectUri: string, session: LoginOutput): string {
  const url = new URL(redirectUri);
  url.hash = new URLSearchParams({
    token: session.accessToken,
    refresh: session.refreshToken,
    user_id: session.user.id,
    email: session.user.email,
  }).toString();
  return url.toString();
}
