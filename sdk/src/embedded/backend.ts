import type { Router } from 'express';
import { bootstrap, type BootstrapOptions, type BootstrapResult } from './bootstrap.js';
import { createAuthRouter, type EmbeddedHandlerConfig } from './handlers.js';
import { detectProvider, runEmbeddedMigrations } from './migrate.js';
import { createRevocationChecker, type RevocationChecker } from './revocation-checker.js';
import type { DbProvider, MigrateResult, PrismaClientLike } from './types.js';

export interface EmbeddedBackendConfig {
  prisma: PrismaClientLike;
  jwtSecret: string;
  bindingId: string;
  cookieDomain?: string;
  provider?: DbProvider;
  secureCookies?: boolean;
}

export interface EmbeddedBackend {
  router: Router;
  checkRevocation: RevocationChecker;
  migrate(): Promise<MigrateResult>;
  bootstrap(opts: Pick<BootstrapOptions, 'ownerEmail' | 'ownerRole'>): Promise<BootstrapResult>;
}

export async function createEmbeddedBackend(config: EmbeddedBackendConfig): Promise<EmbeddedBackend> {
  const provider = config.provider ?? await detectProvider(config.prisma);

  const handlerConfig: EmbeddedHandlerConfig = {
    prisma: config.prisma,
    provider,
    jwtSecret: config.jwtSecret,
    bindingId: config.bindingId,
    cookieDomain: config.cookieDomain,
    secureCookies: config.secureCookies,
  };

  const router = createAuthRouter(handlerConfig);
  const checker = createRevocationChecker(config.prisma, provider);

  return {
    router,
    checkRevocation: checker,

    migrate() {
      return runEmbeddedMigrations({ prisma: config.prisma, provider });
    },

    bootstrap(opts) {
      return bootstrap({
        prisma: config.prisma,
        provider,
        ownerEmail: opts.ownerEmail,
        ownerRole: opts.ownerRole,
      });
    },
  };
}

