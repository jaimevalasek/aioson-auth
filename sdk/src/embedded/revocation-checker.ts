import { createQueries, type RevocationRow } from './queries.js';
import type { DbProvider, PrismaClientLike } from './types.js';

const CACHE_TTL_MS = 5_000;

export type RevocationChecker = (userId: string, tokenIat: number) => Promise<boolean>;

export function createRevocationChecker(
  prisma: PrismaClientLike,
  provider: DbProvider,
): RevocationChecker {
  const q = createQueries(prisma, provider);
  const cache = new Map<string, { entries: RevocationRow[]; expiresAt: number }>();

  function invalidate(userId: string): void {
    cache.delete(userId);
  }

  const checker: RevocationChecker & { invalidate: (userId: string) => void } = Object.assign(
    async (userId: string, tokenIat: number): Promise<boolean> => {
      const cached = cache.get(userId);
      let entries: RevocationRow[];

      if (cached && Date.now() <= cached.expiresAt) {
        entries = cached.entries;
      } else {
        entries = await q.getActiveRevocations(userId);
        cache.set(userId, { entries, expiresAt: Date.now() + CACHE_TTL_MS });
      }

      for (const rev of entries) {
        const revokedEpoch = Math.floor(new Date(rev.revoked_at as string).getTime() / 1000);
        if (tokenIat <= revokedEpoch) return true;
      }
      return false;
    },
    { invalidate },
  );

  return checker;
}
