// Auth middleware (architecture.md § 5).
//
// withAuth() guards protected routes. Standalone verifies the access token's
// signature locally (Edge-safe — no DB); revocation is enforced at the API layer
// given the short access-token TTL. Client mode redirects unauthenticated users
// to the Play login shell.

import { NextResponse, type NextRequest } from 'next/server';
import { verifyJwt } from '../embedded/auth-crypto.js';
import { COOKIE_ACCESS } from '../core/cookies.js';
import type { AuthMode } from '../core/mode.js';

export interface MiddlewareConfig {
  mode: AuthMode;
  playHost: string | null;
  jwtSecret: string | undefined;
  loginPath: string;
  basePath: string;
}

export type AuthMiddleware = (req: NextRequest) => NextResponse;

export function createAuthMiddleware(config: MiddlewareConfig): AuthMiddleware {
  return (req: NextRequest): NextResponse => {
    const token = req.cookies.get(COOKIE_ACCESS)?.value ?? null;

    if (config.mode === 'client') {
      if (!token && config.playHost) {
        return NextResponse.redirect(`${config.playHost}/auth/login`);
      }
      return NextResponse.next();
    }

    // standalone — verify the access token signature locally
    const secret = config.jwtSecret;
    const authed = !!token && !!secret && verifyJwt(token, secret)?.type === 'access';
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = config.loginPath;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  };
}
