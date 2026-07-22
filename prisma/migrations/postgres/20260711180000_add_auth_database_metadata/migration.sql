CREATE TABLE "AuthDatabaseMetadata" (
  "id" TEXT NOT NULL DEFAULT 'singleton',
  "schema_version" INTEGER NOT NULL DEFAULT 1,
  "provider" TEXT NOT NULL,
  "installation_id" TEXT,
  "owner_id" TEXT,
  "migration_state" TEXT NOT NULL DEFAULT 'active',
  "data_revision" INTEGER NOT NULL DEFAULT 0,
  "source_revision" INTEGER,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AuthDatabaseMetadata_pkey" PRIMARY KEY ("id")
);
