import { Router } from 'express';
import { z } from 'zod';
import { verifyAccessToken } from '../actions/AuthAction.js';
import { getBinding } from '../actions/AppBindingAction.js';
import {
  generateTotpSecret,
  verifyTotpSetup,
  disableTotp,
} from '../actions/TwoFactorAction.js';
import {
  listGlobalUsers,
  createGlobalUser,
  deleteGlobalUser,
  listRoles,
  createRole,
  updateRole,
  deleteRole,
  listBindingPermissions,
  createBindingPermission,
  deleteBindingPermission,
  assignPermissionToRole,
  removePermissionFromRole,
  getRolePermissionsForBinding,
  assignUserRole,
  removeUserRole,
  getUserBindingRolesWithPerms,
  checkUserPermissionForBinding,
} from '../actions/RbacAction.js';

export const rbacRouter = Router({ mergeParams: true });

// ─── 2FA Routes ────────────────────────────────────────────────────────

rbacRouter.post('/:bindingId/2fa/setup', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const token = req.query['token'] as string | undefined;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    const payload = await verifyAccessToken(token);
    const result = await generateTotpSecret(bindingId, payload.sub);
    return res.json(result);
  } catch (err) {
    console.error('[2fa/setup]', err);
    return res.status(400).json({ error: String(err) });
  }
});

rbacRouter.post('/:bindingId/2fa/verify', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const token = req.query['token'] as string | undefined;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    const payload = await verifyAccessToken(token);
    const schema = z.object({ totpToken: z.string().length(6) });
    const { totpToken } = schema.parse(req.body);
    const result = await verifyTotpSetup(bindingId, payload.sub, totpToken);
    return res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[2fa/verify]', err);
    return res.status(400).json({ error: String(err) });
  }
});

rbacRouter.post('/:bindingId/2fa/disable', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const token = req.query['token'] as string | undefined;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    const payload = await verifyAccessToken(token);
    await disableTotp(bindingId, payload.sub);
    return res.json({ disabled: true });
  } catch (err) {
    console.error('[2fa/disable]', err);
    return res.status(400).json({ error: String(err) });
  }
});

// ─── RBAC: Users (global) ──────────────────────────────────────────────

rbacRouter.get('/:bindingId/rbac/users', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const binding = await getBinding(bindingId);
    if (!binding) return res.status(404).json({ error: 'Binding not found' });
    if (!binding.enable_rbac) return res.status(403).json({ error: 'RBAC is not enabled for this binding' });
    const users = await listGlobalUsers();
    return res.json(users);
  } catch (err) {
    console.error('[rbac/users]', err);
    return res.status(500).json({ error: String(err) });
  }
});

rbacRouter.post('/:bindingId/rbac/users', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const binding = await getBinding(bindingId);
    if (!binding) return res.status(404).json({ error: 'Binding not found' });
    if (!binding.enable_rbac) return res.status(403).json({ error: 'RBAC is not enabled for this binding' });
    const schema = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().optional() });
    const { email, password, name } = schema.parse(req.body);
    const bcrypt = await import('bcrypt');
    const hash = await bcrypt.hash(password, 10);
    const user = await createGlobalUser(email, hash, name);
    return res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[rbac/users/create]', err);
    return res.status(500).json({ error: String(err) });
  }
});

