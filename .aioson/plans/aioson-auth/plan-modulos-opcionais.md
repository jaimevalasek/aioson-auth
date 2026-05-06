# Fase 4: Módulos Opcionais (RBAC e 2FA)

## Escopo
Estender a Core API de Auth (Fase 3) para suportar as regras de Autenticação em Dois Fatores (Google Authenticator / TOTP) e Controle de Acesso Baseado em Papéis (Roles/Permissions), condicionado aos *toggles* definidos no Vínculo do App (Fase 2).

## Entidades
- Extensão do `User` (Segredo TOTP).
- `Role`, `Permission`, `UserRole`, `RolePermission`.

## Critérios de Aceitação (ACs)
1. **2FA:** Se o app tiver `enable_2fa` ativo, o login não libera a Sessão imediatamente. O usuário recebe um token temporário, é desafiado a informar o código TOTP de 6 dígitos, e apenas ao validar o código a Sessão final é criada. Endpoint para o usuário ativar 2FA gerando um QR Code também é necessário.
2. **RBAC:** Se o app tiver `enable_rbac` ativo, devem existir endpoints para o administrador do app criar Roles, atribuir Permissions e vincular Usuários a essas Roles. O endpoint `/api/auth/me` (validação de token) deve passar a incluir as permissões e papéis do usuário no payload.
3. Se um app tentar usar rotas de 2FA ou RBAC mas os toggles correspondentes estiverem desligados no seu vínculo, a API deve retornar `403 Forbidden` ou erro claro.

## Fontes de referência desta fase
- PRD: Seção `Módulos Ativáveis por App (Toggles)`.
