import { spawnSync } from 'node:child_process';

const providers = ['sqlite', 'postgresql', 'mysql'];

function run(command, args, env) {
  const result = spawnSync(command, args, { env: { ...process.env, ...env }, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

for (const provider of providers) {
  run('npm', ['run', 'db:build-schema'], {
    DATABASE_PROVIDER: provider,
    PRISMA_CLIENT_OUTPUT: `../src/generated/prisma/${provider}`,
  });
  run('npx', ['prisma', 'generate', '--schema', 'prisma/schema.prisma'], {});
}

// Restore the default SQLite schema for legacy Prisma CLI commands. Do not
// regenerate node_modules/@prisma/client here: a running Play Service can hold
// its Windows query engine DLL open, while isolated outputs remain writable.
run('npm', ['run', 'db:build-schema'], { DATABASE_PROVIDER: 'sqlite', PRISMA_CLIENT_OUTPUT: '' });
