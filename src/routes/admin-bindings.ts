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

export const adminBindingsRouter = Router();

adminBindingsRouter.use(validateOwnerBearer);

const createSchema = z.object({
  app_slug: z.string().min(1),
  app_name: z.string().min(1),
  accepted_roles: z.array(z.string()),
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
