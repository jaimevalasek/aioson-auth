---
feature: jetstream-sdk-onda-1
slug: jetstream-sdk-onda-1
status: ready_for_dev
created_by: architect
created_at: 2026-05-30
classification: MEDIUM
gate: B
source: requirements-jetstream-sdk-onda-1.md
---

# Architecture — Jetstream-pra-Node: SDK Onda 1 (Scaffolder Next.js)

> Consome `requirements-jetstream-sdk-onda-1.md` (§ referenciado por nome, não copiado) e o engine `embedded` já entregue. Não redesenha entidades — ver requirements § 3.

## 1. Architecture overview

SDK dual-mode em **um único pacote** (`@aioson/auth-sdk@1.0`). A lógica de auth é extraída para um **core framework-neutro** reusado por todos os adapters. O backend standalone **é** o engine `embedded` (decisão âncora, requirements § 2). A Onda 1 adiciona três superfícies novas sobre esse core: adapter **`./next`**, **CLI scaffolder** (`./cli`), e o **UI kit** injetado. O modo (cliente vs standalone) é resolvido em runtime por `AIOSON_PLAY_HOST` (requirements § 5, BR-01).

Princípio condutor: **uma única fonte de verdade para a lógica de auth**; adapters só traduzem transporte (Express `req/res` ↔ Web `Request/Response`).

## 2. Folder/module structure (`sdk/src/`)

```
sdk/src/
├── core/                    ← NOVO — lógica de auth framework-neutra (alvo do refactor)
│   ├── flows.ts             ← loginCore, signupCore, refreshCore, logoutCore, meCore,
│   │                          passwordResetRequestCore, passwordResetConfirmCore
│   ├── result.ts            ← AuthResult (contrato neutro — ver § 6)
│   ├── schemas.ts           ← Zod schemas dos bodies (login/signup/reset)
│   └── mode.ts              ← resolveMode(env) + StandaloneEnvConfig a partir de env
├── embedded/                ← EXISTENTE — reuso integral
│   ├── queries.ts · auth-crypto.ts · migrate.ts · revocation-checker.ts
│   ├── bootstrap.ts · schema.ts · types.ts
│   └── handlers.ts          ← REFATORAR: passa a delegar para core/flows (mantém ./express vivo)
├── express/                 ← EXISTENTE — backward compat, sem mudança de API pública
├── next/                    ← NOVO — adapter Next.js App Router
│   ├── factory.ts           ← createNextAuth(config) → { routeHandler, middleware, auth,
│   │                          requireAuth, getCurrentUser, getServerSession }
│   ├── route-handler.ts     ← traduz AuthResult ↔ Web Response + cookies() de next/headers
│   ├── middleware.ts        ← withAuth() (Edge-safe: só lê cookie + verifica JWT)
│   ├── server.ts            ← helpers RSC/Server Actions
│   └── index.ts
├── cli/                     ← NOVO — scaffolder
│   ├── bin.ts               ← entry do bin; parse de `init` | `migrate`
│   ├── detect.ts            ← Next App Router? Prisma? DB provider?
│   ├── inject.ts            ← cópia não-destrutiva (.new), hashing sha256
│   ├── lock.ts              ← read/write .aioson-auth.lock
│   ├── migrate-cmd.ts       ← invoca scripts/aioson-auth-migrate.mjs do app
│   └── templates/           ← arquivos scaffolded (ver requirements § 7)
├── client.ts                ← EXISTENTE — usado pelo modo cliente
└── index.ts · types.ts · jwt.ts · storage.ts · errors.ts   ← EXISTENTES
```

`package.json` (entries): adiciona `./next` e `./cli` (+ `"bin": { "aioson-auth": "./dist/cli/bin.js" }`) ao lado de `.`, `./react`, `./express`, `./embedded`. Bump `0.2.0 → 1.0.0`. Peer dep `next` (`>=14`, optional).

## 3. Migration order

Sem novas tabelas de banco (requirements § 10). A ordem é de **implementação** — ver § 7. Tabelas `aioson_auth_*` são criadas por `runEmbeddedMigrations` (idempotente), invocado por `scripts/aioson-auth-migrate.mjs` no app standalone.

