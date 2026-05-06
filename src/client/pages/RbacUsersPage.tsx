import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

function cardStyle() {
  return {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--shadow-sm)',
  };
}

function badgeStyle(variant: 'green' | 'gray') {
  return variant === 'green'
    ? { background: 'var(--semantic-green-dim)', color: 'var(--semantic-green)' }
    : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)' };
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
  // userId → list of role ids assigned to this user
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

      // Load roles for each user
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
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={`Usuários — ${bindingId}`} subtitle="Gerencie usuários e atribua perfis (roles) para este app.">
      {/* Nav tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <Link to={`/auth/bindings/${bindingId}/users`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--accent-strong)', textDecoration: 'none', paddingBottom: 'var(--space-2)', borderBottom: '2px solid var(--accent)' }}>Usuários</Link>
        <Link to={`/auth/bindings/${bindingId}/roles`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>Perfis</Link>
        <Link to={`/auth/bindings/${bindingId}/permissions`} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>Permissões</Link>
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
            {showCreate ? 'Cancelar' : '+ Novo Usuário'}
          </button>
        </div>

        {showCreate && (
          <form onSubmit={handleCreate} style={{ ...cardStyle(), marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>E-mail</label>
              <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Senha</label>
              <input type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', height: 'var(--control-md)', padding: '0 var(--space-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-heading)', outline: 'none' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={creating} style={{ padding: '0 var(--space-5)', height: 'var(--control-md)', background: creating ? 'var(--accent-dim)' : 'var(--accent)', color: 'var(--accent-contrast)', border: 'none', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', cursor: creating ? 'not-allowed' : 'pointer' }}>
                {creating ? 'Criando...' : 'Criar Usuário'}
              </button>
            </div>
          </form>
        )}

        {users.length === 0 ? (
          <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-12)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Nenhum usuário ainda.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {users.map((user) => (
              <div key={user.id} style={{ ...cardStyle(), display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: '0 0 var(--space-1)' }}>{user.email}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
                    {user.verified
                      ? <span style={{ ...badgeStyle('green'), display: 'inline-flex', alignItems: 'center', padding: '0 var(--space-3)', height: '22px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)' }}>Verificado</span>
                      : <span style={{ ...badgeStyle('gray'), display: 'inline-flex', alignItems: 'center', padding: '0 var(--space-3)', height: '22px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)' }}>Pendente</span>
                    }
                    {(userRoles[user.id] ?? []).map((r) => (
                      <span key={r.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', padding: '0 var(--space-3)', height: '22px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', background: 'rgba(155, 142, 196, 0.12)', color: 'var(--semantic-purple)' }}>
                        {r.name}
                        <button onClick={() => handleRemoveRole(user.id, r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1, fontSize: '10px' }}>×</button>
                      </span>
                    ))}
                  </div>
                  {/* Assign role dropdown */}
                  <select
                    value=""
                    onChange={(e) => { if (e.target.value) handleAssignRole(user.id, e.target.value); }}
                    style={{ height: 'var(--control-md)', padding: '0 var(--space-3)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="">+ Atribuir perfil...</option>
                    {roles.filter((r) => !(userRoles[user.id] ?? []).some((ur) => ur.id === r.id)).map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => handleDelete(user.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', padding: 'var(--space-1)', transition: 'var(--transition-fast)' }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = 'var(--semantic-red)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = 'var(--text-muted)'}>
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
    </AuthLayout>
  );
}
