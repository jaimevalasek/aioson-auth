import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function adminHeaders(): HeadersInit {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}


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

interface PermissionModalState {
  roleId: string;
  bindingId: string;
  selectedIds: string[];
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
  const [permModal, setPermModal] = useState<PermissionModalState | null>(null);
  const [assigningPerms, setAssigningPerms] = useState(false);

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
          const r = await fetch(`/api/auth/rbac/roles/${role.id}/permissions?bindingId=${b.id}`);
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
      const res = await fetch('/api/auth/rbac/roles', {
        method: 'POST',
        headers: adminHeaders(),
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
      const res = await fetch(`/api/auth/rbac/roles/${roleId}`, { method: 'DELETE', headers: adminHeaders() });
      if (!res.ok) throw new Error('Failed');
      setMsg({ type: 'success', text: 'Perfil removido.' });
      await loadData();
    } catch {
      setMsg({ type: 'error', text: 'Falha ao remover.' });
    }
  }

  function assignedPermissions(roleId: string, bindingId: string): Permission[] {
    return rolePerms[roleId]?.[bindingId] || [];
  }

  function availablePermissions(roleId: string, bindingId: string): Permission[] {
    const assignedIds = new Set(assignedPermissions(roleId, bindingId).map((p) => p.id));
    return (bindingPerms[bindingId] || []).filter((p) => !assignedIds.has(p.id));
  }

  function openPermissionModal(roleId: string, bindingId: string) {
    if (availablePermissions(roleId, bindingId).length === 0) return;
    setPermModal({ roleId, bindingId, selectedIds: [] });
  }

  function toggleModalPermission(permissionId: string) {
    setPermModal((current) => {
      if (!current) return current;
      const selected = new Set(current.selectedIds);
      if (selected.has(permissionId)) selected.delete(permissionId);
      else selected.add(permissionId);
      return { ...current, selectedIds: Array.from(selected) };
    });
  }

  function toggleAllModalPermissions(permissions: Permission[]) {
    setPermModal((current) => {
      if (!current) return current;
      const allIds = permissions.map((p) => p.id);
      const allSelected = allIds.length > 0 && allIds.every((id) => current.selectedIds.includes(id));
      return { ...current, selectedIds: allSelected ? [] : allIds };
    });
  }

  async function handleAssignSelectedPerms() {
    if (!permModal || permModal.selectedIds.length === 0) return;
    const { roleId, bindingId, selectedIds } = permModal;
    const selectedPermissions = (bindingPerms[bindingId] || []).filter((p) => selectedIds.includes(p.id));
    setAssigningPerms(true);
    setMsg(null);
    try {
      const results = await Promise.all(
        selectedIds.map((permissionId) =>
          fetch(`/api/auth/rbac/roles/${roleId}/permissions`, {
            method: 'POST',
            headers: adminHeaders(),
            body: JSON.stringify({ permissionId, bindingId }),
          })
        )
      );
      if (results.some((res) => !res.ok)) throw new Error('Failed');

      setRolePerms((current) => {
        const roleMap = current[roleId] || {};
        const currentPerms = roleMap[bindingId] || [];
        const currentIds = new Set(currentPerms.map((p) => p.id));
        const nextPerms = [
          ...currentPerms,
          ...selectedPermissions.filter((p) => !currentIds.has(p.id)),
        ];
        return {
          ...current,
          [roleId]: {
            ...roleMap,
            [bindingId]: nextPerms,
          },
        };
      });

      setPermModal(null);
      setMsg({ type: 'success', text: `${selectedIds.length} permissão(ões) adicionada(s).` });
    } catch {
      setMsg({ type: 'error', text: 'Falha ao atribuir.' });
    } finally {
      setAssigningPerms(false);
    }
  }

