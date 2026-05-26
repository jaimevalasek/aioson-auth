import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

interface AuthUser {
  id: string;
  email: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

interface Role {
  id: string;
  name: string;
  description: string | null;
}

export default function RbacUsersPage() {
  const { bindingId } = useParams<{ bindingId: string }>();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userRoles, setUserRoles] = useState<Record<string, Role[]>>({});

  useEffect(() => {
    if (!bindingId) return;
    loadData();
  }, [bindingId]);

  async function loadData() {
    if (!bindingId) return;
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch(`/api/auth/${bindingId}/rbac/users`),
        fetch(`/api/auth/${bindingId}/rbac/roles`),
      ]);
      if (!usersRes.ok) throw new Error('Failed to load users');
      const usersData = await usersRes.json();
      const rolesData = await rolesRes.json();
      setUsers(usersData);
      setRoles(rolesData);

      const roleMap: Record<string, Role[]> = {};
      for (const user of usersData) {
        try {
          const r = await fetch(`/api/auth/${bindingId}/rbac/users/${user.id}`);
          const data = await r.json();
          roleMap[user.id] = data.roles ?? [];
        } catch {
          roleMap[user.id] = [];
        }
      }
      setUserRoles(roleMap);
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!bindingId) return;
    setCreating(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/auth/${bindingId}/rbac/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, password: newPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create user');
      }
      setShowCreate(false);
      setNewEmail('');
      setNewPassword('');
      setMessage({ type: 'success', text: 'Usuário criado.' });
      await loadData();
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm('Remover este usuário?')) return;
    if (!bindingId) return;
    try {
      const res = await fetch(`/api/auth/${bindingId}/rbac/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage({ type: 'success', text: 'Usuário removido.' });
      await loadData();
    } catch {
      setMessage({ type: 'error', text: 'Falha ao remover usuário.' });
    }
  }

  async function handleAssignRole(userId: string, roleId: string) {
    if (!bindingId) return;
    try {
      await fetch(`/api/auth/${bindingId}/rbac/users/${userId}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId }),
      });
      await loadData();
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    }
  }

  async function handleRemoveRole(userId: string, roleId: string) {
    if (!bindingId) return;
    try {
      await fetch(`/api/auth/${bindingId}/rbac/users/${userId}/roles/${roleId}`, { method: 'DELETE' });
      await loadData();
    } catch {
      setMessage({ type: 'error', text: 'Falha ao remover role.' });
    }
  }

  if (loading) {
    return (
      <AuthLayout title="Usuários" subtitle={`Binding: ${bindingId}`}>
        <div className="auth-empty">
          <div>
            <h2>Carregando</h2>
            <p>Buscando usuários e perfis.</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={`Usuários — ${bindingId}`} subtitle="Gerencie usuários e atribua perfis (roles) para este app.">
      <nav className="ao-tabs" role="tablist">
        <NavLink
          to={`/auth/bindings/${bindingId}/users`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
          role="tab"
        >
          Usuários <span className="ao-tab__count">{users.length}</span>
        </NavLink>
        <NavLink
          to={`/auth/bindings/${bindingId}/roles`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
          role="tab"
        >
          Perfis <span className="ao-tab__count">{roles.length}</span>
        </NavLink>
        <NavLink
          to={`/auth/bindings/${bindingId}/permissions`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
          role="tab"
        >
          Permissões
        </NavLink>
      </nav>

      {message && (
        <div className={`ao-alert ao-alert--compact auth-message ${message.type === 'success' ? 'ao-alert--success' : 'ao-alert--danger'}`} role="alert">
          <div className="ao-alert__content">
            <p className="ao-alert__body">{message.text}</p>
          </div>
        </div>
      )}

      <div className="auth-users-toolbar">
        <div />
        <button className="ao-btn ao-btn--primary" onClick={() => setShowCreate((v) => !v)} type="button">
          {showCreate ? 'Cancelar' : '+ Novo Usuário'}
        </button>
      </div>

      {showCreate && (
        <section className="ao-card" style={{ marginBottom: 'var(--ao-space-5)' }}>
          <div className="ao-card__header">
            <h2 className="ao-card__title">Criar usuário</h2>
          </div>
          <form onSubmit={handleCreate}>
            <div className="ao-card__body">
              <label className="ao-field">
                <span className="ao-field__label">E-mail</span>
                <input
                  className="ao-input"
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
              <label className="ao-field">
                <span className="ao-field__label">Senha</span>
                <input
                  className="ao-input"
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="ao-card__footer">
              <button className="ao-btn ao-btn--primary" type="submit" disabled={creating}>
                {creating ? 'Criando...' : 'Criar Usuário'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="ao-card ao-card--compact">
        <div className="ao-card__header">
          <h2 className="ao-card__title">Usuários cadastrados</h2>
        </div>

        {users.length === 0 ? (
          <div className="auth-empty">
            <div>
              <h2>Nenhum usuário ainda</h2>
              <p>Crie o primeiro usuário para este binding.</p>
            </div>
          </div>
        ) : (
          <div className="ao-card__body ao-card__body--flush">
            <div className="ao-table-wrap">
              <table className="ao-table ao-table--compact">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Perfis</th>
                    <th aria-label="Ações" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const assigned = userRoles[user.id] ?? [];
                    const available = roles.filter((r) => !assigned.some((ur) => ur.id === r.id));
                    return (
                      <tr key={user.id}>
                        <td className="ao-td--mono">{user.email}</td>
                        <td>
                          {user.verified
                            ? <span className="ao-chip ao-chip--success ao-chip--sm">Verificado</span>
                            : <span className="ao-chip ao-chip--sm">Pendente</span>
                          }
                        </td>
                        <td>
                          <div className="auth-role-list">
                            {assigned.map((r) => (
                              <span key={r.id} className="ao-chip ao-chip--secondary ao-chip--sm ao-chip--removable">
                                {r.name}
                                <button
                                  className="ao-chip__remove"
                                  onClick={() => handleRemoveRole(user.id, r.id)}
                                  type="button"
                                  aria-label={`Remover ${r.name}`}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="ao-td--actions">
                          <select
                            className="ao-select ao-select--sm"
                            value=""
                            onChange={(e) => { if (e.target.value) handleAssignRole(user.id, e.target.value); }}
                          >
                            <option value="">+ Atribuir perfil...</option>
                            {available.map((r) => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                          </select>
                          <button
                            className="ao-btn ao-btn--ghost ao-btn--danger ao-btn--sm"
                            onClick={() => handleDelete(user.id)}
                            type="button"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </AuthLayout>
  );
}
