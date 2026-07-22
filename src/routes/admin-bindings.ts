// S1B.4 da feature aioson-play-identity (ADR-02).
//
// `POST /api/auth/admin/bindings` — endpoint usado pelo aioson-play (Tauri,
// command `app_binding_enable_auth` em S1C.3) pra criar/recuperar o
// AppBinding correspondente a (aioson_play_id, app_slug).
//
// Auth: middleware `validateOwnerBearer` checa Bearer aioson.com + ownership.

import { Router } from 'express';
import { z } from 'zod';
import { validateOwnerBearer } from '../middleware/validate_owner_bearer.js';
import {
  upsertAdminBinding,
  isValidAcceptedRoles,
  isValidAppSlug,
} from '../actions/AdminBindingAction.js';
import {
  assignOwnedBindingRole,
  createOwnedBindingOperator,
  updateOwnedBindingOperator,
  deactivateOwnedBindingOperator,
  getOwnerBindingAdministration,
  listOwnedBindingUsers,
} from '../actions/OwnerBindingAdministrationAction.js';
import { logAuthEvent, sendAuthError } from '../lib/auth-error.js';
import { getRequestId } from '../lib/request-context.js';
import {
  archiveOwnedProfile,
  createOwnedPerson,
  createOwnedProfile,
  deleteOwnedPerson,
  getOwnedAppManagement,
  linkOwnedPerson,
  listOwnedPeople,
  setOwnedPersonDisabled,
  updateOwnedPerson,
  updateOwnedOrigins,
  updateOwnedProfile,
} from '../actions/AppManagementAction.js';

export const adminBindingsRouter = Router();

adminBindingsRouter.use(validateOwnerBearer);

const createSchema = z.object({
  app_slug: z.string().trim().min(1).max(100),
  app_name: z.string().trim().min(1).max(160),
  accepted_roles: z.array(z.string().trim().min(1).max(64)).max(32),
});

const identifierSchema = z.string().trim().min(1).max(191);
const operatorCreateSchema = z.object({ email: z.string().email().max(254), name: z.string().trim().min(1).max(160), role_id: identifierSchema });
const operatorUpdateSchema = z.object({ name: z.string().trim().min(1).max(160).optional(), role_id: identifierSchema.optional() }).refine((value) => value.name !== undefined || value.role_id !== undefined);
const profileSchema = z.object({
  name: z.string().trim().min(1).max(64),
  description: z.string().trim().max(240).default(''),
  permission_ids: z.array(identifierSchema).max(200),
}).strict();
const personLinkSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().trim().min(1).max(160),
  profile_id: identifierSchema.optional(),
}).strict();
const personStatusSchema = z.object({ disabled: z.boolean() }).strict();
const personCreateSchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().min(1).max(160),
  password: z.string().min(8).max(128).optional(),
}).strict();
const personUpdateSchema = z.object({
  email: z.string().trim().email().max(254).optional(),
  name: z.string().trim().min(1).max(160).optional(),
  password: z.string().min(8).max(128).optional(),
}).strict().refine((value) => Object.values(value).some((item) => item !== undefined));
const originsSchema = z.object({ origins: z.array(z.string().trim().min(1).max(191)).max(8) }).strict();

adminBindingsRouter.get('/people', async (req, res) => {
  try {
    return res.json({ people: await listOwnedPeople(req.aiosonOwner!.aioson_play_id) });
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_people_read');
  }
});

adminBindingsRouter.post('/people', async (req, res) => {
  try {
    const input = personCreateSchema.parse(req.body);
    const person = await createOwnedPerson(req.aiosonOwner!.aioson_play_id, input);
    return res.status(201).json(person);
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_person_create');
  }
});

adminBindingsRouter.patch('/people/:userId', async (req, res) => {
  try {
    const userId = identifierSchema.parse(req.params.userId);
    const input = personUpdateSchema.parse(req.body);
    return res.json(await updateOwnedPerson(req.aiosonOwner!.aioson_play_id, userId, input));
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_person_update');
  }
});

adminBindingsRouter.delete('/people/:userId', async (req, res) => {
  try {
    const userId = identifierSchema.parse(req.params.userId);
    await deleteOwnedPerson(req.aiosonOwner!.aioson_play_id, userId);
    return res.status(204).end();
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_person_delete');
  }
});

adminBindingsRouter.patch('/people/:userId/status', async (req, res) => {
  try {
    const userId = identifierSchema.parse(req.params.userId);
    const { disabled } = personStatusSchema.parse(req.body);
    await setOwnedPersonDisabled(req.aiosonOwner!.aioson_play_id, userId, disabled);
    return res.status(204).end();
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_person_status');
  }
});

adminBindingsRouter.get('/:bindingId/management', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    return res.json(await getOwnedAppManagement(bindingId, req.aiosonOwner!.aioson_play_id));
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_app_management_read', req.params.bindingId);
  }
});

adminBindingsRouter.post('/:bindingId/accesses', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const input = personLinkSchema.parse(req.body);
    const result = await linkOwnedPerson({
      bindingId,
      playId: req.aiosonOwner!.aioson_play_id,
      email: input.email,
      name: input.name,
      profileId: input.profile_id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_app_access_link', req.params.bindingId);
  }
});

