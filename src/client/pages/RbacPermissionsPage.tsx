import { useState, useEffect, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
}

export default function RbacPermissionsPage() {
  const { bindingId } = useParams<{ bindingId: string }>();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newName, setNewName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [newResource, setNewResource] = useState('');
  const [newAction, setNewAction] = useState('');
  const [attachRoleIds, setAttachRoleIds] = useState<Set<string>>(new Set());

  const autoName = useMemo(
    () => (newResource && newAction ? `${newResource}:${newAction}` : ''),
    [newResource, newAction]
  );
  useEffect(() => {
    if (!nameTouched) setNewName(autoName);
  }, [autoName, nameTouched]);

  useEffect(() => {
    if (!bindingId) return;
    loadPermissions();
    loadRoles();
  }, [bindingId]);

  async function loadPermissions() {
    if (!bindingId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${bindingId}/rbac/permissions`);
      setPermissions(await res.json());
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function loadRoles() {
    if (!bindingId) return;
    try {
      const res = await fetch(`/api/auth/${bindingId}/rbac/roles`);
      if (!res.ok) return;
      const list: Role[] = await res.json();
      setRoles(list.filter((r) => r.name !== 'owner'));
    } catch {
      /* lista de roles é nice-to-have */
    }
  }

  function toggleAttachRole(roleId: string) {
    setAttachRoleIds((prev) => {
      const next = new Set(prev);
      if (next.has(roleId)) next.delete(roleId);
      else next.add(roleId);
      return next;
    });
  }

  function resetCreateForm() {
    setNewName('');
    setNameTouched(false);
    setNewResource('');
    setNewAction('');
    setAttachRoleIds(new Set());
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!bindingId) return;
    setCreating(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/auth/${bindingId}/rbac/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, resource: newResource, action: newAction }),
      });
      if (!res.ok) throw new Error('Failed to create permission');
      const created: Permission = await res.json();

      const attachErrors: string[] = [];
      if (attachRoleIds.size > 0) {
        await Promise.all(
          Array.from(attachRoleIds).map(async (roleId) => {
            try {
              const r = await fetch(`/api/auth/rbac/roles/${roleId}/permissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permissionId: created.id, bindingId }),
              });
              if (!r.ok) attachErrors.push(roleId);
            } catch {
              attachErrors.push(roleId);
            }
          })
        );
      }

      setShowCreate(false);
      resetCreateForm();

      if (attachErrors.length > 0) {
        setMessage({
          type: 'error',
          text: `Permissão criada, mas falhou em associar a ${attachErrors.length} perfil(s). Tente associar manualmente em "Perfis".`,
        });
      } else if (attachRoleIds.size > 0) {
        setMessage({
          type: 'success',
          text: `Permissão criada e associada a ${attachRoleIds.size} perfil(s).`,
        });
      } else {
        setMessage({ type: 'success', text: 'Permissão criada.' });
      }
      await loadPermissions();
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(permissionId: string) {
    if (!bindingId) return;
    if (!confirm('Remover esta permissão?')) return;
    try {
      await fetch(`/api/auth/${bindingId}/rbac/permissions/${permissionId}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Permissão removida.' });
      await loadPermissions();
    } catch {
      setMessage({ type: 'error', text: 'Falha ao remover permissão.' });
    }
  }

  if (loading) {
    return (
      <AuthLayout title="Permissões" subtitle={`Binding: ${bindingId}`}>
        <p className="auth-muted">Carregando...</p>
      </AuthLayout>
    );
  }

  const grouped: Record<string, Permission[]> = {};
  for (const p of permissions) {
    if (!grouped[p.resource]) grouped[p.resource] = [];
    grouped[p.resource].push(p);
  }

  return (
    <AuthLayout
      title={`Permissões — ${bindingId}`}
      subtitle="Permissões disponíveis para este app. Formato: recurso:acao"
    >
      <nav className="ao-tabs" role="tablist">
        <NavLink
          to={`/auth/bindings/${bindingId}/users`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
        >
          Usuários
        </NavLink>
        <NavLink
          to={`/auth/bindings/${bindingId}/roles`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
        >
          Perfis
        </NavLink>
        <NavLink
          to={`/auth/bindings/${bindingId}/permissions`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
        >
          Permissões
        </NavLink>
      </nav>

      {message && (
        <div
          className={`ao-alert ao-alert--compact auth-message ${message.type === 'success' ? 'ao-alert--success' : 'ao-alert--danger'}`}
          role="alert"
        >
          <div className="ao-alert__content">
            <p className="ao-alert__body">{message.text}</p>
          </div>
        </div>
      )}

      <div className="auth-page-actions" style={{ justifyContent: 'flex-end', marginBottom: 'var(--ao-space-4)' }}>
        <button
          className={`ao-btn ${showCreate ? 'ao-btn--ghost' : 'ao-btn--primary'}`}
          onClick={() => setShowCreate((v) => !v)}
          type="button"
        >
          {showCreate ? 'Cancelar' : '+ Nova Permissão'}
        </button>
      </div>

      {showCreate && (
        <section className="ao-card" style={{ marginBottom: 'var(--ao-space-6)' }}>
          <div className="ao-card__header">
            <h2 className="ao-card__title">Nova Permissão</h2>
          </div>
          <div className="ao-card__body">
            <form onSubmit={handleCreate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--ao-space-4)' }}>
                <label className="ao-field">
                  <span className="ao-field__label">Recurso</span>
                  <input
                    className="ao-input"
                    type="text"
                    required
                    value={newResource}
                    onChange={(e) => setNewResource(e.target.value)}
                    placeholder="orders"
                  />
                </label>
                <label className="ao-field">
                  <span className="ao-field__label">Ação</span>
                  <input
                    className="ao-input"
                    type="text"
                    required
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="create"
                  />
                </label>
                <label className="ao-field">
                  <span className="ao-field__label">
                    Nome completo
                    {!nameTouched && newName && (
                      <span className="auth-muted" style={{ marginLeft: 'var(--ao-space-2)' }}>(auto)</span>
                    )}
                  </span>
                  <input
                    className="ao-input"
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value); setNameTouched(true); }}
                    placeholder={autoName || 'orders:create'}
                    style={{ fontFamily: 'var(--ao-font-mono)' }}
                  />
                </label>
              </div>

              {roles.length > 0 && (
                <div className="ao-field">
                  <span className="ao-field__label">
                    Associar a perfis
                    <span className="auth-muted" style={{ marginLeft: 'var(--ao-space-2)' }}>(opcional)</span>
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ao-space-2)' }}>
                    {roles.map((role) => {
                      const checked = attachRoleIds.has(role.id);
                      return (
                        <label
                          key={role.id}
                          title={role.description || undefined}
                          className={`ao-chip${checked ? ' ao-chip--primary' : ''}`}
                          style={{ cursor: 'pointer' }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAttachRole(role.id)}
                            className="ao-sr-only"
                          />
                          {role.name}
                        </label>
                      );
                    })}
                  </div>
                  <span className="ao-field__helper">
                    Perfis selecionados receberão esta permissão imediatamente após a criação.
                  </span>
                </div>
              )}

              <div className="auth-modal-actions">
                <button
                  className="ao-btn ao-btn--ghost ao-btn--sm"
                  type="button"
                  onClick={() => { setShowCreate(false); resetCreateForm(); }}
                >
                  Cancelar
                </button>
                <button className="ao-btn ao-btn--primary" type="submit" disabled={creating}>
                  {creating ? 'Criando...' : attachRoleIds.size > 0 ? `Criar e associar a ${attachRoleIds.size} perfil(s)` : 'Criar Permissão'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {permissions.length === 0 ? (
        <section className="ao-card">
          <div className="ao-card__body auth-empty">
            <p>Nenhuma permissão ainda.</p>
          </div>
        </section>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ao-space-4)' }}>
          {Object.entries(grouped).map(([resource, perms]) => (
            <section key={resource} className="ao-card ao-card--compact">
              <div className="ao-card__header">
                <h3 className="ao-card__title" style={{ textTransform: 'capitalize' }}>{resource}</h3>
                <span className="ao-chip ao-chip--sm">{perms.length}</span>
              </div>
              <div className="ao-card__body ao-card__body--flush">
                <div className="ao-table-wrap" style={{ border: 'none' }}>
                  <table className="ao-table ao-table--compact">
                    <thead>
                      <tr>
                        <th>Permissão</th>
                        <th>Ação</th>
                        <th className="ao-td--actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {perms.map((p) => (
                        <tr key={p.id}>
                          <td className="ao-td--mono">{p.name}</td>
                          <td>{p.action}</td>
                          <td className="ao-td--actions">
                            <button
                              className="ao-btn ao-btn--danger ao-btn--sm"
                              onClick={() => handleDelete(p.id)}
                              type="button"
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </AuthLayout>
  );
}
