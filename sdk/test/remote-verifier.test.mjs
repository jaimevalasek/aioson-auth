import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { AuthError, initialSessionFromPlayEnv, verifyRemoteBearer } from '../dist/index.js';

describe('verifyRemoteBearer', () => {
  it('preserves structured status, code and request id from aioson-auth', async () => {
    await assert.rejects(
      () => verifyRemoteBearer({
        baseUrl: 'http://auth.test',
        bindingId: 'binding-a',
        authorization: 'Bearer token',
        fetch: async () => new Response(JSON.stringify({
          error: {
            code: 'binding_mismatch',
            message: 'Token is not valid for this app binding',
            requestId: 'auth-request-1',
          },
        }), { status: 401 }),
      }),
      (error) => {
        assert.ok(error instanceof AuthError);
        assert.equal(error.status, 401);
        assert.equal(error.code, 'binding_mismatch');
        assert.equal(error.requestId, 'auth-request-1');
        return true;
      },
    );
  });

  it('maps network failures to auth_unavailable', async () => {
    await assert.rejects(
      () => verifyRemoteBearer({
        baseUrl: 'http://auth.test',
        bindingId: 'binding-a',
        authorization: 'Bearer token',
        fetch: async () => { throw new Error('connection refused'); },
      }),
      (error) => error instanceof AuthError && error.status === 503 && error.code === 'auth_unavailable',
    );
  });
});

describe('initialSessionFromPlayEnv', () => {
  it('requires both injected tokens before creating an explicit SSO session', () => {
    assert.equal(initialSessionFromPlayEnv({ VITE_AIOSON_AUTH_ACCESS_TOKEN: 'access-only' }), undefined);
    assert.deepEqual(initialSessionFromPlayEnv({
      VITE_AIOSON_AUTH_ACCESS_TOKEN: 'access',
      VITE_AIOSON_AUTH_REFRESH_TOKEN: 'refresh',
      VITE_AIOSON_AUTH_OPERATOR_EMAIL: 'operator@example.test',
    }), {
      accessToken: 'access',
      refreshToken: 'refresh',
      user: { id: '', email: 'operator@example.test', name: '' },
    });
  });
});
