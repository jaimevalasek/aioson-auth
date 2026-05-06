# Fase 2: Vínculo de Apps e Motor de Migrações

## Escopo
Construir o motor central do pacote: a capacidade de vincular um aplicativo consumidor (ex: "Farmácia") ao serviço de Auth e executar dinamicamente as migrações (tabelas de auth) diretamente no banco de dados isolado desse app, habilitando as colunas extras (2FA, RBAC) se os toggles forem marcados.

## Entidades
- `AppBinding` (ID do app, `enable_2fa`, `enable_rbac`).
- Esquemas Dinâmicos (Users, Sessions, e opcionalmente Roles, Permissions).

## Critérios de Aceitação (ACs)
1. O administrador acessa a página de "Vínculos" e clica em "Novo Vínculo".
2. Um `select` exibe os apps atualmente instalados/conhecidos no ambiente AIOSON Play.
3. O administrador escolhe o app e liga ou desliga os toggles `Ativar 2FA` e `Ativar RBAC`.
4. Ao confirmar, o `aioson-auth` resolve a URL/caminho do banco de dados do app selecionado.
5. O `aioson-auth` aplica/executa as migrações do Prisma no banco do app alvo, criando as tabelas base (`users`, `sessions`) e, se ativadas, as tabelas opcionais (`roles`, `permissions`, colunas TOTP).

## Notas para o @dev
A dificuldade técnica aqui está em usar o Prisma programaticamente contra URLs de banco de dados dinâmicas (cada app tem a sua). Pesquisar a melhor estratégia (ex: gerar um client Prisma dinâmico ou usar a engine de migração com URLs em tempo de execução).

## Fontes de referência desta fase
- PRD: Seção `Painel de Vínculo de Apps` e `Motor de Migração Isolado`.
