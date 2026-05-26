# AIOSON Auth — Guia Completo de Integração

> O "Jetstream" do ecossistema AIOSON: instale uma vez, tenha autenticação completa com login, cadastro, recuperação de senha, RBAC, permissões e gates — sem pensar em auth nunca mais.

---

## Visão Geral

O `aioson-auth` oferece autenticação e autorização completa para qualquer app Node.js. Ele funciona em **dois modos**, com a mesma API:

| Modo | Quando usar | Como funciona |
|------|-------------|---------------|
| **Embedded** | App rodando online (VPS, Vercel, etc.) | Auth roda dentro do processo do seu app — igual ao Jetstream no Laravel |
| **Play Service** | App rodando dentro do AIOSON Play | Auth é um serviço separado que o Play gerencia — seu app só conecta |

**A mágica:** seu app usa o mesmo código nos dois modos. Uma env var decide qual modo ativar.

### Modelo de dados

- **Usuários** — uma conta por e-mail, global no sistema
- **Roles (Perfis)** — admin, manager, operator, viewer... criados uma vez, atribuídos por app
- **Permissions** — `orders:create`, `users:delete`... cada app define as suas
- **Role ↔ Permission** — por app (o que "Admin" pode fazer depende do app)
- **User ↔ Role** — por app (mesmo usuário pode ser Admin num app e Viewer em outro)

---

## Instalação

```bash
npm install @aioson/auth-sdk

# Para modo embedded (app online), instale também:
npm install bcryptjs
```

O SDK tem 4 entries:

```ts
import { createAuthClient } from '@aioson/auth-sdk';           // Core (browser + server)
import { AuthProvider, useAuth, usePermission } from '@aioson/auth-sdk/react';  // React
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';      // Express middleware
import { createEmbeddedBackend } from '@aioson/auth-sdk/embedded';              // Embedded backend
```

---

## Quick Start — App Online (Embedded Mode)

Equivalente a `laravel new app && composer require laravel/jetstream && php artisan jetstream:install`.

### 1. Setup do servidor (`server.ts`)

```ts
import express from 'express';
import { createEmbeddedBackend } from '@aioson/auth-sdk/embedded';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// 1. Cria o backend embedded (equivalente ao Jetstream)
const auth = await createEmbeddedBackend({
  prisma,                              // seu PrismaClient existente
  jwtSecret: process.env.JWT_SECRET!,  // segredo único do app
  bindingId: 'meu-app',               // identificador do app
  cookieDomain: 'meuapp.com',         // domínio dos cookies
  secureCookies: process.env.NODE_ENV === 'production',
});

// 2. Roda migrations (cria tabelas aioson_auth_* no seu banco)
await auth.migrate();

// 3. Bootstrap do primeiro admin (idempotente — roda só 1 vez)
await auth.bootstrap({
  ownerEmail: 'admin@meuapp.com',
  ownerRole: 'admin',
});

// 4. Monta as rotas de auth no Express
app.use('/auth', auth.router);
// Rotas disponíveis:
//   POST /auth/login
//   POST /auth/refresh
//   POST /auth/logout
//   GET  /auth/me
//   POST /auth/password-reset/request
//   POST /auth/password-reset/confirm

// 5. Protege suas rotas
app.get('/api/orders', requireAuth({ jwtSecret: process.env.JWT_SECRET! }), (req, res) => {
  // req.auth contém { sub, email, binding_id, permissions }
  res.json({ orders: [] });
});

app.listen(3000);
```

### 2. Setup do frontend (`main.tsx`)

```tsx
import { createAuthClient } from '@aioson/auth-sdk';
import { AuthProvider } from '@aioson/auth-sdk/react';
import { localStorageAdapter } from '@aioson/auth-sdk';

const auth = createAuthClient({
  bindingId: 'meu-app',
  embedded: true,  // usa location.origin como baseUrl
  storage: localStorageAdapter(),
});

function App() {
  return (
    <AuthProvider client={auth}>
      <Router />
    </AuthProvider>
  );
}
```

---

## Quick Start — App dentro do AIOSON Play (Service Mode)

O Play injeta as env vars automaticamente. Seu app só precisa ler.

