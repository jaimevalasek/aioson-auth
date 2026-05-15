-- CreateTable
CREATE TABLE "GlobalSettings" (
    "id" TEXT NOT NULL,
    "google_client_id" TEXT,
    "google_client_secret" TEXT,
    "github_client_id" TEXT,
    "github_client_secret" TEXT,
    "smtp_host" TEXT,
    "smtp_port" INTEGER,
    "smtp_user" TEXT,
    "smtp_pass" TEXT,
    "smtp_from_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenRevocation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "binding_id" TEXT NOT NULL,
    "revoked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "aioson_play_id" TEXT,

    CONSTRAINT "TokenRevocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppBinding" (
    "id" TEXT NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_slug" TEXT NOT NULL DEFAULT '',
    "connection_name" TEXT NOT NULL,
    "system_permissions" TEXT NOT NULL DEFAULT '[]',
    "enable_2fa" BOOLEAN NOT NULL DEFAULT false,
    "enable_rbac" BOOLEAN NOT NULL DEFAULT false,
    "aioson_play_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppBinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    "totp_secret" TEXT,
    "aioson_play_origin_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BindingPermission" (
    "id" TEXT NOT NULL,
    "binding_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BindingPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "binding_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "binding_id" TEXT NOT NULL,
    "aioson_play_origin_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "aioson_play_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecoveryToken" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecoveryToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FederationConfig" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "federation_active" BOOLEAN NOT NULL DEFAULT false,
    "project_id" TEXT,
    "project_name" TEXT,
    "db_provider" TEXT,
    "db_connection_keyring_id" TEXT,
    "activated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FederationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TokenRevocation_user_id_expires_at_idx" ON "TokenRevocation"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "TokenRevocation_aioson_play_id_expires_at_idx" ON "TokenRevocation"("aioson_play_id", "expires_at");

-- CreateIndex
CREATE INDEX "AppBinding_aioson_play_id_idx" ON "AppBinding"("aioson_play_id");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalUser_email_key" ON "GlobalUser"("email");

-- CreateIndex
CREATE INDEX "GlobalUser_aioson_play_origin_id_idx" ON "GlobalUser"("aioson_play_origin_id");

-- CreateIndex
CREATE UNIQUE INDEX "BindingPermission_binding_id_name_key" ON "BindingPermission"("binding_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_role_id_permission_id_binding_id_key" ON "RolePermission"("role_id", "permission_id", "binding_id");

-- CreateIndex
CREATE INDEX "UserRole_aioson_play_origin_id_idx" ON "UserRole"("aioson_play_origin_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_user_id_role_id_binding_id_key" ON "UserRole"("user_id", "role_id", "binding_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_token_key" ON "AuthSession"("token");

-- CreateIndex
CREATE INDEX "AuthSession_aioson_play_id_idx" ON "AuthSession"("aioson_play_id");

-- CreateIndex
CREATE UNIQUE INDEX "RecoveryToken_token_key" ON "RecoveryToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "BindingPermission" ADD CONSTRAINT "BindingPermission_binding_id_fkey" FOREIGN KEY ("binding_id") REFERENCES "AppBinding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "BindingPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "GlobalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "GlobalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

