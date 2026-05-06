import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

interface GlobalUser {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
}

interface Binding {
  id: string;
  app_name: string;
  enable_rbac: boolean;
}

interface RoleInfo {
  role: { id: string; name: string; description: string };
  permissions: string[];
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

function inputStyle() {
  return {
    width: '100%' as const,
    height: 'var(--control-md)',
    padding: '0 var(--space-3)',
    background: 'var(--bg-base)',
    border: '1px solid var(--border-medium)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-heading)',
    outline: 'none',
  };
}

export default function GlobalUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<GlobalUser[]>([]);
  const [bindings, setBindings] = useState<Binding[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, RoleInfo[]>>({});
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedBinding, setSelectedBinding] = useState('');
  const [creating, setCreating] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const bindingsRes = await fetch('/api/auth/bindings');
      const bindingsData = bindingsRes.ok ? await bindingsRes.json() : [];
      const rbacBindings = (bindingsData || []).filter((b: Binding) => b.enable_rbac) as Binding[];
      setBindings(bindingsData || []);

      // Load all global roles
      if (rbacBindings.length > 0) {
        const rolesRes = await fetch(`/api/auth/${rbacBindings[0].id}/rbac/roles`);
        const rolesData = rolesRes.ok ? await rolesRes.json() : [];
        setRoles(rolesData || []);
        setSelectedBinding(rbacBindings[0].id);
      }

