import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveDashboardOwnerContext } from '../src/client/lib/dashboard-owner-context.ts';

function createStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    snapshot() {
      return Object.fromEntries(values);
    },
  };
}

function createEnvironment({ search, hash = '#section', pathname = '/auth/dashboard', response }) {
  const session = createStorage({
    aiosonOwnerBearer: 'old-token',
    aiosonPlayId: 'old-play',
  });
  const local = createStorage();
  const historyCalls = [];
  const requests = [];

  return {
    environment: {
      fetchFn: async (url, init) => {
        requests.push({ url, init });
        return response;
      },
      history: {
        replaceState: (...args) => historyCalls.push(args),
      },
      localStorage: local,
      location: { pathname, search, hash },
      sessionStorage: session,
    },
    historyCalls,
    local,
    requests,
    session,
  };
}

describe('resolveDashboardOwnerContext', () => {
  it('prioriza owner_context da URL e sobrescreve contexto salvo', async () => {
    const { environment, historyCalls, requests, session } = createEnvironment({
      search: '?owner_context=fresh-code&tab=apps',
      response: new Response(JSON.stringify({ token: 'new-token', playId: 'new-play' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    });

    const owner = await resolveDashboardOwnerContext(environment);

    assert.deepEqual(owner, { token: 'new-token', playId: 'new-play' });
    assert.equal(requests[0].url, '/api/auth/admin/dashboard-context/consume');
    assert.equal(JSON.parse(requests[0].init.body).owner_context, 'fresh-code');
    assert.deepEqual(historyCalls[0], [null, '', '/auth/dashboard?tab=apps#section']);
    assert.equal(session.getItem('aiosonOwnerBearer'), 'new-token');
    assert.equal(session.getItem('aiosonPlayId'), 'new-play');
  });

  it('nao volta para contexto salvo quando owner_context expira', async () => {
    const { environment, local, session } = createEnvironment({
      search: '?owner_context=expired-code',
      response: new Response(JSON.stringify({ error: 'owner_context_expired' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }),
    });

    await assert.rejects(
      () => resolveDashboardOwnerContext(environment),
      /owner_context_expired/,
    );

    assert.equal(session.getItem('aiosonOwnerBearer'), null);
    assert.equal(session.getItem('aiosonPlayId'), null);
    assert.deepEqual(local.snapshot(), {});
  });

  it('consome owner_context do fragmento sem enviá-lo no request inicial', async () => {
    const { environment, historyCalls, requests } = createEnvironment({
      search: '?tab=apps',
      hash: '#owner_context=fragment-code',
      response: new Response(JSON.stringify({ token: 'fragment-token', playId: 'fragment-play' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    });
    assert.deepEqual(await resolveDashboardOwnerContext(environment), {
      token: 'fragment-token', playId: 'fragment-play',
    });
    assert.equal(JSON.parse(requests[0].init.body).owner_context, 'fragment-code');
    assert.deepEqual(historyCalls[0], [null, '', '/auth/dashboard?tab=apps']);
  });

  it('consome owner_context do path e normaliza a URL do app', async () => {
    const { environment, historyCalls, requests } = createEnvironment({
      pathname: '/auth/handoff/path-code/apps/binding-a',
      search: '',
      hash: '',
      response: new Response(JSON.stringify({ token: 'path-token', playId: 'path-play' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    });
    assert.deepEqual(await resolveDashboardOwnerContext(environment), {
      token: 'path-token', playId: 'path-play',
    });
    assert.equal(JSON.parse(requests[0].init.body).owner_context, 'path-code');
    assert.deepEqual(historyCalls[0], [null, '', '/auth/apps/binding-a']);
  });
});
