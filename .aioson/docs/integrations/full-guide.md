# AIOSON Auth — Full Integration Guide

> The "Jetstream" of the AIOSON ecosystem: install once, get complete authentication with login, registration, password recovery, RBAC, permissions, and gates — never think about auth again.

---

## Overview

`aioson-auth` provides complete authentication and authorization for any Node.js app. It works in **two modes** with the same API:

> Boundary with Play anonymous mode: the pre-signup anonymous access in
> `aioson-play` is a local Play capability for IDE/Terminal use inside a
> sandbox. It does not create a user, employee, role, token, session or
> `AppBinding` in this service. After an installation is claimed by an
> aioson.com account, real users, roles and permissions are modeled in
> `aioson-auth` again.

| Mode | When to use | How it works |
|------|-------------|--------------|
| **Embedded** | App running online (VPS, Vercel, etc.) | Auth runs inside your app's process — like Jetstream in Laravel |
| **Play Service** | App running inside AIOSON Play | Auth is a separate service managed by Play — your app just connects |

**The magic:** your app uses the same code in both modes. An env var decides which mode to activate.

### Data Model

- **Users** — one account per email, global in the system
- **Roles** — admin, manager, operator, viewer... created once, assigned per app
- **Permissions** — `orders:create`, `users:delete`... each app defines its own
- **Role ↔ Permission** — per app (what "Admin" can do depends on the app)
- **User ↔ Role** — per app (same user can be Admin in one app and Viewer in another)

---

## Installation

```bash
npm install @aioson/auth-sdk

# For embedded mode (online app), also install:
npm install bcryptjs
```

The SDK has 4 entries:

```ts
import { createAuthClient } from '@aioson/auth-sdk';           // Core (browser + server)
import { AuthProvider, useAuth, usePermission } from '@aioson/auth-sdk/react';  // React
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';      // Express middleware
import { createEmbeddedBackend } from '@aioson/auth-sdk/embedded';              // Embedded backend
```

---

## Quick Start — Online App (Embedded Mode)

Equivalent to `laravel new app && composer require laravel/jetstream && php artisan jetstream:install`.

### 1. Server setup (`server.ts`)

```ts
import express from 'express';
import { createEmbeddedBackend } from '@aioson/auth-sdk/embedded';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// 1. Create the embedded backend (equivalent to Jetstream)
const auth = await createEmbeddedBackend({
  prisma,                              // your existing PrismaClient
  jwtSecret: process.env.JWT_SECRET!,  // app-unique secret
  bindingId: 'my-app',                // app identifier
  cookieDomain: 'myapp.com',          // cookie domain
  secureCookies: process.env.NODE_ENV === 'production',
});

// 2. Run migrations (creates aioson_auth_* tables in your database)
await auth.migrate();

// 3. Bootstrap the first admin (idempotent — runs only once)
await auth.bootstrap({
  ownerEmail: 'admin@myapp.com',
  ownerRole: 'admin',
});

// 4. Mount auth routes on Express
app.use('/auth', auth.router);
// Available routes:
//   POST /auth/login
//   POST /auth/refresh
//   POST /auth/logout
//   GET  /auth/me
//   POST /auth/password-reset/request
//   POST /auth/password-reset/confirm

// 5. Protect your routes
app.get('/api/orders', requireAuth({ jwtSecret: process.env.JWT_SECRET! }), (req, res) => {
  // req.auth contains { sub, email, binding_id, permissions }
  res.json({ orders: [] });
});

app.listen(3000);
```

### 2. Frontend setup (`main.tsx`)

```tsx
import { createAuthClient } from '@aioson/auth-sdk';
import { AuthProvider } from '@aioson/auth-sdk/react';
import { localStorageAdapter } from '@aioson/auth-sdk';

const auth = createAuthClient({
  bindingId: 'my-app',
  embedded: true,  // uses location.origin as baseUrl
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

## Quick Start — App inside AIOSON Play (Service Mode)

Play injects env vars automatically. Your app just reads them.

### Server (`server.ts`)

```ts
import express from 'express';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const app = express();

// No auth setup needed! Play already runs aioson-auth as a service.
// AIOSON_AUTH_URL and AIOSON_AUTH_BINDING_ID env vars are injected.

app.get('/api/orders', requireAuth(), (req, res) => {
  // Works the same — req.auth has the same shape
  res.json({ orders: [] });
});