### Servidor (`server.ts`)

```ts
import express from 'express';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const app = express();

// Sem setup de auth! O Play já roda o aioson-auth como serviço.
// As env vars AIOSON_AUTH_URL e AIOSON_AUTH_BINDING_ID são injetadas.

app.get('/api/orders', requireAuth(), (req, res) => {
  // Funciona igual — req.auth tem o mesmo shape
  res.json({ orders: [] });
});

app.listen(3000);
```

### Frontend (`main.tsx`)

```tsx
const auth = createAuthClient({
  baseUrl: import.meta.env.VITE_AIOSON_AUTH_URL,       // injetado pelo Play
  bindingId: import.meta.env.VITE_AIOSON_AUTH_BINDING_ID, // injetado pelo Play
  storage: localStorageAdapter(),
});
```

---

## Setup Universal — Um Código, Dois Modos

O padrão recomendado: seu app detecta o modo e configura automaticamente.

### Servidor (`server.ts`)

```ts
import express from 'express';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const app = express();

const isEmbedded = !process.env.AIOSON_AUTH_URL; // se não tem URL do Play, é embedded

if (isEmbedded) {
  // Modo embedded: monta o backend de auth no próprio app
  const { createEmbeddedBackend } = await import('@aioson/auth-sdk/embedded');
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  const auth = await createEmbeddedBackend({
    prisma,
    jwtSecret: process.env.JWT_SECRET!,
    bindingId: process.env.APP_SLUG ?? 'meu-app',
    cookieDomain: process.env.COOKIE_DOMAIN,
    secureCookies: process.env.NODE_ENV === 'production',
  });

  await auth.migrate();
  await auth.bootstrap({ ownerEmail: process.env.ADMIN_EMAIL ?? 'admin@app.com' });

  app.use('/auth', auth.router);

  // Middleware usa verificação local
  app.use('/api', requireAuth({
    jwtSecret: process.env.JWT_SECRET!,
    checkRevocation: auth.checkRevocation,
  }));
} else {
  // Modo Play: delega pro serviço
  app.use('/api', requireAuth());
  // requireAuth() lê AIOSON_AUTH_URL e AIOSON_AUTH_BINDING_ID das env vars
}

// Suas rotas — MESMO CÓDIGO nos dois modos
app.get('/api/orders', (req, res) => {
  res.json({ user: req.auth!.email, orders: [] });
});

app.delete('/api/orders/:id',
  requirePermission('orders:delete'),
  (req, res) => {
    res.json({ deleted: true });
  }
);

app.listen(3000);
```

### Frontend (`main.tsx`)

```tsx
const isEmbedded = import.meta.env.VITE_AIOSON_AUTH_EMBEDDED === 'true'
  || !import.meta.env.VITE_AIOSON_AUTH_URL;

const auth = createAuthClient({
  baseUrl: isEmbedded ? undefined : import.meta.env.VITE_AIOSON_AUTH_URL,
  bindingId: import.meta.env.VITE_AIOSON_AUTH_BINDING_ID ?? 'meu-app',
  embedded: isEmbedded,
  storage: localStorageAdapter(),
});
```

### Env vars

```env
# App online (embedded)
JWT_SECRET=meu-segredo-super-secreto-32-chars
APP_SLUG=meu-app
ADMIN_EMAIL=admin@meuapp.com
COOKIE_DOMAIN=meuapp.com
VITE_AIOSON_AUTH_EMBEDDED=true
VITE_AIOSON_AUTH_BINDING_ID=meu-app

# App dentro do Play (service mode) — estas são injetadas automaticamente
# AIOSON_AUTH_URL=http://127.0.0.1:3001
# VITE_AIOSON_AUTH_URL=http://127.0.0.1:3001
# VITE_AIOSON_AUTH_BINDING_ID=clx...abc
```

---

## Protegendo Rotas (Middleware)

Equivalente aos middlewares `auth` e `can:` do Laravel.

### `requireAuth` — Exige login

```ts
import { requireAuth } from '@aioson/auth-sdk/express';

// Todas as rotas abaixo exigem token válido
app.use('/api', requireAuth({ jwtSecret: process.env.JWT_SECRET! }));

// req.auth disponível em todas as rotas:
// { sub: 'user-id', email: 'user@email.com', binding_id: '...', permissions: ['...'] }
```

