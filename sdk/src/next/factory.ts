// createNextAuth — the single wiring surface the scaffolded `lib/auth.ts` calls
// (architecture.md § 5). Resolves mode from AIOSON_PLAY_HOST, lazily builds the
// embedded engine deps in standalone mode, and returns the route handler,
// middleware and server helpers — all reading from one instance.

import { detectProvider } from '../embedded/migrate.js';
import { createQueries } from '../embedded/queries.js';
import { createRevocationChecker } from '../embedded/revocation-checker.js';
import type { FlowDeps, RevocationCheck } from '../core/flows.js';
import type { DbProvider, PrismaClientLike } from '../embedded/types.js';
import { resolveMode, playHostFrom, type AuthMode, type ModeEnv } from '../core/mode.js';
import { createRouteHandlers, type RouteContext } from './route-handler.js';
import { createServerHelpers, type ServerHelpers } from './server.js';
import { createAuthMiddleware, type AuthMiddleware } from './middleware.js';

export interface NextAuthConfig {
  /** Required in standalone mode — the consumer app's PrismaClient. */
  prisma?: PrismaClientLike;
  /** Standalone signing secret. Defaults to process.env.JWT_SECRET. */
  jwtSecret?: string;
  /** Standalone binding id (JWT `binding_id` claim). Defaults to process.env.AIOSON_BINDING_ID. */
  bindingId?: string;
  /** Force client mode against this Play host. Defaults to process.env.AIOSON_PLAY_HOST. */
  playHost?: string;
  provider?: DbProvider;
  cookieDomain?: string;
  /** Default true; set false only in local dev without HTTPS. */
  secureCookies?: boolean;
  /** Mount path of the catch-all route. Default '/api/auth'. */
  basePath?: string;
  /** Where to redirect unauthenticated users. Default '/login'. */
  loginPath?: string;
  /** D2 signup policy. */
  allowSignup?: boolean;
  firstUserRole?: string;
  defaultRole?: string;
}

export interface NextAuth extends ServerHelpers {
  mode: AuthMode;
  routeHandler: { GET: (req: Request) => Promise<Response>; POST: (req: Request) => Promise<Response> };
  middleware: AuthMiddleware;
}

function readEnv(): ModeEnv & { JWT_SECRET?: string; AIOSON_BINDING_ID?: string } {
  return (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};
}

export function createNextAuth(config: NextAuthConfig = {}): NextAuth {
  const env = readEnv();
  const mode = resolveMode(config.playHost !== undefined ? { AIOSON_PLAY_HOST: config.playHost } : env);
  const playHost = config.playHost ? config.playHost.trim().replace(/\/+$/, '') : playHostFrom(env);
  const basePath = config.basePath ?? '/api/auth';
  const loginPath = config.loginPath ?? '/login';
  const secureCookies = config.secureCookies ?? true;
  const jwtSecret = config.jwtSecret ?? env.JWT_SECRET;
  const bindingId = config.bindingId ?? env.AIOSON_BINDING_ID ?? 'standalone';

  let depsPromise: Promise<FlowDeps> | null = null;
  async function getDeps(): Promise<FlowDeps> {
    const prisma = config.prisma;
    const secret = jwtSecret;
    if (!prisma) throw new Error('[aioson-auth/next] standalone mode requires `prisma`');
    if (!secret) throw new Error('[aioson-auth/next] standalone mode requires JWT_SECRET');
    if (!depsPromise) {
      depsPromise = (async () => {
        const provider = config.provider ?? (await detectProvider(prisma));
        const checkRevocation = createRevocationChecker(prisma, provider) as RevocationCheck;
        return {
          queries: createQueries(prisma, provider),
          jwtSecret: secret,
          bindingId,
          checkRevocation,
          allowSignup: config.allowSignup,
          firstUserRole: config.firstUserRole,
          defaultRole: config.defaultRole,
        } satisfies FlowDeps;
      })();
    }
    return depsPromise;
  }

  const ctx: RouteContext = {
    mode,
    basePath,
    playHost,
    cookieDomain: config.cookieDomain,
    secureCookies,
    getDeps,
  };

  const routeHandler = createRouteHandlers(ctx);
  const server = createServerHelpers({ mode, playHost, jwtSecret, loginPath });
  const middleware = createAuthMiddleware({ mode, playHost, jwtSecret, loginPath, basePath });

  return { mode, routeHandler, middleware, ...server };
}
