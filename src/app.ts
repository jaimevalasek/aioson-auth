import express from 'express';
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
import { adminFederationRouter } from './routes/admin-federation.js';
import { shellLoginRouter } from './routes/shell-login.js';
import { scheduleRevocationCleanup } from './actions/TokenRevocationAction.js';
import { localPrisma, reloadMainPrismaFromConfig } from './lib/prisma-clients.js';
import { startRevocationPoller } from './services/revocation_poller.js';
import { readConnectionString } from './services/connection_string_keyring.js';

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
  // Slice C (auth-integration-gaps.md): CORS configurável por env. Permite
  // que apps cloud (Vercel, custom domain, etc.) consumam o aioson-auth sem
  // mudar código. Formato de `ALLOWED_ORIGINS`:
  //   - `*` → libera tudo (NÃO usar em produção; só pra dev rápido)
  //   - lista CSV: `https://app.example.com,https://admin.example.com`
  //   - cada entry pode começar com `http://` ou `https://`; matching é exato
  //   - default (env ausente): localhost/127.0.0.1 — comportamento legado.
  const rawAllowed = process.env['ALLOWED_ORIGINS']?.trim();
  const allowAny = rawAllowed === '*';
  const allowedOrigins = rawAllowed && !allowAny
    ? rawAllowed.split(',').map((s) => s.trim()).filter(Boolean)
    : null;

  app.use(cors({
    origin: (origin, callback) => {
      // Same-origin (curl, server-to-server) e requests sem Origin sempre OK
      if (!origin) return callback(null, true);
      if (allowAny) return callback(null, true);
      if (allowedOrigins) {
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      }
      // Fallback legado: localhost/127.0.0.1 em qualquer porta
      if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }));
  app.use(express.json());

  app.use('/api/auth/settings', settingsRouter);
  app.use('/api/auth/bindings', bindingsRouter);
  app.use('/api/auth/admin/bindings', adminBindingsRouter);
  app.use('/api/auth/admin/federation', adminFederationRouter);
  app.use('/api/auth/shell', shellLoginRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/auth', rbacRouter);
  app.use('/api/admin', adminRouter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  const clientDistPath = resolveClientDistPath();
  if (clientDistPath) {
    app.use(express.static(clientDistPath));
    app.get('*', (_req, res) => {
      res.sendFile(resolve(clientDistPath, 'index.html'));
    });
  }

  // S1B.5 — agenda cleanup do TokenRevocation a cada 1h (ADR-07).
  scheduleRevocationCleanup();

  // play-federation S2B — bootstrap Federação:
  //   1. Carrega FederationConfig do SQLite local
  //   2. Se federation_active=true: lê connection string via keyring bridge
  //      e recarrega mainPrisma + dispara revocation_poller
  //   3. Se inativo: no-op silencioso (modo single-device legado preservado)
  void bootstrapFederation();

  return app;
}

async function bootstrapFederation(): Promise<void> {
  try {
    const config = await localPrisma.federationConfig.findUnique({
      where: { id: 'singleton' },
    });
    if (!config?.federation_active) {
      // Modo single-device — sem polling, mainPrisma fica no SQLite local.
      return;
    }

    const aiosonPlayId = process.env['AIOSON_PLAY_ID'];
    if (!aiosonPlayId) {
      console.warn(
        '[bootstrap] FederationConfig.federation_active=true mas AIOSON_PLAY_ID env não setado — poller não inicia',
      );
      return;
    }

    let connectionString: string | null = null;
    try {
      connectionString = await readConnectionString(aiosonPlayId);
    } catch (err) {
      console.warn('[bootstrap] keyring bridge indisponível no boot:', err);
    }

    if (connectionString) {
      await reloadMainPrismaFromConfig(connectionString);
    }

    startRevocationPoller(aiosonPlayId);
  } catch (err) {
    console.error('[bootstrap] erro inesperado em bootstrapFederation:', err);
  }
}
