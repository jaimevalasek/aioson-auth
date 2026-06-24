import { Router } from 'express';
import { z } from 'zod';
import { syncPlayAppInventory, listPlayAppInventory } from '../actions/AdminAppInventoryAction.js';
import { isValidAcceptedRoles, isValidAppSlug } from '../actions/AdminBindingAction.js';
import { validateOwnerBearer } from '../middleware/validate_owner_bearer.js';

export const adminAppInventoryRouter = Router();

adminAppInventoryRouter.use(validateOwnerBearer);

const WARNING_CODE_REGEX = /^[a-z0-9_:-]+$/;
const SHA256_REGEX = /^[a-f0-9]{64}$/i;
const PERMISSION_NAME_REGEX = /^(?:\*|[a-z0-9_.-]+:(?:\*|[a-z0-9_.-]+))$/;

const authPermissionSchema = z.object({
  name: z.string().min(1).max(160).regex(PERMISSION_NAME_REGEX),
  resource: z.string().min(1).max(160),
  action: z.string().min(1).max(160),
  label: z.string().max(120).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
}).strict();

const authPolicySchema = z.object({
  id: z.string().min(1).max(160),
  kind: z.string().min(1).max(80),
  requires: z.array(z.string().min(1).max(160).regex(PERMISSION_NAME_REGEX)).max(50),
  path: z.string().max(160).nullable().optional(),
  method: z.string().max(16).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
}).strict();

const authManifestSchema = z.object({
  version: z.number().int().min(1).max(1),
  permissions: z.array(authPermissionSchema).max(200),
  policies: z.array(authPolicySchema).max(200),
}).strict();

const inventoryItemSchema = z.object({
  inventory_id: z.string().min(1).max(180),
  lifecycle: z.enum(['installed', 'development']),
  source: z.enum(['marketplace', 'dev_link', 'draft', 'unknown']),
  app_slug: z.string().max(100).nullable().optional(),
  app_name: z.string().min(1).max(100),
  version: z.string().max(64).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  supports_auth: z.boolean(),
  accepted_roles: z.array(z.string()).max(4),
  auth_manifest: authManifestSchema.nullable().optional(),
  manifest_fingerprint: z.string().regex(SHA256_REGEX).nullable().optional(),
  warnings: z.array(z.string().max(80).regex(WARNING_CODE_REGEX)).max(50),
}).strict();

const syncSchema = z.object({
  items: z.array(inventoryItemSchema).max(1000),
  reported_at: z.string().datetime(),
}).strict();

adminAppInventoryRouter.get('/', async (req, res) => {
  const owner = req.aiosonOwner;
  if (!owner) {
    return res.status(500).json({ error: 'middleware_did_not_populate_owner' });
  }

  try {
    const items = await listPlayAppInventory(owner.aioson_play_id);
    return res.json({ items });
  } catch (err) {
    console.error('[admin-app-inventory/list]', err);
    return res.status(500).json({ error: 'failed_to_list_inventory' });
  }
});

adminAppInventoryRouter.post('/sync', async (req, res) => {
  const owner = req.aiosonOwner;
  if (!owner) {
    return res.status(500).json({ error: 'middleware_did_not_populate_owner' });
  }

  const parsed = syncSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_body', details: parsed.error.flatten() });
  }

  const invalidItem = validateItems(parsed.data.items);
  if (invalidItem) {
    return res.status(400).json({ error: invalidItem });
  }

  try {
    const result = await syncPlayAppInventory({
      aioson_play_id: owner.aioson_play_id,
      items: parsed.data.items.map((item) => ({
        inventory_id: item.inventory_id,
        lifecycle: item.lifecycle,
        source: item.source,
        app_slug: item.app_slug ?? null,
        app_name: item.app_name,
        version: item.version ?? null,
        description: item.description ?? null,
        supports_auth: item.supports_auth,
        accepted_roles: item.accepted_roles,
        auth_manifest: item.auth_manifest ?? null,
        manifest_fingerprint: item.manifest_fingerprint ?? null,
        warnings: item.warnings,
      })),
    });
    return res.json(result);
  } catch (err) {
    console.error('[admin-app-inventory/sync]', err);
    return res.status(500).json({ error: 'failed_to_sync_inventory' });
  }
});

function validateItems(items: Array<z.infer<typeof inventoryItemSchema>>): string | null {
  const inventoryIds = new Set<string>();

  for (const item of items) {
    if (inventoryIds.has(item.inventory_id)) {
      return 'duplicate_inventory_id';
    }
    inventoryIds.add(item.inventory_id);

    if (item.app_slug !== null && item.app_slug !== undefined && !isValidAppSlug(item.app_slug)) {
      return 'invalid_app_slug';
    }
    if (!isValidAcceptedRoles(item.accepted_roles)) {
      return 'invalid_accepted_roles';
    }
    if (new Set(item.accepted_roles).size !== item.accepted_roles.length) {
      return 'duplicate_accepted_roles';
    }
    const permissionNames = item.auth_manifest?.permissions.map((permission) => permission.name) ?? [];
    if (new Set(permissionNames).size !== permissionNames.length) {
      return 'duplicate_auth_permissions';
    }
    if (
      item.auth_manifest?.permissions.some((permission) =>
        permission.name === '*'
          ? permission.resource !== '*' || permission.action !== '*'
          : permission.name !== `${permission.resource}:${permission.action}`
      )
    ) {
      return 'invalid_auth_permissions';
    }
    const policyIds = item.auth_manifest?.policies.map((policy) => policy.id) ?? [];
    if (new Set(policyIds).size !== policyIds.length) {
      return 'duplicate_auth_policies';
    }
  }

  return null;
}