app.listen(3000);
```

### Frontend (`main.tsx`)

```tsx
const auth = createAuthClient({
  baseUrl: import.meta.env.VITE_AIOSON_AUTH_URL,       // injected by Play
  bindingId: import.meta.env.VITE_AIOSON_AUTH_BINDING_ID, // injected by Play
  storage: localStorageAdapter(),
});
```

---

## Universal Setup — One Codebase, Two Modes

The recommended pattern: your app auto-detects the mode and configures accordingly.

### Server (`server.ts`)

```ts
import express from 'express';
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const app = express();

const isEmbedded = !process.env.AIOSON_AUTH_URL; // no Play URL = embedded

if (isEmbedded) {
  // Embedded mode: mount the auth backend in the app itself
  const { createEmbeddedBackend } = await import('@aioson/auth-sdk/embedded');
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  const auth = await createEmbeddedBackend({
    prisma,
    jwtSecret: process.env.JWT_SECRET!,
    bindingId: process.env.APP_SLUG ?? 'my-app',
    cookieDomain: process.env.COOKIE_DOMAIN,
    secureCookies: process.env.NODE_ENV === 'production',
  });

  await auth.migrate();
  await auth.bootstrap({ ownerEmail: process.env.ADMIN_EMAIL ?? 'admin@app.com' });

  app.use('/auth', auth.router);

  // Middleware uses local verification
  app.use('/api', requireAuth({
    jwtSecret: process.env.JWT_SECRET!,
    checkRevocation: auth.checkRevocation,
  }));
} else {
  // Play mode: delegate to the service
  app.use('/api', requireAuth());
  // requireAuth() reads AIOSON_AUTH_URL and AIOSON_AUTH_BINDING_ID from env vars
}

// Your routes — SAME CODE in both modes
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
  bindingId: import.meta.env.VITE_AIOSON_AUTH_BINDING_ID ?? 'my-app',
  embedded: isEmbedded,
  storage: localStorageAdapter(),
});
```

### Env vars

```env
# Online app (embedded)
JWT_SECRET=my-super-secret-key-at-least-32-chars
APP_SLUG=my-app
ADMIN_EMAIL=admin@myapp.com
COOKIE_DOMAIN=myapp.com
VITE_AIOSON_AUTH_EMBEDDED=true
VITE_AIOSON_AUTH_BINDING_ID=my-app

# App inside Play (service mode) — these are injected automatically
# AIOSON_AUTH_URL=http://127.0.0.1:3001
# VITE_AIOSON_AUTH_URL=http://127.0.0.1:3001
# VITE_AIOSON_AUTH_BINDING_ID=clx...abc
```

---

## Protecting Routes (Middleware)

Equivalent to Laravel's `auth` and `can:` middleware.

### `requireAuth` — Require login

```ts
import { requireAuth } from '@aioson/auth-sdk/express';

// All routes below require a valid token
app.use('/api', requireAuth({ jwtSecret: process.env.JWT_SECRET! }));

// req.auth available in all routes:
// { sub: 'user-id', email: 'user@email.com', binding_id: '...', permissions: ['...'] }
```

### `requirePermission` — Require specific permission

```ts
import { requireAuth, requirePermission } from '@aioson/auth-sdk/express';

const auth = requireAuth({ jwtSecret: process.env.JWT_SECRET! });

// Equivalent to ->middleware('can:orders.create') in Laravel
app.post('/api/orders', auth, requirePermission('orders:create'), createOrder);
app.put('/api/orders/:id', auth, requirePermission('orders:update'), updateOrder);
app.delete('/api/orders/:id', auth, requirePermission('orders:delete'), deleteOrder);

// Routes without specific permission — just need to be logged in
app.get('/api/orders', auth, listOrders);
app.get('/api/profile', auth, getProfile);
```

### Route groups (equivalent to Route::middleware)

```ts
import { Router } from 'express';

// Admin area — requires admin role (via permission)
const adminRoutes = Router();
adminRoutes.use(requireAuth({ jwtSecret: JWT }));
adminRoutes.use(requirePermission('admin:access'));
adminRoutes.get('/users', listUsers);
adminRoutes.post('/users', createUser);
adminRoutes.delete('/users/:id', deleteUser);

app.use('/api/admin', adminRoutes);

// Operations area — requires login, permissions per route
const operatorRoutes = Router();
operatorRoutes.use(requireAuth({ jwtSecret: JWT }));
operatorRoutes.get('/dashboard', getDashboard); // any logged-in user
operatorRoutes.post('/tickets', requirePermission('tickets:create'), createTicket);

app.use('/api', operatorRoutes);
```

---

## Gates and Policies (UI Control)

Equivalent to Laravel Blade's `@can()` / `Gate::allows()`.

### `usePermission` — Show/hide elements

```tsx
import { usePermission } from '@aioson/auth-sdk/react';

