import { useEffect, useMemo, useState } from 'react';
import AuthLayout from '../components/AuthLayout';

interface UserRoleSummary {
  id: string;
  binding_id: string;
  binding_name: string;
  binding_slug: string;
  role_id: string;
  role_name: string;
}

interface GlobalUser {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at?: string;
  roles: UserRoleSummary[];
}

type FormState = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

const emptyForm: FormState = { name: '', email: '', password: '' };

function adminHeaders(): HeadersInit {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function readError(response: Response) {
  const data = await response.json().catch(() => null) as { error?: string } | null;
  return data?.error ?? `HTTP ${response.status}`;
}

function formatDate(value: string) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

function initialsFor(user: Pick<GlobalUser, 'name' | 'email'>) {
  const source = (user.name || user.email || '?').trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function avatarColorFor(id: string) {
  const sum = Array.from(id).reduce((total, char) => total + char.charCodeAt(0), 0);
  return `ao-avatar--c${(sum % 7) + 1}`;
}

export default function GlobalUsersPage() {
  const [users, setUsers] = useState<GlobalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<FormState | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GlobalUser | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    void loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/users', { headers: adminHeaders() });
      if (!response.ok) throw new Error(await readError(response));
      const data = await response.json() as GlobalUser[];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage({ type: 'error', text: String(err instanceof Error ? err.message : err) });
    } finally {
      setLoading(false);
    }
  }

  async function saveUser() {
    if (!form) return;
    setSaving(true);
    setMessage(null);
    try {
      const isEditing = Boolean(form.id);
      const payload: Record<string, string> = {
        email: form.email.trim(),
        name: form.name.trim(),
      };
      if (form.password.trim()) payload.password = form.password;
      const response = await fetch(isEditing ? `/api/admin/users/${form.id}` : '/api/admin/users', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: adminHeaders(),
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(await readError(response));
      setForm(null);
      setMessage({ type: 'success', text: isEditing ? 'Operador atualizado.' : 'Operador criado.' });
      await loadUsers();
    } catch (err) {
      setMessage({ type: 'error', text: String(err instanceof Error ? err.message : err) });
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser() {
    if (!deleteTarget) return;
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/users/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: adminHeaders(),
      });
      if (!response.ok) throw new Error(await readError(response));
      setDeleteTarget(null);
      setMessage({ type: 'success', text: 'Operador removido.' });
      await loadUsers();
    } catch (err) {
      setMessage({ type: 'error', text: String(err instanceof Error ? err.message : err) });
    } finally {
      setSaving(false);
    }
  }

  const filteredUsers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return users;
    return users.filter((user) =>
      user.email.toLowerCase().includes(needle) ||
      user.name.toLowerCase().includes(needle) ||
      user.roles.some((role) => role.binding_name.toLowerCase().includes(needle) || role.role_name.toLowerCase().includes(needle))
    );
  }, [query, users]);

  const linkedUsers = users.filter((user) => user.roles.length > 0).length;
  const isEditing = Boolean(form?.id);
  const isSaveDisabled = saving || !form?.email.trim() || (!isEditing && (form?.password.length ?? 0) < 8);

  return (
    <AuthLayout
      title="Operadores"
      subtitle="Contas globais do aioson-auth. O vínculo de acesso por app continua sendo administrado pelo AIOSON Play."
    >
      <section className="auth-summary" aria-label="Resumo de operadores">
        <span className="ao-chip ao-chip--primary">{users.length} contas globais</span>
        <span className="ao-chip ao-chip--secondary">{linkedUsers} com vínculo ativo</span>
        <span className="ao-chip">{filteredUsers.length} na visão atual</span>
      </section>

      <div className="auth-users-toolbar">
        <input
          className="ao-input auth-search"
          type="search"
          placeholder="Buscar por nome, e-mail, app ou perfil"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Buscar operadores"
        />
        <button className="ao-btn ao-btn--primary" onClick={() => setForm(emptyForm)} type="button">
          Novo operador
        </button>
      </div>

      {message && (
        <div className={`ao-alert ao-alert--compact auth-message ${message.type === 'success' ? 'ao-alert--success' : 'ao-alert--danger'}`} role="alert">
          <div className="ao-alert__content">
            <p className="ao-alert__body">{message.text}</p>
          </div>
        </div>
      )}

      <section className="ao-card ao-card--compact">
        <div className="ao-card__header">
          <div>
            <h2 className="ao-card__title">Usuários cadastrados</h2>
            <p className="ao-card__subtitle">Gerencie nome, e-mail e senha das contas globais.</p>
          </div>
          <button className="ao-btn ao-btn--ghost ao-btn--sm" onClick={() => void loadUsers()} type="button" disabled={loading}>
            {loading ? 'Atualizando' : 'Atualizar'}
          </button>
        </div>

        {loading ? (
          <div className="auth-empty">
            <div>
              <h2>Carregando operadores</h2>
              <p>Buscando contas globais no aioson-auth.</p>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="auth-empty">
            <div>
              <h2>Nenhum operador encontrado</h2>
              <p>Crie a primeira conta global e depois vincule ela a um app pelo AIOSON Play.</p>
            </div>
          </div>
        ) : (
          <div className="ao-card__body ao-card__body--flush">
            <div className="ao-table-wrap">
              <table className="ao-table ao-table--compact">
                <thead>
                  <tr>
                    <th>Operador</th>
                    <th>Vínculos</th>
                    <th>Criado em</th>
                    <th aria-label="Ações" />
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="auth-user-cell">
                          <span className={`ao-avatar ao-avatar--initials ao-avatar--sm ${avatarColorFor(user.id)}`} aria-hidden="true">
                            {initialsFor(user)}
                          </span>
                          <div>
                            <p className="auth-user-name">{user.name || 'Sem nome'}</p>
                            <p className="auth-user-email">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        {user.roles.length === 0 ? (
                          <p className="auth-table-note">Sem vínculo com apps</p>
                        ) : (
                          <div className="auth-role-list">
                            {user.roles.map((role) => (
                              <span className="ao-chip ao-chip--primary ao-chip--sm" key={role.id}>
                                {role.binding_name} / {role.role_name}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="ao-td--mono">{formatDate(user.created_at)}</td>
                      <td>
                        <div className="auth-row-actions">
                          <button
                            className="ao-btn ao-btn--ghost ao-btn--sm"
                            onClick={() => setForm({ id: user.id, name: user.name, email: user.email, password: '' })}
                            type="button"
                          >
                            Editar
                          </button>
                          <button className="ao-btn ao-btn--danger ao-btn--sm" onClick={() => setDeleteTarget(user)} type="button">
                            Remover
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {form && (
        <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation">
          <section className="ao-modal" role="dialog" aria-modal="true" aria-labelledby="operator-modal-title">
            <header className="ao-modal__header">
              <div>
                <h2 className="ao-modal__title" id="operator-modal-title">
                  {isEditing ? 'Editar operador' : 'Novo operador'}
                </h2>
                <p className="ao-modal__subtitle">
                  {isEditing ? 'Altere dados básicos ou informe uma nova senha.' : 'A senha é entregue manualmente ao operador.'}
                </p>
              </div>
              <button className="ao-modal__close" onClick={() => setForm(null)} type="button" aria-label="Fechar">
                ×
              </button>
            </header>

            <div className="ao-modal__body">
              <div className="auth-modal-form">
                <label className="ao-field">
                  <span className="ao-field__label">Nome</span>
                  <input className="ao-input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                </label>
                <label className="ao-field">
                  <span className="ao-field__label">E-mail</span>
                  <input className="ao-input" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                </label>
                <label className="ao-field">
                  <span className="ao-field__label">Senha {isEditing ? '(opcional)' : ''}</span>
                  <input
                    className="ao-input"
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    minLength={8}
                    placeholder={isEditing ? 'Deixe em branco para manter' : 'Mínimo 8 caracteres'}
                  />
                </label>
              </div>
            </div>

            <footer className="ao-modal__footer auth-modal-actions">
              <button className="ao-btn ao-btn--secondary" onClick={() => setForm(null)} disabled={saving} type="button">
                Cancelar
              </button>
              <button className="ao-btn ao-btn--primary" onClick={() => void saveUser()} disabled={isSaveDisabled} type="button">
                {saving ? 'Salvando' : 'Salvar'}
              </button>
            </footer>
          </section>
        </div>
      )}

      {deleteTarget && (
        <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation">
          <section className="ao-modal ao-modal--alert" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <header className="ao-modal__header">
              <div>
                <h2 className="ao-modal__title" id="delete-modal-title">Remover operador?</h2>
                <p className="ao-modal__subtitle">Esta ação remove a conta global e revoga tokens nos apps vinculados.</p>
              </div>
              <button className="ao-modal__close" onClick={() => setDeleteTarget(null)} type="button" aria-label="Fechar">
                ×
              </button>
            </header>
            <div className="ao-modal__body">
              <p className="auth-danger-copy">
                <strong>{deleteTarget.email}</strong> será removido do aioson-auth.
              </p>
            </div>
            <footer className="ao-modal__footer auth-modal-actions">
              <button className="ao-btn ao-btn--secondary" onClick={() => setDeleteTarget(null)} disabled={saving} type="button">
                Cancelar
              </button>
              <button className="ao-btn ao-btn--danger" onClick={() => void deleteUser()} disabled={saving} type="button">
                {saving ? 'Removendo' : 'Remover'}
              </button>
            </footer>
          </section>
        </div>
      )}
    </AuthLayout>
  );
}
