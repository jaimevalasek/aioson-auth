-- Nullable only for legacy refresh sessions. New writes require binding_id in
-- AuthAction and must never infer it from a refresh request.
ALTER TABLE "AuthSession" ADD COLUMN "binding_id" TEXT;

CREATE INDEX "AuthSession_binding_id_idx" ON "AuthSession"("binding_id");
CREATE INDEX "AuthSession_token_binding_id_idx" ON "AuthSession"("token", "binding_id");