### `requirePermission` — Exige permissão específica

```ts
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const auth = requireAuth({ jwtSecret: process.env.JWT_SECRET! });

// Equivalente ao ->middleware('can:orders.create') do Laravel
app.post('/api/orders', auth, requirePermission('orders:create'), createOrder);
app.put('/api/orders/:id', auth, requirePermission('orders:update'), updateOrder);
app.delete('/api/orders/:id', auth, requirePermission('orders:delete'), deleteOrder);

// Rotas sem permissão específica — só precisa estar logado
app.get('/api/orders', auth, listOrders);
app.get('/api/profile', auth, getProfile);
```

### Grupos de rotas (equivalente a Route::middleware)

```ts
import { Router } from 'express';

// Área administrativa — requer role admin (via permission)
const adminRoutes = Router();
adminRoutes.use(requireAuth({ jwtSecret: JWT }));
adminRoutes.use(requirePermission('admin:access'));
adminRoutes.get('/users', listUsers);
adminRoutes.post('/users', createUser);
adminRoutes.delete('/users/:id', deleteUser);

app.use('/api/admin', adminRoutes);

// Área operacional — requer login, permissões por rota
const operatorRoutes = Router();
operatorRoutes.use(requireAuth({ jwtSecret: JWT }));
operatorRoutes.get('/dashboard', getDashboard); // qualquer logado
operatorRoutes.post('/tickets', requirePermission('tickets:create'), createTicket);

app.use('/api', operatorRoutes);
```

---

## Gates e Policies (Controle de UI)

Equivalente aos `@can()` / `Gate::allows()` do Laravel Blade.

### `usePermission` — Mostrar/esconder elementos

```tsx
import { usePermission } from '@aioson/auth-sdk/react';

function OrderActions({ orderId }: { orderId: string }) {
  const canEdit = usePermission('orders:update');
  const canDelete = usePermission('orders:delete');

  return (
    <div>
      {/* Botão só aparece se o usuário tem permissão */}
      {canEdit.allowed && (
        <button onClick={() => editOrder(orderId)}>Editar</button>
      )}
      {canDelete.allowed && (
        <button onClick={() => deleteOrder(orderId)}>Excluir</button>
      )}
    </div>
  );
}
```

### `hasPermission` — Check síncrono no client

```tsx
import { useAuth } from '@aioson/auth-sdk/react';

function Sidebar() {
  const { client, session } = useAuth();

  if (!session) return null;

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/orders">Pedidos</Link>

      {/* Equivalente ao @can('admin.access') do Laravel Blade */}
      {client.hasPermission('admin:access') && (
        <Link to="/admin">Administração</Link>
      )}

      {client.hasPermission('reports:view') && (
        <Link to="/reports">Relatórios</Link>
      )}
    </nav>
  );
}
```

### Check por role (via permissions do role)

Ao invés de checar o nome do role diretamente (anti-pattern), use permissions associadas ao role:

```ts
// No setup do app, registre permissions que representam "níveis de acesso"
const permissions = [
  { name: 'admin:access', description: 'Acesso à área administrativa' },
  { name: 'manager:access', description: 'Acesso à área de gestão' },
  { name: 'operator:access', description: 'Acesso operacional' },
  { name: 'orders:create', description: 'Criar pedidos' },
  { name: 'orders:update', description: 'Editar pedidos' },
  { name: 'orders:delete', description: 'Excluir pedidos' },
  { name: 'reports:view', description: 'Visualizar relatórios' },
];

// Depois, no painel admin, associe:
// - Role "admin"    → todas as permissions
// - Role "manager"  → manager:access, orders:*, reports:view
// - Role "operator" → operator:access, orders:create, orders:update
// - Role "viewer"   → (nenhuma permission extra — só leitura)
```

### Componente `<Gate>` (pattern helper)

Crie um componente utilitário para simplificar:

