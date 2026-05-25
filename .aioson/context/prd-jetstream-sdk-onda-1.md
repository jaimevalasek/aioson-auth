---
slug: jetstream-sdk-onda-1
title: "Jetstream-pra-Node — SDK Onda 1 (Scaffolder Next.js + Ambient Detection)"
classification: MEDIUM
created_by: product
created_at: 2026-05-22
status: draft
---

# PRD — Jetstream-pra-Node: SDK Onda 1 (Scaffolder Next.js)

## Vision
Transformar `@aioson/auth-sdk` em um **scaffolder de auth completo estilo Jetstream**: `npx @aioson/auth-sdk init` instala em qualquer app Next.js (App Router) tudo que é necessário pra login/signup/forgot-password/profile com User table. O mesmo código se comporta **como cliente do auth centralizado quando rodando dentro do Play desktop**, ou **como backend standalone quando publicado online** — detecção automática por ambiente, sem o dev pensar.

## Problem
O SDK hoje (`@aioson/auth-sdk@0.2.0`) tem core + adapters React/Express, mas é um **cliente JWT**, não um **scaffolder de auth completo**. Quem cria um app Node.js precisa montar login/signup/profile + middleware + migrations à mão. Comparado com Laravel + Jetstream (1 comando dá tudo isso), Node.js fica atrás. E o ecossistema AIOSON tem 2 modos de deploy (dentro do Play / publicado via aioson-play-online) que precisam compartilhar **a mesma base de código no app**, alternando comportamento por ambiente — sem isso, dev escreveria auth duas vezes.

## Users
- **Dev criando app Next.js para o ecossistema AIOSON** — quer auth completo em 1 comando, igual `php artisan jetstream:install`.
- **`aioson-play-online`** (consumidor downstream) — instalador encontra apps que vieram com SDK scaffolded, roda migrations completas, ativa modo standalone automaticamente.
- **Play desktop** (consumidor sibling) — apps rodando dentro do Play detectam ambiente e operam em modo cliente do auth centralizado já existente.

## MVP scope (Onda 1 — Next.js App Router)

### Must-have 🔴
- **CLI scaffolder `npx @aioson/auth-sdk init`** — detecta framework target (Next.js App Router obrigatório no v1), injeta no projeto:
  - `app/(auth)/login/page.tsx`, `signup/page.tsx`, `forgot-password/page.tsx`, `reset-password/page.tsx`
  - `app/(authenticated)/profile/page.tsx`
  - `app/api/auth/[...auth]/route.ts` (Route Handler delegando pro SDK)
  - `middleware.ts` (auth middleware com detecção de ambiente)
  - `prisma/schema.prisma` adições (model `User` + `AuthSession` + `PasswordResetToken`)
  - `prisma/migrations/aioson_auth_*` (migrations idempotentes)
  - `.env.example` adições (`AIOSON_PLAY_HOST`, `JWT_SECRET`, `DATABASE_URL`)
  - `lib/auth.ts` (helpers do servidor: `auth()`, `requireAuth()`, `getCurrentUser()`)
- **UI kit React shadcn-style (copy-paste, sem dependência NPM)** — injetado como código local em `components/auth/*.tsx`, customizável pelo dev. Inicial: `LoginForm`, `SignupForm`, `ForgotPasswordForm`, `ResetPasswordForm`, `ProfileForm`.
- **Ambient detection automático em runtime** — módulo `lib/auth-mode.ts`:
  - **Modo cliente (Play desktop):** `process.env.AIOSON_PLAY_HOST` presente → SDK opera como cliente JWT contra `${AIOSON_PLAY_HOST}/api/auth/*`; migrations da User table NÃO rodam (CLI marca como skip); rotas `/login` redirecionam pro Play.
  - **Modo standalone (qualquer outro lugar):** ausência da env → SDK opera backend completo; migrations rodam; `/login` renderiza UI local; auth local.
