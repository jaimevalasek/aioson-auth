---
prd: prd.md
date: 2026-04-12
round: 1
sizing_decision: external_plan (Score: 15)
---

# Registro de Enriquecimento: AIOSON Auth

## Fontes usadas
- Descrição direta do usuário sobre a arquitetura do AIOSON Play (apps vinculados, central de configurações globais, toggles para módulos e migrações isoladas por app).

## Melhorias aplicadas
- **Escopo e Visão Reescritos**: Refletindo a arquitetura de "Serviço Base" do ecossistema AIOSON Play, com a responsabilidade de executar as migrations direto no banco de cada app.
- **Painel de Vínculo e Configuração**: Adicionados como fluxos obrigatórios a criação de vínculos com apps instalados e a configuração global.
- **Módulos Opcionais (Toggles)**: O RBAC e o 2FA saíram de "fora do escopo/desejável" e agora são opções habilitáveis via interface de vínculo.
- **Manual de Integração**: Adicionada a obrigatoriedade de gerar um documento ou artefato de manual (`auth-integration-manual.md`) orientando os desenvolvedores de outros apps (como o projeto "farmácia") sobre como consumir este pacote.

## Decisão de Sizing
**Score Calculado:** 15 (Plano Externo Necessário)
- **Entidades (>3):** Users, Sessions, Roles, Permissions, App Bindings, Global Settings (+3)
- **Fases (>1):** UI/Config Global, Motor de Vínculo/Migrations, Core Auth API, Módulos 2FA/RBAC (+6)
- **Integrações:** Google, GitHub, SMTP (+3)
- **Fluxos (>3):** Cadastro, Login, 2FA, Vínculo, Configuração (+2)
- **Complexidade AC:** Migrações dinâmicas de schemas (+1)
