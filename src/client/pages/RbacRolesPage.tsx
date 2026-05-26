import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

interface Binding {
  id: string;
  app_name: string;
}

interface RolePerms {
  [roleId: string]: { [bindingId: string]: Permission[] };
}

export default function RbacRolesPage() {
  const { bindingId } = useParams<{ bindingId: string }>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [bindings, setBindings] = useState<Binding[]>([]);
  const [bindingPerms, setBindingPerms] = useState<Record<string, Permission[]>>({});
  const [rolePerms, setRolePerms] = useState<RolePerms>({});
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [permModal, setPermModal] = useState<{ roleId: string; bindingId: string } | null>(null);

  useEffect(() => {
    if (!bindingId) return;
    loadData();
  }, [bindingId]);

  async function loadData() {
    if (!bindingId) return;
    setLoading(true);
    try {
      // Load all bindings with RBAC
      const bindingsRes = await fetch('/api/auth/bindings');
      const bindingsData = await bindingsRes.json();
      const rbacBindings = (bindingsData || []).filter((b: any) => b.enable_rbac) as Binding[];
      setBindings(rbacBindings);

      // Load permissions for each binding
      const bpMap: Record<string, Permission[]> = {};
      for (const b of rbacBindings) {
        const r = await fetch(`/api/auth/${b.id}/rbac/permissions`);
        bpMap[b.id] = await r.json();
      }
      setBindingPerms(bpMap);

      // Load all roles (global)
      const rolesRes = await fetch(`/api/auth/${bindingId}/rbac/roles`);
      const rolesData = await rolesRes.json();
      setRoles(rolesData || []);

      // Load permissions per role per binding
      const rpMap: RolePerms = {};
      for (const role of rolesData || []) {
        rpMap[role.id] = {};
        for (const b of rbacBindings) {
          const r = await fetch(`/api/rbac/roles/${role.id}/permissions?bindingId=${b.id}`);
          if (r.ok) rpMap[role.id][b.id] = await r.json();
        }
      }
      setRolePerms(rpMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMsg(null);
    try {
      const res = await fetch('/api/rbac/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, description: newDesc || undefined }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed');
      }
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      setMsg({ type: 'success', text: 'Perfil criado.' });
      await loadData();
    } catch (err) {
      setMsg({ type: 'error', text: String(err) });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(roleId: string) {
    if (!confirm('Remover este perfil?')) return;
    try {
      await fetch(`/api/rbac/roles/${roleId}`, { method: 'DELETE' });
      setMsg({ type: 'success', text: 'Perfil removido.' });
      await loadData();
    } catch {
      setMsg({ type: 'error', text: 'Falha ao remover.' });
    }
  }

  async function handleAssignPerm(roleId: string, bindingId: string, permId: string) {
    try {
      await fetch(`/api/rbac/roles/${roleId}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissionId: permId, bindingId }),
      });
      setPermModal(null);
      await loadData();
    } catch {
      setMsg({ type: 'error', text: 'Falha ao atribuir.' });
    }
  }

  async function handleRemovePerm(roleId: string, bindingId: string, permId: string) {
    try {
      await fetch(`/api/rbac/roles/${roleId}/permissions/${permId}?bindingId=${bindingId}`, { method: 'DELETE' });
      await loadData();
    } catch {
      setMsg({ type: 'error', text: 'Falha ao remover.' });
    }
  }

  if (loading) {
    return (
      <AuthLayout title="Perfis (Roles)" subtitle={`Binding: ${bindingId}`} onBack={() => window.history.back()}>
        <p className="auth-muted">Carregando...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Perfis Globais"
      subtitle="Perfis reutilizáveis entre todos os vínculos. Atribua permissões específicas de cada app."
      onBack={() => window.history.back()}
    >
      <nav className="ao-tabs" role="tablist">
        <NavLink
          to={`/auth/bindings/${bindingId}/users`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
          role="tab"
        >
          Usuários
        </NavLink>
        <NavLink
          to={`/auth/bindings/${bindingId}/roles`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
          role="tab"
        >
          Perfis
        </NavLink>
        <NavLink
          to={`/auth/bindings/${bindingId}/permissions`}
          className={({ isActive }) => `ao-tab${isActive ? ' ao-tab--active' : ''}`}
          role="tab"
        >
          Permissões
        </NavLink>
      </nav>

      {msg && (
        <div className={`ao-alert ${msg.type === 'success' ? 'ao-alert--success' : 'ao-alert--danger'} ao-alert--compact auth-message`}>
          <div className="ao-alert__content">{msg.text}</div>
        </div>
      )}

      <div className="auth-page-actions" style={{ justifyContent: 'flex-end', marginBottom: 'var(--ao-space-4)' }}>
        <button
          className={`ao-btn ${showCreate ? 'ao-btn--ghost' : 'ao-btn--primary'}`}
          onClick={() => setShowCreate((v) => !v)}
        >
          {showCreate ? 'Cancelar' : '+ Novo Perfil'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="ao-card" style={{ marginBottom: 'var(--ao-space-6)' }}>
          <div className="ao-card__body auth-modal-form">
            <div className="ao-field">
              <label className="ao-field__label">Nome do Perfil</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Gerente"
                className="ao-input"
              />
            </div>
            <div className="ao-field">
              <label className="ao-field__label">Descrição</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Opcional"
                className="ao-input"
              />
            </div>
            <div className="auth-modal-actions">
              <button type="submit" disabled={creating} className={`ao-btn ao-btn--primary${creating ? ' ao-btn--loading' : ''}`}>
                {creating ? 'Criando...' : 'Criar Perfil'}
              </button>
            </div>
          </div>
        </form>
      )}

      {roles.length === 0 ? (
        <div className="ao-card auth-empty">
          <p className="auth-muted">Nenhum perfil ainda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ao-space-4)' }}>
          {roles.map((role) => (
            <div key={role.id} className="ao-card">
              <div className="ao-card__header">
                <div>
                  <h3 className="ao-card__title">{role.name}</h3>
                  {role.description && <p className="ao-card__subtitle">{role.description}</p>}
                </div>
                <button className="ao-btn ao-btn--ghost ao-btn--sm" onClick={() => handleDelete(role.id)}>
                  Remover
                </button>
              </div>

              <div className="ao-card__body">
                {bindings.map((b) => {
                  const perms = rolePerms[role.id]?.[b.id] || [];
                  return (
                    <div key={b.id} style={{ marginBottom: 'var(--ao-space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ao-space-2)', marginBottom: 'var(--ao-space-2)' }}>
                        <span className="ao-chip ao-chip--secondary ao-chip--sm">{b.app_name}</span>
                        <button
                          className="ao-btn ao-btn--ghost ao-btn--sm"
                          style={{ borderStyle: 'dashed' }}
                          onClick={() => setPermModal({ roleId: role.id, bindingId: b.id })}
                        >
                          + Adicionar
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--ao-space-2)', flexWrap: 'wrap' }}>
                        {perms.length === 0 && <span className="auth-muted">Nenhuma permissão</span>}
                        {perms.map((p) => (
                          <span key={p.id} className="ao-chip ao-chip--primary ao-chip--removable">
                            {p.name}
                            <button className="ao-chip__remove" onClick={() => handleRemovePerm(role.id, b.id, p.id)}>×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {permModal && (
        <div className="ao-modal-backdrop ao-modal-backdrop--centered" onClick={() => setPermModal(null)}>
          <div className="ao-modal ao-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="ao-modal__header">
              <h3 className="ao-modal__title">Adicionar Permissão</h3>
              <button className="ao-modal__close" onClick={() => setPermModal(null)}>×</button>
            </div>
            <div className="ao-modal__body">
              <p className="ao-modal__subtitle" style={{ marginBottom: 'var(--ao-space-4)' }}>
                Binding: <strong>{bindings.find((b) => b.id === permModal.bindingId)?.app_name}</strong>
              </p>
              <select
                className="ao-select"
                autoFocus
                onChange={(e) => {
                  if (e.target.value) handleAssignPerm(permModal.roleId, permModal.bindingId, e.target.value);
                }}
              >
                <option value="">Selecione uma permissão...</option>
                {(bindingPerms[permModal.bindingId] || []).map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.resource}:{p.action})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
