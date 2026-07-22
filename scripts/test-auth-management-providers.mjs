import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const providers = {
  sqlite: 'file:./provider-validation.db',
  postgresql: 'postgresql://user:password@127.0.0.1:5432/aioson_auth?sslmode=require',
  mysql: 'mysql://user:password@127.0.0.1:3306/aioson_auth?ssl=true',
};

function run(command, args, provider) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      DATABASE_PROVIDER: provider,
      DATABASE_URL: providers[provider],
    },
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} falhou para ${provider}:\n${result.stdout}\n${result.stderr}`);
  }
}

try {
  for (const provider of Object.keys(providers)) {
    run(process.execPath, ['--import', 'tsx', 'scripts/build-prisma-schema.ts'], provider);
    run(process.execPath, ['node_modules/prisma/build/index.js', 'validate'], provider);

    const migrationProvider = provider === 'postgresql' ? 'postgres' : provider;
    const migration = await readFile(
      path.join(root, 'prisma', 'migrations', migrationProvider, '20260711070000_add_app_scoped_access', 'migration.sql'),
      'utf8',
    );
    for (const contract of ['AppAccess', 'AppProfile', 'AppProfilePermission', 'auth_mode', 'retired_at']) {
      assert.ok(migration.includes(contract), `${provider}: migration sem ${contract}`);
    }
  }
  console.log('AC-AMS-13: schema e migrations validados para SQLite, PostgreSQL e MySQL/MariaDB.');
} finally {
  run(process.execPath, ['--import', 'tsx', 'scripts/build-prisma-schema.ts'], 'sqlite');
}
