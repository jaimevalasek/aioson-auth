import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
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

function cardStyle() {
  return {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--shadow-sm)',
  };
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

  // Auto-fill `name` = `resource:action` enquanto o user não editou manualmente.
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
      // BR-15: filtra o role reservado `owner` (não pode receber permissions via UI).
      setRoles(list.filter((r) => r.name !== 'owner'));
    } catch {
      /* lista de roles é nice-to-have — não bloqueia se falhar */
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

      // Associa a permission aos perfis selecionados (inline, estilo Spatie).
      // Falhas individuais viram warning no message — não rollback da permission.
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
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </AuthLayout>
    );
  }

  // Group by resource
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
      {/* Nav tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <Link to={`/auth/bindings/${bindingId}/users`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>Usuários</Link>
        <Link to={`/auth/bindings/${bindingId}/roles`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>Perfis</Link>
        <Link to={`/auth/bindings/${bindingId}/permissions`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--accent-strong)', textDecoration: 'none', paddingBottom: 'var(--space-2)', borderBottom: '2px solid var(--accent)' }}>Permissões</Link>
      </div>

      {message && (
          <div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', ...(message.type === 'success' ? { background: 'var(--semantic-green-dim)', color: 'var(--semantic-green)' } : { background: 'var(--semantic-red-dim)', color: 'var(--semantic-red)' }) }}>
            {message.text}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
          <button onClick={() => setShowCreate((v) => !v)} style={{ padding: '0 var(--space-5)', height: 'var(--control-md)', background: 'var(--accent)', color: 'var(--accent-contrast)', border: 'none', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', cursor: 'pointer' }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = 'var(--accent)'}>
            {showCreate ? 'Cancelar' : '+ Nova Permissão'}
          </button>
        </div>

        {showCreate && (
          <form onSubmit={handleCreate} style={{ ...cardStyle(), marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Recurso</label>
                <input type="text" required value={newResource} onChange={(e) => setNewResource(e.target.value)} placeholder="orders" style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Ação</label>
                <input type="text" required value={newAction} onChange={(e) => setNewAction(e.target.value)} placeholder="create" style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                  Nome completo
                  {!nameTouched && newName && (
                    <span style={{ marginLeft: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--weight-normal)' }}>(auto)</span>
                  )}
                </label>
                <input type="text" required value={newName}
                  onChange={(e) => { setNewName(e.target.value); setNameTouched(true); }}
                  placeholder={autoName || 'orders:create'}
                  style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>

            {/* Associar a perfis inline (estilo Spatie Laravel-Permission) */}
            {roles.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                  Associar a perfis
                  <span style={{ marginLeft: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--weight-normal)' }}>(opcional)</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {roles.map((role) => {
                    const checked = attachRoleIds.has(role.id);
                    return (
                      <label key={role.id} title={role.description || undefined} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', background: checked ? 'var(--accent-dim)' : 'var(--bg-elevated)', border: `1px solid ${checked ? 'var(--accent)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 'var(--text-sm)', color: checked ? 'var(--accent-strong)' : 'var(--text-secondary)', fontWeight: checked ? 'var(--weight-semibold)' : 'var(--weight-medium)', transition: 'var(--transition-fast)' }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAttachRole(role.id)}
                          style={{ width: '14px', height: '14px', accentColor: 'var(--accent)', cursor: 'pointer' }}
                        />
                        {role.name}
                      </label>
                    );
                  })}
                </div>
                <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Perfis selecionados receberão esta permissão imediatamente após a criação.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={creating} style={{ padding: '0 var(--space-5)', height: 'var(--control-md)', background: creating ? 'var(--accent-dim)' : 'var(--accent)', color: 'var(--accent-contrast)', border: 'none', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', cursor: creating ? 'not-allowed' : 'pointer' }}>
                {creating ? 'Criando...' : attachRoleIds.size > 0 ? `Criar e associar a ${attachRoleIds.size} perfil(s)` : 'Criar Permissão'}
              </button>
            </div>
          </form>
        )}

        {permissions.length === 0 ? (
          <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-12)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Nenhuma permissão ainda.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {Object.entries(grouped).map(([resource, perms]) => (
              <div key={resource} style={{ ...cardStyle() }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: '0 0 var(--space-4)', letterSpacing: 'var(--tracking-tight)', textTransform: 'capitalize' }}>
                  {resource}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                  {perms.map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)' }}>{p.action}</span>
                      <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', padding: 'var(--space-1)', transition: 'var(--transition-fast)' }}
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = 'var(--semantic-red)'}
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = 'var(--text-muted)'}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
    </AuthLayout>
  );
}