function OrderActions({ orderId }: { orderId: string }) {
  const canEdit = usePermission('orders:update');
  const canDelete = usePermission('orders:delete');

  return (
    <div>
      {/* Button only appears if user has permission */}
      {canEdit.allowed && (
        <button onClick={() => editOrder(orderId)}>Edit</button>
      )}
      {canDelete.allowed && (
        <button onClick={() => deleteOrder(orderId)}>Delete</button>
      )}
    </div>
  );
}
```

### `hasPermission` — Synchronous client check

```tsx
import { useAuth } from '@aioson/auth-sdk/react';

function Sidebar() {
  const { client, session } = useAuth();

  if (!session) return null;

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/orders">Orders</Link>

      {/* Equivalent to @can('admin.access') in Laravel Blade */}
      {client.hasPermission('admin:access') && (
        <Link to="/admin">Administration</Link>
      )}

      {client.hasPermission('reports:view') && (
        <Link to="/reports">Reports</Link>
      )}
    </nav>
  );
}
```

### Role-based checks (via role permissions)

Instead of checking the role name directly (anti-pattern), use permissions associated with the role:

```ts
// On app setup, register permissions that represent "access levels"
const permissions = [
  { name: 'admin:access', description: 'Administrative area access' },
  { name: 'manager:access', description: 'Management area access' },
  { name: 'operator:access', description: 'Operational access' },
  { name: 'orders:create', description: 'Create orders' },
  { name: 'orders:update', description: 'Edit orders' },
  { name: 'orders:delete', description: 'Delete orders' },
  { name: 'reports:view', description: 'View reports' },
];

