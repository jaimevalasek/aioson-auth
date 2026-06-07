-- CreateTable
CREATE TABLE `PlayAppInventory` (
    `id` VARCHAR(191) NOT NULL,
    `aioson_play_id` VARCHAR(191) NOT NULL,
    `inventory_id` VARCHAR(191) NOT NULL,
    `app_slug` VARCHAR(191) NULL,
    `app_name` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `lifecycle` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `supports_auth` BOOLEAN NOT NULL DEFAULT false,
    `accepted_roles_json` TEXT NOT NULL,
    `manifest_fingerprint` VARCHAR(191) NULL,
    `warnings_json` TEXT NOT NULL,
    `last_seen_at` DATETIME(3) NOT NULL,
    `archived_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PlayAppInventory_aioson_play_id_inventory_id_key`(`aioson_play_id`, `inventory_id`),
    INDEX `PlayAppInventory_aioson_play_id_app_slug_idx`(`aioson_play_id`, `app_slug`),
    INDEX `PlayAppInventory_aioson_play_id_archived_at_lifecycle_idx`(`aioson_play_id`, `archived_at`, `lifecycle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
