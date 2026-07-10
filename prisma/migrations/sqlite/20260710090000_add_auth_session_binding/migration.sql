-- New sessions are bound in application code. Nullable preserves legacy
-- refresh sessions long enough for the service to return a reauthentication
-- response instead of inferring an app binding.
ALTER TABLE "AuthSession" ADD COLUMN "binding_id" TEXT;

CREATE INDEX "AuthSession_binding_id_idx" ON "AuthSession"("binding_id");
CREATE INDEX "AuthSession_token_binding_id_idx" ON "AuthSession"("token", "binding_id");
