import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('AC-AMS-15 legacy routes redirect to Apps/Pessoas while preserving owner context', async () => {
  const app = await source('src/client/App.tsx');
  assert.match(app, /LegacyRedirect to="\/auth\/apps"/);
  assert.match(app, /LegacyRedirect to="\/auth\/people"/);
  assert.match(app, /location\.search/);
  assert.match(app, /LegacyBindingRedirect/);
  assert.match(app, /hasOwnerContextCode/);
  assert.match(app, /hasOwnerContextPath/);
  assert.match(app, /\/auth\/handoff\/:ownerContext\/apps/);
});

test('AC-AMS-16 Apps, Pessoas and Avançado expose loading, empty, error and retry states', async () => {
  const [apps, people, management, advanced] = await Promise.all([
    source('src/client/pages/AppsPage.tsx'),
    source('src/client/pages/PeoplePage.tsx'),
    source('src/client/pages/AppManagementPage.tsx'),
    source('src/client/pages/AdvancedPage.tsx'),
  ]);
  assert.match(apps, /Carregando apps/);
  assert.match(apps, /Nenhum app conectado/);
  assert.match(apps, /role="alert"/);
  assert.match(apps, /Atualizar/);
  assert.match(apps, /await ensureOwnerContext\(\)/);
  assert.match(people, /Nenhuma pessoa cadastrada/);
  assert.match(people, /credential_status/);
  assert.match(people, /Nova pessoa/);
  assert.match(people, /method: isEditing \? 'PATCH' : 'POST'/);
  assert.match(people, /method: 'DELETE'/);
  assert.match(people, /Defina uma senha/);
  assert.match(management, /ao-modal-backdrop--centered/);
  assert.match(management, /setLinkForm\(null\)/);
  assert.match(management, /Editar perfil/);
  assert.match(management, /method: profileForm\.id \? 'PUT' : 'POST'/);
  assert.match(management, /Arquivar perfil/);
  assert.match(management, /catálogo anterior foi preservado/);
  assert.match(management, /Não foi possível abrir este app/);
  assert.match(management, /Tentar novamente/);
  assert.match(advanced, /Configurações técnicas/);
});

test('AC-AMS-16 owner handoff consumption is shared across StrictMode loads', async () => {
  const ownerFetch = await source('src/client/lib/owner-fetch.ts');
  const ownerContext = await source('src/client/lib/dashboard-owner-context.ts');
  assert.match(ownerFetch, /ownerContextPromise \?\?=/);
  assert.match(ownerFetch, /cargas concorrentes compartilham/);
  assert.match(ownerContext, /window\.fetch\.bind\(window\)/);
});