- **Prisma migrations idempotentes cross-DB** — provider configurável (MariaDB/MySQL ou Postgres); migrations geradas pra ambos. Detecção via `DATABASE_URL` no CLI scaffolder.
- **Adapter Next.js App Router completo** — middleware `withAuth()` wrapper, server actions de login/signup/logout, `getServerSession()` helper, integração com RSC.
- **Dual-mode em um único pacote NPM** — `@aioson/auth-sdk@1.0` substitui `0.2.0`. Cliente faz `npm install` + `npx init` uma vez; o pacote contém ambos os modos. Sem fork "lite" vs "full".

### Should-have 🟡
- **Telemetria opt-in** — após `init`, cliente habilita telemetria anônima (versão, framework, modo detectado, erros de migration); ajuda manutenção da matriz de adapters.
- **Comando `npx @aioson/auth-sdk upgrade`** — detecta versão atual no projeto, propõe migration plan, aplica patches em arquivos não-modificados pelo cliente (detecta via hash inicial salvo em `.aioson-auth.lock`).

## Out of scope (entram em ondas futuras)
- **Adapters Hono, Fastify, Express App Router, SvelteKit, Remix** — Onda 4.
- **2FA TOTP completo** — Onda 2.
- **API tokens (criação, scopes, revogação)** — Onda 2.
- **Teams multi-tenant (invites, roles, ownership)** — Onda 3.
- **OAuth providers (Google, GitHub)** — Onda 2 ou 3.
- **Email transactional (signup confirmation, password reset email)** — Onda 2; v1 deixa "out-of-band" (cliente configura SMTP/Resend manualmente; SDK fornece template HTML).
- **UI kit Vue/Solid/Svelte** — Onda 5+.

## User flows

### Fluxo 1 — Scaffolding em app Next.js novo
1. Dev cria projeto: `npx create-next-app@latest meu-crm --typescript --tailwind --app`.
2. `cd meu-crm && npm install @aioson/auth-sdk`.
3. `npx @aioson/auth-sdk init`:
   - Detecta Next.js App Router (lê `next.config.*` + `app/` dir).
   - Pergunta DB target: MariaDB/MySQL ou Postgres (default = MariaDB).
   - Injeta arquivos; não sobrescreve pré-existentes (cria `.new` ao lado).
   - Cria `.aioson-auth.lock` com hashes (pra upgrade futuro saber o que foi modificado).
   - Imprime resumo: arquivos criados, próximos passos.
4. Dev roda `prisma migrate dev --name aioson_auth_init` → User table criada.
5. Dev roda `npm run dev` → `/login`, `/signup` funcionam.

### Fluxo 2 — App scaffolded executando dentro do Play desktop
1. App criado no Play via Vibe Coding `Create`; durante scaffold, `@dev` invoca `npx @aioson/auth-sdk init` se o app declara auth.
2. Play spawn-a app com env injetada: `AIOSON_PLAY_HOST=http://127.0.0.1:5310`.
3. Middleware detecta env presente → modo cliente.
4. `/login` redireciona pra `${AIOSON_PLAY_HOST}/auth/login` (Play renderiza no shell).
5. Após login, JWT volta pro app; middleware valida contra o serviço central.
6. `User` queries no app proxiam pra `${AIOSON_PLAY_HOST}/api/users/{id}` (apenas leitura; mutação é responsabilidade do Play).

### Fluxo 3 — App scaffolded sendo publicado online
1. Cliente clica "Publicar online" (fluxo aioson-play-online).
2. Wizard detecta `@aioson/auth-sdk` no `package.json` + migrations `aioson_auth_*` no Prisma → marca app como "auth-enabled, standalone-capable".
3. Instalador roda `prisma migrate deploy` na VPS — User table é criada (porque `AIOSON_PLAY_HOST` não está no env do PM2).
4. PM2 sobe app; middleware detecta ausência da env → modo standalone.
5. Primeiro acesso a `/signup` cria primeiro user admin local.
6. Auth funciona local; site self-contained; Cloudflare aponta domínio → roda.

## Acceptance criteria

