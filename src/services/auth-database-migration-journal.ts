import { createHash, randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export type MigrationOperationScope = {
  idempotencyKey: string;
  installationId: string;
  ownerId: string;
  credentialReference: string;
  provider: 'postgresql' | 'mysql';
};

export type MigrationJournal = {
  operationId: string;
  idempotencyKey: string;
  installationId: string;
  ownerId: string;
  credentialReference: string;
  provider: 'postgresql' | 'mysql';
  state: 'diagnosing' | 'diagnosed' | 'failed';
  classification?: 'empty' | 'compatible' | 'incompatible';
  updatedAt: string;
  errorCode?: string;
};

const operations = new Map<string, { idempotencyKey: string; promise: Promise<MigrationJournal> }>();

function scopeKey(scope: Pick<MigrationOperationScope, 'installationId' | 'ownerId'>): string {
  return `${scope.installationId}:${scope.ownerId}`;
}

function scopedFileName(scope: Pick<MigrationOperationScope, 'installationId' | 'ownerId'>): string {
  return createHash('sha256').update(scopeKey(scope)).digest('hex');
}

function journalPath(scope: Pick<MigrationOperationScope, 'installationId' | 'ownerId'>): string {
  return resolve(process.env['AIOSON_AUTH_STATE_DIR'] ?? 'data', `auth-database-migration-journal-${scopedFileName(scope)}.json`);
}

function lockPath(scope: Pick<MigrationOperationScope, 'installationId' | 'ownerId'>): string {
  return `${journalPath(scope)}.lock`;
}

async function acquireLock(scope: MigrationOperationScope): Promise<void> {
  const path = lockPath(scope);
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const handle = await open(path, 'wx');
      await handle.writeFile(JSON.stringify({
        operationId: randomUUID(), idempotencyKey: scope.idempotencyKey,
        installationId: scope.installationId, ownerId: scope.ownerId,
        pid: process.pid, startedAt: new Date().toISOString(),
      }));
      await handle.close();
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      // A Play/Auth restart can leave a lock behind. Reclaim it only when its
      // recorded process is demonstrably gone; never evict a live operation.
      try {
        const existing = JSON.parse(await readFile(path, 'utf8')) as { pid?: unknown };
        const pid = typeof existing.pid === 'number' ? existing.pid : 0;
        if (pid > 0 && pid !== process.pid) {
          try { process.kill(pid, 0); } catch {
            await rm(path, { force: true });
            continue;
          }
        }
      } catch {
        // Treat an unreadable lock as active. A later operator action can
        // remove it explicitly after verifying the process is gone.
      }
      throw new Error('migration_operation_locked');
    }
  }
  throw new Error('migration_operation_locked');
}

/**
 * Runs one owner-scoped operation. The journal and lock are deliberately
 * partitioned by installation + owner, so an idempotency UUID cannot replay
 * or block another tenant. The lock file also protects against a second Auth
 * process, not only concurrent calls in this Node process.
 */
export async function runIdempotentMigrationOperation(
  scope: MigrationOperationScope,
  operation: () => Promise<MigrationJournal>,
): Promise<MigrationJournal> {
  const key = scopeKey(scope);
  const persisted = await readJournal(scope);
  if (persisted?.idempotencyKey === scope.idempotencyKey) {
    if (persisted.installationId !== scope.installationId || persisted.ownerId !== scope.ownerId) {
      throw new Error('migration_idempotency_scope_mismatch');
    }
    return persisted;
  }
  const active = operations.get(key);
  if (active) {
    if (active.idempotencyKey === scope.idempotencyKey) return active.promise;
    throw new Error('migration_operation_locked');
  }

  const target = journalPath(scope);
  await mkdir(dirname(target), { recursive: true });
  await acquireLock(scope);

  const promise = (async () => {
    try {
      const journal = await operation();
      if (journal.installationId !== scope.installationId || journal.ownerId !== scope.ownerId || journal.idempotencyKey !== scope.idempotencyKey) {
        throw new Error('migration_journal_scope_mismatch');
      }
      await writeJournal(journal, scope);
      return journal;
    } catch (error) {
      const errorCode = error instanceof Error && /^[a-z0-9_:-]+$/i.test(error.message)
        ? error.message.slice(0, 120)
        : 'migration_operation_failed';
      const failed: MigrationJournal = {
        operationId: randomUUID(), idempotencyKey: scope.idempotencyKey,
        installationId: scope.installationId, ownerId: scope.ownerId,
        credentialReference: scope.credentialReference, provider: scope.provider,
        state: 'failed', updatedAt: new Date().toISOString(), errorCode,
      };
      await writeJournal(failed, scope);
      throw error;
    } finally {
      await rm(lockPath(scope), { force: true });
    }
  })().finally(() => operations.delete(key));
  operations.set(key, { idempotencyKey: scope.idempotencyKey, promise });
  return promise;
}

export async function readJournal(
  scope: Pick<MigrationOperationScope, 'installationId' | 'ownerId'>,
): Promise<MigrationJournal | null> {
  try {
    const journal = JSON.parse(await readFile(journalPath(scope), 'utf8')) as MigrationJournal;
    if (journal.installationId !== scope.installationId || journal.ownerId !== scope.ownerId) return null;
    return journal;
  }
  catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null; throw error; }
}

async function writeJournal(journal: MigrationJournal, scope: Pick<MigrationOperationScope, 'installationId' | 'ownerId'>): Promise<void> {
  const target = journalPath(scope);
  await mkdir(dirname(target), { recursive: true });
  const temporary = `${target}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(journal, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
  await rename(temporary, target);
}
