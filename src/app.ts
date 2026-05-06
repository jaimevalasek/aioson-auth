import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { settingsRouter } from './routes/settings.js';
import { bindingsRouter } from './routes/bindings.js';
import { authRouter } from './routes/auth.js';
import { rbacRouter } from './routes/rbac.js';
import { adminRouter } from './routes/admin.js';
import { adminBindingsRouter } from './routes/admin-bindings.js';
import { scheduleRevocationCleanup } from './actions/TokenRevocationAction.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
  app.use(express.json());

  app.use('/api/auth/settings', settingsRouter);
  app.use('/api/auth/bindings', bindingsRouter);
  app.use('/api/auth/admin/bindings', adminBindingsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/auth', rbacRouter);
  app.use('/api/admin', adminRouter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // S1B.5 — agenda cleanup do TokenRevocation a cada 1h (ADR-07).
  scheduleRevocationCleanup();

  return app;
}