```tsx
function Gate({ permission, children, fallback = null }: {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { allowed } = usePermission(permission);
  if (allowed === null) return null; // carregando
  return allowed ? <>{children}</> : <>{fallback}</>;
}

// Uso — idêntico ao @can('permission') do Blade
<Gate permission="orders:delete">
  <button className="text-red-500">Excluir Pedido</button>
</Gate>

<Gate permission="admin:access" fallback={<p>Acesso negado</p>}>
  <AdminPanel />
</Gate>
```

### Rotas protegidas no React Router

```tsx
function ProtectedRoute({ permission, children }: {
  permission?: string;
  children: React.ReactNode;
}) {
  const { session, loading } = useAuth();
  const check = usePermission(permission ?? '');

  if (loading) return <Spinner />;
  if (!session) return <Navigate to="/login" />;
  if (permission && check.allowed === false) return <Navigate to="/403" />;

  return <>{children}</>;
}

// Uso no router
<Route path="/admin" element={
  <ProtectedRoute permission="admin:access">
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route path="users" element={<UsersPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>

<Route path="/orders" element={
  <ProtectedRoute>  {/* só precisa estar logado */}
    <OrdersPage />
  </ProtectedRoute>
} />
```

---

## Gerenciando Usuários, Roles e Permissões

### Registro de permissões do app

No primeiro boot, registre as permissões que seu app usa. Isso pode ser feito via API ou no bootstrap:

```ts
// Modo embedded — via SQL (queries.ts)
const q = createQueries(prisma, 'sqlite');
const perms = [
  { name: 'orders:create', description: 'Criar pedidos' },
  { name: 'orders:update', description: 'Editar pedidos' },
  { name: 'orders:delete', description: 'Excluir pedidos' },
  { name: 'admin:access', description: 'Acesso administrativo' },
];
for (const p of perms) {
  await q.insertPermission({ id: generateId(), ...p }).catch(() => {}); // ignora duplicatas
}
```

```ts
// Modo Play — via API HTTP
await fetch(`${AUTH_URL}/api/auth/${bindingId}/rbac/permissions/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
  body: JSON.stringify({
    permissions: [
      { name: 'orders:create', resource: 'orders', action: 'create' },
      { name: 'orders:update', resource: 'orders', action: 'update' },
      { name: 'orders:delete', resource: 'orders', action: 'delete' },
    ],
  }),
});
```

### Gerenciar via painel admin

No modo **Play**, o aioson-auth já tem um painel web em `http://localhost:3001` com UI para:
- Criar/editar roles
- Atribuir permissions a roles
- Atribuir roles a usuários
- Gerenciar usuários (criar, desativar, reset de senha)

No modo **embedded**, você pode construir seu próprio painel usando a API REST ou consumir as queries diretamente:

### API de RBAC (disponível nos dois modos)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/:bindingId/rbac/users` | GET | Listar usuários do app |
| `/:bindingId/rbac/roles` | GET | Listar roles |
| `/:bindingId/rbac/roles` | POST | Criar role |
| `/:bindingId/rbac/roles/:id` | PUT | Editar role |
| `/:bindingId/rbac/roles/:id` | DELETE | Excluir role |
| `/:bindingId/rbac/permissions` | GET | Listar permissions do app |
| `/:bindingId/rbac/permissions/register` | POST | Registrar permissions |
| `/:bindingId/rbac/roles/:roleId/permissions` | POST | Atribuir permission a role |
| `/:bindingId/rbac/roles/:roleId/permissions/:permId` | DELETE | Remover permission de role |
| `/:bindingId/rbac/users/:userId/roles` | POST | Atribuir role a usuário |
| `/:bindingId/rbac/users/:userId/roles/:roleId` | DELETE | Remover role do usuário |
| `/:bindingId/rbac/check?permission=x` | GET | Checar se usuário tem permission |

---

## Fluxo de Autenticação

### Login

```
[Browser]                          [Seu App]                      [Auth Backend]
    |                                  |                                |
    |-- POST /auth/login ------------->|                                |
    |   { email, password }            |-- verifica bcrypt ------------>|
    |                                  |<-- JWT access + refresh -------|
    |<-- { accessToken, refreshToken,  |                                |
    |      user }                      |                                |
    |                                  |                                |
    |-- GET /api/orders -------------->|                                |
    |   Authorization: Bearer <jwt>    |-- requireAuth() verifica JWT -->|
    |                                  |<-- req.auth populado ---------|
    |<-- { orders: [...] }             |                                |
```

