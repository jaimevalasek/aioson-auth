# AIOSON Auth — Manual de Integração para Desenvolvedores de Apps

## Visão Geral

O `aioson-auth` é um serviço de autenticação centralizado para o ecossistema AIOSON Play. Cada app consumidor se **vincula** ao serviço e ganha autenticação completa (login, 2FA, RBAC) sem recriar nada.

**Modelo de dados:**
- **Usuários** são globais — um usuário existe uma vez no sistema e pode ter acesso a todos os apps.
- **Perfis (Roles)** são globais — criados uma vez, reutilizados em todos os apps.
- **Permissões** são por-app — cada sistema registra as suas próprias permissões.
- **Mapeamento** perfil↔permissão é por-app — o que significa "Admin" é definido **por cada app**.
- **Atribuição** perfil↔usuário é por-app — o mesmo usuário pode ser Admin num app e Atendente em outro.

---

## Endereço Base

```
http://localhost:3001/api/auth
```

> Substitua pelo host de produção em ambientes reais.

---

## Glossário

| Termo | Significado |
|-------|-------------|
| `bindingId` | UUID do vínculo entre o app consumidor e o aioson-auth (criado pelo admin) |
| `connection_name` | Nome da conexão de banco no AIOSON Play que aponta para o banco do app |
| `role` | Perfil global — reutilizável entre todos os apps |
| `permission` | Permissão específica de um app (formato `recurso:acao`) |

---

## 1 — Registro de Permissões (Passo Obligatório por App)

Quando seu app é desenvolvido, você define o **manifesto de permissões** — a lista de todas as ações que o sistema pode controlar.

Isso é feito via **merge**: quando o app é instalado/vinculado pela primeira vez, ele registra suas permissões. Em upgrades, novas permissões são **adicionadas** às já existentes (nunca substituídas).

### Manifesto de Permissões

O manifesto é um array de strings no formato `recurso:acao`:

```json
[
  "users:create",
  "users:read",
  "users:update",
  "users:delete",
  "orders:create",
  "orders:read",
  "orders:update",
  "orders:delete",
  "products:create",
  "products:read",
  "products:update",
  "products:delete",
  "reports:read",
  "reports:export",
  "settings:read",
  "settings:write"
]
```

### Registrando Permissões

```
POST /api/auth/:bindingId/register-permissions
Content-Type: application/json

{
  "permissions": [
    "users:create",
    "users:read",
    "orders:create",
    "orders:read",
    "orders:update",
    "orders:delete"
  ]
}
```

**Resposta (200):**
```json
{
  "added": 6,
  "merged": true
}
```

> `added: 0` significa que todas as permissões já existiam (upgrade idempotente).

O app deve fazer isso **automaticamente** ao ser vinculado pela primeira vez ou ao fazer upgrade. O admin do app pode ver e gerenciar as permissões em **Perfis → Permissões por App** no painel do aioson-auth.

---

## 2 — Autenticação Tradicional

### 2.1 Cadastro

```
POST /api/auth/:bindingId/register
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senhaForte123"
}
```

**Resposta (201):**
```json
{
  "userId": "cuid-xxx",
  "verified": false
}
```

### 2.2 Login

```
POST /api/auth/:bindingId/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senhaForte123"
}
```

**Resposta (200):**
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "uuid-do-refresh-token",
  "user": {
    "id": "cuid-xxx",
    "email": "usuario@exemplo.com",
    "name": ""
  }
}
```

### 2.3 Renovar Token (Refresh)

```
POST /api/auth/:bindingId/refresh
Content-Type: application/json

{
  "refreshToken": "uuid-do-refresh-token"
}
```

**Resposta (200):**
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "novo-uuid",
  "user": { "id": "...", "email": "...", "name": "" }
}
```

### 2.4 Logout

```
POST /api/auth/:bindingId/logout
Content-Type: application/json

{
  "refreshToken": "uuid-do-refresh-token"
}
```

Resposta: `204 No Content`

### 2.5 Esqueci a Senha

```
POST /api/auth/:bindingId/forgot-password
Content-Type: application/json

{
  "email": "usuario@exemplo.com"
}
```

**Resposta (200):** `{ "sent": true }`

> O link de recuperação é logado no servidor ou enviado por SMTP se configurado.

### 2.6 Redefinir Senha

```
POST /api/auth/:bindingId/reset-password
Content-Type: application/json

{
  "token": "uuid-do-token-de-recuperacao",
  "newPassword": "novaSenhaForte123"
}
```

**Resposta (200):** `{ "success": true }`

---

## 3 — Login Social (OAuth)

```
POST /api/auth/:bindingId/oauth
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "provider": "google",
  "providerId": "google-user-id"
}
```

