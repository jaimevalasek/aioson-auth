// dotenv/config DEVE vir antes de qualquer import que leia process.env no
// top-level (ex.: ./lib/crypto.ts lê MASTER_KEY na carga do módulo). Em ESM os
// imports são avaliados na ordem em que aparecem.
import 'dotenv/config';
import { createApp } from './app.js';

const app = createApp();
const PORT = process.env['PORT'] || 3001;

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
