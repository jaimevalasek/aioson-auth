---
feature: jetstream-sdk-onda-1
slug: jetstream-sdk-onda-1
status: ready_for_dev
created_by: analyst
created_at: 2026-05-30
classification: MEDIUM
source_prd: prd-jetstream-sdk-onda-1.md
gate: A
---

# Requirements — Jetstream-pra-Node: SDK Onda 1 (Scaffolder Next.js)

## 1. Resumo da feature

Transformar `@aioson/auth-sdk` (hoje `0.2.0`) num **scaffolder de auth estilo Jetstream** para apps **Next.js App Router**: `npx @aioson/auth-sdk init` injeta login/signup/forgot-password/profile + middleware + helpers de servidor, e o mesmo pacote alterna em **runtime** entre *modo cliente* (dentro do Play desktop) e *modo standalone* (publicado online) por detecção de ambiente — sem rebuild.

## 2. Decisão arquitetural âncora (define todo o resto)

> **Backend standalone = engine `embedded` já entregue (Phase 6, 2026-05-25).**
> Decidido com o dono em 2026-05-30 (Opção A — reusar engine embedded).

Consequências que **reescrevem o PRD** onde ele divergia do código entregue:

| Tema | PRD (literal) | Decisão Onda 1 (vale) |
|---|---|---|
| Tabelas standalone | `users`, `auth_sessions`, `password_reset_tokens` (Prisma models do dev) | `aioson_auth_*` (7 tabelas, raw-SQL geridas pelo SDK via `runEmbeddedMigrations`) |
| Sessão | stateful (`AuthSession` / `auth_sessions`) | **stateless** — JWT HS256 + tabela `aioson_auth_revocations` (revogação por `iat`) |
| Migration | `prisma migrate dev --name aioson_auth_init` cria as tabelas | `runEmbeddedMigrations(prisma)` (idempotente, `CREATE TABLE IF NOT EXISTS`) — **não** via Prisma migrate |
| Conflito com `users` pré-existente | "erro hard no init" | **advisory only** — prefixo `aioson_auth_` evita colisão real; loga warning, nunca bloqueia (já é o comportamento de `runEmbeddedMigrations`) |
| Modelo `AuthSession` | obrigatório | **removido** do escopo Onda 1 |

A camada de dados, portanto, **não é re-criada** — é reusada. O peso da Onda 1 está em **código de tooling e adapter**, não em entidades novas de banco.

## 3. Entidades reusadas (NÃO re-criar — já existem em `sdk/src/embedded/`)

Documentadas aqui apenas como contrato consumido pelo modo standalone. Schema canônico vive em `sdk/src/embedded/schema.ts` (sqlite / postgresql / mysql).

| Tabela | Papel | Observação |
|---|---|---|
| `aioson_auth_users` | usuários standalone | `email UNIQUE`, `password_hash`, `email_verified` (default 0 — sem verificação na Onda 1), `last_login_at` |
| `aioson_auth_roles` | RBAC (reuso) | não exposto na UI Onda 1; tabela existe |
| `aioson_auth_permissions` | RBAC (reuso) | idem |
| `aioson_auth_user_roles` | N:N user↔role | idem |
| `aioson_auth_role_permissions` | N:N role↔perm | idem |
| `aioson_auth_revocations` | revogação JWT | `(user_id, expires_at)` index; consultada antes do verify |
| `aioson_auth_password_reset_tokens` | reset de senha | `token_hash` index; `used_at` para invalidar |

Tipos TS canônicos: `sdk/src/embedded/types.ts` (`AuthUser`, `AuthRole`, …, `RevocationReason = 'logout' | 'admin' | 'password_change'`).

## 4. Entidade nova (filesystem) — `.aioson-auth.lock`

Único artefato com schema **novo** introduzido por esta feature. Vive na raiz do app consumidor; criado por `init`, lido por `upgrade` (Onda 2).

| Campo | Tipo | Nullable | Constraints |
|---|---|---|---|
| `sdkVersion` | string (semver) | não | versão do `@aioson/auth-sdk` que rodou o `init` |
| `framework` | enum | não | `next-app-router` (único valor na Onda 1) |
| `dbProvider` | enum | não | `mysql` \| `postgresql` (escolhido no `init`; default `mysql`) |
| `bindingId` | string (cuid) | não | id estável do app standalone (claim JWT `binding_id`) |
| `createdAt` | string (ISO 8601) | não | timestamp do scaffold |
| `files` | array<FileEntry> | não | manifesto dos arquivos injetados |

`FileEntry`:

