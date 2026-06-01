// Server helpers for RSC / Server Actions (architecture.md § 5, AC-JS-09).
//
// auth() / getServerSession() / getCurrentUser() read the access cookie and
// return the session claims (or null). requireAuth() redirects to the login
// page when unauthenticated. Standalone verifies the JWT locally; client mode
// (D3) validates by delegating to the Play host.

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt, type EmbeddedTokenPayload } from '../embedded/auth-crypto.js';
import { COOKIE_ACCESS } from '../core/cookies.js';
import type { AuthMode } from '../core/mode.js';

export interface SessionClaims {
  sub: string;
  email: string;
  binding_id: string;
  permissions: string[];
}

export interface ServerHelpersConfig {
  mode: AuthMode;
  playHost: string | null;
  jwtSecret: string | undefined;
  loginPath: string;
}

export interface ServerHelpers {
  getServerSession(): Promise<SessionClaims | null>;
  auth(): Promise<SessionClaims | null>;
  getCurrentUser(): Promise<SessionClaims | null>;
  requireAuth(): Promise<SessionClaims>;
}

export function createServerHelpers(config: ServerHelpersConfig): ServerHelpers {
  async function readAccessToken(): Promise<string | null> {
    // Awaiting handles both Next 14 (sync cookies()) and Next 15 (Promise).
    const store = await cookies();
    return store.get(COOKIE_ACCESS)?.value ?? null;
  }

  async function getServerSession(): Promise<SessionClaims | null> {
    const token = await readAccessToken();
    if (!token) return null;

    if (config.mode === 'client') {
      if (!config.playHost) return null;
      try {
        const r = await fetch(`${config.playHost}/api/auth/me`, { headers: { authorization: `Bearer ${token}` } });
        if (!r.ok) return null;
        const data = (await r.json()) as Partial<SessionClaims>;
        if (!data.sub || !data.email) return null;
        return { sub: data.sub, email: data.email, binding_id: data.binding_id ?? '', permissions: data.permissions ?? [] };
      } catch {
        return null;
      }
    }

    // standalone — verify the access token locally
    if (!config.jwtSecret) return null;
    const payload: EmbeddedTokenPayload | null = verifyJwt(token, config.jwtSecret);
    if (!payload || payload.type !== 'access') return null;
    return { sub: payload.sub, email: payload.email, binding_id: payload.binding_id, permissions: payload.permissions };
  }

  async function requireAuth(): Promise<SessionClaims> {
    const session = await getServerSession();
    if (!session) redirect(config.loginPath); // redirect() returns never
    return session;
  }

  return {
    getServerSession,
    auth: getServerSession,
    getCurrentUser: getServerSession,
    requireAuth,
  };
}
