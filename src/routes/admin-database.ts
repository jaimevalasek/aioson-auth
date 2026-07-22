import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { validateOwnerBearer } from '../middleware/validate_owner_bearer.js';
import { readStagedConnectionString } from '../services/connection_string_keyring.js';
import { diagnoseAuthDatabase } from '../services/auth-database-diagnostics.js';
import { readJournal, runIdempotentMigrationOperation } from '../services/auth-database-migration-journal.js';

export const adminDatabaseRouter = Router();
const DiagnoseSchema = z.object({
  provider: z.enum(['postgresql', 'mysql']),
  credential_reference: z.string().min(8).max(200).regex(/^[a-zA-Z0-9:_-]+$/),
  idempotency_key: z.string().uuid(),
});

adminDatabaseRouter.get('/status', validateOwnerBearer, async (req, res) => {
  const owner = req.aiosonOwner!;
  return res.json({ operation: await readJournal({
    installationId: owner.aioson_play_id,
    ownerId: owner.user.user_id,
  }) });
});

adminDatabaseRouter.post('/diagnose', validateOwnerBearer, async (req, res) => {
  const parsed = DiagnoseSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body' });
  try {
    const owner = req.aiosonOwner!;
    const scope = {
      idempotencyKey: parsed.data.idempotency_key,
      installationId: owner.aioson_play_id,
      ownerId: owner.user.user_id,
      credentialReference: parsed.data.credential_reference,
      provider: parsed.data.provider,
    } as const;
    const { installationId, ownerId } = scope;
    const operation = await runIdempotentMigrationOperation(scope, async () => {
      const secret = await readStagedConnectionString(parsed.data.credential_reference, installationId);
      if (!secret) throw new Error('credential_not_found');
      const diagnosis = await diagnoseAuthDatabase(secret, undefined, { installationId, ownerId });
      if (diagnosis.provider !== parsed.data.provider) throw new Error('provider_mismatch');
      return {
        operationId: randomUUID(), idempotencyKey: parsed.data.idempotency_key,
        installationId,
        ownerId,
        credentialReference: parsed.data.credential_reference,
        provider: diagnosis.provider, state: 'diagnosed' as const,
        classification: diagnosis.classification, updatedAt: new Date().toISOString(),
      };
    });
    if (operation.state === 'failed') {
      return res.status(502).json({ error: operation.errorCode ?? 'diagnosis_failed', operation });
    }
    return res.json({ operation });
  } catch (error) {
    const internalCode = error instanceof Error ? error.message : 'diagnosis_failed';
    const allowed = new Set(['migration_operation_locked', 'migration_idempotency_scope_mismatch', 'credential_not_found', 'provider_mismatch', 'private_or_invalid_destination_host', 'diagnosis_timeout']);
    const code = allowed.has(internalCode) ? internalCode : 'diagnosis_failed';
    const status = code === 'migration_operation_locked' || code === 'migration_idempotency_scope_mismatch'
      ? 409
      : code.includes('private_') ? 400 : 502;
    return res.status(status).json({ error: code });
  }
});
