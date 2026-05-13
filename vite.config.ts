import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: 'src/client',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../../dist/client',
    rollupOptions: {
      // Tauri injeta este módulo em runtime quando o cliente roda dentro de um
      // webview do aioson-play. Fora do Tauri (browser standalone), o dynamic
      // import em BindingsPage.tsx cai no catch — sem este external, Rollup
      // falha o build standalone tentando resolver o módulo.
      external: ['@tauri-apps/api/core'],
    },
  },
});
