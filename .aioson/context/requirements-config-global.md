# Requirements — AIOSON Auth (Fase 1: Painel de Configurações Globais)

## Resumo
Criar o painel administrativo dentro do ecossistema AIOSON Play para o `aioson-auth`. Este painel será a central onde o administrador definirá as chaves secretas dos provedores OAuth (Google, GitHub) e configurações SMTP/Resend que servirão a todos os apps vinculados. Os dados sensíveis serão salvos de forma segura no banco SQLite interno do próprio pacote `aioson-auth`.

## Novas Entidades e Campos

### GlobalSettings
Armazena configurações globais do pacote. Optaremos por colunas fixas de configuração para tipagem forte e validação via Prisma.

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

*Nota: Senhas e Secrets (google_client_secret, github_client_secret, smtp_pass) devem ser criptografados na aplicação antes de persistir no banco de dados SQLite.*

## Adições de Migration
1. Criar a tabela `GlobalSettings` no banco de dados interno do pacote `aioson-auth` contendo os campos listados. A aplicação deve garantir que exista no máximo uma (1) linha nesta tabela (Padrão Singleton).

## Regras de Negócio
- `REQ-config-global-01`: **Singleton de Configuração**: O sistema deve garantir que exista apenas um registro de `GlobalSettings`. Ao salvar configurações, deve atualizar o registro existente ou criar o primeiro se não existir.
- `REQ-config-global-02`: **Criptografia de Secrets**: Antes de persistir `google_client_secret`, `github_client_secret` e `smtp_pass` no SQLite, o backend deve criptografar os valores usando uma chave mestra. Ao ler para uso interno da aplicação, deve descriptografar.
- `REQ-config-global-03`: **Acesso Restrito**: As rotas de leitura e gravação das configurações globais (`/api/auth/settings`) só podem ser acessadas pela interface de painel (e não por usuários dos apps consumidores). A API não deve retornar os valores descriptografados dos campos sensíveis para a interface do painel (apenas os campos públicos).

## Critérios de Aceite
- `AC-config-global-01`: O administrador acessa a interface de configurações globais e visualiza os campos de OAuth e SMTP vazios (ou preenchidos se já salvos no passado).
- `AC-config-global-02`: O administrador preenche as credenciais, clica em "Salvar" e os dados são persistidos no banco com criptografia nos campos sensíveis. Uma mensagem de sucesso é mostrada.
- `AC-config-global-03`: Quando a página é recarregada, os secrets vêm mascarados ou omitidos do Frontend, para não vazar informações sensíveis na interface, mas os Client IDs e SMTP Host aparecem.
- `AC-config-global-04`: Se as configurações já existiam, submeter o formulário atualiza o registro único existente e não cria um novo.

## Casos Extremos e Modos de Falha
- **Falta de Chave de Criptografia:** Se o backend tentar criptografar ou descriptografar sem uma chave mestra (variável de ambiente ausente no ambiente do AIOSON Play), o sistema deve recusar a inicialização do módulo ou retornar um log claro de erro impedindo a gravação insegura.

## Fora do Escopo Desta Feature
- Teste real de disparo de e-mail SMTP (ficará para a fase de APIs).
- Vínculo de apps.