      if (rbacBindings.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Load users from first RBAC binding
      const firstBindingId = rbacBindings[0].id;
      const usersRes = await fetch(`/api/auth/${firstBindingId}/rbac/users`);
      const usersData = usersRes.ok ? await usersRes.json() : [];
      setUsers(usersData || []);

      // Load roles for each user per binding
      const rolesMap: Record<string, RoleInfo[]> = {};
      for (const user of usersData || []) {
        for (const binding of rbacBindings) {
          const userRolesRes = await fetch(`/api/auth/${binding.id}/rbac/users/${user.id}`);
          if (userRolesRes.ok) {
            const data = await userRolesRes.json();
            if (Array.isArray(data) && data.length > 0) {
              if (!rolesMap[user.id]) rolesMap[user.id] = [];
              rolesMap[user.id] = [...rolesMap[user.id], ...data];
            }
          }
        }
      }
      setUserRoles(rolesMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createUser() {
    if (!newEmail || !newPassword) return;
    setCreating(true);
    setMsg(null);

    try {
      const rbacBindings = bindings.filter((b) => b.enable_rbac);
      // Usa qualquer binding se não houver RBAC — register é global
      const anyBinding = bindings[0];
      const bindingId = anyBinding?.id;

      if (!bindingId) {
        setMsg({ type: 'error', text: 'Nenhum vínculo encontrado. Cadastre um vínculo primeiro.' });
        return;
      }

      // Register user (global — não precisa de RBAC)
      const res = await fetch(`/api/auth/${bindingId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, password: newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
        setMsg({ type: 'error', text: data.error || 'Erro ao criar usuário' });
        return;
      }

      // If RBAC binding and role selected, assign it
      if (selectedRole && selectedBinding) {
        const loginRes = await fetch(`/api/auth/${selectedBinding}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newEmail, password: newPassword }),
        });
        if (loginRes.ok) {
          const loginData = await loginRes.json();
          await fetch(`/api/auth/${selectedBinding}/rbac/users/${loginData.user.id}/roles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roleId: selectedRole }),
          });
        }
      }

      setNewEmail('');
      setNewPassword('');
      setNewName('');
      setSelectedRole('');
      setShowCreate(false);
      setMsg({ type: 'success', text: 'Usuário criado com sucesso.' });
      await loadData();
    } catch (err) {
      setMsg({ type: 'error', text: String(err) });
    } finally {
      setCreating(false);
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm('Remover este usuário?')) return;
    const rbacBindings = bindings.filter((b) => b.enable_rbac);
    if (rbacBindings.length === 0) return;
    await fetch(`/api/auth/${rbacBindings[0].id}/rbac/users/${userId}`, { method: 'DELETE' });
    await loadData();
  }

  const rbacBindings = bindings.filter((b) => b.enable_rbac);

  return (
    <AuthLayout
      title="Usuários Globais"
      subtitle="Todos os usuários do sistema. Atribua perfis para cada app."
      onBack={() => navigate('/auth/dashboard')}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            height: 'var(--control-md)',
            padding: '0 var(--space-5)',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-semibold)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Novo Usuário
        </button>
      </div>

      {msg && (
        <div style={{
          marginBottom: 'var(--space-6)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-medium)',
          ...(msg.type === 'success'
            ? { background: 'rgba(81, 207, 167, 0.12)', color: 'rgb(81, 207, 167)' }
            : { background: 'rgba(239, 68, 68, 0.12)', color: 'rgb(239, 68, 68)' }),
        }}>
          {msg.text}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-8)' }}>Carregando...</p>
      ) : rbacBindings.length === 0 ? (
        <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
            Nenhum vínculo com RBAC ativo.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
            Crie um vínculo com RBAC para gerenciar usuários.
          </p>
        </div>
      ) : users.length === 0 ? (
        <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum usuário cadastrado.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {users.map((user) => (
            <div key={user.id} style={{ ...cardStyle() }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: '0 0 2px', fontSize: 'var(--text-sm)' }}>
                    {user.name || '—'}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--text-xs)' }}>{user.email}</p>
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{
                    padding: 'var(--space-2)',
                    background: 'transparent',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(239, 68, 68)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>

              {/* Roles per binding */}
              {(userRoles[user.id] || []).length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                  {(userRoles[user.id] || []).map((ri, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px var(--space-2)',
                        background: 'rgba(155, 142, 196, 0.12)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--weight-medium)',
                        color: 'var(--semantic-purple)',
                      }}>
                        {ri.role.name}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                        {ri.permissions.length} permissão{ri.permissions.length !== 1 ? 'ões' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
          }}
          onClick={() => setShowCreate(false)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              width: '100%',
              maxWidth: '440px',
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-lg)',
                background: 'var(--accent-dim)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-strong)" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--weight-semibold)',
                  color: 'var(--text-heading)',
                  margin: 0,
                }}>
                  Novo Usuário
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0 }}>
                  O usuário recebe acesso aos apps onde o perfil for atribuído.
                </p>
              </div>
            </div>

            {msg && msg.type === 'error' && (
              <div style={{
                marginBottom: 'var(--space-4)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.12)',
                color: 'rgb(239, 68, 68)',
                fontSize: 'var(--text-sm)',
              }}>
                {msg.text}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Nome</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={inputStyle()}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</label>
                <input
                  type="email"
                  placeholder="usuario@exemplo.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={inputStyle()}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Senha</label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={inputStyle()}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Role assignment — only if roles and RBAC bindings exist */}
              {roles.length > 0 && rbacBindings.length > 0 && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>App</label>
                    <select
                      value={selectedBinding}
                      onChange={(e) => setSelectedBinding(e.target.value)}
                      style={{ ...inputStyle(), cursor: 'pointer' }}
                    >
                      <option value="">Selecione o app...</option>
                      {rbacBindings.map((b) => (
                        <option key={b.id} value={b.id}>{b.app_name}</option>
                      ))}
                    </select>
                  </div>

                  {selectedBinding && (
                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Perfil (opcional)</label>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        style={{ ...inputStyle(), cursor: 'pointer' }}
                      >
                        <option value="">Nenhum — atribuir depois</option>
                        {roles.map((r) => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => { setShowCreate(false); setMsg(null); }}
                style={{
                  height: 'var(--control-md)',
                  padding: '0 var(--space-5)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-medium)',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={createUser}
                disabled={creating || !newEmail || !newPassword}
                style={{
                  height: 'var(--control-md)',
                  padding: '0 var(--space-6)',
                  background: creating || !newEmail || !newPassword ? 'var(--accent-dim)' : 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-semibold)',
                  cursor: creating || !newEmail || !newPassword ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition-fast)',
                }}
              >
                {creating ? 'Criando...' : 'Criar Usuário'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
