---
project: AIOSON Auth
slug: aioson-auth
status: approved
---

# Delivery Plan Manifest: AIOSON Auth

## Resumo
Este plano estrutura a implementação do serviço base `aioson-auth`, focado em fornecer capacidades globais de autenticação, vínculos de apps consumidores e injeção dinâmica de migrações (incluindo módulos opcionais de 2FA e RBAC).

## Fases
- [x] **Fase 1:** Painel de Configurações Globais (`plan-config-global.md`) - Interface para chaves OAuth (Google/GitHub) e SMTP.
- [x] **Fase 2:** Vínculo de Apps e Motor de Migrações (`plan-motor-migracoes.md`) - Conexão ao banco de apps instalados e execução dinâmica das migrations (`users`, `sessions`).
- [x] **Fase 3:** Core Auth API e Autenticação Tradicional (`plan-core-auth.md`) - Rotas e lógicas de Login, Cadastro, Recuperação de Senha e OAuth.
- [x] **Fase 4:** Módulos Opcionais: RBAC e 2FA (`plan-modulos-opcionais.md`) - Implementação das lógicas baseadas nos *toggles* definidos no vínculo.
- [x] **Fase 5:** Documentação e Manual de Integração (`plan-manual-integracao.md`) - Artefato técnico orientando devs de apps (ex: "Farmácia") a consumir as APIs/hooks do pacote.

## Decisões Pré-tomadas (Finais)
- **Toggles Opcionais:** As regras de negócio para `2FA` e `RBAC` só funcionarão se os *toggles* correspondentes estiverem ativos na configuração do vínculo do app no painel global.
- **Isolamento de Banco:** As migrações não ocorrem na base central. Elas são injetadas e rodadas diretamente na base SQLite/MySQL exclusiva de cada app consumidor usando o ORM Prisma.

## Fontes Globais
- PRD do Projeto (`.aioson/context/prd.md`)
- Entendimento de arquitetura AIOSON Play (contexto gerado pelo usuário).
