import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function allocatePort() {
  const probe = net.createServer();
  await new Promise((resolvePromise, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolvePromise);
  });
  const address = probe.address();
  if (!address || typeof address === 'string') throw new Error('Could not allocate a test port');
  await new Promise((resolvePromise, reject) => probe.close((error) => (error ? reject(error) : resolvePromise())));
  return address.port;
}

async function waitForJson(url, child) {
  const deadline = Date.now() + 15_000;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return { response, body: await response.json() };
      lastError = new Error(`Unexpected ${response.status} from ${url}`);
    } catch (error) {
      lastError = error;
    }
    if (child.exitCode !== null) throw new Error(`Auth server exited before readiness: ${child.exitCode}`);
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 150));
  }
  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

const port = await allocatePort();
const child = spawn(process.execPath, ['dist/server/server.js'], {
  cwd: repositoryRoot,
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
});
let output = '';
child.stdout.on('data', (chunk) => { output += chunk; });
child.stderr.on('data', (chunk) => { output += chunk; });

try {
  const health = await waitForJson(`http://127.0.0.1:${port}/health`, child);
  const readiness = await waitForJson(`http://127.0.0.1:${port}/ready`, child);
  assert.equal(health.body.status, 'ok');
  assert.equal(readiness.body.status, 'ready');
  console.log(`Auth boot smoke passed on port ${port}.`);
} finally {
  if (child.exitCode === null) child.kill();
  await new Promise((resolvePromise) => child.once('exit', resolvePromise));
  if (child.exitCode && child.exitCode !== 0) process.stderr.write(output);
}