### Tokens

| Token | TTL | Onde vive | Renovação |
|-------|-----|-----------|-----------|
| Access Token | 15 min | localStorage + cookie HttpOnly | Via refresh |
| Refresh Token | 7 dias | localStorage + cookie HttpOnly | Login novo |

O SDK renova automaticamente (`autoRefresh: true` por padrão): quando um request retorna 401, ele tenta refresh antes de propagar o erro.

---

## Comparação com Laravel Jetstream

| Laravel Jetstream | AIOSON Auth | Equivalente |
|-------------------|-------------|-------------|
| `php artisan jetstream:install` | `createEmbeddedBackend()` + `auth.migrate()` | Setup inicial |
| `Route::middleware('auth')` | `requireAuth()` | Exigir login |
| `Route::middleware('can:create-order')` | `requirePermission('orders:create')` | Exigir permissão |
| `@can('delete-order')` no Blade | `usePermission('orders:delete')` / `<Gate>` | UI condicional |
| `Gate::allows('admin')` | `client.hasPermission('admin:access')` | Check síncrono |
| `$user->hasRole('admin')` | Check via permission `admin:access` atribuída ao role | Role-based |
| Migrations do Jetstream | `auth.migrate()` | Cria tabelas no DB |
| `php artisan make:policy` | `requirePermission()` middleware | Server-side check |
| Fortify (login/register/reset) | `auth.router` (handlers completos) | Auth endpoints |
| `Auth::user()` | `req.auth` (server) / `useAuth()` (client) | Usuário logado |

---

## Tabelas criadas (Modo Embedded)

Ao rodar `auth.migrate()`, 7 tabelas são criadas no seu banco com prefixo `aioson_auth_`:

| Tabela | Equivalente Laravel |
|--------|---------------------|
| `aioson_auth_users` | `users` |
| `aioson_auth_roles` | `roles` (Spatie/Permission) |
| `aioson_auth_permissions` | `permissions` (Spatie/Permission) |
| `aioson_auth_user_roles` | `model_has_roles` |
| `aioson_auth_role_permissions` | `role_has_permissions` |
| `aioson_auth_revocations` | `personal_access_tokens` (revogação) |
| `aioson_auth_password_reset_tokens` | `password_reset_tokens` |

O prefixo `aioson_auth_` garante zero colisão com as tabelas do seu app.

---

## Checklist de Integração

### App Online (Embedded)

- [ ] `npm install @aioson/auth-sdk bcryptjs`
- [ ] Configurar `JWT_SECRET` no `.env`
- [ ] Chamar `createEmbeddedBackend()` no startup
- [ ] Chamar `auth.migrate()` (idempotente — safe em todo boot)
- [ ] Chamar `auth.bootstrap()` com email do admin (idempotente)
- [ ] Montar `auth.router` em `/auth` (ou path de sua escolha)
- [ ] Aplicar `requireAuth()` nas rotas protegidas
- [ ] Aplicar `requirePermission()` nas rotas que exigem permissão
- [ ] No frontend: `createAuthClient({ embedded: true })`
- [ ] Registrar as permissions do app no primeiro boot

### App dentro do Play

- [ ] `npm install @aioson/auth-sdk`
- [ ] Aplicar `requireAuth()` nas rotas protegidas (lê env vars do Play)
- [ ] Aplicar `requirePermission()` nas rotas que exigem permissão
- [ ] No frontend: `createAuthClient({ baseUrl: VITE_AIOSON_AUTH_URL, bindingId: VITE_AIOSON_AUTH_BINDING_ID })`
- [ ] Registrar permissions via API do aioson-auth

### Ambos (código compartilhado)

- [ ] `usePermission()` para mostrar/esconder UI
- [ ] `<Gate>` component para Blade-like conditionals
- [ ] `<ProtectedRoute>` para rotas React protegidas
- [ ] Testes: verificar 401 sem token, 403 sem permissão, 200 com permissão