| Campo | Tipo | Nullable | Constraints |
|---|---|---|---|
| `path` | string | não | caminho relativo ao root do app |
| `sha256` | string (hex 64) | não | hash do conteúdo no momento do `init` |
| `managed` | boolean | não | `true` = SDK pode propor patch no `upgrade`; `false` = dev é dono (ex.: `components/auth/*`) |

Formato em disco: JSON. Idempotência: rodar `init` 2× num projeto já scaffolded **não** sobrescreve; arquivos pré-existentes geram `<arquivo>.new` ao lado (AC-JS-02).

## 5. Contrato de ambiente (env)

`init` adiciona ao `.env.example` (e gera valores reais no `.env` quando ausente):

| Var | Modo | Origem | Regra |
|---|---|---|---|
| `AIOSON_PLAY_HOST` | **switch canônico** | injetada pelo Play desktop em runtime | **presente** → modo cliente; **ausente** → modo standalone |
| `JWT_SECRET` | standalone | `init` gera aleatório (≥32 bytes) | obrigatório em standalone; em cliente é ignorado |
| `AIOSON_BINDING_ID` | standalone | `init` gera cuid estável | vira claim `binding_id` do JWT standalone |
| `DATABASE_URL` | standalone | dev/Prisma | usado por `detectProvider` + PrismaClient |

> **Reconciliação do sinal de detecção:** o PRD usa `AIOSON_PLAY_HOST`; o engine entregue usa `EMBEDDED`/`jwtSecret`. Na Onda 1 **`AIOSON_PLAY_HOST` é o único switch voltado ao dev**. O `lib/auth-mode.ts` resolve o modo a partir dele; o route handler scaffolded **deriva** a config do engine embedded (`jwtSecret`, `bindingId`) a partir das envs de standalone. `EMBEDDED`/`jwtSecret` passam a ser detalhe interno, não contrato público.

## 6. Contrato do CLI scaffolder

Novo `bin` no pacote (`@aioson/auth-sdk` ganha entry `./cli`).

| Comando | Onda 1 | Comportamento |
|---|---|---|
| `npx @aioson/auth-sdk init` | ✅ in-scope | detecta Next.js App Router (lê `next.config.*` + dir `app/`); pergunta DB target (MariaDB/MySQL default, ou Postgres); injeta arquivos (§7) sem sobrescrever; gera `.aioson-auth.lock`; imprime resumo (picocolors + ASCII logo) |
| `npx @aioson/auth-sdk migrate` | ✅ in-scope | wrapper que instancia PrismaClient do app e chama `runEmbeddedMigrations` (idempotente); substitui o `prisma migrate dev` do PRD para criar as tabelas `aioson_auth_*` |
| `npx @aioson/auth-sdk upgrade` | ❌ Onda 2 | diff inteligente via hashes do `.aioson-auth.lock` — **fora do escopo** |

Regras de detecção/erro:
- Projeto **não** Next.js App Router → sai com erro claro listando frameworks suportados (AC-JS-06).
- Prisma ausente no app → `init` scaffolda um `schema.prisma` mínimo (datasource + generator) porque o engine precisa de um `PrismaClient`; avisa o dev.

## 7. Plano de injeção (arquivos scaffolded no app consumidor)

Todos `managed: true` salvo indicação. Pré-existentes → cria `.new`.

| Arquivo | `managed` | Papel |
|---|---|---|
| `app/(auth)/login/page.tsx` | true | página login |
| `app/(auth)/signup/page.tsx` | true | página signup |
| `app/(auth)/forgot-password/page.tsx` | true | solicitar reset |
| `app/(auth)/reset-password/page.tsx` | true | confirmar reset |
| `app/(authenticated)/profile/page.tsx` | true | perfil |
| `app/api/auth/[...auth]/route.ts` | true | Route Handler → adapter `./next` (deriva modo) |
| `middleware.ts` | true | auth middleware + detecção de ambiente |
| `lib/auth.ts` | true | helpers servidor: `auth()`, `requireAuth()`, `getCurrentUser()` |
| `lib/auth-mode.ts` | true | resolve `client` vs `standalone` por `AIOSON_PLAY_HOST` |
| `components/auth/LoginForm.tsx` … `ProfileForm.tsx` | **false** | UI kit copy-paste (dev é dono — AC-JS-08) |
| `.env.example` (append) | true | vars do §5 |
| `.aioson-auth.lock` | n/a | manifesto §4 |

UI kit (`managed:false`): `LoginForm`, `SignupForm`, `ForgotPasswordForm`, `ResetPasswordForm`, `ProfileForm` — estilo shadcn (Tailwind + Radix + lucide-react), slots de classe, dark/light via `dark:`.

## 8. Gaps no engine que a Onda 1 PRECISA preencher

