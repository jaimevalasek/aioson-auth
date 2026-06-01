---
last_updated: 2026-05-30
active_feature: jetstream-sdk-onda-1
active_phase: 1
next_step: "Slice 4 CLI scaffolder: sdk/src/cli/ com bin.ts (parse init|migrate), detect.ts (Next App Router + Prisma + DB provider), inject.ts (copia nao-destrutiva, .new, sha256), lock.ts (.aioson-auth.lock), migrate-cmd.ts (wrapper runEmbeddedMigrations via script do app), templates/ (paginas, lib/auth, middleware, .env.example). Entry ./cli + bin no package.json."
last_spec_version: 1
status: in_progress
---

# Dev State

**Feature:** jetstream-sdk-onda-1
**Phase:** 1
**Status:** in_progress
**Next step:** Slice 4 CLI scaffolder: sdk/src/cli/ com bin.ts (parse init|migrate), detect.ts (Next App Router + Prisma + DB provider), inject.ts (copia nao-destrutiva, .new, sha256), lock.ts (.aioson-auth.lock), migrate-cmd.ts (wrapper runEmbeddedMigrations via script do app), templates/ (paginas, lib/auth, middleware, .env.example). Entry ./cli + bin no package.json.

## Context package

1. project.context.md
2. spec-jetstream-sdk-onda-1.md
3. requirements-jetstream-sdk-onda-1.md
4. architecture.md

## History

- 2026-05-30: phase 1 — Construir adapter ./next reusando os primitivos do engine embedded (Route Handler Web Request/Response, cookies via next/headers com semantica identica a handlers.ts), comecando pelo fluxo de login standalone.
- 2026-05-30: phase 1 — Slice 2: migrar refresh/logout/me/password-reset para core/flows (delegacao como login); depois signupCore (gap D2, bootstrap-aware via countUsers); depois iniciar adapter ./next (adicionar next como devDep do sdk para tsc).
- 2026-05-30: phase 1 — Slice 3 adapter ./next: 1) adicionar next como devDependency do sdk p/ tsc; 2) sdk/src/next/ factory createNextAuth resolvendo modo via AIOSON_PLAY_HOST, route-handler traduzindo AuthResult para Web Response + cookies de next/headers, middleware withAuth, server helpers auth/requireAuth/getCurrentUser/getServerSession; 3) entry ./next no tsup e package.json com next external.
- 2026-05-30: phase 1 — Slice 4 CLI scaffolder: sdk/src/cli/ com bin.ts (parse init|migrate), detect.ts (Next App Router + Prisma + DB provider), inject.ts (copia nao-destrutiva, .new, sha256), lock.ts (.aioson-auth.lock), migrate-cmd.ts (wrapper runEmbeddedMigrations via script do app), templates/ (paginas, lib/auth, middleware, .env.example). Entry ./cli + bin no package.json.
