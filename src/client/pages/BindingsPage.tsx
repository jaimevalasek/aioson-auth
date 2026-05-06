import { useState, useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';

type TauriInvoke = <T>(cmd: string) => Promise<T>;
let _invoke: TauriInvoke | null = null;
async function getTauriInvoke(): Promise<TauriInvoke | null> {
  if (_invoke !== null) return _invoke;
  try {
    const mod = await import('@tauri-apps/api/core');
    _invoke = mod.invoke as TauriInvoke;
  } catch {
    _invoke = null;
  }
  return _invoke;
}

interface AppBinding {
  id: string;
  app_name: string;
  connection_name: string;
  enable_2fa: boolean;
  enable_rbac: boolean;
  auth_schema: string;
  created_at: string;
  updated_at: string;
}

interface DbConnection {
  name: string;
  driver: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  file_path?: string;
  ssl?: boolean;
  auth_source?: string;
  supabase_url?: string;
  created_at?: string;
}

interface InstalledApp {
  slug: string;
  name: string;
  version: string;
  description: string;
}

function cardStyle() {
  return {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-base)' as const,
  };
}

function badgeStyle(variant: 'accent' | 'purple' | 'gray') {
  const variants = {
    accent: { background: 'rgba(224, 122, 95, 0.12)', color: 'var(--accent-strong)' },
    purple: { background: 'rgba(155, 142, 196, 0.12)', color: 'var(--semantic-purple)' },
    gray: { background: 'var(--bg-elevated)', color: 'var(--text-secondary)' },
  };
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 var(--space-3)',
    height: '24px',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-medium)',
    ...variants[variant],
  };
}

