import { prisma } from '../lib/prisma.js';

export type PlayAppInventoryLifecycle = 'installed' | 'development';
export type PlayAppInventorySource = 'marketplace' | 'dev_link' | 'draft' | 'unknown';

export interface SyncedPlayAppInventoryItem {
  inventory_id: string;
  lifecycle: PlayAppInventoryLifecycle;
  source: PlayAppInventorySource;
  app_slug: string | null;
  app_name: string;
  version: string | null;
  description: string | null;
  supports_auth: boolean;
  accepted_roles: string[];
  manifest_fingerprint: string | null;
  warnings: string[];
}

export interface SyncPlayAppInventoryInput {
  aioson_play_id: string;
  items: SyncedPlayAppInventoryItem[];
}

export interface SyncPlayAppInventoryResult {
  ok: true;
  reported: number;
  upserted: number;
  archived: number;
  warnings: string[];
}

export async function syncPlayAppInventory(
  input: SyncPlayAppInventoryInput,
): Promise<SyncPlayAppInventoryResult> {
  const now = new Date();
  const inventoryIds = input.items.map((item) => item.inventory_id);

  return prisma.$transaction(async (tx) => {
    for (const item of input.items) {
      await tx.playAppInventory.upsert({
        where: {
          aioson_play_id_inventory_id: {
            aioson_play_id: input.aioson_play_id,
            inventory_id: item.inventory_id,
          },
        },
        create: {
          aioson_play_id: input.aioson_play_id,
          inventory_id: item.inventory_id,
          app_slug: item.app_slug,
          app_name: item.app_name,
          version: item.version,
          description: item.description,
          lifecycle: item.lifecycle,
          source: item.source,
          supports_auth: item.supports_auth,
          accepted_roles_json: JSON.stringify(uniqueStrings(item.accepted_roles)),
          manifest_fingerprint: item.manifest_fingerprint,
          warnings_json: JSON.stringify(uniqueStrings(item.warnings)),
          last_seen_at: now,
          archived_at: null,
        },
        update: {
          app_slug: item.app_slug,
          app_name: item.app_name,
          version: item.version,
          description: item.description,
          lifecycle: item.lifecycle,
          source: item.source,
          supports_auth: item.supports_auth,
          accepted_roles_json: JSON.stringify(uniqueStrings(item.accepted_roles)),
          manifest_fingerprint: item.manifest_fingerprint,
          warnings_json: JSON.stringify(uniqueStrings(item.warnings)),
          last_seen_at: now,
          archived_at: null,
        },
      });
    }

    const archived = await tx.playAppInventory.updateMany({
      where: {
        aioson_play_id: input.aioson_play_id,
        archived_at: null,
        ...(inventoryIds.length > 0 ? { inventory_id: { notIn: inventoryIds } } : {}),
      },
      data: {
        archived_at: now,
      },
    });

    return {
      ok: true,
      reported: input.items.length,
      upserted: input.items.length,
      archived: archived.count,
      warnings: [],
    };
  });
}

export async function listPlayAppInventory(aiosonPlayId: string) {
  const rows = await prisma.playAppInventory.findMany({
    where: { aioson_play_id: aiosonPlayId },
    orderBy: [
      { archived_at: 'asc' },
      { lifecycle: 'asc' },
      { app_name: 'asc' },
    ],
  });

  return rows.map((row) => ({
    id: row.id,
    inventory_id: row.inventory_id,
    lifecycle: row.lifecycle,
    source: row.source,
    app_slug: row.app_slug,
    app_name: row.app_name,
    version: row.version,
    description: row.description,
    supports_auth: row.supports_auth,
    accepted_roles: parseJsonStringArray(row.accepted_roles_json),
    manifest_fingerprint: row.manifest_fingerprint,
    warnings: parseJsonStringArray(row.warnings_json),
    last_seen_at: row.last_seen_at.toISOString(),
    archived_at: row.archived_at?.toISOString() ?? null,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }));
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values)];
}

function parseJsonStringArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}
