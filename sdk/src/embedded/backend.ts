import type { Router } from 'express';
import { bootstrap, type BootstrapOptions, type BootstrapResult } from './bootstrap.js';
import { createAuthRouter, type EmbeddedHandlerConfig } from './handlers.js';
import { detectProvider, runEmbeddedMigrations } from './migrate.js';
import { createRevocationChecker, type RevocationChecker } from './revocation-checker.js';
import type { DbProvider, MigrateResult, PrismaClientLike } from './types.js';

export interface EmbeddedBackendConfig {
  prisma?: PrismaClientLike;
  /** Alias accepted by the public AC-SE-01 contract. Prefer `prisma` internally. */
  prismaClient?: PrismaClientLike;
  jwtSecret: string;
  bindingId: string;
  cookieDomain?: string;
  provider?: DbProvider;
  secureCookies?: boolean;
  /** D2 signup policy — when false AND a user already exists, signup is rejected. Default true. */
  allowSignup?: boolean;
  /** Role granted to the first user (bootstrap). Default 'admin'. */
  firstUserRole?: string;
  /** Role granted to subsequent signups. Default 'viewer'. */
  defaultRole?: string;
}

export interface EmbeddedBackend {
  router: Router;
  checkRevocation: RevocationChecker;
  migrate(): Promise<MigrateResult>;
  bootstrap(opts: Pick<BootstrapOptions, 'ownerEmail' | 'ownerRole'>): Promise<BootstrapResult>;
}

export async function createEmbeddedBackend(config: EmbeddedBackendConfig): Promise<EmbeddedBackend> {
  const prisma = config.prisma ?? config.prismaClient;
  if (!prisma) {
    throw new Error('[aioson-auth/embedded] prisma or prismaClient is required');
  }
  const provider = config.provider ?? await detectProvider(prisma);

  const handlerConfig: EmbeddedHandlerConfig = {
    prisma,
    provider,
    jwtSecret: config.jwtSecret,
    bindingId: config.bindingId,
    cookieDomain: config.cookieDomain,
    secureCookies: config.secureCookies,
    allowSignup: config.allowSignup,
    firstUserRole: config.firstUserRole,
    defaultRole: config.defaultRole,
  };

  const router = createAuthRouter(handlerConfig);
  const checker = createRevocationChecker(prisma, provider);

  return {
    router,
    checkRevocation: checker,

    migrate() {
      return runEmbeddedMigrations({ prisma, provider });
    },

    bootstrap(opts) {
      return bootstrap({
        prisma,
        provider,
        ownerEmail: opts.ownerEmail,
        ownerRole: opts.ownerRole,
      });
    },
  };
}
