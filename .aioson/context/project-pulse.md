---
last_updated: 2026-06-24T01:15:50-03:00
last_agent: deyvin
active_feature: aioson-auth-rbac-dashboard
active_work: "Tela Perfis Globais melhorada: modal multi-seleção por checkbox, sem reload após associar/remover permissões, e apps sem permissões ficam ocultos"
blockers: none
next_recommendation: "Validar visualmente em /auth/bindings/:bindingId/roles; depois evoluir manifesto JSON de gates/policies para apps declararem capabilities"
---

# Project Pulse

## Status

- **Last agent:** @deyvin
- **Active feature:** aioson-auth-rbac-dashboard
- **Active work:** tela Perfis Globais melhorada para associação em lote e sem reload visual
- **Next:** validar visualmente `/auth/bindings/:bindingId/roles`; depois evoluir manifesto JSON de gates/policies

## Recent Activity

- 2026-06-24 @deyvin → aioson-auth-rbac-dashboard: melhorada UX de `Perfis Globais`. Apps sem catálogo de permissões não aparecem nos blocos de perfil; botão `Adicionar` mostra apenas permissões ainda não associadas; modal virou checklist com `Selecionar todas` e confirmação em lote; associar/remover permissões atualiza `rolePerms` localmente sem chamar `loadData`, evitando scroll/reload da página. Build PASS; Play reiniciado e endpoints RBAC em `:3001` OK.
- 2026-06-24 @deyvin → aioson-auth-rbac-dashboard: fechado fluxo app → auth para permissões. `registerBindingPermissions` mantém o merge legado em `AppBinding.system_permissions`, mas agora também faz `upsert` idempotente em `BindingPermission`, que é a tabela usada pela UI de Permissões/Perfis e pela agregação de permissions no JWT. Smoke com binding temporário: primeira chamada `register-permissions` adicionou 2 permissões visíveis em `/api/auth/:bindingId/rbac/permissions`; segunda chamada retornou `added=0` e manteve 2 rows sem duplicar. Verificações: `tsc -p tsconfig.server.json --noEmit` PASS; `npm run build` PASS; Play reiniciado e `GET /health` em `:3001` PASS.
- 2026-06-24 @deyvin → aioson-auth-rbac-dashboard: implementado bloco `Controle de acesso` em `/auth/dashboard` com seletor de vínculo RBAC, cards `Operadores`/`Usuários`/`Perfis`/`Permissões`, toolbar com atalhos e ações no detalhe do app selecionado. `AuthLayout` agora aceita `onBack` e expõe link `Acesso`; `RbacRolesPage` corrigido para `/api/auth/rbac/*` nas operações de perfil/permissão. Verificações: `npm run build` PASS; `tsc -p tsconfig.server.json --noEmit` PASS; `tsc -p tsconfig.client.json --noEmit` segue bloqueado por erros pré-existentes em `SettingsPage.tsx` e declaração CSS; smoke em `127.0.0.1:3001` PASS (`/health`, bindings, roles, permissions, role-permissions e `/auth/dashboard` 200). Play reiniciado e service ativo em `:3001`.
- 2026-06-24 @deyvin → aioson-auth-rbac-dashboard: confirmado que o backend tem RBAC por vínculo (`GlobalUser`, `Role`, `BindingPermission`, `RolePermission`, `UserRole`) e que as telas `/auth/bindings/:bindingId/users|roles|permissions` existem, mas não são descobríveis pelo dashboard/nav. Serviço em `:3001` validado com 2 bindings RBAC, 6 roles e 2 permissions por binding. Achado técnico: `RbacRolesPage` chama parte das ações em `/api/rbac/*`, enquanto o router está montado em `/api/auth`; GET errado cai no `index.html` do SPA.
- 2026-06-24 @deyvin → aioson-auth-prisma-client-stale: `package.json` ajustado para `npm run build` executar `npm run db:generate` antes de `build:server`/`build:client`, evitando Prisma Client stale exigindo `prisma://` em runtime SQLite. Verificações: `npm run build` PASS; Play reiniciado; `GET /health` 200 e `POST /api/admin/login` 200 em `127.0.0.1:3001`.
- 2026-05-30 @dev → jetstream-sdk-onda-1: Slice 1 entregue: core neutro + login delegando ao core (D1 provado); bug SSO StorageKey corrigido; tsc verde, smoke 25/25
- 2026-05-30 @dev → jetstream-sdk-onda-1: Slice 2: 6 flows migrados ao core + signupCore (D2, first-user=admin); adapter Express vira fino; entry ./core publica; 40/40 testes
- 2026-05-30 @dev → jetstream-sdk-onda-1: Slice 3: adapter ./next completo (factory, route-handler Web-puro, middleware, server helpers) + mode.ts; next como peer opcional; 50/50 testes
