// Next.js App Router catch-all route handler (architecture.md § 5/§ 8, D1+D3).
//
// Mounted by the scaffolded `app/api/auth/[...auth]/route.ts`. Parses the action
// from the URL (version-robust — avoids the params sync/Promise difference between
// Next 14/15), delegates to the framework-neutral core, and returns a plain Web
// `Response` (NextResponse extends Response, so returning Response is fully
// supported by Route Handlers). Using the Web API keeps this layer Edge-safe,
// Next-version-agnostic and unit-testable without a running Next server.
// Cookie semantics match the Express adapter exactly. Standalone mode runs the
// embedded engine; client mode (D3, partial) delegates validation to the Play host.

import {
  loginCore,
  signupCore,
  refreshCore,
  logoutCore,
  meCore,
  passwordResetRequestCore,
  passwordResetConfirmCore,
  type FlowDeps,
} from '../core/flows.js';
import type { AuthResult } from '../core/result.js';
import { COOKIE_ACCESS } from '../core/cookies.js';
import type { AuthMode } from '../core/mode.js';
import { normalizeCookieDomain } from '../core/cookie-domain.js';

export interface RouteContext {
  mode: AuthMode;
  basePath: string;
  playHost: string | null;
  cookieDomain?: string | undefined;
  secureCookies: boolean;
  getDeps: () => Promise<FlowDeps>;
}

type Handler = (req: Request) => Promise<Response>;

function serializeCookie(ctx: RouteContext, name: string, value: string, maxAgeSecs: number): string {
  const cookieDomain = normalizeCookieDomain(ctx.cookieDomain);
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', `Max-Age=${maxAgeSecs}`, 'HttpOnly', 'SameSite=Lax'];
  if (ctx.secureCookies) parts.push('Secure');
  if (cookieDomain) parts.push(`Domain=${cookieDomain}`);
  return parts.join('; ');
}

function jsonResponse(body: unknown, status: number, cookies?: string[]): Response {
  const headers = new Headers({ 'content-type': 'application/json' });
  if (cookies) for (const c of cookies) headers.append('set-cookie', c);
  return new Response(JSON.stringify(body), { status, headers });
}

/** Translate a framework-neutral AuthResult into a Web Response (same cookie semantics as Express). */
function toResponse(ctx: RouteContext, result: AuthResult): Response {
  const cookies: string[] = [];
  if (result.setCookies) for (const c of result.setCookies) cookies.push(serializeCookie(ctx, c.name, c.value, c.maxAgeSecs));
  if (result.clearCookies) for (const name of result.clearCookies) cookies.push(serializeCookie(ctx, name, '', 0));
  return jsonResponse(result.body, result.status, cookies);
}

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
}

/** Bearer token from the Authorization header, falling back to the access cookie. */
function bearerToken(req: Request): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7).trim();
  return readCookie(req, COOKIE_ACCESS);
}

async function jsonBody(req: Request): Promise<Record<string, unknown>> {
  try {
    const data: unknown = await req.json();
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** Extract the auth action (e.g. 'login', 'password-reset/request') from the URL pathname. */
function actionOf(ctx: RouteContext, req: Request): string {
  const { pathname } = new URL(req.url);
  const tail = pathname.startsWith(ctx.basePath) ? pathname.slice(ctx.basePath.length) : pathname;
  return tail.replace(/^\/+|\/+$/g, '');
}

/** Client mode (D3, partial): /me proxies to the Play host; auth happens on the Play shell. */
async function clientHandle(ctx: RouteContext, req: Request, action: string, method: string): Promise<Response> {
  if (!ctx.playHost) return jsonResponse({ error: 'AIOSON_PLAY_HOST missing' }, 500);

  if (method === 'GET' && action === 'me') {
    const token = bearerToken(req);
    if (!token) return jsonResponse({ error: 'Missing token' }, 401);
    try {
      const upstream = await fetch(`${ctx.playHost}/api/auth/me`, { headers: { authorization: `Bearer ${token}` } });
      const body: unknown = await upstream.json().catch(() => ({}));
      return jsonResponse(body, upstream.status);
    } catch {
      return jsonResponse({ error: 'play_host_unreachable' }, 502);
    }
  }

  // login/signup/refresh/reset are served by the Play shell, not locally.
  return jsonResponse(
    { error: 'client_mode', message: 'Authenticate via the Play host', redirect: `${ctx.playHost}/auth/login` },
    409,
  );
}

export function createRouteHandlers(ctx: RouteContext): { GET: Handler; POST: Handler } {
  async function handle(req: Request): Promise<Response> {
    const action = actionOf(ctx, req);
    const method = req.method.toUpperCase();
    try {
      if (ctx.mode === 'client') return await clientHandle(ctx, req, action, method);

      // standalone — embedded engine via the core flows
      if (method === 'POST') {
        switch (action) {
          case 'login': return toResponse(ctx, await loginCore(await ctx.getDeps(), await jsonBody(req)));
          case 'signup': return toResponse(ctx, await signupCore(await ctx.getDeps(), await jsonBody(req)));
          case 'refresh': return toResponse(ctx, await refreshCore(await ctx.getDeps(), await jsonBody(req)));
          case 'logout': return toResponse(ctx, await logoutCore(await ctx.getDeps(), { token: bearerToken(req) }));
          case 'password-reset/request': return toResponse(ctx, await passwordResetRequestCore(await ctx.getDeps(), await jsonBody(req)));
          case 'password-reset/confirm': return toResponse(ctx, await passwordResetConfirmCore(await ctx.getDeps(), await jsonBody(req)));
          default: return jsonResponse({ error: 'Not found' }, 404);
        }
      }
      if (method === 'GET' && action === 'me') {
        return toResponse(ctx, await meCore(await ctx.getDeps(), { token: bearerToken(req) }));
      }
      return jsonResponse({ error: 'Not found' }, 404);
    } catch (e) {
      console.error(`[aioson-auth/next] ${method} ${action} error:`, e);
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  }

  return { GET: handle, POST: handle };
}
