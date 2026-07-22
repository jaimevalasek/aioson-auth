import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { settingsRouter } from './routes/settings.js';
import { bindingsRouter } from './routes/bindings.js';
import { authRouter } from './routes/auth.js';
import { rbacRouter } from './routes/rbac.js';
import { adminRouter } from './routes/admin.js';
import { adminBindingsRouter } from './routes/admin-bindings.js';
import { adminAppInventoryRouter } from './routes/admin-app-inventory.js';
import { adminDashboardContextRouter } from './routes/admin-dashboard-context.js';
import { adminDatabaseRouter } from './routes/admin-database.js';
import { adminFederationRouter } from './routes/admin-federation.js';
import { shellLoginRouter } from './routes/shell-login.js';
import { ssoRouter } from './routes/sso.js';
import { scheduleRevocationCleanup } from './actions/TokenRevocationAction.js';
import { prisma } from './lib/prisma.js';
import { AuthError, sendAuthError } from './lib/auth-error.js';
import { requestContext } from './lib/request-context.js';
import { isOriginAllowedForRequest } from './lib/app-origin.js';

function resolveClientDistPath() {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const builtClient = resolve(currentDir, '../client');
  if (existsSync(resolve(builtClient, 'index.html'))) return builtClient;

  const sourceClient = resolve(currentDir, 'client');
  if (existsSync(resolve(sourceClient, 'index.html'))) return sourceClient;

  return null;
}

export function createApp() {
  const app = express();

  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    frameguard: false,
  }));
  app.use(requestContext);
  // Slice C (auth-integration-gaps.md): CORS configurável por env. Permite
  // que apps cloud (Vercel, custom domain, etc.) consumam o aioson-auth sem
  // mudar código. Formato de `ALLOWED_ORIGINS`:
  //   - `*` → libera tudo (NÃO usar em produção; só pra dev rápido)
  //   - lista CSV: `https://app.example.com,https://admin.example.com`
  //   - cada entry pode começar com `http://` ou `https://`; matching é exato
  //   - default (env ausente): localhost/127.0.0.1 — comportamento legado.
  app.use((req, res, next) => cors({
    origin: (origin, callback) => {
      // Same-origin (curl, server-to-server) e requests sem Origin sempre OK.
      if (!origin) return callback(null, true);
      void isOriginAllowedForRequest(origin, req.originalUrl)
        .then((allowed) => callback(allowed ? null : new AuthError('cors_origin_not_allowed'), allowed))
        .catch(() => callback(new AuthError('cors_origin_not_allowed')));
    },
    credentials: true,
  })(req, res, next));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/sso', ssoRouter);
  app.use('/api/auth/settings', settingsRouter);
  app.use('/api/auth/bindings', bindingsRouter);
  app.use('/api/auth/admin/bindings', adminBindingsRouter);
  app.use('/api/auth/admin/app-inventory', adminAppInventoryRouter);
  app.use('/api/auth/admin/dashboard-context', adminDashboardContextRouter);
  app.use('/api/auth/admin/database', adminDatabaseRouter);
  app.use('/api/auth/admin/federation', adminFederationRouter);
  app.use('/api/auth/shell', shellLoginRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/auth', rbacRouter);
  app.use('/api/admin', adminRouter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/ready', async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return res.json({
        status: 'ready',
        version: process.env['npm_package_version'] ?? 'unknown',
        databaseProvider: process.env['AUTH_DATABASE_PROVIDER'] ?? 'sqlite',
      });
    } catch (error) {
      return sendAuthError(_req, res, error, 'readiness');
    }
  });

  const clientDistPath = resolveClientDistPath();
  if (clientDistPath) {
    app.use(express.static(clientDistPath));
    app.get('*', (_req, res) => {
      res.sendFile(resolve(clientDistPath, 'index.html'));
    });
  }

  app.use((error: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    return sendAuthError(req, res, error, 'http_request');
  });

  // S1B.5 — agenda cleanup do TokenRevocation a cada 1h (ADR-07).
  scheduleRevocationCleanup();

  return app;
}
