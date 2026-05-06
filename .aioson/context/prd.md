---
updated_at: 2026-04-12
---

# PRD — AIOSON Auth

## Visão
Um sistema de autenticação completo e autônomo, desenhado para atuar como um "serviço base" (app oficial) dentro do ecossistema AIOSON Play. Ele gerencia autenticação, autorização (RBAC) e segurança (2FA) de forma centralizada. Aplicativos (sistemas consumidores) instalados no AIOSON Play podem se vincular a este serviço, permitindo que cada app tenha seu próprio controle de acesso sem precisar recriar a roda, com as migrações de banco sendo executadas diretamente no banco de dados isolado de cada app consumidor.

## Problema
Aplicativos criados para o AIOSON Play (como um sistema de "Farmácia") precisam de controle de acesso avançado. Recriar fluxos de login, recuperação de senha, papéis (roles) e 2FA para cada app gera retrabalho, inconsistências e falhas de segurança. A configuração global de chaves OAuth (Google/GitHub) e SMTP não deveria ser repetida por cada sistema.

## Usuários
- **Administrador do AIOSON Play**: Instala o `aioson-auth` e configura as integrações globais (chaves do Google, GitHub, SMTP) em um painel central.
- **Desenvolvedor / Sistema Consumidor**: Vincula seu app ao serviço `aioson-auth` via UI, definindo quais módulos (2FA, RBAC) quer ativar. Segue um manual padronizado para proteger suas rotas.
- **Usuário Final do App**: Experimenta um login seguro, fluido e unificado, com suporte a MFA e recuperação de senha.

## Escopo do MVP

### Obrigatório 🔴
- **Painel de Configuração Global**: Interface no AIOSON Play para cadastrar chaves de provedores OAuth2 (Google/GitHub) e credenciais de e-mail (SMTP/Resend) globalmente.
- **Painel de Vínculo de Apps**: Interface onde o administrador seleciona um app instalado (ex: "Farmácia") e cria uma configuração de autenticação para ele.
- **Módulos Ativáveis por App (Toggles)**: Ao vincular um app, o administrador define se o app usará:
  - `enable_2fa`: Ativa a exigência de Google Authenticator / TOTP.
  - `enable_rbac`: Ativa as tabelas e lógicas de Roles e Permissions.
- **Motor de Migração Isolado**: Quando um app é vinculado, o `aioson-auth` conecta no banco de dados exclusivo desse app (seja SQLite local ou MySQL remoto via ORM) e roda as migrations necessárias (`auth_users`, `auth_sessions`, e opcionalmente `auth_roles`, `auth_permissions`).
- **Autenticação Tradicional & Cadastro**: Login com E-mail/Senha (hashing seguro), cadastro com verificação de e-mail e fluxo de "Esqueci a senha".
- **Login Social (OAuth)**: Integração padronizada usando as chaves globais.
- **API/Comandos IPC**: Exposição de endpoints ou comandos Tauri para que os apps consumidores validem tokens e chequem permissões.

### Fora do escopo
- Autenticação corporativa legada (SAML, LDAP) nesta versão.
- Interface engessada injetada nos apps: A UI de login final será responsabilidade do app (que consome a API) ou entregue via componentes headless.

## Fluxos de usuário

### Configuração e Vínculo (Admin)
1. O admin acessa a página de configurações do `aioson-auth` no AIOSON Play.
2. Preenche as chaves globais (Google OAuth, SMTP).
3. Clica em "Novo Vínculo de App" e seleciona o app destino no select.
4. Liga os toggles desejados (ex: Ativar 2FA: Sim, Ativar RBAC: Sim).
5. O `aioson-auth` se conecta ao banco do app selecionado e cria as tabelas de autenticação.

### Cadastro e Login (Usuário do App)
1. Usuário acessa o app consumidor e realiza o cadastro.
2. O app dispara a requisição para o serviço `aioson-auth`.
3. O serviço grava o usuário na tabela `auth_users` do banco do próprio app e dispara o e-mail via configuração global.
4. Após o login, se o app tiver o toggle `enable_2fa` ativo, o serviço exige o token TOTP antes de liberar a sessão.

## Artefatos Adicionais Requeridos
- **Manual de Integração**: Geração de um documento técnico (MD/JSON) documentando como os desenvolvedores de apps no AIOSON Play devem consumir as APIs, validar tokens e checar permissões do serviço `aioson-auth`.

## Specify depth
- Classification: MEDIUM
- Specify depth applied: standard
- Ambiguidades que DEVEM ser resolvidas antes do @analyst prosseguir:
  - Formato exato da comunicação entre o serviço `aioson-auth` e os apps consumidores (REST via sidecar, IPC Tauri puro, ou via banco de dados compartilhado de sessões).