**Resposta (200):**
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "uuid-do-refresh-token",
  "user": { "id": "...", "email": "...", "name": "" }
}
```

---

## 4 — Validação de Token

```
GET /api/auth/:bindingId/me?token=eyJhbG...
```

**Resposta (200):**
```json
{
  "sub": "cuid-xxx",
  "email": "usuario@exemplo.com"
}
```

**Resposta (401):** `{ "error": "Invalid or expired token" }`

---

## 5 — Dois Fatores (2FA)

> **Pré-requisito:** O vínculo precisa ter `enable_2fa: true`.

### 5.1 Ativar 2FA (Gerar QR Code)

```
POST /api/auth/:bindingId/2fa/setup?token=<accessToken>
```

**Resposta (200):**
```json
{
  "secret": "JBSWY3DPEHPK3PXP",
  "otpauthUrl": "otpauth://totp/aioson-auth:usuario@exemplo.com?secret=JBSWY...",
  "qrCode": "data:image/png;base64,..."
}
```

> Renderize `qrCode` em um `<img>` no frontend.

### 5.2 Verificar e Ativar

```
POST /api/auth/:bindingId/2fa/verify?token=<accessToken>
Content-Type: application/json

{
  "totpToken": "123456"
}
```

**Resposta (200):** `{ "verified": true }`

### 5.3 Desativar 2FA

```
POST /api/auth/:bindingId/2fa/disable?token=<accessToken>
```

**Resposta (200):** `{ "disabled": true }`

---

## 6 — RBAC (Perfis e Permissões)

> **Pré-requisito:** O vínculo precisa ter `enable_rbac: true`.

### 6.1 Perfis Globais (Roles)

Perfis são criados **uma vez** e reutilizados em todos os apps.

**Listar todos os perfis:**
```
GET /api/auth/:bindingId/rbac/roles
```

**Criar perfil:**
```
POST /api/auth/rbac/roles
Content-Type: application/json

{
  "name": "Admin",
  "description": "Administrador do sistema"
}
```

**Atualizar perfil:**
```
PATCH /api/auth/rbac/roles/:roleId
Content-Type: application/json

{
  "name": "Administrador",
  "description": "Descrição atualizada"
}
```

**Remover perfil:**
```
DELETE /api/auth/rbac/roles/:roleId
```

> A remoção deleta automaticamente todas as associações de perfil com usuários e permissões.

---

### 6.2 Permissões por App

Cada app tem suas próprias permissões (registradas via `register-permissions` ou criadas manualmente).

**Listar permissões de um app:**
```
GET /api/auth/:bindingId/rbac/permissions
```

**Criar permissão manualmente:**
```
POST /api/auth/:bindingId/rbac/permissions
Content-Type: application/json

{
  "name": "orders:create",
  "resource": "orders",
  "action": "create"
}
```

**Remover permissão:**
```
DELETE /api/auth/:bindingId/rbac/permissions/:permissionId
```

---

### 6.3 Mapear Permissões a um Perfil (por App)

Quando você atribui uma permissão a um perfil, **deve especificar para qual app** aquela permissão faz parte do perfil.

**Atribuir permissão ao perfil para um app específico:**
```
POST /api/auth/rbac/roles/:roleId/permissions
Content-Type: application/json

{
  "permissionId": "uuid-da-permissao",
  "bindingId": "uuid-do-app"
}
```

**Remover permissão do perfil para um app:**
```
DELETE /api/auth/rbac/roles/:roleId/permissions/:permissionId?bindingId=uuid-do-app
```

**Ver permissões de um perfil para um app específico:**
```
GET /api/auth/rbac/roles/:roleId/permissions?bindingId=uuid-do-app
```

**Exemplo completo:**

```bash
# 1. Criar perfil "Atendente"
curl -X POST /api/auth/rbac/roles \
  -d '{"name":"Atendente","description":"Atendente de vendas"}'

# 2. Registrar permissões do app de vendas
curl -X POST /api/auth/:bindingId/register-permissions \
  -d '{"permissions":["orders:create","orders:read","clients:read"]}'

# 3. Mapear permissões ao perfil "Atendente" no app de vendas
PERM_ID=$(curl -s /api/auth/:bindingId/rbac/permissions \
  | jq -r '.[] | select(.name=="orders:read") | .id')
curl -X POST /api/auth/rbac/roles/:roleId/permissions \
  -d "{\"permissionId\":\"$PERM_ID\",\"bindingId\":\"$BINDING_ID\"}"
```

---

### 6.4 Atribuir Perfil a Usuário (por App)

Um usuário pode ter **perfis diferentes em apps diferentes**.

**Atribuir perfil ao usuário:**
```
POST /api/auth/:bindingId/rbac/users/:userId/roles
Content-Type: application/json

