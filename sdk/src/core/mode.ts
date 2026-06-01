// Ambient mode resolution (architecture.md § 5, BR-01).
//
// The single dev-facing switch is the presence of AIOSON_PLAY_HOST:
//   present  → client mode (app runs inside the Play desktop; auth delegates to the central service)
//   absent   → standalone mode (published online; the embedded engine is the backend)
// Resolution is at runtime — switching modes never requires a rebuild (AC-JS-10).

export type AuthMode = 'client' | 'standalone';

export interface ModeEnv {
  AIOSON_PLAY_HOST?: string | undefined;
}

/** Resolve the auth mode from the environment. Defaults to reading process.env. */
export function resolveMode(env: ModeEnv = (globalThis as { process?: { env: ModeEnv } }).process?.env ?? {}): AuthMode {
  const host = env.AIOSON_PLAY_HOST;
  return typeof host === 'string' && host.trim().length > 0 ? 'client' : 'standalone';
}

/** The Play host URL (client mode only), trimmed, without trailing slash. */
export function playHostFrom(env: ModeEnv = (globalThis as { process?: { env: ModeEnv } }).process?.env ?? {}): string | null {
  const host = env.AIOSON_PLAY_HOST;
  if (typeof host !== 'string' || !host.trim()) return null;
  return host.trim().replace(/\/+$/, '');
}
