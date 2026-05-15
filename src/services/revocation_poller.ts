// revocation_poller.ts — worker background que sincroniza TokenRevocation
// do DB compartilhado pro cache local. Implementa BR-F-07 / AC-15.
//
// Spec (architecture-play-federation.md § 6.5):
//   - Polling a cada 30s (POLL_INTERVAL_MS).
//   - Query: TokenRevocation WHERE aioson_play_id = ? AND expires_at > NOW()
//            AND revoked_at > last_poll_at
//   - Marca cada hit em revocation-cache.
//   - Probe SELECT 1 pra health-check; emite estado via console.log
//     estruturado pra aioson-play consumir.
//
// Quando Federação inativa: poller NÃO arranca (boot sequence). Aioson-auth
// roda normal contra SQLite local sem polling.

import { mainPrisma } from '../lib/prisma-clients.js';
import { markRevoked, pruneExpired, revocationCacheSize } from '../lib/revocation-cache.js';

const POLL_INTERVAL_MS = 30_000;
const PRUNE_EVERY_N_TICKS = 4; // a cada 4 ticks (2 min) limpa expirados.

type HealthState = 'online' | 'degraded' | 'offline' | 'recovering';

interface PollerState {
  timer: NodeJS.Timeout | null;
  lastPollAt: Date;
  lastHealth: HealthState;
  consecutiveFailures: number;
  tickCount: number;
  aiosonPlayId: string | null;
}

const state: PollerState = {
  timer: null,
  lastPollAt: new Date(0),
  lastHealth: 'recovering',
  consecutiveFailures: 0,
  tickCount: 0,
  aiosonPlayId: null,
};

/**
 * Inicia o poller pra um `aiosonPlayId` específico (vem da
 * `installation_state` do aioson-play, propagada via env var
 * `AIOSON_PLAY_ID`). No-op se já estiver rodando.
 */
export function startRevocationPoller(aiosonPlayId: string): void {
  if (state.timer) {
    // Reuse — caller pode invocar 2x sem problema.
    return;
  }
  if (!aiosonPlayId) {
    console.warn('[revocation-poller] aiosonPlayId vazio — poller NÃO iniciado');
    return;
  }
  state.aiosonPlayId = aiosonPlayId;
  state.lastPollAt = new Date(0);
  state.consecutiveFailures = 0;
  state.tickCount = 0;
  emitHealth('recovering');

  state.timer = setInterval(() => {
    void pollOnce();
  }, POLL_INTERVAL_MS);

  // Tick imediato pra não esperar 30s.
  void pollOnce();
}

/** Para o poller — usado em shutdown ou desativação futura. */
export function stopRevocationPoller(): void {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

/**
 * Pública pra testes — executa um único ciclo. Idempotente.
 */
export async function pollOnce(): Promise<void> {
  if (!state.aiosonPlayId) return;
  const aiosonPlayId = state.aiosonPlayId;
  const cycleStartedAt = new Date();
  const now = new Date();
  let revocations: Array<{ user_id: string; binding_id: string; expires_at: Date }>;

  try {
    // Health check + query em uma só operação: se a query funciona, está online.
    revocations = await mainPrisma.tokenRevocation.findMany({
      where: {
        aioson_play_id: aiosonPlayId,
        expires_at: { gt: now },
        revoked_at: { gt: state.lastPollAt },
      },
      select: { user_id: true, binding_id: true, expires_at: true },
    });
    handleSuccess();
  } catch (err) {
    handleFailure(err);
    return;
  }

  for (const rev of revocations) {
    markRevoked(rev);
  }

  state.lastPollAt = cycleStartedAt;
  state.tickCount += 1;

  if (state.tickCount % PRUNE_EVERY_N_TICKS === 0) {
    const pruned = pruneExpired();
    if (pruned > 0) {
      console.log(
        JSON.stringify({
          event: 'revocation_cache_pruned',
          pruned,
          remaining: revocationCacheSize(),
        }),
      );
    }
  }
}

function handleSuccess(): void {
  state.consecutiveFailures = 0;
  const wasNotOnline = state.lastHealth !== 'online';
  if (wasNotOnline) {
    emitHealth('online');
  }
}

function handleFailure(err: unknown): void {
  state.consecutiveFailures += 1;
  const msg = err instanceof Error ? err.message : String(err);
  console.warn('[revocation-poller] poll failed:', msg);

  // 1 falha → degraded. 3+ falhas → offline.
  if (state.consecutiveFailures >= 3) {
    if (state.lastHealth !== 'offline') {
      emitHealth('offline');
    }
  } else {
    if (state.lastHealth !== 'degraded') {
      emitHealth('degraded');
    }
  }
}

function emitHealth(next: HealthState): void {
  state.lastHealth = next;
  console.log(
    JSON.stringify({
      event: 'federation_health',
      state: next,
      timestamp: new Date().toISOString(),
    }),
  );
}

/** Read-only pra introspection — usado por `/federation/status` endpoint. */
export function getPollerHealth(): HealthState | 'never_started' {
  if (!state.timer) return 'never_started';
  return state.lastHealth;
}
