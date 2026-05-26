import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SsoLoginPage() {
  const [searchParams] = useSearchParams();
  const bindingId = searchParams.get('binding_id') ?? '';
  const redirectUri = searchParams.get('redirect_uri') ?? '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/sso/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, binding_id: bindingId, redirect_uri: redirectUri }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login falhou');
        return;
      }

      // Server set the SSO cookie and returned the redirect URL with tokens
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  if (!bindingId || !redirectUri) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Erro de configuração</h1>
          <p style={subtitleStyle}>Parâmetros binding_id e redirect_uri são obrigatórios.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6, 24px)' }}>
          <h1 style={titleStyle}>AIOSON</h1>
          <p style={subtitleStyle}>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-4, 16px)' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={inputStyle}
              placeholder="seu@email.com"
            />
          </div>

          <div style={{ marginBottom: 'var(--space-4, 16px)' }}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={errorStyle}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f3f5f8',
  padding: '16px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  background: '#fff',
  borderRadius: '14px',
  border: '1px solid #dde2ea',
  padding: '32px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  color: '#111827',
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
  marginTop: '4px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  marginBottom: '4px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  border: '1px solid #dde2ea',
  borderRadius: '8px',
  background: '#f9fafb',
  outline: 'none',
  boxSizing: 'border-box',
};

const errorStyle: React.CSSProperties = {
  padding: '10px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1px solid #fca5a5',
  background: '#fef2f2',
  color: '#dc2626',
  fontSize: '13px',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#fff',
  background: '#22c55e',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};
