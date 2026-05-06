# Fase 1: Painel de Configurações Globais

## Escopo
Criar o painel administrativo dentro do ecossistema AIOSON Play para o `aioson-auth`. Este painel será a central onde o administrador definirá as chaves secretas dos provedores OAuth (Google, GitHub) e configurações SMTP/Resend que servirão a todos os apps vinculados.

## Entidades
- `GlobalSettings` (Chaves do Google, GitHub, credenciais SMTP).

## Critérios de Aceitação (ACs)
1. O administrador deve conseguir acessar a página `/auth/settings`.
2. Deve existir um formulário com campos para `Google Client ID`, `Google Client Secret`, `GitHub Client ID`, `GitHub Secret` e Configurações SMTP.
3. Os dados devem ser salvos com segurança (preferencialmente criptografados ou usando o mecanismo de variáveis de ambiente do AIOSON Play).
4. As rotas de API para consultar essas configurações (apenas internamente pelo serviço) devem existir e retornar os valores de forma segura.

## Sequência de Desenvolvimento
1. Criar o layout da interface (Tailwind/shadcn).
2. Criar a API e os handlers para salvar/recuperar as `GlobalSettings`.
3. Integrar frontend com backend.

## Fontes de referência desta fase
- PRD: Seção `Painel de Configuração Global` e `Configuração e Vínculo (Admin)`.
