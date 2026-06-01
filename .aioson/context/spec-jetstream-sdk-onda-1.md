---
feature: jetstream-sdk-onda-1
status: in_progress
started: 2026-05-30
gate_requirements: approved
gate_design: approved
---

# Spec — Jetstream-pra-Node: SDK Onda 1 (Scaffolder Next.js)

## What was built

### Slice 1 — core neutro + login (2026-05-30) ✓
Implementa architecture.md § 7-step-1 (core refactor) + primeiro fluxo standalone (login).
- `sdk/src/core/cookies.ts` — constantes `COOKIE_ACCESS`/`COOKIE_REFRESH` centralizadas (fonte única p/ todos adapters).
- `sdk/src/core/result.ts` — contrato neutro `AuthResult` (`{status, body, setCookies?, clearCookies?}`) + helpers `ok()`/`fail()`.
- `sdk/src/core/flows.ts` — `loginCore(deps, input)` reusando `auth-crypto` + `queries` do engine embedded; retorna `AuthResult`.
- `sdk/src/embedded/handlers.ts` — rota `/login` refatorada p/ delegar a `loginCore` via helper `applyResult` (prova D1: uma fonte de verdade; Express só traduz transporte). Cookie constants agora re-exportadas de `core/cookies.ts`.

**Verificação:** `tsc --noEmit` limpo · `npm run build` ok (core empacota no bundle embedded) · `npm run test:embedded` 25/25 (com bcryptjs instalado transiente; as 2 falhas iniciais eram o peer opcional ausente, não regressão).

### Slice 2 — migração total p/ core + signup (D2) (2026-05-30) ✓
- `sdk/src/core/flows.ts` — adicionados `signupCore` (gap D2), `refreshCore`, `logoutCore`, `meCore`, `passwordResetRequestCore`, `passwordResetConfirmCore`. `FlowDeps` agora carrega `checkRevocation` + policy de signup (`allowSignup`/`firstUserRole`/`defaultRole`). Helper `buildSession` compartilhado (login/refresh/signup).
- `sdk/src/embedded/handlers.ts` — **reescrito como adapter fino**: as 7 rotas (incl. nova `POST /signup`) delegam ao core; removidos imports/helpers mortos (`setAuthCookies`/`clearAuthCookies`/auth-crypto). `createAuthRouter` monta `deps` uma vez.
- `sdk/src/embedded/backend.ts` — `EmbeddedBackendConfig` repassa `allowSignup`/`firstUserRole`/`defaultRole`.
- `sdk/src/core/index.ts` (novo barrel) + entry `core/index` no tsup + export `./core` no package.json → `@aioson/auth-sdk/core` agora é superfície pública (consumida pelo adapter `./next` e por consumidores avançados).
- `sdk/test/core-flows.test.mjs` (novo) — 15 testes comportamentais com fake `queries` in-memory + bcrypt/JWT reais. Scripts `test:core` e `test` adicionados.

**Verificação:** `tsc --noEmit` limpo · build ok (entry `core` gerado) · **40/40** (25 embedded smoke + 15 core flows).

**Decisão [@dev]:** signupCore — 1º usuário → role `admin` (não `owner` como dizia architecture § 8/D2); subsequentes → `viewer`. Por quê: alinhar à convenção do `bootstrap.ts` do engine (default `admin`); ambos configuráveis via `firstUserRole`/`defaultRole`. Signup faz auto-login (201 + cookies), estilo Jetstream.

### Slice 3 — adapter `./next` (2026-05-30) ✓
- `sdk/src/core/mode.ts` (novo) — `resolveMode()` / `playHostFrom()` (switch por `AIOSON_PLAY_HOST`, BR-01).
- `sdk/src/next/` (novo):
  - `factory.ts` — `createNextAuth(config)`: resolve modo, monta deps do engine embedded lazy (standalone), retorna `{ mode, routeHandler, middleware, auth, requireAuth, getCurrentUser, getServerSession }`.
  - `route-handler.ts` — catch-all; parseia action da URL (robusto p/ Next 14/15); **retorna `Response` Web puro** (sem `NextResponse`) → Edge-safe, version-agnostic, testável; cookies idênticas ao Express; try/catch → 500.
  - `middleware.ts` — `withAuth()` (verify JWT local em standalone; redirect p/ Play em cliente).
  - `server.ts` — helpers RSC/Server Actions (`getServerSession`/`auth`/`getCurrentUser`/`requireAuth` via `next/headers` + `next/navigation`).
- `sdk/src/next/index.ts` (barrel) + entries `next/index` e `next/route-handler` no tsup (este último next-free p/ teste) + export `./next` no package.json.
- `next@14` adicionado como **devDep** + **peerDependency opcional** (`>=14`); marcado `external` no tsup.
- `sdk/test/next-adapter.test.mjs` (novo) — 10 testes do route handler em Node puro (Web Request/Response, fake `queries`, fetch mockado p/ cliente).

**Verificação:** `tsc --noEmit` limpo · build ok (entries `next/index` + `next/route-handler`) · **50/50** testes (25 embedded + 15 core + 10 next).

**Decisão [@dev]:** route handler retorna `Response` Web (não `NextResponse`). Por quê: `NextResponse`/`next/server` só resolvem dentro do bundler do Next — `Response` puro é Edge-safe, independe de versão do Next e é testável em Node puro. `middleware`/`server` continuam usando `next/*` (precisam de `NextRequest`/`cookies()`/`redirect`), verificados via tsc.

