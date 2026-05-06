# Fase 3: Core Auth API e Autenticação Tradicional

## Escopo
A API principal que os apps consumidores utilizarão para realizar login, cadastro, recuperação de senhas e autenticação OAuth. Esta API deve respeitar as configurações globais (SMTP, chaves OAuth) e ler/gravar na base de dados correta do app que está originando a requisição.

## Entidades
- `User` (E-mail, Password Hash, Verificado)
- `Session` (Token, Validade)
- `RecoveryToken` (Códigos de verificação / esqueci a senha)

## Critérios de Aceitação (ACs)
1. Deve existir um endpoint de Cadastro (`/api/auth/register`) que crie um `User` no estado não verificado e dispare um e-mail de confirmação usando a configuração global SMTP.
2. Deve existir um endpoint de Login com E-mail/Senha que valide hashes e gere uma Sessão (JWT ou Token em banco).
3. Deve existir fluxo OAuth (Google/GitHub) redirecionando para os provedores corretos usando as configurações globais.
4. O app consumidor deve ser capaz de chamar endpoints (`/api/auth/me` ou `/api/auth/validate`) para conferir se um token passado é válido.

## Notas para o @dev e @qa
Lembrar que o serviço precisa identificar de **qual app** veio a requisição para saber em qual banco de dados realizar a operação de leitura/escrita do usuário.

## Fontes de referência desta fase
- PRD: Seção `Autenticação Tradicional & Cadastro` e `Login Social (OAuth)`.
