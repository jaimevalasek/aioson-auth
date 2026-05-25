import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'react/index': 'src/react/index.tsx',
    'express/index': 'src/express/index.ts',
    'embedded/index': 'src/embedded/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  sourcemap: true,
  treeshake: true,
  // React e Express são peerDependencies — não bundle.
  external: ['react', 'express'],
});