  async function handleRemovePerm(roleId: string, bindingId: string, permId: string) {
    try {
      const res = await fetch(`/api/auth/rbac/roles/${roleId}/permissions/${permId}?bindingId=${bindingId}`, { method: 'DELETE', headers: adminHeaders() });
      if (!res.ok) throw new Error('Failed');
      setRolePerms((current) => {
        const roleMap = current[roleId] || {};
        const currentPerms = roleMap[bindingId] || [];
        return {
          ...current,
          [roleId]: {
            ...roleMap,
            [bindingId]: currentPerms.filter((p) => p.id !== permId),
          },
        };
      });
      setMsg({ type: 'success', text: 'Permissão removida.' });
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

  const bindingsWithPermissions = bindings.filter((b) => (bindingPerms[b.id] || []).length > 0);
  const modalBinding = permModal ? bindings.find((b) => b.id === permModal.bindingId) : null;
  const modalRole = permModal ? roles.find((role) => role.id === permModal.roleId) : null;
  const modalAvailablePermissions = permModal
    ? availablePermissions(permModal.roleId, permModal.bindingId)
    : [];
  const modalAllSelected = modalAvailablePermissions.length > 0 &&
    modalAvailablePermissions.every((p) => permModal?.selectedIds.includes(p.id));

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
                {bindingsWithPermissions.length === 0 ? (
                  <p className="auth-muted">Nenhum app com permissões registradas ainda.</p>
                ) : bindingsWithPermissions.map((b) => {
                  const perms = assignedPermissions(role.id, b.id);
                  const available = availablePermissions(role.id, b.id);
                  return (
                    <div key={b.id} className="auth-role-binding">
                      <div className="auth-role-binding__head">
                        <div className="auth-role-binding__title">
                          <span className="ao-chip ao-chip--secondary ao-chip--sm">{b.app_name}</span>
                          <span className="auth-table-note">
                            {perms.length}/{bindingPerms[b.id]?.length || 0} permissões
                          </span>
                        </div>
                        <button
                          className="ao-btn ao-btn--ghost ao-btn--sm"
                          style={{ borderStyle: 'dashed' }}
                          onClick={() => openPermissionModal(role.id, b.id)}
                          disabled={available.length === 0}
                        >
                          {available.length === 0 ? 'Completo' : `Adicionar (${available.length})`}
                        </button>
                      </div>
                      <div className="auth-role-list">
                        {perms.length === 0 && <span className="auth-muted">Nenhuma permissão</span>}
                        {perms.map((p) => (
                          <span key={p.id} className="ao-chip ao-chip--primary ao-chip--removable">
                            {p.name}
                            <button className="ao-chip__remove" onClick={() => handleRemovePerm(role.id, b.id, p.id)} type="button">×</button>
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
          <div className="ao-modal ao-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="ao-modal__header">
              <div>
                <h3 className="ao-modal__title">Adicionar permissões</h3>
                <p className="ao-modal__subtitle">
                  {modalRole?.name} / {modalBinding?.app_name}
                </p>
              </div>
              <button className="ao-modal__close" onClick={() => setPermModal(null)} type="button">×</button>
            </div>
            <div className="ao-modal__body">
              {modalAvailablePermissions.length === 0 ? (
                <p className="auth-muted">Todas as permissões deste app já estão neste perfil.</p>
              ) : (
                <>
                  <div className="auth-permission-modal-toolbar">
                    <button
                      className="ao-btn ao-btn--ghost ao-btn--sm"
                      type="button"
                      onClick={() => toggleAllModalPermissions(modalAvailablePermissions)}
                    >
                      {modalAllSelected ? 'Limpar seleção' : 'Selecionar todas'}
                    </button>
                    <span className="auth-table-note">
                      {permModal.selectedIds.length} de {modalAvailablePermissions.length} selecionadas
                    </span>
                  </div>

                  <div className="auth-permission-checklist">
                    {modalAvailablePermissions.map((permission) => (
                      <label className="auth-permission-option" key={permission.id}>
                        <input
                          className="auth-permission-option__input"
                          type="checkbox"
                          checked={permModal.selectedIds.includes(permission.id)}
                          onChange={() => toggleModalPermission(permission.id)}
                        />
                        <span className="auth-permission-option__content">
                          <span className="auth-permission-option__name">{permission.name}</span>
                          <span className="auth-permission-option__meta">{permission.resource}:{permission.action}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="ao-modal__footer">
              <button className="ao-btn ao-btn--secondary" type="button" onClick={() => setPermModal(null)} disabled={assigningPerms}>
                Cancelar
              </button>
              <button
                className="ao-btn ao-btn--primary"
                type="button"
                onClick={() => void handleAssignSelectedPerms()}
                disabled={assigningPerms || permModal.selectedIds.length === 0}
              >
                {assigningPerms ? 'Adicionando' : `Adicionar ${permModal.selectedIds.length}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
