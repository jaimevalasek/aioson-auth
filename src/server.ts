// dotenv/config DEVE vir antes de qualquer import que leia process.env no
// top-level (ex.: ./lib/crypto.ts lê MASTER_KEY na carga do módulo). Em ESM os
// imports são avaliados na ordem em que aparecem.
import 'dotenv/config';
import { createApp } from './app.js';
import { ensureAuthSessionBindingSchema } from './lib/auth-session-binding-migration.js';

async function startServer(): Promise<void> {
  await ensureAuthSessionBindingSchema();

  const app = createApp();
  const port = process.env['PORT'] || 3091;
  app.listen(port, () => {
    console.log(`[server] running on http://localhost:${port}`);
  });
}

void startServer().catch((error) => {
  console.error('[server] startup failed', error);
  process.exit(1);
});