export default function BindingsPage() {
  const [bindings, setBindings] = useState<AppBinding[]>([]);
  const [connections, setConnections] = useState<DbConnection[]>([]);
  const [apps, setApps] = useState<InstalledApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    app_name: '',
    connection_name: '',
    enable_2fa: false,
    enable_rbac: false,
  });

  useEffect(() => {
    loadBindings();
    loadConnections();
    loadApps();
  }, []);

  async function loadBindings() {
    try {
      const res = await fetch('/api/auth/bindings');
      if (res.ok) setBindings(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadConnections() {
    try {
      const inv = await getTauriInvoke();
      if (!inv) { setConnections([]); return; }
      const conns = await inv<DbConnection[]>('list_db_connections');
      setConnections(Array.isArray(conns) ? conns : []);
    } catch {
      setConnections([]);
    }
  }

  async function loadApps() {
    try {
      const inv = await getTauriInvoke();
      if (!inv) { setApps([]); return; }
      const installedApps = await inv<InstalledApp[]>('list_installed_apps');
      setApps(Array.isArray(installedApps) ? installedApps : []);
    } catch {
      setApps([]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/bindings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create binding');
      }
      const data = await res.json();
      setBindings((prev) => [data, ...prev]);
      setShowForm(false);
      setForm({ app_name: '', connection_name: '', enable_2fa: false, enable_rbac: false });
      setMessage({ type: 'success', text: 'Vínculo criado com sucesso. Migrações aplicadas.' });
    } catch (err) {
      setMessage({ type: 'error', text: String(err) });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover este vínculo?')) return;
    try {
      const res = await fetch(`/api/auth/bindings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setBindings((prev) => prev.filter((b) => b.id !== id));
      setMessage({ type: 'success', text: 'Vínculo removido.' });
    } catch {
      setMessage({ type: 'error', text: 'Falha ao remover vínculo.' });
    }
  }

  if (loading) {
    return (
      <AuthLayout title="Vínculos de Apps">
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Vínculos de Apps"
      subtitle="Conecte um app ao aioson-auth e ative os módulos desejados."
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
        <button
          onClick={() => setShowForm((v) => !v)}
            style={{
              padding: '0 var(--space-5)',
              height: 'var(--control-md)',
              background: 'var(--accent)',
              color: 'var(--accent-contrast)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = 'var(--accent-hover)'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = 'var(--accent)'}
          >
            {showForm ? 'Cancelar' : '+ Novo Vínculo'}
          </button>
        </div>

        {message && (
          <div style={{
            marginBottom: 'var(--space-6)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            ...(message.type === 'success'
              ? { background: 'var(--semantic-green-dim)', color: 'var(--semantic-green)' }
              : { background: 'var(--semantic-red-dim)', color: 'var(--semantic-red)' }),
          }}>
            {message.text}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              ...cardStyle(),
              marginBottom: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                Nome do App
              </label>
              {apps.length > 0 ? (
                <select
                  required
                  value={form.app_name}
                  onChange={(e) => setForm((f) => ({ ...f, app_name: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 'var(--control-md)',
                    padding: '0 var(--space-4)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-heading)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                >
                  <option value="">Selecione um app...</option>
                  {apps.map((a) => (
                    <option key={a.slug} value={a.slug}>{a.name} ({a.slug})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  value={form.app_name}
                  onChange={(e) => setForm((f) => ({ ...f, app_name: e.target.value }))}
                  placeholder="slug-do-app"
                  style={{
                    width: '100%',
                    height: 'var(--control-md)',
                    padding: '0 var(--space-4)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-heading)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                />
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                Conexão de Banco
              </label>
              {connections.length > 0 ? (
                <select
                  required
                  value={form.connection_name}
                  onChange={(e) => setForm((f) => ({ ...f, connection_name: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 'var(--control-md)',
                    padding: '0 var(--space-4)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-heading)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                >
                  <option value="">Selecione uma conexão...</option>
                  {connections.map((c) => (
                    <option key={c.name} value={c.name}>{c.name} ({c.driver})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  value={form.connection_name}
                  onChange={(e) => setForm((f) => ({ ...f, connection_name: e.target.value }))}
                  placeholder="Nome da conexão no AIOSON Play"
                  style={{
                    width: '100%',
                    height: 'var(--control-md)',
                    padding: '0 var(--space-4)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-heading)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-medium)'; e.target.style.boxShadow = 'none'; }}
                />
              )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.enable_2fa}
                  onChange={(e) => setForm((f) => ({ ...f, enable_2fa: e.target.checked }))}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)' }}>
                  Ativar 2FA
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>(Google Authenticator)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.enable_rbac}
                  onChange={(e) => setForm((f) => ({ ...f, enable_rbac: e.target.checked }))}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)' }}>
                  Ativar RBAC
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>(Roles e Permissions)</span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '0 var(--space-5)',
                  height: 'var(--control-md)',
                  background: submitting ? 'var(--accent-dim)' : 'var(--accent)',
                  color: 'var(--accent-contrast)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-semibold)',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => { if (!submitting) (e.target as HTMLButtonElement).style.background = 'var(--accent-hover)'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--accent)'; }}
              >
                {submitting ? 'Criando...' : 'Criar Vínculo'}
              </button>
            </div>
          </form>
        )}

        {bindings.length === 0 && !showForm ? (
          <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-12)' }}>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              Nenhum vínculo ainda. Clique em "+ Novo Vínculo" para começar.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {bindings.map((binding) => (
              <div
                key={binding.id}
                style={{
                  ...cardStyle(),
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--text-heading)',
                    margin: '0 0 var(--space-1)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}>
                    {binding.app_name}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {binding.connection_name}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                    {binding.enable_2fa && <span style={badgeStyle('accent')}>2FA</span>}
                    {binding.enable_rbac && <span style={badgeStyle('purple')}>RBAC</span>}
                    {!binding.enable_2fa && !binding.enable_rbac && <span style={badgeStyle('gray')}>Básico</span>}
                  </div>
                  <p style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    marginTop: 'var(--space-2)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    Schema: {binding.auth_schema}
                  </p>
                  {binding.enable_rbac && (
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                      <a href={`/auth/bindings/${binding.id}/users`} style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-strong)', textDecoration: 'none', fontWeight: 'var(--weight-medium)' }}>Usuários</a>
                      <a href={`/auth/bindings/${binding.id}/roles`} style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-strong)', textDecoration: 'none', fontWeight: 'var(--weight-medium)' }}>Perfis</a>
                      <a href={`/auth/bindings/${binding.id}/permissions`} style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-strong)', textDecoration: 'none', fontWeight: 'var(--weight-medium)' }}>Permissões</a>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(binding.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    transition: 'var(--transition-fast)',
                    padding: 'var(--space-1)',
                  }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = 'var(--semantic-red)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = 'var(--text-muted)'}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
    </AuthLayout>
  );
}
