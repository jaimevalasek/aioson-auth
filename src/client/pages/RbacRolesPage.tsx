import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

function cardStyle() {
  return {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--shadow-sm)',
  };
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
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Perfis Globais"
      subtitle="Perfis reutilizáveis entre todos os vínculos. Atribua permissões específicas de cada app."
      onBack={() => window.history.back()}
    >
      {/* Nav tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <Link to={`/auth/bindings/${bindingId}/users`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>Usuários</Link>
        <Link to={`/auth/bindings/${bindingId}/roles`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--accent-strong)', textDecoration: 'none', paddingBottom: 'var(--space-2)', borderBottom: '2px solid var(--accent)' }}>Perfis</Link>
        <Link to={`/auth/bindings/${bindingId}/permissions`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>Permissões</Link>
      </div>

      {msg && (
        <div style={{
          marginBottom: 'var(--space-6)', padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)',
          ...(msg.type === 'success' ? { background: 'rgba(81, 207, 167, 0.12)', color: 'rgb(81, 207, 167)' } : { background: 'rgba(239, 68, 68, 0.12)', color: 'rgb(239, 68, 68)' }),
        }}>
          {msg.text}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
        <button
          onClick={() => setShowCreate((v) => !v)}
          style={{
            padding: '0 var(--space-5)', height: 'var(--control-md)',
            background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)',
            cursor: 'pointer',
          }}>
          {showCreate ? 'Cancelar' : '+ Novo Perfil'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} style={{ ...cardStyle(), marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Nome do Perfil</label>
            <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex: Gerente"
              style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Descrição</label>
            <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Opcional"
              style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={creating} style={{
              padding: '0 var(--space-5)', height: 'var(--control-md)',
              background: creating ? 'var(--accent-dim)' : 'var(--accent)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)',
              cursor: creating ? 'not-allowed' : 'pointer',
            }}>
              {creating ? 'Criando...' : 'Criar Perfil'}
            </button>
          </div>
        </form>
      )}

      {roles.length === 0 ? (
        <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-12)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum perfil ainda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {roles.map((role) => (
            <div key={role.id} style={{ ...cardStyle() }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: '0 0 var(--space-1)', letterSpacing: 'var(--tracking-tight)' }}>
                    {role.name}
                  </h3>
                  {role.description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>{role.description}</p>}
                </div>
                <button onClick={() => handleDelete(role.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Remover
                </button>
              </div>

              {/* Permissions per binding */}
              {bindings.map((b) => {
                const perms = rolePerms[role.id]?.[b.id] || [];
                return (
                  <div key={b.id} style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--semantic-purple)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {b.app_name}
                      </span>
                      <button
                        onClick={() => setPermModal({ roleId: role.id, bindingId: b.id })}
                        style={{
                          background: 'none', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)',
                          padding: '2px var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)',
                          cursor: 'pointer',
                        }}>
                        + Adicionar
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      {perms.length === 0 && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Nenhuma permissão</span>}
                      {perms.map((p) => (
                        <span key={p.id} style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '2px var(--space-2)', height: '24px',
                          background: 'var(--accent-dim)', color: 'var(--accent-strong)',
                          borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)',
                        }}>
                          {p.name}
                          <button onClick={() => handleRemovePerm(role.id, b.id, p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1 }}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Add permission modal */}
      {permModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
        }} onClick={() => setPermModal(null)}>
          <div style={{
            background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)', width: '100%', maxWidth: '360px',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', margin: '0 0 var(--space-4)' }}>
              Adicionar Permissão
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Binding: <strong>{bindings.find((b) => b.id === permModal.bindingId)?.app_name}</strong>
            </p>
            <select
              autoFocus
              onChange={(e) => {
                if (e.target.value) handleAssignPerm(permModal.roleId, permModal.bindingId, e.target.value);
              }}
              style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-3)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="">Selecione uma permissão...</option>
              {(bindingPerms[permModal.bindingId] || []).map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.resource}:{p.action})</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
