---
active_feature: aioson-play-identity
active_lane: agent-3
active_sprint: 1B
active_plan: /home/jaime/MyProjects/aioson-play/.aioson/context/implementation-plan-aioson-play-identity.md
last_spec_version: 1
context_package:
  - .aioson/context/project.context.md
  - /home/jaime/MyProjects/aioson-play/.aioson/context/parallel/agent-3.status.md
  - /home/jaime/MyProjects/aioson-play/.aioson/context/implementation-plan-aioson-play-identity.md
  - /home/jaime/MyProjects/aioson-play/.aioson/context/architecture-aioson-play-identity.md
  - /home/jaime/MyProjects/aioson-play/.aioson/context/requirements-aioson-play-identity.md
  - /home/jaime/MyProjects/aioson-play/.aioson/context/spec-aioson-play-identity.md
next_step: "Sprint 1B completa + Phase 6 (sdk-embedded-auth) entregue. Pronto para consumo no aioson-play-online."
status: in_progress
updated_at: 2026-05-25
---

# Dev State — aioson-play-identity (lane agent-3 / aioson-auth)

> **NOTA:** A feature `aioson-play-identity` é cross-project (aioson-play, aioson-com, aioson-auth, atendimento). Todos os artefatos canônicos (PRD, requirements, architecture, plan, spec, status) vivem em **aioson-play**. Este `dev-state.md` é o ponteiro local pra agent-3 saber o que fazer.

## Sessões antecedentes (cross-lane)

- **agent-1 (aioson-play) — Sprint 0 done** (2026-05-06). Dev-link de Play Service entregue + smoke aprovado pelo dono.
- **agent-2 (aioson-com) — Sprint 1A done** (2026-05-06). Endpoints `POST /api/aioson-play/installations`, `GET /by-id/:id`, `GET /api/app-auth/me` entregues. Migration aplicada. Sem stories adicionais até Sprint 4 QA.

## Escopo desta lane (Sprint 1B)

| Story | Descrição | Dependências | Status |
|-------|-----------|--------------|--------|
| **S1B.1** | Prisma migration two-pass: adicionar `aioson_play_id` em `AppBinding` (nullable → backfill → NOT NULL) | — | **DONE** 2026-05-06 |
| **S1B.2** | Seed dos 5 roles padrão idempotente em `prisma/seed.ts` (per ADR-03: owner, admin, manager, operator, viewer) | S1B.1 | **DONE** 2026-05-06 |
| **S1B.3** | Service `aioson_com_validator` com cache LRU TTL=60s; chama `GET aioson.com/api/app-auth/me` (pronto em agent-2) | S1A.3 ✅ | **DONE** 2026-05-06 |
| **S1B.4** | Endpoint `POST /api/auth/admin/bindings` + middleware `validate_owner_bearer` per ADR-02 | S1B.1 + S1B.3 + S1A.2 ✅ | **DONE** 2026-05-06 |
| **S1B.5** | Tabela `TokenRevocation` + cleanup job + integração no validate-token middleware (ADR-07) | S1B.1 | **DONE** (implementado em commits 334d0fb–7c4e4a9) |

Bloqueio externo já resolvido — todas as deps cross-lane (`S1A.2`, `S1A.3`) entregues por agent-2. **Pode rodar a Sprint 1B inteira agora.**

## Contratos compartilhados (não rediscutir — vêm dos ADRs em aioson-play/.aioson/context/architecture-aioson-play-identity.md)

### POST /api/auth/admin/bindings (S1B.4 — ADR-02)
```
Headers:
  Authorization: aioson-com:<jwt_aioson_com>
  X-Aioson-Play-Id: <aioson_play_id>
Body:
  { "app_slug": "atendimento", "app_name": "Aioson Atendimento", "accepted_roles": ["admin", "manager", "operator"] }
Response 201: { "binding_id": "cuid-xxx", "created": true }
Response 200 (idempotent — same aioson_play_id + app_slug): { "binding_id": "cuid-xxx", "created": false }
Response 403: { "error": "ownership_conflict" }   ← aioson_play_id não bate com owner_user_id do Bearer
```

### GET aioson.com/api/app-auth/me (S1B.3 — ADR-04)
```
Headers: Authorization: Bearer <jwt_aioson_com>
Response 200: { "user_id": "cuid", "email": "...", "plan": "jedi" | "free", "expires_at": "ISO8601" | null }
Response 401: { "error": "invalid_or_expired_token" }
```
**Cache:** TTL = 60s no aioson_com_validator (mais conservador que o cache de 5min do aioson-play, porque aioson-auth é gatekeeper das bindings).

### TokenRevocation (S1B.5 — ADR-07)
```prisma
model TokenRevocation {
  id          String   @id @default(cuid())
  user_id     String
  binding_id  String
  revoked_at  DateTime @default(now())
  expires_at  DateTime  // = revoked_at + 7d (access TTL)
  @@index([user_id, expires_at])
}
```
Cleanup job a cada 1h. Middleware de validação consulta revocation list ANTES do JWT verify.

## Convenções locais (aioson-auth)

- **Schema Prisma usa snake_case** nos nomes de coluna (`app_slug`, `user_id`, `created_at`). NÃO copiar o camelCase de aioson-com.
- Modelo já existente: `AppBinding`, `GlobalUser`, `BindingPermission`, `UserRole`, `AuthSession`, `Role`.
- Migrations em `prisma/migrations/` — usar `prisma migrate dev` localmente (DB é SQLite `dev.db` em dev).
- Two-pass migration de `AppBinding.aioson_play_id`: 1ª migration `ADD COLUMN ... NULL` + backfill (pode ser noop se DB local zerado) + 2ª migration `ALTER ... NOT NULL`.