adminBindingsRouter.post('/:bindingId/profiles', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const input = profileSchema.parse(req.body);
    const profile = await createOwnedProfile({
      bindingId, playId: req.aiosonOwner!.aioson_play_id,
      name: input.name, description: input.description, permissionIds: input.permission_ids,
    });
    return res.status(201).json(profile);
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_profile_create', req.params.bindingId);
  }
});

adminBindingsRouter.put('/:bindingId/profiles/:profileId', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const profileId = identifierSchema.parse(req.params.profileId);
    const input = profileSchema.parse(req.body);
    await updateOwnedProfile({
      bindingId, profileId, playId: req.aiosonOwner!.aioson_play_id,
      name: input.name, description: input.description, permissionIds: input.permission_ids,
    });
    return res.status(204).end();
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_profile_update', req.params.bindingId);
  }
});

adminBindingsRouter.delete('/:bindingId/profiles/:profileId', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const profileId = identifierSchema.parse(req.params.profileId);
    await archiveOwnedProfile(bindingId, req.aiosonOwner!.aioson_play_id, profileId);
    return res.status(204).end();
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_profile_archive', req.params.bindingId);
  }
});

adminBindingsRouter.put('/:bindingId/origins', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const { origins } = originsSchema.parse(req.body);
    return res.json({ origins: await updateOwnedOrigins(bindingId, req.aiosonOwner!.aioson_play_id, origins) });
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_origins_update', req.params.bindingId);
  }
});

adminBindingsRouter.get('/:bindingId/administration', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const result = await getOwnerBindingAdministration(bindingId, req.aiosonOwner!.aioson_play_id);
    return res.json(result);
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_binding_administration_read', req.params.bindingId);
  }
});

adminBindingsRouter.get('/:bindingId/users', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const users = await listOwnedBindingUsers(bindingId, req.aiosonOwner!.aioson_play_id);
    return res.json(users);
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_binding_users_read', req.params.bindingId);
  }
});

adminBindingsRouter.post('/:bindingId/operators', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const input = operatorCreateSchema.parse(req.body);
    const user = await createOwnedBindingOperator(bindingId, req.aiosonOwner!.aioson_play_id, { email: input.email, name: input.name, roleId: input.role_id });
    logAuthEvent({ requestId: getRequestId(res), operation: 'owner_binding_operator_create', bindingId, status: 201 });
    return res.status(201).json({ id: user.id });
  } catch (error) { return sendAuthError(req, res, error, 'owner_binding_operator_create', req.params.bindingId); }
});

adminBindingsRouter.patch('/:bindingId/operators/:userId', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const userId = identifierSchema.parse(req.params.userId);
    const input = operatorUpdateSchema.parse(req.body);
    await updateOwnedBindingOperator(bindingId, req.aiosonOwner!.aioson_play_id, userId, { name: input.name, roleId: input.role_id });
    logAuthEvent({ requestId: getRequestId(res), operation: 'owner_binding_operator_update', bindingId, status: 204 });
    return res.status(204).end();
  } catch (error) { return sendAuthError(req, res, error, 'owner_binding_operator_update', req.params.bindingId); }
});

adminBindingsRouter.delete('/:bindingId/operators/:userId', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const userId = identifierSchema.parse(req.params.userId);
    await deactivateOwnedBindingOperator(bindingId, req.aiosonOwner!.aioson_play_id, userId);
    logAuthEvent({ requestId: getRequestId(res), operation: 'owner_binding_operator_deactivate', bindingId, status: 204 });
    return res.status(204).end();
  } catch (error) { return sendAuthError(req, res, error, 'owner_binding_operator_deactivate', req.params.bindingId); }
});

adminBindingsRouter.post('/:bindingId/operators/:userId/roles', async (req, res) => {
  try {
    const bindingId = identifierSchema.parse(req.params.bindingId);
    const userId = identifierSchema.parse(req.params.userId);
    const roleId = identifierSchema.parse(req.body?.role_id);
    await assignOwnedBindingRole(bindingId, req.aiosonOwner!.aioson_play_id, userId, roleId);
    logAuthEvent({
      requestId: getRequestId(res),
      operation: 'owner_binding_role_assign',
      bindingId,
      status: 201,
    });
    return res.status(201).json({ assigned: true });
  } catch (error) {
    return sendAuthError(req, res, error, 'owner_binding_role_assign', req.params.bindingId);
  }
});

adminBindingsRouter.post('/', async (req, res) => {
  const owner = req.aiosonOwner;
  if (!owner) {
    return res.status(500).json({ error: 'middleware_did_not_populate_owner' });
  }

  let parsed;
  try {
    parsed = createSchema.parse(req.body);
  } catch (err) {
    return res.status(400).json({ error: 'invalid_body', details: String(err) });
  }

  if (!isValidAppSlug(parsed.app_slug)) {
    return res.status(400).json({ error: 'invalid_app_slug' });
  }
  if (!isValidAcceptedRoles(parsed.accepted_roles)) {
    return res.status(400).json({ error: 'invalid_accepted_roles' });
  }

  try {
    const result = await upsertAdminBinding({
      aioson_play_id: owner.aioson_play_id,
      app_slug: parsed.app_slug,
      app_name: parsed.app_name,
      accepted_roles: parsed.accepted_roles,
    });
    return res.status(result.created ? 201 : 200).json(result);
  } catch (err) {
    console.error('[admin-bindings/create]', err);
    return res.status(500).json({ error: 'failed_to_upsert_binding' });
  }
});
