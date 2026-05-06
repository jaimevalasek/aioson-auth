---
project_name: "aioson-auth"
project_type: "web_app"
profile: "developer"
framework: "Node.js + Prisma"
framework_installed: false
classification: "SMALL"
conversation_language: "pt-BR"
design_skill: "warm-craft-ui"
test_runner: ""
web3_enabled: false
web3_networks: ""
contract_framework: ""
wallet_provider: ""
indexer: ""
rpc_provider: ""
aioson_version: "1.7.2"
generated_at: "2026-04-12T10:00:00Z"
---

# Contexto do Projeto

## Stack
- Backend: Node.js (Express ou Fastify)
- Frontend: React.js + Vite
- Banco de dados: PostgreSQL (Prisma ORM)
- Auth: JWT, Refresh Tokens, RBAC
- UI/UX: Tailwind CSS + shadcn/ui

## Serviços
- Filas: 
- Storage: 
- WebSockets: 
- Email: Transacional (Postmark/SendGrid)
- Pagamentos: 
- Cache: Redis (recomendado para tokens)
- Busca: 

## Web3
- Habilitado: false
- Redes: 
- Framework de contrato: 
- Provedor de carteira: 
- Indexer: 
- Provedor RPC: 

## Comandos de instalação
`npx create-vite@latest frontend --template react-ts`
`npm init -y`
`npm install prisma @prisma/client`

## Notas
- O projeto `aioson-auth` é o core de autenticação para o ecossistema `aioson-play`.
- RBAC (Role-Based Access Control) é um requisito central.

## Convenções
- Idioma: pt-BR
- Idioma dos comentários de código: Inglês Técnico
- Nomenclatura DB: snake_case
- Nomenclatura JS/TS: camelCase