## 4. Models and relationships

Reusados sem redesenho — ver requirements § 3 (entidades `aioson_auth_*`) e `sdk/src/embedded/types.ts`. Nenhum modelo novo de banco. Único schema novo é o arquivo `.aioson-auth.lock` (requirements § 4).

## 5. Integration architecture

| Integração | Como conecta |
|---|---|
| **Next.js App Router** | Route Handler catch-all `app/api/auth/[...auth]/route.ts` → `createNextAuth().routeHandler`; `middleware.ts` → `withAuth()`; RSC/Server Actions → `lib/auth.ts` helpers |
| **Prisma (cross-DB)** | adapter recebe o `PrismaClient` do app via `lib/auth.ts`; engine usa `$executeRawUnsafe`/`$queryRawUnsafe`. `detectProvider` cobre sqlite/postgres/mysql (MariaDB cai em `mysql` — R-03) |
| **Play host (modo cliente)** | delegação HTTP — ver § 8 (D3). Sem verificação local de assinatura |
| **npm registry** | publicação do pacote `1.0.0` com novas entries/bin |

### Wiring central — `createNextAuth(config)`

Factory única que o `lib/auth.ts` scaffolded instancia uma vez:

```
createNextAuth({ prisma, /* standalone: derivado de env */ })
  → resolveMode()
     ├─ standalone → createEmbeddedBackend({ prisma, jwtSecret: JWT_SECRET,
     │                bindingId: AIOSON_BINDING_ID }) + core/flows
     └─ client     → client.ts contra ${AIOSON_PLAY_HOST}
  → expõe { routeHandler, middleware, auth, requireAuth, getCurrentUser, getServerSession }
```

O route handler e os helpers leem da MESMA instância em `lib/auth.ts` (single source no app).

## 6. Cross-cutting concerns

- **Contrato neutro `AuthResult`** (`core/result.ts`):
  `{ status: number; body: unknown; setCookies?: {name,value,maxAgeSecs}[]; clearCookies?: string[] }`.
  Adapters traduzem: Express → `res.cookie/json`; Next → `NextResponse` + `cookies()`. Cookie/token idênticos entre adapters (`aioson_access`/`aioson_refresh`, httpOnly, `sameSite=lax`, `secure` default true, TTLs de `auth-crypto`).
- **Validação:** Zod em `core/schemas.ts`, aplicada na borda de cada flow (substitui os checks manuais de `handlers.ts`).
- **Auth:** JWT HS256 stateless + checagem de revogação antes do verify (já no engine). Standalone assina com `JWT_SECRET`; bootstrap cria 1º admin.
- **Error handling:** flows nunca lançam para o transporte — retornam `AuthResult` com status; 500 só em exceção real. Anti-enumeração no forgot-password preservada (EC-07).
- **Segurança (baseline + flags p/ @pentester):** sem rate-limiting na Onda 1 (NÃO-GOAL — flag); server actions exigem revisão CSRF (sameSite=lax mitiga, mas POST programático merece atenção); reset token só hasheado em repouso; `JWT_SECRET` gerado ≥32 bytes no `init`.
- **Observability:** logs prefixados `[aioson-auth/...]`; telemetria opt-in **deferida** (requirements § 14).

## 7. Implementation sequence for @dev

1. **`core/` (refactor)** — extrair `flows.ts` + `result.ts` + `schemas.ts` + `mode.ts` a partir de `embedded/handlers.ts`; refatorar `handlers.ts` (Express) para delegar. Validar que `./express` continua passando os smokes existentes (sem regressão).
2. **`signupCore` + `POST /signup`** (gap, D2) — bootstrap-aware; policy via `AIOSON_ALLOW_SIGNUP`.
3. **Adapter `./next`** — `factory.ts` → `route-handler.ts` (login standalone primeiro, depois refresh/logout/me/reset/signup), `middleware.ts`, `server.ts`. Paridade de cookie/token com o core.
4. **CLI `init`** — `detect.ts` → `inject.ts` (não-destrutivo + `.new` + sha256) → `lock.ts` (`.aioson-auth.lock`) → resumo (picocolors + ASCII). `migrate` → `migrate-cmd.ts` + `scripts/aioson-auth-migrate.mjs`.
5. **UI kit** `components/auth/*` (`managed:false`) + páginas `app/(auth)/*` e `app/(authenticated)/profile`.
6. **Modo cliente** — branch de redirect + proxy no route handler/middleware (D3); fica parcial até a dependência cross-repo (§ 8) fechar.
7. **`package.json`** — entries `./next`/`./cli` + `bin`, peer `next`, bump `1.0.0`.

