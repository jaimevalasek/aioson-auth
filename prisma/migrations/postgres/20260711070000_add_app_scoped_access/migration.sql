ALTER TABLE "AppBinding" ADD COLUMN "auth_mode" TEXT NOT NULL DEFAULT 'authentication_only', ADD COLUMN "manifest_fingerprint" TEXT,
  ADD COLUMN "manifest_sync_status" TEXT NOT NULL DEFAULT 'pending', ADD COLUMN "manifest_sync_error" TEXT,
  ADD COLUMN "manifest_synced_at" TIMESTAMP(3), ADD COLUMN "allowed_origins_json" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "GlobalUser" ADD COLUMN "disabled_at" TIMESTAMP(3);
ALTER TABLE "BindingPermission" ADD COLUMN "retired_at" TIMESTAMP(3);

CREATE TABLE "AppProfile" (
  "id" TEXT NOT NULL, "binding_id" TEXT NOT NULL, "name" TEXT NOT NULL, "description" TEXT NOT NULL DEFAULT '',
  "is_system" BOOLEAN NOT NULL DEFAULT false, "is_migration_generated" BOOLEAN NOT NULL DEFAULT false,
  "archived_at" TIMESTAMP(3), "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AppProfile_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AppProfile_binding_id_name_key" ON "AppProfile"("binding_id","name");
CREATE INDEX "AppProfile_binding_id_archived_at_idx" ON "AppProfile"("binding_id","archived_at");
CREATE TABLE "AppProfilePermission" (
  "id" TEXT NOT NULL, "profile_id" TEXT NOT NULL, "permission_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AppProfilePermission_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AppProfilePermission_profile_id_permission_id_key" ON "AppProfilePermission"("profile_id","permission_id");
CREATE TABLE "AppAccess" (
  "id" TEXT NOT NULL, "binding_id" TEXT NOT NULL, "user_id" TEXT NOT NULL, "profile_id" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active', "aioson_play_origin_id" TEXT, "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AppAccess_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AppAccess_binding_id_user_id_key" ON "AppAccess"("binding_id","user_id");
CREATE INDEX "AppAccess_aioson_play_origin_id_idx" ON "AppAccess"("aioson_play_origin_id");
CREATE INDEX "AppAccess_profile_id_idx" ON "AppAccess"("profile_id");
ALTER TABLE "AppProfile" ADD CONSTRAINT "AppProfile_binding_id_fkey" FOREIGN KEY ("binding_id") REFERENCES "AppBinding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppProfilePermission" ADD CONSTRAINT "AppProfilePermission_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "AppProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppProfilePermission" ADD CONSTRAINT "AppProfilePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "BindingPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppAccess" ADD CONSTRAINT "AppAccess_binding_id_fkey" FOREIGN KEY ("binding_id") REFERENCES "AppBinding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppAccess" ADD CONSTRAINT "AppAccess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "GlobalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppAccess" ADD CONSTRAINT "AppAccess_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "AppProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- BACKFILL-BEGIN
INSERT INTO "AppProfile" ("id","binding_id","name","description","is_system","is_migration_generated")
SELECT 'legacy:'||pairs."binding_id"||':'||pairs."role_id",pairs."binding_id",r."name",r."description",false,false FROM
(SELECT "binding_id","role_id" FROM "UserRole" UNION SELECT "binding_id","role_id" FROM "RolePermission") pairs JOIN "Role" r ON r."id"=pairs."role_id" ON CONFLICT DO NOTHING;
INSERT INTO "AppProfile" ("id","binding_id","name","description","is_system","is_migration_generated")
SELECT 'legacy-set:'||ur."binding_id"||':'||ur."user_id",ur."binding_id",'Migrado - '||u."email",'União de perfis legados',false,true
FROM "UserRole" ur JOIN "GlobalUser" u ON u."id"=ur."user_id" GROUP BY ur."binding_id",ur."user_id",u."email" HAVING COUNT(*)>1 ON CONFLICT DO NOTHING;
INSERT INTO "AppProfile" ("id","binding_id","name","description","is_system","is_migration_generated")
SELECT 'system:access:'||b."id",b."id",'__access__','Acesso somente autenticação',true,false FROM "AppBinding" b ON CONFLICT DO NOTHING;
INSERT INTO "AppProfilePermission" ("id","profile_id","permission_id")
SELECT 'legacy-perm:'||rp."binding_id"||':'||rp."role_id"||':'||rp."permission_id",'legacy:'||rp."binding_id"||':'||rp."role_id",rp."permission_id" FROM "RolePermission" rp ON CONFLICT DO NOTHING;
INSERT INTO "AppProfilePermission" ("id","profile_id","permission_id")
SELECT 'legacy-set-perm:'||ur."binding_id"||':'||ur."user_id"||':'||rp."permission_id",'legacy-set:'||ur."binding_id"||':'||ur."user_id",rp."permission_id"
FROM "UserRole" ur JOIN "RolePermission" rp ON rp."binding_id"=ur."binding_id" AND rp."role_id"=ur."role_id"
WHERE (SELECT COUNT(*) FROM "UserRole" x WHERE x."binding_id"=ur."binding_id" AND x."user_id"=ur."user_id")>1 ON CONFLICT DO NOTHING;
INSERT INTO "AppAccess" ("id","binding_id","user_id","profile_id","status","aioson_play_origin_id")
SELECT 'access:'||ur."binding_id"||':'||ur."user_id",ur."binding_id",ur."user_id",
CASE WHEN COUNT(*)>1 THEN 'legacy-set:'||ur."binding_id"||':'||ur."user_id" ELSE 'legacy:'||ur."binding_id"||':'||MIN(ur."role_id") END,
'active',MAX(ur."aioson_play_origin_id") FROM "UserRole" ur GROUP BY ur."binding_id",ur."user_id" ON CONFLICT DO NOTHING;
UPDATE "AppBinding" b SET "auth_mode"=CASE WHEN EXISTS(SELECT 1 FROM "BindingPermission" p WHERE p."binding_id"=b."id" AND p."retired_at" IS NULL) THEN 'profiles_permissions' ELSE 'authentication_only' END,
"manifest_sync_status"='synced',"manifest_synced_at"=CURRENT_TIMESTAMP;
-- BACKFILL-END