rbacRouter.delete('/:bindingId/rbac/users/:userId', async (req, res) => {
  try {
    const { bindingId, userId } = req.params;
    // Revoga JWTs ativos ANTES de deletar (ADR-07): se delete falhar, ao
    // menos os tokens já não passam pelo verifyAccessToken. Idempotente.
    const { revokeUserTokens } = await import('../actions/TokenRevocationAction.js');
    await revokeUserTokens(userId, bindingId);
    await deleteGlobalUser(userId);
    return res.status(204).send();
  } catch (err) {
    console.error('[rbac/users/delete]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// ─── RBAC: Roles (global) ─────────────────────────────────────────────

// GET /:bindingId/rbac/roles — list all global roles
rbacRouter.get('/:bindingId/rbac/roles', async (req, res) => {
  try {
    const roles = await listRoles();
    return res.json(roles);
  } catch (err) {
    console.error('[rbac/roles]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// POST /rbac/roles — create global role
rbacRouter.post('/rbac/roles', async (req, res) => {
  try {
    const schema = z.object({ name: z.string().min(1), description: z.string().optional() });
    const { name, description } = schema.parse(req.body);
    const role = await createRole(name, description);
    return res.status(201).json(role);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[rbac/roles/create]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// PATCH /rbac/roles/:roleId — update global role
rbacRouter.patch('/rbac/roles/:roleId', async (req, res) => {
  try {
    const schema = z.object({ name: z.string().min(1), description: z.string().optional() });
    const { name, description } = schema.parse(req.body);
    const role = await updateRole(req.params['roleId'], name, description);
    return res.json(role);
  } catch (err) {
    console.error('[rbac/roles/update]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// DELETE /rbac/roles/:roleId — delete global role
rbacRouter.delete('/rbac/roles/:roleId', async (req, res) => {
  try {
    await deleteRole(req.params['roleId']);
    return res.status(204).send();
  } catch (err) {
    console.error('[rbac/roles/delete]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// ─── RBAC: Permissions (per binding) ─────────────────────────────────

rbacRouter.get('/:bindingId/rbac/permissions', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const perms = await listBindingPermissions(bindingId);
    return res.json(perms);
  } catch (err) {
    if (String(err).includes('(403)')) return res.status(403).json({ error: String(err) });
    console.error('[rbac/permissions]', err);
    return res.status(500).json({ error: String(err) });
  }
});

rbacRouter.post('/:bindingId/rbac/permissions', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const schema = z.object({ name: z.string().min(1), resource: z.string().min(1), action: z.string().min(1) });
    const { name, resource, action } = schema.parse(req.body);
    const perm = await createBindingPermission(bindingId, name, resource, action);
    return res.status(201).json(perm);
  } catch (err) {
    if (String(err).includes('(403)')) return res.status(403).json({ error: String(err) });
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[rbac/permissions/create]', err);
    return res.status(500).json({ error: String(err) });
  }
});

rbacRouter.delete('/:bindingId/rbac/permissions/:permissionId', async (req, res) => {
  try {
    const { bindingId, permissionId } = req.params;
    await deleteBindingPermission(bindingId, permissionId);
    return res.status(204).send();
  } catch (err) {
    if (String(err).includes('(403)')) return res.status(403).json({ error: String(err) });
    console.error('[rbac/permissions/delete]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// ─── Role ↔ Permission (per binding) ─────────────────────────────────

// GET /rbac/roles/:roleId/permissions?bindingId=xxx
rbacRouter.get('/rbac/roles/:roleId/permissions', async (req, res) => {
  try {
    const { roleId } = req.params;
    const bindingId = req.query['bindingId'] as string | undefined;
    if (!bindingId) return res.status(400).json({ error: 'bindingId query param required' });
    const perms = await getRolePermissionsForBinding(roleId, bindingId);
    return res.json(perms);
  } catch (err) {
    console.error('[rbac/role/permissions]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// POST /rbac/roles/:roleId/permissions — body: { permissionId, bindingId }
rbacRouter.post('/rbac/roles/:roleId/permissions', async (req, res) => {
  try {
    const { roleId } = req.params;
    const schema = z.object({ permissionId: z.string(), bindingId: z.string() });
    const { permissionId, bindingId } = schema.parse(req.body);
    await assignPermissionToRole(roleId, permissionId, bindingId);
    return res.status(201).json({ assigned: true });
  } catch (err) {
    if (String(err).includes('(403)')) return res.status(403).json({ error: String(err) });
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[rbac/role/perm/assign]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// DELETE /rbac/roles/:roleId/permissions/:permissionId?bindingId=xxx
rbacRouter.delete('/rbac/roles/:roleId/permissions/:permissionId', async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;
    const bindingId = req.query['bindingId'] as string | undefined;
    if (!bindingId) return res.status(400).json({ error: 'bindingId query param required' });
    await removePermissionFromRole(roleId, permissionId, bindingId);
    return res.status(204).send();
  } catch (err) {
    console.error('[rbac/role/perm/remove]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// ─── User ↔ Role (per binding) ────────────────────────────────────────

// POST /:bindingId/rbac/users/:userId/roles — body: { roleId }
//
// BR-15/BR-16/AC-15: o role `owner` é reservado pra owner-implicit bypass
// (Bearer aioson.com → owner em runtime). NUNCA pode ser atribuído via API
// nem via UI (frontend filtra; backend rejeita aqui pra defesa em profundidade).
rbacRouter.post('/:bindingId/rbac/users/:userId/roles', async (req, res) => {
  try {
    const { bindingId, userId } = req.params;
    const binding = await getBinding(bindingId);
    if (!binding) return res.status(404).json({ error: 'Binding not found' });
    if (!binding.enable_rbac) return res.status(403).json({ error: 'RBAC is not enabled for this binding' });
    const schema = z.object({ roleId: z.string() });
    const { roleId } = schema.parse(req.body);
    const allRoles = await listRoles();
    const target = allRoles.find((r) => r.id === roleId);
    if (!target) return res.status(400).json({ error: 'Role not found' });
    if (target.name === 'owner') {
      return res.status(403).json({ error: 'owner_role_reserved', message: 'O role `owner` é reservado e não pode ser atribuído via API.' });
    }
    await assignUserRole(userId, roleId, bindingId);
    return res.status(201).json({ assigned: true });
  } catch (err) {
    if (String(err).includes('(403)')) return res.status(403).json({ error: String(err) });
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[rbac/user-role/assign]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// DELETE /:bindingId/rbac/users/:userId/roles/:roleId
//
// Decisão #3 do pivot S2.4 (chat-sessions/2026-05-07): desvincular dispara
// revogação imediata dos JWTs deste binding, escopado ao binding (operador
// continua válido em outros apps onde estiver vinculado). Mesma ordem do
// DELETE user: revoga ANTES do remove pra que mesmo se remove falhar, os
// tokens deixem de passar verifyAccessToken. revokeUserTokens é idempotente.
rbacRouter.delete('/:bindingId/rbac/users/:userId/roles/:roleId', async (req, res) => {
  try {
    const { bindingId, userId, roleId } = req.params;
    const { revokeUserTokens } = await import('../actions/TokenRevocationAction.js');
    await revokeUserTokens(userId, bindingId);
    await removeUserRole(userId, roleId, bindingId);
    return res.status(204).send();
  } catch (err) {
    console.error('[rbac/user-role/remove]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// GET /:bindingId/rbac/users/:userId — get user's roles+permissions for this binding
rbacRouter.get('/:bindingId/rbac/users/:userId', async (req, res) => {
  try {
    const { bindingId, userId } = req.params;
    const binding = await getBinding(bindingId);
    if (!binding) return res.status(404).json({ error: 'Binding not found' });
    if (!binding.enable_rbac) return res.json({ roles: [], permissions: [] });
    const result = await getUserBindingRolesWithPerms(userId, bindingId);
    return res.json(result);
  } catch (err) {
    console.error('[rbac/user]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// ─── Permission check (for app runtime) ────────────────────────────────

rbacRouter.get('/:bindingId/rbac/check', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const token = req.query['token'] as string | undefined;
    const permission = req.query['permission'] as string | undefined;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    if (!permission) return res.status(400).json({ error: 'Missing permission' });
    const payload = await verifyAccessToken(token);
    const allowed = await checkUserPermissionForBinding(payload.sub, bindingId, permission);
    return res.json({ allowed });
  } catch (err) {
    console.error('[rbac/check]', err);
    return res.status(500).json({ error: String(err) });
  }
});

// ─── System permission registration (merge on upgrade) ──────────────────

rbacRouter.post('/:bindingId/register-permissions', async (req, res) => {
  try {
    const { bindingId } = req.params;
    const schema = z.object({ permissions: z.array(z.string()) });
    const { permissions } = schema.parse(req.body);
    const { registerBindingPermissions } = await import('../actions/AppBindingAction.js');
    const result = await registerBindingPermissions(bindingId, permissions);
    return res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', details: err.errors });
    console.error('[rbac/register-permissions]', err);
    return res.status(500).json({ error: String(err) });
  }
});