**Limite de verificação (p/ @qa/@tester):** standalone *flow* coberto pelo core (15/15) + route handler (10/10) com fake queries; falta teste de integração com **app Next real + DB real** (cookies em RSC, `middleware` em runtime Edge, `getServerSession`). Modo cliente é **parcial** (D3, dep cross-repo).

[Próximos slices @dev: **slice 4** = CLI `init`/`migrate` + `.aioson-auth.lock` (detecção Next/Prisma/DB, injeção não-destrutiva, hashing); depois UI kit + páginas; depois package.json bump 1.0.0.]

### Bug pré-existente corrigido (fora do escopo, mas bloqueava o gate)
- `sdk/src/client.ts` (callback SSO, ~L439-440): usava `storage.set('accessToken'/'refreshToken')`, mas `StorageKey = 'access' | 'refresh'` (types.ts) — quebrava `tsc`. Corrigido p/ `'access'`/`'refresh'` (convenção do resto do arquivo). Introduzido no commit SSO `8d8b11c`.

## Entities added
Nenhuma tabela nova. O backend standalone **reusa** o engine `embedded` (Phase 6):
- `aioson_auth_users`, `aioson_auth_roles`, `aioson_auth_permissions`,
  `aioson_auth_user_roles`, `aioson_auth_role_permissions`,
  `aioson_auth_revocations`, `aioson_auth_password_reset_tokens`
  (schema canônico: `sdk/src/embedded/schema.ts`).

Único schema novo (filesystem): `.aioson-auth.lock` — manifesto de scaffold
(`sdkVersion`, `framework`, `dbProvider`, `bindingId`, `createdAt`, `files[]{path,sha256,managed}`).
Ver `requirements-jetstream-sdk-onda-1.md` §4.

## Key decisions
- [2026-05-30] Backend standalone = engine `embedded` reusado (Opção A) — Por quê: já entregue + testado (25/25 smoke); evita duplicar lógica de auth.
- [2026-05-30] Sem `AuthSession`/sessões stateful — Por quê: engine é JWT stateless + `revocations`; PRD reconciliado.
- [2026-05-30] Tabelas standalone usam prefixo `aioson_auth_*` (não `users`/`auth_sessions`) — Por quê: alinhar ao engine e evitar colisão com tabelas do dono do app.
- [2026-05-30] Conflito de migration = advisory (warning), não hard error — Por quê: prefixo elimina colisão real; já é o comportamento de `runEmbeddedMigrations`.
- [2026-05-30] `AIOSON_PLAY_HOST` é o switch canônico de modo; `EMBEDDED`/`jwtSecret` viram detalhe interno derivado.
- [2026-05-30] **[@dev]** Validação no core é manual/lightweight (typeof checks), NÃO Zod — desvio consciente de architecture.md § 6: preserva o ethos zero-dep do SDK (`auth-crypto` zero-dep, bcryptjs peer lazy). Revisitar se a validação dos flows crescer em complexidade.
- [2026-05-30] Migration via `npx @aioson/auth-sdk migrate` (não `prisma migrate dev`) — Por quê: tabelas são raw-SQL geridas pelo SDK.

## Open decisions for @architect / @dev
- Policy de signup (gap): 1º usuário→admin (bootstrap); subsequentes→role default `viewer` OU flag `AIOSON_ALLOW_SIGNUP` (default true). Decidir antes da UI `SignupForm`.
- Adapter `./next`: refatorar lógica das rotas Express (`handlers.ts`) para funções framework-neutras compartilhadas vs reimplementar. Recomendado: refatorar.
- Telemetria opt-in (should-have) entra na Onda 1 ou Onda 2?

## Edge cases handled
Ver `requirements-jetstream-sdk-onda-1.md` §12 (EC-01…EC-10). Destaques:
- `init` em não-Next / sem Prisma; re-`init` (arquivos `.new`); tabela `users` pré-existente (advisory);
  standalone sem `JWT_SECRET` (erro no boot); forgot-password anti-enumeração; troca de modo em runtime sem rebuild.

## Dependencies
- **Reads/usa:** módulos do engine embedded (`sdk/src/embedded/`: `queries`, `auth-crypto`, `migrate`,
  `revocation-checker`, `bootstrap`, `schema`); core client (`sdk/src/client.ts`) para modo cliente.
- **Writes/cria:** novo adapter `sdk/src/next/`, novo CLI `sdk/src/cli/`, novas entries `./next` e `./cli`
  em `sdk/package.json`; tabelas `aioson_auth_*` no DB do app standalone (via `migrate`).
- **Gaps a preencher:** endpoint `/signup` (register) no core compartilhado; ponte Express→Web/Fetch no adapter Next.

## Notes
- **Brownfield:** `project.context.md` diz `framework_installed:false` e `classification:SMALL`, mas o repo
  tem implementação substancial e a feature é MEDIUM. Não confiar nesses campos do context para esta feature.
- O `sheldon-enrichment.md` em `.aioson/context/` é de OUTRA thread (config-global, 2026-04-12) — **não** aplicar aqui.
- Open questions cross-repo do PRD (declaração de auth pelo Play, contrato `/api/users/{id}`, assinatura JWT por modo)
  são pré-condição de @architect para fechar AC-JS-04 (modo cliente).
- Bump alvo: `@aioson/auth-sdk` `0.2.0` → `1.0.0`.
