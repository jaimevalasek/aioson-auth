# Fase 5: Documentação e Manual de Integração

## Escopo
Escrever a documentação oficial para consumo do `aioson-auth`. Como os desenvolvedores de outros sistemas no AIOSON Play (ex: "Farmácia") vão chamar o sistema, validar rotas e montar interfaces?

## Entregável
- Arquivo Markdown estruturado (ex: `docs/integration-manual.md`) ou JSON documentando o esquema para geração de um site estático no ecossistema AIOSON.

## Conteúdo Obrigatório (ACs)
1. Como instalar e declarar a dependência do `aioson-auth` no manifesto do app consumidor.
2. Instruções sobre como desenhar a interface de Login no app e para qual endpoint enviar o POST.
3. Exemplo de código mostrando um middleware (Express) ou Hook (React) protegendo rotas e componentes caso a sessão não exista.
4. Exemplo de como usar os utilitários RBAC (ex: checar se `user.hasPermission('delete_users')`).
5. Descrição clara de que o app não precisa criar tabelas próprias para auth, e que a responsabilidade do Schema dinâmico é do `aioson-auth`.

## Fontes de referência desta fase
- PRD: Seção `Artefatos Adicionais Requeridos`.
