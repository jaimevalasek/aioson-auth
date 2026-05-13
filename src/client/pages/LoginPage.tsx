import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function safeRedirectPath(value: string | null) {
  if (!value || !value.startsWith('/auth/')) return '/auth/dashboard';
  return value;
}

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectPath = safeRedirectPath(searchParams.get('redirect'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.setAttribute('data-mode', 'work');
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('adminToken', data.accessToken);
      localStorage.setItem('adminEmail', data.user.email);
      window.location.href = redirectPath;
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-login" data-theme="dark" data-mode="work">
      <section className="ao-card auth-login-card" aria-labelledby="login-title">
        <div className="ao-card__body">
          <div className="auth-login-brand">
            <span className="auth-login-mark">A</span>
            <div>
              <h1 className="auth-login-title" id="login-title">AIOSON Auth</h1>
              <p className="auth-login-subtitle">Painel administrativo</p>
            </div>
          </div>

          {error && (
            <div className="ao-alert ao-alert--danger ao-alert--compact auth-message" role="alert">
              <div className="ao-alert__content">
                <p className="ao-alert__body">{error}</p>
              </div>
            </div>
          )}

          <form className="auth-login-form" onSubmit={handleSubmit}>
            <label className="ao-field">
              <span className="ao-field__label">E-mail</span>
              <input className="ao-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>

            <label className="ao-field">
              <span className="ao-field__label">Senha</span>
              <input className="ao-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>

            <button className="ao-btn ao-btn--primary ao-btn--lg" type="submit" disabled={loading}>
              {loading ? 'Entrando' : 'Entrar'}
            </button>
          </form>

          <p className="auth-login-hint">Primeiro acesso: admin@admin.com / 12345678</p>
        </div>
      </section>
    </main>
  );
}