> dev-state.md já aponta o primeiro slice (item 3 — login standalone) para auto-resume.

## 8. Decisões arquiteturais (resolvendo R-01/R-02/R-04 do requirements)

### D1 — Bridge Express→Next: core neutro, não wrapper (R-01)
Refatorar a lógica das rotas para `core/flows.ts` retornando `AuthResult`. **Por quê:** rodar Express dentro de Route Handler é frágil (incompatível com Edge, cookies via `res.cookie` não existem no Web API). Core neutro = uma fonte de verdade, ambos adapters traduzem transporte. Risco R-01 do requirements mitigado.

### D2 — Signup policy (R-02)
`POST /signup` standalone, bootstrap-aware:
- 0 usuários → cria + atribui `owner` (via `bootstrap`).
- ≥1 usuário → `AIOSON_ALLOW_SIGNUP` (default `true`): `true` → cria com role `viewer`; `false` → `403 signup_disabled`.
- Modo cliente → signup redireciona ao Play (sem signup local).
**Por quê:** out-of-box sensato (1º = admin, signup aberto) + lockdown por env sem mudar código (coerente com BR-01). `AIOSON_ALLOW_SIGNUP` entra no contrato de env (§5 do requirements — adicionar).

### D3 — Modo cliente / cross-repo (R-04)
- **Assinatura JWT por modo:** standalone assina/verifica HS256 local com `JWT_SECRET`. **Cliente NÃO compartilha chave** — valida delegando ao Play (`GET ${AIOSON_PLAY_HOST}/api/auth/me` com o Bearer), com cache curto (TTL 60s, padrão do `aioson_com_validator` existente). Evita rotação/compartilhamento de chave entre processos.
- **Read de usuário (cliente):** proxy `GET ${AIOSON_PLAY_HOST}/api/users/{id}` → `{ id, email, name, avatar, role }` (somente leitura; mutação é do Play).
- **"App declara auth" (manifest.json `auth:{provider,version}`):** é runtime do **Play/aioson-play-online**, NÃO deste SDK. O único sinal de runtime do SDK é `AIOSON_PLAY_HOST`. → **NÃO-GOAL do SDK**; item de coordenação cross-repo.
- **Status:** o caminho standalone (massa da Onda 1) está desbloqueado. A validação completa de **AC-JS-04** depende dessa coordenação cross-repo (aioson-play + aioson-play-online) — ver § 9.

## 9. Explicit non-goals / deferred

- Modelo `AuthSession`/sessões stateful — descartado (decisão âncora).
- Mecanismo "app declara auth" (manifest) — cross-repo, fora do SDK.
- `upgrade` com diff por hash, telemetria opt-in, rate-limiting, OAuth/2FA/Teams, email transacional, adapters não-Next — Ondas futuras (requirements § 14).
- **Dependência externa bloqueante de AC-JS-04:** contrato cross-repo do modo cliente (endpoints `/api/auth/me` e `/api/users/{id}` no Play). Decisão/owner: time aioson-play + aioson-play-online. Não bloqueia o standalone.

## Handoff para @ux-ui (UI kit)

- **Telas:** login, signup, forgot-password, reset-password, profile.
- **Constraints:** shadcn (Tailwind + Radix + lucide-react); componentes `managed:false` (dev é dono — AC-JS-08); slots de classe; dark/light via `dark:`; sem dependência NPM de UI (copy-paste local).
- **Risco UX:** formulários devem degradar bem em modo cliente (login redireciona, não renderiza form local).

> **Gate B:** Architecture approved — @dev can proceed.
