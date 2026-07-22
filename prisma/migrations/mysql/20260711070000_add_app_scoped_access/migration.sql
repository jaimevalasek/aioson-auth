ALTER TABLE `AppBinding`
  ADD COLUMN `auth_mode` VARCHAR(191) NOT NULL DEFAULT 'authentication_only',
  ADD COLUMN `manifest_fingerprint` VARCHAR(191) NULL,
  ADD COLUMN `manifest_sync_status` VARCHAR(191) NOT NULL DEFAULT 'pending',
  ADD COLUMN `manifest_sync_error` VARCHAR(191) NULL,
  ADD COLUMN `manifest_synced_at` DATETIME(3) NULL,
  ADD COLUMN `allowed_origins_json` VARCHAR(191) NOT NULL DEFAULT '[]';
ALTER TABLE `GlobalUser` ADD COLUMN `disabled_at` DATETIME(3) NULL;
ALTER TABLE `BindingPermission` ADD COLUMN `retired_at` DATETIME(3) NULL;

CREATE TABLE `AppProfile` (
  `id` VARCHAR(191) NOT NULL, `binding_id` VARCHAR(191) NOT NULL, `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(240) NOT NULL DEFAULT '', `is_system` BOOLEAN NOT NULL DEFAULT false,
  `is_migration_generated` BOOLEAN NOT NULL DEFAULT false, `archived_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `AppProfile_binding_id_name_key`(`binding_id`, `name`), INDEX `AppProfile_binding_id_archived_at_idx`(`binding_id`, `archived_at`), PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `AppProfilePermission` (
  `id` VARCHAR(191) NOT NULL, `profile_id` VARCHAR(191) NOT NULL, `permission_id` VARCHAR(191) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `AppProfilePermission_profile_id_permission_id_key`(`profile_id`, `permission_id`), PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `AppAccess` (
  `id` VARCHAR(191) NOT NULL, `binding_id` VARCHAR(191) NOT NULL, `user_id` VARCHAR(191) NOT NULL,
  `profile_id` VARCHAR(191) NOT NULL, `status` VARCHAR(191) NOT NULL DEFAULT 'active', `aioson_play_origin_id` VARCHAR(191) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `AppAccess_binding_id_user_id_key`(`binding_id`, `user_id`), INDEX `AppAccess_aioson_play_origin_id_idx`(`aioson_play_origin_id`),
  INDEX `AppAccess_profile_id_idx`(`profile_id`), PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `AppProfile` ADD CONSTRAINT `AppProfile_binding_id_fkey` FOREIGN KEY (`binding_id`) REFERENCES `AppBinding`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `AppProfilePermission` ADD CONSTRAINT `AppProfilePermission_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `AppProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AppProfilePermission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `BindingPermission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `AppAccess` ADD CONSTRAINT `AppAccess_binding_id_fkey` FOREIGN KEY (`binding_id`) REFERENCES `AppBinding`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AppAccess_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `GlobalUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AppAccess_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `AppProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- BACKFILL-BEGIN
INSERT IGNORE INTO `AppProfile` (`id`,`binding_id`,`name`,`description`,`is_system`,`is_migration_generated`)
SELECT CONCAT('legacy:',pairs.`binding_id`,':',pairs.`role_id`),pairs.`binding_id`,r.`name`,r.`description`,false,false FROM
(SELECT `binding_id`,`role_id` FROM `UserRole` UNION SELECT `binding_id`,`role_id` FROM `RolePermission`) pairs JOIN `Role` r ON r.`id`=pairs.`role_id`;
INSERT IGNORE INTO `AppProfile` (`id`,`binding_id`,`name`,`description`,`is_system`,`is_migration_generated`)
SELECT CONCAT('legacy-set:',ur.`binding_id`,':',ur.`user_id`),ur.`binding_id`,CONCAT('Migrado - ',u.`email`),'União de perfis legados',false,true
FROM `UserRole` ur JOIN `GlobalUser` u ON u.`id`=ur.`user_id` GROUP BY ur.`binding_id`,ur.`user_id`,u.`email` HAVING COUNT(*)>1;
INSERT IGNORE INTO `AppProfile` (`id`,`binding_id`,`name`,`description`,`is_system`,`is_migration_generated`)
SELECT CONCAT('system:access:',b.`id`),b.`id`,'__access__','Acesso somente autenticação',true,false FROM `AppBinding` b;
INSERT IGNORE INTO `AppProfilePermission` (`id`,`profile_id`,`permission_id`)
SELECT CONCAT('legacy-perm:',rp.`binding_id`,':',rp.`role_id`,':',rp.`permission_id`),CONCAT('legacy:',rp.`binding_id`,':',rp.`role_id`),rp.`permission_id` FROM `RolePermission` rp;
INSERT IGNORE INTO `AppProfilePermission` (`id`,`profile_id`,`permission_id`)
SELECT CONCAT('legacy-set-perm:',ur.`binding_id`,':',ur.`user_id`,':',rp.`permission_id`),CONCAT('legacy-set:',ur.`binding_id`,':',ur.`user_id`),rp.`permission_id`
FROM `UserRole` ur JOIN `RolePermission` rp ON rp.`binding_id`=ur.`binding_id` AND rp.`role_id`=ur.`role_id`
WHERE (SELECT COUNT(*) FROM `UserRole` x WHERE x.`binding_id`=ur.`binding_id` AND x.`user_id`=ur.`user_id`)>1;
INSERT IGNORE INTO `AppAccess` (`id`,`binding_id`,`user_id`,`profile_id`,`status`,`aioson_play_origin_id`)
SELECT CONCAT('access:',ur.`binding_id`,':',ur.`user_id`),ur.`binding_id`,ur.`user_id`,
CASE WHEN COUNT(*)>1 THEN CONCAT('legacy-set:',ur.`binding_id`,':',ur.`user_id`) ELSE CONCAT('legacy:',ur.`binding_id`,':',MIN(ur.`role_id`)) END,
'active',MAX(ur.`aioson_play_origin_id`) FROM `UserRole` ur GROUP BY ur.`binding_id`,ur.`user_id`;
UPDATE `AppBinding` b SET b.`auth_mode`=CASE WHEN EXISTS(SELECT 1 FROM `BindingPermission` p WHERE p.`binding_id`=b.`id` AND p.`retired_at` IS NULL) THEN 'profiles_permissions' ELSE 'authentication_only' END,
b.`manifest_sync_status`='synced',b.`manifest_synced_at`=CURRENT_TIMESTAMP(3);
-- BACKFILL-END