## DoD (per implementation plan)

- Código mergeado no main do aioson-auth.
- Testes unitários/integração escritos e verdes.
- ACs associados (PRD § Acceptance criteria) verificados.
- `npx tsc --noEmit` limpo nas alterações desta lane.
- Atualizar `spec-aioson-play-identity.md` em **aioson-play** (`/home/jaime/MyProjects/aioson-play/.aioson/context/spec-aioson-play-identity.md`) na seção `## What was built` com seção "Sprint 1B — aioson-auth backend (lane agent-3, ...)" análoga à seção que agent-2 já adicionou pra Sprint 1A.
- Sem regressão na suite existente do aioson-auth.

## O que foi entregue (2026-05-06)

- **S1B.1** — `prisma/schema.prisma`: campo `aioson_play_id String?` em `AppBinding` (nullable + index `[aioson_play_id]`). Two-pass: 1ª migration nullable já aplicada via `prisma db push --skip-generate`; 2ª (NOT NULL após backfill) será criada quando o pipeline cloud existir. Comentário no schema explica.
- **S1B.2** — `prisma/seed.ts` ganhou função `seedDefaultRoles` (idempotente via `upsert`) que insere os 5 roles canônicos (`owner`, `admin`, `manager`, `operator`, `viewer`). Re-execução = no-op. `seedAdminUser` original preservado.
- **S1B.3** — `src/services/aioson_com_validator.ts` (NOVO) com `validateAiosonComBearer`, `extractAiosonComToken` (aceita `aioson-com:<jwt>`, `Bearer aioson-com:<jwt>`, e `Bearer <jwt>` puro), `invalidateAiosonComCache`. Cache `Map<jwt, {user, expires_at_ms}>` com TTL=60s. Sem dependência nova.
- **S1B.4** — `src/services/aioson_play_installation_validator.ts` (NOVO — `checkInstallationOwnership` chama `GET aioson-com/api/aioson-play/installations/by-id/:id`, cache TTL=5min); `src/middleware/validate_owner_bearer.ts` (NOVO — extrai Bearer, valida via S1B.3, confirma ownership, popula `req.aiosonOwner`); `src/actions/AdminBindingAction.ts` (NOVO — `upsertAdminBinding` idempotente em transação, `isValidAppSlug` regex kebab-case, `isValidAcceptedRoles` rejeita `owner`); `src/routes/admin-bindings.ts` (NOVO — POST com Zod). Mount em `src/app.ts` em `/api/auth/admin/bindings`.

Smoke-test executado (e cleanup feito): `upsertAdminBinding` chamado 2x com mesma `(aioson_play_id, app_slug)` → 1ª `created=true`, 2ª `created=false` mesmo `binding_id`. Helpers de validação retornam o esperado pra cada caso.

`tsc --noEmit -p tsconfig.server.json` limpo. `tsconfig.server.json` ganhou `src/services/**/*` e `src/middleware/**/*` no `include`.

## Pendências

- ~~**S1B.5** (TokenRevocation): entregue~~ — modelo no schema, `revokeUserTokens` + `isUserRevoked` + cleanup job 1h (`TokenRevocationAction.ts`), integração em `verifyAccessToken` (`AuthAction.ts`), cache + poller federation (`revocation-cache.ts` + `revocation_poller.ts`). Callers em `RbacAction`, `routes/rbac.ts`, `routes/admin.ts`.
- ~~**Git**: resolvido~~ — repo inicializado, 14 commits no main (desde `390bbec first commit` até `7c4e4a9 test(federation)`). Inclui SDK, federation, RBAC, auth slices A–E.

## Phase 6 — sdk-embedded-auth (2026-05-25)

`@aioson/auth-sdk` ganhou 4ª entry `./embedded` com modo EMBEDDED=true (auth roda dentro do app, sem serviço externo).

**Arquivos criados em `sdk/src/embedded/`:**
- `types.ts` — `PrismaClientLike`, entity types, config types
- `schema.ts` — CREATE TABLE IF NOT EXISTS para 7 tabelas `aioson_auth_*` (sqlite/pg/mysql)
- `migrate.ts` — `runEmbeddedMigrations()` + `detectProvider()` + conflict detection
- `auth-crypto.ts` — JWT HS256 (zero deps), bcryptjs lazy-load, token gen
- `queries.ts` — Raw SQL CRUD multi-provider
- `handlers.ts` — Express Router: login, refresh, logout, me, password-reset/*
- `bootstrap.ts` — 1ª conta admin idempotente
- `revocation-checker.ts` — Cache 5s + iat-based check
- `backend.ts` — `createEmbeddedBackend()` facade (AC-SE-01)
- `index.ts` — Re-exports

**Arquivos modificados:**
- `sdk/src/express/index.ts` — dual-mode: `jwtSecret` → embedded, senão → service-mode
- `sdk/src/client.ts` — `embedded: true` → `baseUrl` = `location.origin`
- `sdk/src/types.ts` — `baseUrl` opcional, campo `embedded`
- `sdk/tsup.config.ts` + `sdk/package.json` — entry `./embedded`, bcryptjs peer dep

**Validações:** `tsc --noEmit` limpo, `tsup` build ok, 25/25 smoke tests, benchmarks passam (requireAuth p99=0.072ms, bcrypt p99=297ms bcryptjs).

## Próximo passo concreto

Voltar pra `aioson-play-online` para consumir `@aioson/auth-sdk/embedded` na próxima phase do plano. Gate S1B.4 do aioson-play já desbloqueado.

## Histórico anterior (lane antiga)

A feature anterior `manual-integracao` (Fase 5 do plano `aioson-auth/manifest.md`) foi concluída em 2026-04-12. Estado preservado em git history.
