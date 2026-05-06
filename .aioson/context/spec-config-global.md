---
feature: config-global
status: in_progress
started: 2026-04-12
spec_version: 1
phase_gates:
  requirements: approved
  design: pending
  plan: pending
last_checkpoint: null
pending_review: []
---

# Spec — Painel de Configurações Globais

## O que foi construído
- Estrutura base do projeto (Node.js + Express + Prisma + React + Vite)
- `GlobalSettings` model (Prisma/SQLite)
- API `GET/POST /api/auth/settings` com upsert
- Criptografia AES-256-GCM para secrets
- Painel React (`/auth/settings`) com formulário de OAuth + SMTP
- Build funcional (server + client)

## Entidades adicionadas
### GlobalSettings
| Campo | Tipo | Nulável | Restrições |
|-------|------|---------|------------|
| id | string PK | não | UUID ou CUID |
| google_client_id | string | sim | |
| google_client_secret | string | sim | |
| github_client_id | string | sim | |
| github_client_secret | string | sim | |
| smtp_host | string | sim | |
| smtp_port | int | sim | |
| smtp_user | string | sim | |
| smtp_pass | string | sim | |
| smtp_from_email | string | sim | |
| created_at | timestamp | não | default now() |
| updated_at | timestamp | não | on update now() |

## Decisões tomadas
- [2026-04-12] Banco SQLite Local: Utilizar a própria instância do `aioson-auth` (com SQLite + Prisma) para salvar essas configurações.
- [2026-04-12] Criptografia Opcional/Mandatória: Chaves sensíveis serão armazenadas criptografadas para mitigar vazamentos do banco.

## Casos extremos tratados
- Tratamento para falta de chave mestra de criptografia, gerando falha segura.

## Dependências
- Lê: Nenhuma.
- Escreve: Tabela `GlobalSettings`.

## Notas
O desenvolvedor deve implementar a lógica de singleton (upsert usando um ID fixo ou pegando o primeiro (e único) registro da tabela).
