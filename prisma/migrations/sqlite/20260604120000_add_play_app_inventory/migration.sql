-- CreateTable
CREATE TABLE "PlayAppInventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aioson_play_id" TEXT NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "app_slug" TEXT,
    "app_name" TEXT NOT NULL,
    "version" TEXT,
    "description" TEXT,
    "lifecycle" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "supports_auth" BOOLEAN NOT NULL DEFAULT false,
    "accepted_roles_json" TEXT NOT NULL DEFAULT '[]',
    "manifest_fingerprint" TEXT,
    "warnings_json" TEXT NOT NULL DEFAULT '[]',
    "last_seen_at" DATETIME NOT NULL,
    "archived_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayAppInventory_aioson_play_id_inventory_id_key" ON "PlayAppInventory"("aioson_play_id", "inventory_id");

-- CreateIndex
CREATE INDEX "PlayAppInventory_aioson_play_id_app_slug_idx" ON "PlayAppInventory"("aioson_play_id", "app_slug");

-- CreateIndex
CREATE INDEX "PlayAppInventory_aioson_play_id_archived_at_lifecycle_idx" ON "PlayAppInventory"("aioson_play_id", "archived_at", "lifecycle");
