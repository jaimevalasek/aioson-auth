# @aioson/auth-sdk

Cliente TypeScript canônico para o `aioson-auth`. Core fetch wrapper + adapters opcionais para **React** e **Express**. Zero dependências de runtime (peerDeps de React/Express são opcionais).

> Pacote local do monorepo aioson-auth (`C:\dev\services\aioson-auth\sdk\`). Por enquanto consumido via `npm install file:../aioson-auth/sdk` ou link.

## Instalar

```bash
npm install file:../aioson-auth/sdk
# ou, quando publicado:
npm install @aioson/auth-sdk
```

## Quick start

### 1) Core (qualquer ambiente — browser, Node, Bun)

```ts
import { createAuthClient, localStorageAdapter } from '@aioson/auth-sdk';

const auth = createAuthClient({
  baseUrl: import.meta.env.VITE_AIOSON_AUTH_URL ?? 'http://localhost:3001',
  bindingId: import.meta.env.VITE_AIOSON_BINDING_ID!,
  storage: localStorageAdapter(),  // ou omita para memoryStorage()
});

await auth.login({ email: 'a@b.com', password: 'secret' });

// Inspeção sem hit no servidor (lê do JWT em memória):
if (auth.hasPermission('orders:create')) {
  // ...
}

// Validação server-side (defense-in-depth):
if (await auth.check('orders:delete')) {
  // ...
}

await auth.logout();
```

### 2) React

```tsx
import { AuthProvider, useAuth, usePermission } from '@aioson/auth-sdk/react';
import { createAuthClient, localStorageAdapter } from '@aioson/auth-sdk';

const client = createAuthClient({
  baseUrl: import.meta.env.VITE_AIOSON_AUTH_URL,
  bindingId: import.meta.env.VITE_AIOSON_BINDING_ID,
  storage: localStorageAdapter(),
});

function App() {
  return (
    <AuthProvider client={client}>
      <Routes />
    </AuthProvider>
  );
}

function NavBar() {
  const { session, logout, loading } = useAuth();
  if (loading) return null;
  if (!session) return <a href="/login">Entrar</a>;
  return <button onClick={logout}>{session.user.email}</button>;
}

function DeleteButton() {
  const { allowed } = usePermission('orders:delete');
  if (allowed === false) return null;  // explicitamente negado
  // allowed pode ser null se o binding não tem RBAC
  return <button>Apagar</button>;
}
```

### 3) Express middleware

```ts
import express from 'express';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const app = express();

const authOpts = {
  baseUrl: process.env.AIOSON_AUTH_URL,
  bindingId: process.env.AIOSON_AUTH_BINDING_ID,
};

app.use('/api', requireAuth(authOpts));

app.delete(
  '/api/orders/:id',
  requirePermission('orders:delete', authOpts),
  async (req, res) => {
    // req.auth → { sub, email, binding_id, permissions, iat, exp }
    res.json({ ok: true });
  }
);
```

## API

### Core

| Função / método | Tipo | Notas |
|---|---|---|
| `createAuthClient(opts)` | `AuthClient` | Imutável; storage default = `memoryStorage()` |
| `client.login({ email, password })` | `Promise<AuthSession>` | Persiste tokens; emite `onSessionChange` |
| `client.loginOAuth({ email, provider, providerId, name? })` | `Promise<AuthSession>` | Para OAuth Google/GitHub |
| `client.logout()` | `Promise<void>` | Revoga refresh server-side; limpa storage |
| `client.refresh()` | `Promise<AuthSession>` | Re-agrega permissions; idempotente em chamadas concorrentes |
| `client.me()` | `Promise<MePayload \| null>` | Hit no servidor (valida TokenRevocation) |
| `client.check(permission)` | `Promise<boolean>` | Defense-in-depth server-side |
| `client.hasPermission(name)` | `boolean \| null` | Síncrono, lê JWT em memória. `null` se sem info |
| `client.getPermissions()` | `readonly string[] \| null` | Síncrono |
| `client.getAccessToken()` | `Promise<string \| null>` | Refresh automático se expirado |
| `client.getSession()` | `Promise<AuthSession \| null>` | Snapshot |
| `client.onSessionChange(listener)` | `() => void` | Retorna unsubscribe |

### Storage

| Helper | Quando usar |
|---|---|
| `memoryStorage()` | Default. Tokens só existem em memória. |
| `localStorageAdapter(prefix?)` | Browser. Cai em memória se `localStorage` indisponível (SSR). |
| Implementação custom | Implemente a interface `TokenStorage` (`get`/`set` de `'access' \| 'refresh'`). |

### Errors

`AuthError` carrega `code: AuthErrorCode` que normaliza casos de erro do servidor:
`invalid_credentials | token_expired | token_invalid | refresh_failed | binding_not_found | rbac_disabled | forbidden | validation_failed | network | unknown`.

### React

| Export | Notas |
|---|---|
| `<AuthProvider client>` | Coloque em volta da app. Subscreve `onSessionChange`. |
| `useAuth()` | `{ session, loading, error, login, loginOAuth, logout, refresh, client }` |
| `usePermission(name)` | `{ allowed: boolean \| null, permissions }`. Síncrono — lê do JWT. |

### Express

| Export | Notas |
|---|---|
| `requireAuth(opts?)` | Valida Bearer header (e fallback `?token=`). Popula `req.auth: TokenPayload`. |
| `requirePermission(perm, opts?)` | Aplique **depois** de `requireAuth`. Usa o claim `permissions` do JWT. |

`opts` ou `process.env.AIOSON_AUTH_URL` + `AIOSON_AUTH_BINDING_ID`.

## Decisões de design

- **Permissions vêm do JWT** desde 2026-05-13 (Slice A do aioson-auth). UI condicional via `hasPermission()` é **síncrono e gratuito** — zero requests.
- **`check()` continua existindo** para ações críticas que precisam de validação server-side (consulta `TokenRevocation`).
- **Refresh automático em 401**: o core já tenta renovar uma vez antes de propagar o erro original do servidor. Promise de refresh é compartilhada — múltiplas requests caindo 401 concorrentemente disparam **uma** chamada de refresh.
- **`react` e `express` são entries separados** — quem usa só o core não puxa peer deps. Subpath imports: `@aioson/auth-sdk/react` e `@aioson/auth-sdk/express`.
- **Sem JWKS endpoint ainda**: validação local (`decodeJwtPayload`) só lê o payload, não verifica assinatura. Para defense-in-depth real, o `requireAuth` server-side faz hit no `/me` (consulta `TokenRevocation`). Quando aioson-auth expor JWKS, podemos validar offline.

## Versionamento

Pacote em `0.x` enquanto o contrato do aioson-auth não está congelado. Após 1.0 segue semver.

## Roadmap

- [ ] JWKS endpoint no aioson-auth + validação offline no SDK (eliminaria `validateOnServer` em prod)
- [ ] Tests automatizados (vitest)
- [ ] Caching opcional do `/me` com TTL configurável (já implícito hoje via JWT em memória)
- [ ] CLI scaffold `npx @aioson/auth-sdk init` que gera boilerplate por stack

Ver `aioson-play/.aioson/docs/integrations/auth-integration-gaps.md` para o plano de slices completo.
