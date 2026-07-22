import { Router, type Request } from 'express';
import {
  register,
  login,
  validateRefreshToken,
  logout,
  forgotPassword,
  resetPassword,
} from '../actions/AuthAction.js';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { getUserPermissionsForBinding } from '../actions/RbacAction.js';
import { authenticateBindingRequest } from '../lib/binding-auth.js';
import { AuthError, sendAuthError } from '../lib/auth-error.js';
import { authRateLimiters } from '../middleware/auth-rate-limit.js';

export const authRouter = Router({ mergeParams: true });

function getBindingId(req: Request): string {
  const bindingId = req.params.bindingId;
  return typeof bindingId === 'string' ? bindingId : bindingId?.[0] ?? '';
}

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const OAuthSchema = z.object({
  email: z.string().email(),
  provider: z.enum(['google', 'github']),
  providerId: z.string().min(1),
  name: z.string().optional(),
});

const RefreshSchema = z.object({
  refreshToken: z.string(),
});

const LogoutSchema = z.object({
  refreshToken: z.string(),
});

const ForgotSchema = z.object({
  email: z.string().email(),
});

const ResetSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});

// POST /api/auth/:bindingId/register
authRouter.post('/:bindingId/register', ...authRateLimiters, async (req, res) => {
  try {
    const bindingId = getBindingId(req);
    const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
    if (!binding) throw new AuthError('binding_not_found');
    if (binding.enable_rbac) throw new AuthError('self_registration_disabled');

    const parsed = RegisterSchema.parse(req.body);
    const result = await register(parsed.email, parsed.password);
    return res.status(201).json(result);
  } catch (err) {
    return sendAuthError(req, res, err, 'register', getBindingId(req));
  }
});

// POST /api/auth/:bindingId/login
authRouter.post('/:bindingId/login', ...authRateLimiters, async (req, res) => {
  try {
    const bindingId = getBindingId(req);
    const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
    if (!binding) throw new AuthError('binding_not_found');

    const parsed = LoginSchema.parse(req.body);
    const result = await login(parsed.email, parsed.password, bindingId);
    return res.json(result);
  } catch (err) {
    return sendAuthError(req, res, err, 'login', getBindingId(req));
  }
});

// POST /api/auth/:bindingId/oauth
authRouter.post('/:bindingId/oauth', ...authRateLimiters, async (req, res) => {
  try {
    const bindingId = getBindingId(req);
    const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
    if (!binding) throw new AuthError('binding_not_found');

    OAuthSchema.parse(req.body);
    // Client-supplied email/providerId is not an OAuth proof. Keep this
    // endpoint fail-closed until a server-side provider verifier is wired.
    throw new AuthError('oauth_verification_required');
  } catch (err) {
    return sendAuthError(req, res, err, 'oauth', getBindingId(req));
  }
});

// POST /api/auth/:bindingId/refresh
authRouter.post('/:bindingId/refresh', async (req, res) => {
  try {
    const bindingId = getBindingId(req);
    const parsed = RefreshSchema.parse(req.body);
    const result = await validateRefreshToken(parsed.refreshToken, bindingId);
    return res.json(result);
  } catch (err) {
    return sendAuthError(req, res, err, 'refresh', getBindingId(req));
  }
});

// POST /api/auth/:bindingId/logout
authRouter.post('/:bindingId/logout', async (req, res) => {
  try {
    const bindingId = getBindingId(req);
    const parsed = LogoutSchema.parse(req.body);
    await logout(parsed.refreshToken, bindingId);
    return res.status(204).send();
  } catch (err) {
    return sendAuthError(req, res, err, 'logout', getBindingId(req));
  }
});

// POST /api/auth/:bindingId/forgot-password
authRouter.post('/:bindingId/forgot-password', ...authRateLimiters, async (req, res) => {
  try {
    const parsed = ForgotSchema.parse(req.body);
    const result = await forgotPassword(parsed.email);
    return res.json(result);
  } catch (err) {
    return sendAuthError(req, res, err, 'forgot_password', getBindingId(req));
  }
});

// POST /api/auth/:bindingId/reset-password
authRouter.post('/:bindingId/reset-password', ...authRateLimiters, async (req, res) => {
  try {
    const parsed = ResetSchema.parse(req.body);
    const result = await resetPassword(parsed.token, parsed.newPassword);
    return res.json(result);
  } catch (err) {
    return sendAuthError(req, res, err, 'reset_password', getBindingId(req));
  }
});

// GET /api/auth/:bindingId/me
// Aceita somente `Authorization: Bearer <jwt>`.
authRouter.get('/:bindingId/me', async (req, res) => {
  try {
    const payload = await authenticateBindingRequest(req, getBindingId(req));
    return res.json(payload);
  } catch (err) {
    return sendAuthError(req, res, err, 'me', getBindingId(req));
  }
});

// GET /api/auth/:bindingId/me/permissions
// Slice E (auth-integration-gaps.md): atalho pra apps que validam JWT
// offline (futuro JWKS) e só querem permissions agregadas fresh do server.
// Bate na mesma fonte de verdade que /rbac/check usa.
authRouter.get('/:bindingId/me/permissions', async (req, res) => {
  try {
    const bindingId = getBindingId(req);
    const payload = await authenticateBindingRequest(req, bindingId);
    const permissions = await getUserPermissionsForBinding(payload.sub, bindingId);
    return res.json({ permissions });
  } catch (err) {
    return sendAuthError(req, res, err, 'me_permissions', getBindingId(req));
  }
});
