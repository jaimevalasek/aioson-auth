import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
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
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newName, setNewName] = useState('');
  const [newResource, setNewResource] = useState('');
  const [newAction, setNewAction] = useState('');

  useEffect(() => {
    if (!bindingId) return;
    loadPermissions();
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
      setShowCreate(false);
      setNewName('');
      setNewResource('');
      setNewAction('');
      setMessage({ type: 'success', text: 'Permissão criada.' });
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
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Nome completo</label>
                <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={`${newResource}:${newAction}`} style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={creating} style={{ padding: '0 var(--space-5)', height: 'var(--control-md)', background: creating ? 'var(--accent-dim)' : 'var(--accent)', color: 'var(--accent-contrast)', border: 'none', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', cursor: creating ? 'not-allowed' : 'pointer' }}>
                {creating ? 'Criando...' : 'Criar Permissão'}
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
