import { Router } from 'express';
import {
  register,
  login,
  oauthLogin,
  verifyAccessToken,
  validateRefreshToken,
  logout,
  forgotPassword,
  resetPassword,
} from '../actions/AuthAction.js';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const authRouter = Router({ mergeParams: true });

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
  providerId: z.string(),
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
authRouter.post('/:bindingId/register', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
    if (!binding) return res.status(404).json({ error: 'Binding not found' });

    const parsed = RegisterSchema.parse(req.body);
    const result = await register(parsed.email, parsed.password);
    return res.status(201).json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('[auth/register]', err);
    return res.status(400).json({ error: String(err) });
  }
});

// POST /api/auth/:bindingId/login
authRouter.post('/:bindingId/login', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
    if (!binding) return res.status(404).json({ error: 'Binding not found' });

    const parsed = LoginSchema.parse(req.body);
    const result = await login(parsed.email, parsed.password);
    return res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('[auth/login]', err);
    return res.status(401).json({ error: String(err) });
  }
});

// POST /api/auth/:bindingId/oauth
authRouter.post('/:bindingId/oauth', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const binding = await prisma.appBinding.findUnique({ where: { id: bindingId } });
    if (!binding) return res.status(404).json({ error: 'Binding not found' });

    const parsed = OAuthSchema.parse(req.body);
    const result = await oauthLogin(parsed.email, parsed.name);
    return res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('[auth/oauth]', err);
    return res.status(400).json({ error: String(err) });
  }
});

// POST /api/auth/:bindingId/refresh
authRouter.post('/:bindingId/refresh', async (req, res) => {
  try {
    const parsed = RefreshSchema.parse(req.body);
    const result = await validateRefreshToken(parsed.refreshToken);
    return res.json(result);
  } catch (err) {
    console.error('[auth/refresh]', err);
    return res.status(401).json({ error: String(err) });
  }
});

// POST /api/auth/:bindingId/logout
authRouter.post('/:bindingId/logout', async (req, res) => {
  try {
    const parsed = LogoutSchema.parse(req.body);
    await logout(parsed.refreshToken);
    return res.status(204).send();
  } catch (err) {
    console.error('[auth/logout]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// POST /api/auth/:bindingId/forgot-password
authRouter.post('/:bindingId/forgot-password', async (req, res) => {
  try {
    const parsed = ForgotSchema.parse(req.body);
    const result = await forgotPassword(parsed.email);
    return res.json(result);
  } catch (err) {
    console.error('[auth/forgot-password]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// POST /api/auth/:bindingId/reset-password
authRouter.post('/:bindingId/reset-password', async (req, res) => {
  try {
    const parsed = ResetSchema.parse(req.body);
    const result = await resetPassword(parsed.token, parsed.newPassword);
    return res.json(result);
  } catch (err) {
    console.error('[auth/reset-password]', err);
    return res.status(400).json({ error: String(err) });
  }
});

// GET /api/auth/:bindingId/me?token=xxx
authRouter.get('/:bindingId/me', async (req, res) => {
  try {
    const token = req.query['token'] as string | undefined;
    if (!token) return res.status(401).json({ error: 'Missing token' });

    const payload = await verifyAccessToken(token);
    return res.json(payload);
  } catch (err) {
    return res.status(401).json({ error: String(err) });
  }
});
