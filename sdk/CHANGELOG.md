# Changelog

Todas as mudanças relevantes do `@aioson/auth-sdk` ficam registradas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/) (em `0.x` enquanto o contrato do `aioson-auth` não está congelado — minor pode quebrar API).

## [Unreleased]

- Removida a compatibilidade de Bearer em query string no servidor e no
  middleware Express; use sempre `Authorization: Bearer <jwt>`.
- Callbacks SSO do SDK leem tokens no fragmento e limpam o fragmento após a
  leitura, evitando tokens em histórico, logs de URL e cabeçalho Referer.

## [0.2.0] — 2026-05-13

Consolida as slices C, D e E entregues após o release inicial. Na versão
original, o servidor ainda aceitava `?token=` durante a janela de migração;
essa compatibilidade foi removida em `Unreleased` por segurança.

### Added

- `AuthClient.register({ email, password })` — cria operador no binding. Não faz login automático; chame `login()` em seguida se quiser sessão iniciada. (Slice C)
- `AuthClient.forgotPassword({ email })` — dispara e-mail de recuperação (ou loga no servidor se SMTP off). Retorna `{ sent: boolean }`. (Slice C)
- `AuthClient.resetPassword({ token, newPassword })` — conclui o flow de recuperação com o token recebido por e-mail. Retorna `{ success: boolean }`. (Slice C)
- `AuthClient.mePermissions()` — atalho do `GET /me/permissions`. Retorna apenas `readonly string[]`, fresh do DB. Útil para apps que validam JWT offline (JWKS futuro) e só precisam atualizar a lista de permissions sem o payload completo do `/me`. (Slice E)
- Tipos públicos: `RegisterInput`, `RegisterOutput`, `ForgotPasswordInput`, `ResetPasswordInput`.

### Changed

- **Authorization header** — `auth.me()`, `auth.check()` e o novo `auth.mePermissions()` enviam `Authorization: Bearer <jwt>` (RFC 6750) em vez do query param `?token=`. (Slice D)
- README com tabela completa de métodos do core e nota sobre o header canônico.

## [0.1.0] — 2026-05-13

Release inicial do pacote — extraído como `@aioson/auth-sdk` para virar a interface canônica de qualquer app do ecossistema aioson contra o `aioson-auth`. (Slice B)

### Added

- **Core (`@aioson/auth-sdk`)** — `createAuthClient(opts)` com:
  - `login`, `loginOAuth`, `logout`
  - `refresh` (idempotente em chamadas concorrentes — promise de refresh compartilhada)
  - `me`, `check`
  - `hasPermission(name)` / `getPermissions()` — síncrono, lê permissions do JWT em memória (Slice A do servidor já carregava `binding_id` + `permissions` no claim)
  - `getAccessToken()` com auto-refresh se expirado
  - `getSession()`, `onSessionChange(listener)`
- **Storage adapters** — `memoryStorage()` (default) e `localStorageAdapter(prefix?)` com fallback automático para memória em SSR.
- **React adapter** (`@aioson/auth-sdk/react`) — `<AuthProvider client>`, `useAuth()`, `usePermission(name)`.
- **Express adapter** (`@aioson/auth-sdk/express`) — `requireAuth(opts?)` e `requirePermission(perm, opts?)`. Popula `req.auth: TokenPayload`.
- **Tipos públicos** — `AuthClient`, `AuthClientOptions`, `AuthSession`, `User`, `LoginInput`, `OAuthInput`, `MePayload`, `TokenPayload`, `TokenStorage`, `AuthError`, `AuthErrorCode`.
- **Auto-refresh em 401** — o core tenta renovar uma vez antes de propagar o erro original do servidor.
- **Build dual ESM + CJS** via `tsup`, com entries separados para core / react / express (peer deps opcionais).

[0.2.0]: #020--2026-05-13
[0.1.0]: #010--2026-05-13