| Gap | Evidência | Requisito |
|---|---|---|
| **Sem endpoint `/signup`** | `handlers.ts` só tem login/refresh/logout/me/password-reset; só há `bootstrap()` para 1º admin | Adicionar registro self-service standalone. Política: **1º usuário → admin** (via `bootstrap`); subsequentes → role default (`viewer`) **ou** signup desabilitado após 1º admin via flag `AIOSON_ALLOW_SIGNUP` (default `true`). Decisão fina de policy → @architect/@dev; requisito: o endpoint existe e a UI `SignupForm` o consome. |
| **Engine é Express-only** | `createAuthRouter` retorna `Router` do Express e usa `res.cookie` | Construir **adapter `./next`** que reusa os primitivos (`queries`, `auth-crypto`, `migrate`, `revocation-checker`) e expõe APIs Next-nativas (Route Handler via Web `Request`/`Response`, `middleware` `withAuth()`, server actions, `getServerSession()`), com **semântica idêntica** de cookie/token (`aioson_access`/`aioson_refresh`, httpOnly, `sameSite=lax`, `secure` default true, TTLs do `auth-crypto`). Refatorar a lógica das rotas Express para funções framework-neutras compartilhadas é recomendado, mas é decisão de @dev/@architect. |
| **`bindingId` em standalone** | `EmbeddedBackendConfig.bindingId` é obrigatório | Vem de `AIOSON_BINDING_ID` (§5), gerado no `init`. |
| **Email out-of-band** | `password-reset/request` faz `console.log` do token cru | Onda 1 mantém out-of-band (email é Onda 2). Expor hook para o dev plugar envio próprio; default: logar/retornar token em dev. |

## 9. Relacionamentos (com o que já existe)

- O adapter `./next` **depende de** (lê/usa) os módulos do engine `embedded`: `queries.ts`, `auth-crypto.ts`, `migrate.ts`, `revocation-checker.ts`, `bootstrap.ts`, `schema.ts`.
- O modo cliente **reusa** o core client existente (`sdk/src/client.ts`) para falar com `${AIOSON_PLAY_HOST}/api/auth/*`.
- `package.json` do SDK ganha entries `./next` e `./cli` ao lado de `.`, `./react`, `./express`, `./embedded`.
- Tabelas `aioson_auth_*` são escritas pelo app standalone; **nunca** tocam tabelas do dono do app (prefixo).

## 10. Ordem de migração / build (não há migration de schema nova)

Não há novas tabelas. A "ordem" relevante é de implementação:

1. Adapter `./next` (Route Handler + middleware + `lib/auth` helpers) reusando primitivos embedded.
2. Endpoint/fluxo de `signup` (gap §8) no core compartilhado.
3. CLI `init` (detecção, injeção, `.aioson-auth.lock`, resumo) + `migrate`.
4. UI kit `components/auth/*`.
5. Wiring de detecção de ambiente (`lib/auth-mode.ts`) e ramificação cliente/standalone no route handler + middleware.
6. `package.json`: entries `./next`, `./cli`, bump para `1.0.0`, peer deps Next.js.

## 11. Regras de negócio

- **BR-01** Detecção de modo é **runtime**, por presença de `AIOSON_PLAY_HOST` — trocar de modo não exige rebuild (AC-JS-10).
- **BR-02** Standalone exige `JWT_SECRET` e `AIOSON_BINDING_ID`; ausência → erro claro no boot do route handler.
- **BR-03** Migrations são idempotentes (`CREATE TABLE IF NOT EXISTS`); rodar 2× é no-op (AC-JS-07).
- **BR-04** `init` nunca sobrescreve arquivo do dev: pré-existente → `.new` (AC-JS-02).
- **BR-05** Conflito de tabela (`users`/`roles`/`permissions` pré-existentes sem prefixo) é **advisory** (warning), nunca bloqueia (decisão analyst, alinhada ao código).
- **BR-06** Cookies emitidos por qualquer adapter: `httpOnly`, `sameSite=lax`, `secure` default `true` (false só em dev sem HTTPS).
- **BR-07** Modo cliente: `/login` redireciona para `${AIOSON_PLAY_HOST}/auth/login`; leitura de usuário proxia para o host; **migrations da User table NÃO rodam**.
- **BR-08** Primeiro usuário em standalone vira admin (via `bootstrap`); demais seguem policy de signup (§8).
- **BR-09** `email_verified` permanece `false` na Onda 1 (sem fluxo de verificação por email).

## 12. Edge cases

