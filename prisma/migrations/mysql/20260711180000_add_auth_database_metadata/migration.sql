CREATE TABLE `AuthDatabaseMetadata` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'singleton',
  `schema_version` INTEGER NOT NULL DEFAULT 1,
  `provider` VARCHAR(191) NOT NULL,
  `installation_id` VARCHAR(191) NULL,
  `owner_id` VARCHAR(191) NULL,
  `migration_state` VARCHAR(191) NOT NULL DEFAULT 'active',
  `data_revision` INTEGER NOT NULL DEFAULT 0,
  `source_revision` INTEGER NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
