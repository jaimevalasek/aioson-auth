import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'react/index': 'src/react/index.tsx',
    'express/index': 'src/express/index.ts',
    'embedded/index': 'src/embedded/index.ts',
    'core/index': 'src/core/index.ts',
    'next/index': 'src/next/index.ts',
    // next-free building block — its own entry so it stays importable in plain Node (tests).
    'next/route-handler': 'src/next/route-handler.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  sourcemap: true,
  treeshake: true,
  // React, Express e Next são peerDependencies — não bundle.
  external: ['react', 'express', 'next', 'next/server', 'next/headers', 'next/navigation'],
});
