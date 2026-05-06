import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface AppBinding {
  id: string;
  app_name: string;
  connection_name: string;
  enable_2fa: boolean;
  enable_rbac: boolean;
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

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: '0 var(--space-3)',
        height: 'var(--control-md)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        transition: 'var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)';
        e.currentTarget.style.color = 'var(--text-heading)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-medium)';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
      {theme === 'dark' ? 'Escuro' : 'Claro'}
    </button>
  );
}

export default function DashboardPage() {
  const [bindings, setBindings] = useState<AppBinding[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const adminEmail = localStorage.getItem('adminEmail') || '';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    loadBindings();
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

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--bg-base)',
        minHeight: '100vh',
        padding: 'var(--space-10) var(--space-4)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-lg)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-10)' }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--text-heading)',
              letterSpacing: 'var(--tracking-tight)',
              margin: '0 0 var(--space-2)',
            }}>
              Painel de Autenticação
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--text-sm)' }}>
              Gerencie auth dos seus apps vinculados.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{adminEmail}</span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Navigation cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
          <Link to="/auth/bindings" style={{ textDecoration: 'none' }}>
            <div style={{ ...cardStyle(), cursor: 'pointer', transition: 'var(--transition-base)' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-lg)', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: 0 }}>Vínculos</h3>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Cadastrar e gerenciar apps vinculados ao auth.
              </p>
            </div>
          </Link>

          <Link to="/auth/settings" style={{ textDecoration: 'none' }}>
            <div style={{ ...cardStyle(), cursor: 'pointer', transition: 'var(--transition-base)' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(155, 142, 196, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--semantic-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: 0 }}>Configurações</h3>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                OAuth, SMTP e configurações globais.
              </p>
            </div>
          </Link>

          <Link to="/auth/users" style={{ textDecoration: 'none' }}>
            <div style={{ ...cardStyle(), cursor: 'pointer', transition: 'var(--transition-base)' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-lg)', background: 'rgba(81, 207, 167, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(81, 207, 167)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-heading)', margin: 0 }}>Usuários Globais</h3>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Gerenciar usuários e perfís de todos os vínculos.
              </p>
            </div>
          </Link>
        </div>

        {/* Apps with bindings */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-heading)',
            margin: '0 0 var(--space-1)',
            letterSpacing: 'var(--tracking-tight)',
          }}>
            Apps Vinculados
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            Clique em um app para gerenciar usuários, perfis e permissões.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Carregando...</p>
          </div>
        ) : bindings.length === 0 ? (
          <div style={{ ...cardStyle(), textAlign: 'center', padding: 'var(--space-12)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              Nenhum app vinculado ainda.
            </p>
            <Link to="/auth/bindings" style={{ color: 'var(--accent-strong)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
              Criar primeiro vínculo →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
            {bindings.map((binding) => (
              <div key={binding.id} style={{ ...cardStyle() }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
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
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                    {binding.connection_name}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
                    {binding.enable_2fa && <span style={badgeStyle('accent')}>2FA</span>}
                    {binding.enable_rbac && <span style={badgeStyle('purple')}>RBAC</span>}
                    {!binding.enable_2fa && !binding.enable_rbac && <span style={badgeStyle('gray')}>Básico</span>}
                  </div>
                </div>

                {/* Auth URL */}
                <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-1)' }}>URL de acesso</p>
                  <code style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-strong)', fontFamily: 'var(--font-mono)' }}>
                    /auth/{binding.id}
                  </code>
                </div>

                {/* Management links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {binding.enable_rbac && (
                    <>
                      <Link
                        to={`/auth/bindings/${binding.id}/users`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          padding: 'var(--space-2) var(--space-3)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-elevated)',
                          textDecoration: 'none',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-heading)',
                          transition: 'var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-dim)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Usuários
                      </Link>
                      <Link
                        to={`/auth/bindings/${binding.id}/roles`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          padding: 'var(--space-2) var(--space-3)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-elevated)',
                          textDecoration: 'none',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-heading)',
                          transition: 'var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-dim)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Perfis e Permissões
                      </Link>
                    </>
                  )}
                  <Link
                    to={`/auth/bindings`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-elevated)',
                      textDecoration: 'none',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-dim)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Editar Vínculo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