// Then, in the admin panel, associate:
// - Role "admin"    → all permissions
// - Role "manager"  → manager:access, orders:*, reports:view
// - Role "operator" → operator:access, orders:create, orders:update
// - Role "viewer"   → (no extra permissions — read only)
```

### `<Gate>` component (helper pattern)

Create a utility component for cleaner syntax:

```tsx
function Gate({ permission, children, fallback = null }: {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { allowed } = usePermission(permission);
  if (allowed === null) return null; // loading
  return allowed ? <>{children}</> : <>{fallback}</>;
}

// Usage — identical to @can('permission') in Blade
<Gate permission="orders:delete">
  <button className="text-red-500">Delete Order</button>
</Gate>

<Gate permission="admin:access" fallback={<p>Access denied</p>}>
  <AdminPanel />
</Gate>
```

### Protected routes in React Router

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

// Usage in router
<Route path="/admin" element={
  <ProtectedRoute permission="admin:access">
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route path="users" element={<UsersPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>

<Route path="/orders" element={
  <ProtectedRoute>  {/* just needs to be logged in */}
    <OrdersPage />
  </ProtectedRoute>
} />
```

---

## Managing Users, Roles, and Permissions

### Registering app permissions

On first boot, register the permissions your app uses. This can be done via API or at bootstrap:

```ts
// Embedded mode — via SQL (queries.ts)
const q = createQueries(prisma, 'sqlite');
const perms = [
  { name: 'orders:create', description: 'Create orders' },
  { name: 'orders:update', description: 'Edit orders' },
  { name: 'orders:delete', description: 'Delete orders' },
  { name: 'admin:access', description: 'Administrative access' },
];
for (const p of perms) {
  await q.insertPermission({ id: generateId(), ...p }).catch(() => {}); // ignore duplicates
}
```

```ts
// Play mode — via HTTP API
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

### Managing via admin panel

In **Play mode**, aioson-auth already has a web panel at `http://localhost:3001` with UI for:
- Creating/editing roles
- Assigning permissions to roles
- Assigning roles to users
- Managing users (create, disable, password reset)

In **embedded mode**, you can build your own admin panel using the REST API or consume queries directly.

### RBAC API (available in both modes)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/:bindingId/rbac/users` | GET | List app users |
| `/:bindingId/rbac/roles` | GET | List roles |
| `/:bindingId/rbac/roles` | POST | Create role |
| `/:bindingId/rbac/roles/:id` | PUT | Edit role |
| `/:bindingId/rbac/roles/:id` | DELETE | Delete role |
| `/:bindingId/rbac/permissions` | GET | List app permissions |
| `/:bindingId/rbac/permissions/register` | POST | Register permissions |
| `/:bindingId/rbac/roles/:roleId/permissions` | POST | Assign permission to role |
| `/:bindingId/rbac/roles/:roleId/permissions/:permId` | DELETE | Remove permission from role |
| `/:bindingId/rbac/users/:userId/roles` | POST | Assign role to user |
| `/:bindingId/rbac/users/:userId/roles/:roleId` | DELETE | Remove role from user |
| `/:bindingId/rbac/check?permission=x` | GET | Check if user has permission |

---

## Authentication Flow

### Login

```
[Browser]                          [Your App]                     [Auth Backend]
    |                                  |                                |
    |-- POST /auth/login ------------->|                                |
    |   { email, password }            |-- bcrypt verify -------------->|
    |                                  |<-- JWT access + refresh -------|
    |<-- { accessToken, refreshToken,  |                                |
    |      user }                      |                                |
    |                                  |                                |
    |-- GET /api/orders -------------->|                                |
    |   Authorization: Bearer <jwt>    |-- requireAuth() verifies JWT ->|
    |                                  |<-- req.auth populated --------|
    |<-- { orders: [...] }             |                                |
```

### Tokens

| Token | TTL | Where it lives | Renewal |
|-------|-----|----------------|---------|
| Access Token | 15 min | localStorage + HttpOnly cookie | Via refresh |
| Refresh Token | 7 days | localStorage + HttpOnly cookie | New login |

The SDK auto-refreshes (`autoRefresh: true` by default): when a request returns 401, it attempts a refresh before propagating the error.

---

## Comparison with Laravel Jetstream

| Laravel Jetstream | AIOSON Auth | Equivalent |
|-------------------|-------------|------------|
| `php artisan jetstream:install` | `createEmbeddedBackend()` + `auth.migrate()` | Initial setup |
| `Route::middleware('auth')` | `requireAuth()` | Require login |
| `Route::middleware('can:create-order')` | `requirePermission('orders:create')` | Require permission |
| `@can('delete-order')` in Blade | `usePermission('orders:delete')` / `<Gate>` | Conditional UI |
| `Gate::allows('admin')` | `client.hasPermission('admin:access')` | Synchronous check |
| `$user->hasRole('admin')` | Check via permission `admin:access` assigned to role | Role-based |
| Jetstream migrations | `auth.migrate()` | Creates tables in DB |
| `php artisan make:policy` | `requirePermission()` middleware | Server-side check |
| Fortify (login/register/reset) | `auth.router` (complete handlers) | Auth endpoints |
| `Auth::user()` | `req.auth` (server) / `useAuth()` (client) | Logged-in user |

---

## Tables Created (Embedded Mode)

When running `auth.migrate()`, 7 tables are created in your database with the `aioson_auth_` prefix:

| Table | Laravel Equivalent |
|-------|-------------------|
| `aioson_auth_users` | `users` |
| `aioson_auth_roles` | `roles` (Spatie/Permission) |
| `aioson_auth_permissions` | `permissions` (Spatie/Permission) |
| `aioson_auth_user_roles` | `model_has_roles` |
| `aioson_auth_role_permissions` | `role_has_permissions` |
| `aioson_auth_revocations` | `personal_access_tokens` (revocation) |
| `aioson_auth_password_reset_tokens` | `password_reset_tokens` |

The `aioson_auth_` prefix guarantees zero collision with your app's tables.

---

## Integration Checklist

### Online App (Embedded)

- [ ] `npm install @aioson/auth-sdk bcryptjs`
- [ ] Configure `JWT_SECRET` in `.env`
- [ ] Call `createEmbeddedBackend()` at startup
- [ ] Call `auth.migrate()` (idempotent — safe on every boot)
- [ ] Call `auth.bootstrap()` with admin email (idempotent)
- [ ] Mount `auth.router` at `/auth` (or path of your choice)
- [ ] Apply `requireAuth()` to protected routes
- [ ] Apply `requirePermission()` to routes requiring specific permission
- [ ] Frontend: `createAuthClient({ embedded: true })`
- [ ] Register app permissions on first boot

### App inside Play

- [ ] `npm install @aioson/auth-sdk`
- [ ] Apply `requireAuth()` to protected routes (reads Play env vars)
- [ ] Apply `requirePermission()` to routes requiring specific permission
- [ ] Frontend: `createAuthClient({ baseUrl: VITE_AIOSON_AUTH_URL, bindingId: VITE_AIOSON_AUTH_BINDING_ID })`
- [ ] Register permissions via aioson-auth API

### Both (shared code)

- [ ] `usePermission()` for show/hide UI
- [ ] `<Gate>` component for Blade-like conditionals
- [ ] `<ProtectedRoute>` for protected React routes
- [ ] Tests: verify 401 without token, 403 without permission, 200 with permission