{
  "roleId": "uuid-do-perfil"
}
```

**Remover perfil do usuário:**
```
DELETE /api/auth/:bindingId/rbac/users/:userId/roles/:roleId
```

**Ver perfis e permissões de um usuário num app:**
```
GET /api/auth/:bindingId/rbac/users/:userId
```

**Resposta (200):**
```json
[
  {
    "role": {
      "id": "uuid",
      "name": "Atendente",
      "description": "Atendente de vendas"
    },
    "permissions": ["orders:read", "clients:read"]
  }
]
```

---

### 6.5 Verificar Permissão em Runtime

No seu app, antes de executar uma ação protegida:

```
GET /api/auth/:bindingId/rbac/check?token=<accessToken>&permission=orders:create
```

**Resposta (200):**
```json
{
  "allowed": true
}
```

---

## 7 — Exemplo: Fluxo Completo de Configuração de um App

### Fase 1 — Instalação / Upgrade do App

Ao instalar ou fazer upgrade do seu app, registre as permissões:

```typescript
async function registerAppPermissions(bindingId: string, permissions: string[]) {
  const res = await fetch(`/api/auth/${bindingId}/register-permissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions }),
  });
  const data = await res.json();
  console.log(`Permissões registradas: ${data.added} novas`);
}
```

Exemplo de manifesto completo:
```json
[
  "users:create", "users:read", "users:update", "users:delete",
  "orders:create", "orders:read", "orders:update", "orders:delete",
  "products:create", "products:read", "products:update", "products:delete",
  "reports:read", "reports:export",
  "settings:read", "settings:write"
]
```

### Fase 2 — No Painel do aioson-auth (Admin)

O admin acessa `/auth/dashboard → Perfis Globais` e:

1. Cria os perfis: **Admin**, **Atendente**, **Gerente**, **Viewer**
2. Para cada perfil, seleciona o app e adiciona as permissões correspondentes

### Fase 3 — Atribuir Perfis aos Usuários

O admin ou gestor acessa `/auth/users` ou `/auth/bindings/:id/users` e:

1. Seleciona o usuário
2. Escolhe em qual **app** atribuir o perfil
3. Seleciona o **perfil** (ex: Atendente)
4. O usuário agora tem as permissões configuradas para aquele app

---

## 8 — Exemplo: Middleware Express (Proteção de Rotas)

```typescript
import { Request, Response, NextFunction } from 'express';

export function requireAuth(bindingId: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
      const meRes = await fetch(
        `http://localhost:3001/api/auth/${bindingId}/me?token=${token}`
      );
      if (!meRes.ok) return res.status(401).json({ error: 'Invalid token' });
      const payload = await meRes.json();
      (req as any).user = payload;
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

export function requirePermission(bindingId: string, permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
      const checkRes = await fetch(
        `http://localhost:3001/api/auth/${bindingId}/rbac/check?token=${token}&permission=${permission}`
      );
      const { allowed } = await checkRes.json();
      if (!allowed) return res.status(403).json({ error: 'Forbidden' });
      next();
    } catch {
      return res.status(403).json({ error: 'Forbidden' });
    }
  };
}

// Uso:
app.get('/api/orders',
  requireAuth('binding-id-do-app'),
  requirePermission('binding-id-do-app', 'orders:create'),
  (_req, res) => { /* criar order */ }
);
```

---

## 9 — Exemplo: Hook React (Proteção de Componentes)

```tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth(bindingId: string) {
  const [user, setUser] = useState<{ sub: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate(`/auth/${bindingId}`);
      return;
    }

    fetch(`/api/auth/${bindingId}/me?token=${token}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('accessToken');
        navigate(`/auth/${bindingId}`);
      })
      .finally(() => setLoading(false));
  }, [bindingId, navigate]);

  return { user, loading };
}

// Uso:
function ProtectedPage() {
  const { user, loading } = useAuth('binding-id-do-app');
  if (loading) return <p>Carregando...</p>;
  if (!user) return null;
  return <h1>Olá, {user.email}</h1>;
}
```

---

## 10 — Checklist de Integração

| # | Tarefa | Onde |
|---|--------|------|
| 1 | Registrar manifesto de permissões (`register-permissions`) | Ao instalar/upgrade do app |
| 2 | Fornecer ao admin a lista de permissões disponíveis | Na documentação do seu app |
| 3 | Criar os perfis globais no painel ou via API | `/auth/roles` |
| 4 | Mapear permissões de cada perfil por app | Painel → Perfis Globais |
| 5 | Atribuir perfis a usuários por app | Painel → Usuários |
| 6 | Implementar `GET /me?token=` no frontend | Login/validação |
| 7 | Implementar `GET /rbac/check?token=&permission=` antes de ações protegidas | Backend/frontend |
| 8 | Tratar erros 401 → redirecionar para login | Frontend |
| 9 | Tratar erros 403 → mostrar "acesso negado" | Frontend |

---

## 11 — Códigos de Erro Comuns

| HTTP | Erro | Significado |
|------|------|-------------|
| 400 | `"Email already registered"` | E-mail já cadastrado |
| 400 | `"Invalid credentials"` | Credenciais incorretas |
| 400 | `"Invalid or expired reset token"` | Token de recuperação inválido |
| 401 | `"Invalid or expired token"` | Token JWT inválido ou expirado |
| 401 | `"Invalid refresh token"` | Refresh token não encontrado ou expirado |
| 403 | `"2FA is not enabled for this app"` | App não tem 2FA ativado |
| 403 | `"RBAC is not enabled for this binding"` | App não tem RBAC ativado |
| 404 | `"Binding not found"` | bindingId não existe |
| 404 | `"Role not found"` | Role não existe |