| AC | Descrição |
|---|---|
| AC-JS-01 | `npm install @aioson/auth-sdk` sem warnings de peer deps em Next.js 14+/15+. |
| AC-JS-02 | `npx @aioson/auth-sdk init` em projeto Next.js App Router injeta todos os arquivos da must-have section sem sobrescrever pré-existentes. |
| AC-JS-03 | `prisma migrate dev` após `init` cria tabelas `users`, `auth_sessions`, `password_reset_tokens` com schema esperado. |
| AC-JS-04 | App com `AIOSON_PLAY_HOST=http://localhost:5310` setado → `/login` redireciona; `/api/users/me` proxia pro host. |
| AC-JS-05 | App sem `AIOSON_PLAY_HOST` → `/login` renderiza UI local; signup cria user em DB local. |
| AC-JS-06 | `init` em projeto não-Next.js sai com erro claro listando frameworks suportados. |
| AC-JS-07 | Migrations rodam idempotentemente: `prisma migrate deploy` 2× na mesma DB não corrompe estado. |
| AC-JS-08 | UI kit instalado como código local em `components/auth/`; dev edita livremente sem quebrar o SDK. |
| AC-JS-09 | `lib/auth.ts` expõe `auth()`, `requireAuth()`, `getCurrentUser()` funcionando em RSC e Server Actions. |
| AC-JS-10 | Trocar de modo (com/sem `AIOSON_PLAY_HOST`) não exige rebuild — detecção em runtime. |

## Success metrics
- **Time-to-first-login** após `init`: ≤5min pra dev experimentado Next.js (inclui `prisma migrate dev` + `npm run dev`).
- **Adoção pelo aioson-play-online:** 100% dos apps publicados via online no primeiro mês pós-Onda 1 usam este SDK.
- **Issues críticos abertos nos primeiros 30 dias:** ≤10.
- **Compat matrix:** Next.js 14, 15, 16-canary suportados via mesmo SDK.

## Open questions
- **Como Plays detectam "este app declara auth"?** Sugestão: `manifest.json` ganha `auth: { provider: "aioson-auth", version: ">=1.0" }`. Decisão cross-repo (impacta `aioson-play` + `aioson-play-online` + `aioson-com`).
- **Modo cliente: contrato exato do endpoint `/api/users/{id}` no Play** — REST simples + JWT no header; resposta JSON `{ id, email, name, avatar, role, ... }`. Decisão @architect.
- **JWT signature por modo** — cliente confia em JWT emitido pelo Play; standalone gera e assina próprio. Detalhe @architect (chaves separadas, rotação).
- **Upgrade SDK no projeto** — `npx @aioson/auth-sdk upgrade` com diff inteligente. Decisão fica pra Onda 2.
- **Conflito de migration com User table pré-existente** — sugestão: erro hard no `init` se detectar tabela `users` pré-existente. Decisão @analyst.

## Visual identity

### Design skill
N/A no SDK em si. Para projetos consumidores, `aioson-play-os-ui` é recomendação default; UI kit injetado segue convenção shadcn (Tailwind + Radix UI + lucide-react).

### UI kit aesthetic
- Componentes "headless-friendly" com Tailwind class slots — dev customiza sem tocar lógica.
- Defaults: clean, neutral, dark/light theme via Tailwind class `dark:`.
- Sem decoração — formulários focados, espaço pra logo do projeto.

### Output do CLI
- ASCII art mínimo (logo `aioson-auth`).
- Mensagens estruturadas com cores via `picocolors`.
- Resumo final lista arquivos criados + próximos passos.

## Next step
Classification: **MEDIUM** (3 users, 3+ integrações [Prisma, Next.js, npm registry], regras complexas [dual-mode detection, migrations idempotentes]).

Próximo agente: `@sheldon` para enriquecer:
- Validar contrato Play ↔ SDK em modo cliente.
- Decidir SemVer + estratégia de upgrade.
- Mapear riscos cross-framework (Next.js version drift).
- Definir telemetria minimamente útil.

Action: `/sheldon`
