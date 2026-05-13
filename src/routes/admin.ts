import { Router, type Request } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { adminLogin, verifyAdminToken } from '../actions/AdminAuthAction.js';
import {
  createGlobalUser,
  deleteGlobalUser,
  listGlobalUsers,
  updateGlobalUser,
} from '../actions/RbacAction.js';
import { prisma } from '../lib/prisma.js';
import { revokeUserTokens } from '../actions/TokenRevocationAction.js';

export const adminRouter = Router();

const UserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().optional().default(''),
  password: z.string().min(8).optional(),
});

function requireAdmin(req: Request) {
  const header = req.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : '';
  if (!token) throw new Error('missing_admin_token');
  return verifyAdminToken(token);
}

function isAuthError(err: unknown) {
  const message = String(err);
  return message.includes('missing_admin_token') || message.includes('jwt') || message.includes('JsonWebToken');
}

adminRouter.post('/login', async (req, res) => {
  try {
    const result = await adminLogin(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(401).json({ error: String(err) });
  }
});

adminRouter.get('/users', async (req, res) => {
  try {
    requireAdmin(req);
    const users = await listGlobalUsers();
    const roles = await prisma.userRole.findMany({
      include: { role: true },
      orderBy: { created_at: 'desc' },
    });
    const bindings = await prisma.appBinding.findMany({
      select: { id: true, app_name: true, app_slug: true },
    });
    const bindingById = new Map(bindings.map((binding) => [binding.id, binding]));
    return res.json(users.map((user) => ({
      ...user,
      roles: roles
        .filter((userRole) => userRole.user_id === user.id)
        .map((userRole) => ({
          id: userRole.id,
          binding_id: userRole.binding_id,
          binding_name: bindingById.get(userRole.binding_id)?.app_name ?? userRole.binding_id,
          binding_slug: bindingById.get(userRole.binding_id)?.app_slug ?? '',
          role_id: userRole.role_id,
          role_name: userRole.role.name,
        })),
    })));
  } catch (err) {
    return res.status(isAuthError(err) ? 401 : 500).json({ error: String(err) });
  }
});

adminRouter.post('/users', async (req, res) => {
  try {
    requireAdmin(req);
    const parsed = UserInputSchema.required({ password: true }).parse(req.body);
    const hash = await bcrypt.hash(parsed.password, 12);
    const user = await createGlobalUser(parsed.email, hash, parsed.name);
    return res.status(201).json({ id: user.id, email: user.email, name: user.name, created_at: user.created_at, updated_at: user.updated_at });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'validation_failed', details: err.errors });
    const message = String(err);
    if (message.includes('Unique constraint') || message.includes('Email already')) {
      return res.status(409).json({ error: 'email_already_registered' });
    }
    return res.status(isAuthError(err) ? 401 : 500).json({ error: message });
  }
});

adminRouter.patch('/users/:userId', async (req, res) => {
  try {
    requireAdmin(req);
    const parsed = UserInputSchema.partial().parse(req.body);
    const data: { email?: string; name?: string; password_hash?: string } = {};
    if (parsed.email !== undefined) data.email = parsed.email;
    if (parsed.name !== undefined) data.name = parsed.name;
    if (parsed.password) data.password_hash = await bcrypt.hash(parsed.password, 12);
    const user = await updateGlobalUser(req.params.userId, data);
    return res.json({ id: user.id, email: user.email, name: user.name, created_at: user.created_at, updated_at: user.updated_at });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'validation_failed', details: err.errors });
    const message = String(err);
    if (message.includes('Unique constraint')) return res.status(409).json({ error: 'email_already_registered' });
    return res.status(isAuthError(err) ? 401 : 500).json({ error: message });
  }
});

adminRouter.delete('/users/:userId', async (req, res) => {
  try {
    requireAdmin(req);
    const assignments = await prisma.userRole.findMany({
      where: { user_id: req.params.userId },
      select: { binding_id: true },
    });
    for (const assignment of assignments) {
      await revokeUserTokens(req.params.userId, assignment.binding_id);
    }
    await deleteGlobalUser(req.params.userId);
    return res.status(204).send();
  } catch (err) {
    return res.status(isAuthError(err) ? 401 : 500).json({ error: String(err) });
  }
});