- **EC-01** `init` em projeto sem `app/` (Pages Router ou não-Next) → erro claro com lista de frameworks suportados (AC-JS-06).
- **EC-02** `init` em projeto sem Prisma → scaffolda `schema.prisma` mínimo + avisa; sem isso o engine não tem `PrismaClient`.
- **EC-03** App já tem tabela `users` própria → warning advisory, segue (prefixo evita colisão).
- **EC-04** `migrate` rodado antes de `DATABASE_URL` válido → erro de conexão claro, sem criar estado parcial.
- **EC-05** Modo standalone sem `JWT_SECRET` → erro no boot (BR-02), não 500 silencioso por request.
- **EC-06** Re-`init` em projeto já scaffolded → todos os arquivos viram `.new`; `.aioson-auth.lock` não é sobrescrito sem confirmação.
- **EC-07** Forgot-password com email inexistente → resposta `{ sent: true }` genérica (anti-enumeração — já é o comportamento de `password-reset/request`).
- **EC-08** Reset token expirado/usado → `400 Invalid or expired token` (já implementado).
- **EC-09** Troca de modo em runtime (Play injeta/remove `AIOSON_PLAY_HOST`) → próxima request resolve o novo modo sem rebuild (AC-JS-10).
- **EC-10** Signup quando já existe admin e `AIOSON_ALLOW_SIGNUP=false` → `403`/desabilitado na UI.

## 13. Mapa de Acceptance Criteria (reconciliado)

| AC do PRD | Status na Onda 1 |
|---|---|
| AC-JS-01 (install sem peer warnings Next 14+/15+) | mantido — peer dep Next.js opcional |
| AC-JS-02 (init injeta sem sobrescrever) | mantido (BR-04, EC-06) |
| AC-JS-03 (migrate cria tabelas) | **reescrito**: cria `aioson_auth_*` via `npx @aioson/auth-sdk migrate` (não `users`/`auth_sessions`, não `prisma migrate dev`) |
| AC-JS-04 (cliente: `/login` redirect + `/me` proxy) | mantido (BR-07) |
| AC-JS-05 (standalone: `/login` UI local + signup local) | mantido — **depende do gap signup §8** |
| AC-JS-06 (não-Next sai com erro) | mantido (EC-01) |
| AC-JS-07 (migrations idempotentes 2×) | mantido (BR-03) — já validado no engine |
| AC-JS-08 (UI kit editável sem quebrar SDK) | mantido (`components/auth/*` `managed:false`) |
| AC-JS-09 (`lib/auth.ts`: `auth()`/`requireAuth()`/`getCurrentUser()` em RSC + Server Actions) | mantido — **depende do adapter `./next` §8** |
| AC-JS-10 (troca de modo sem rebuild) | mantido (BR-01, EC-09) |

## 14. Fora do escopo (Onda 1)

- Adapters Hono, Fastify, Express App Router, SvelteKit, Remix (Onda 4).
- 2FA TOTP, API tokens, Teams multi-tenant, OAuth providers (Ondas 2/3).
- Email transacional / envio real de reset/confirmação (Onda 2 — Onda 1 é out-of-band).
- Comando `upgrade` com diff por hash (Onda 2 — mas `.aioson-auth.lock` já é gravado na Onda 1).
- UI kit Vue/Solid/Svelte (Onda 5+).
- Modelo `AuthSession`/sessões stateful (descartado pela decisão âncora §2).
- Telemetria opt-in (should-have do PRD) — **deferida**; reavaliar com @architect se entra na Onda 1 ou Onda 2.

## 15. Classificação

Score (0–6) para esta feature:
- User types: 3 (dev consumidor, aioson-play-online, Play desktop) → **+2**
- Integrações externas: Next.js, Prisma cross-DB (MySQL/MariaDB + Postgres), npm registry, Play host API → 3+ → **+2**
- Complexidade de regra: detecção dual-mode em runtime, migrations idempotentes cross-DB, injeção não-destrutiva com hash-lock, policy de signup-first-admin → complexa → **+2**

**Total: 6 → MEDIUM** (confirma o frontmatter do PRD; o `aioson classify` reportou SMALL por ler o `prd.md` antigo, não este PRD).

## 16. Riscos

- **R-01** Adapter `./next` é o maior risco: a ponte Express→Web/Fetch pode vazar incompatibilidades (Edge runtime, cookies via `next/headers`). Mitigar refatorando a lógica para funções neutras antes de adaptar.
- **R-02** Gap de signup tem decisão de policy aberta (1º admin / role default / flag) — alinhar com @architect antes de codar a UI.
- **R-03** `detectProvider` não cobre MariaDB explicitamente (cai em `mysql` via `version()`); validar que MariaDB responde como esperado.
- **R-04** Open questions cross-repo do PRD (como o Play declara "app tem auth"; contrato exato `/api/users/{id}`; assinatura JWT por modo) impactam o modo cliente — pertencem a @architect e são pré-condição para fechar AC-JS-04.
