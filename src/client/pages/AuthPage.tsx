import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createAuthClient, AuthError } from '@aioson/auth-sdk';

type Tab = 'login' | 'register' | 'forgot';

function describeError(err: unknown): string {
  if (err instanceof AuthError) {
    // `code` é normalizado pelo SDK — útil pra i18n futura.
    return err.message;
  }
  return String(err);
}

function tabStyle(active: boolean) {
  return {
    flex: 1,
    padding: 'var(--space-2)',
    textAlign: 'center' as const,
    borderRadius: 'var(--radius-lg)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-medium)' as const,
    transition: 'var(--transition-fast)',
    background: active ? 'var(--bg-surface)' : 'transparent',
    color: active ? 'var(--accent-strong)' : 'var(--text-secondary)',
    boxShadow: active ? 'var(--shadow-sm)' : 'none',
    border: 'none',
    cursor: 'pointer',
  };
}

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const bindingId = searchParams.get('binding') ?? '';

  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dogfooding do @aioson/auth-sdk. baseUrl vazio = same-origin (a UI é
  // servida pelo mesmo Express). Storage default = memoryStorage (tokens
  // só vivem nessa página — login real seria persistido pelo app cliente).
  const auth = useMemo(() => {
    if (!bindingId) return null;
    return createAuthClient({ baseUrl: window.location.origin, bindingId });
  }, [bindingId]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) { setMessage({ type: 'error', text: 'Binding ID é obrigatório' }); return; }
    setLoading(true);
    setMessage(null);
    try {
      const session = await auth.login({ email, password });
      const perms = auth.getPermissions();
      const permsText = perms && perms.length > 0 ? ` · permissions: ${perms.join(', ')}` : '';
      setMessage({ type: 'success', text: `Login OK: ${session.user.email}${permsText}` });
    } catch (err) {
      setMessage({ type: 'error', text: describeError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) { setMessage({ type: 'error', text: 'Binding ID é obrigatório' }); return; }
    setLoading(true);
    setMessage(null);
    try {
      await auth.register({ email, password });
      setMessage({ type: 'success', text: 'Conta criada! Verifique seu e-mail para confirmar o cadastro.' });
    } catch (err) {
      setMessage({ type: 'error', text: describeError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) { setMessage({ type: 'error', text: 'Binding ID é obrigatório' }); return; }
    setLoading(true);
    setMessage(null);
    try {
      await auth.forgotPassword({ email });
      setMessage({ type: 'success', text: 'E-mail de recuperação enviado.' });
    } catch (err) {
      setMessage({ type: 'error', text: describeError(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      data-theme="light"
      style={{
        background: 'var(--bg-base)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--text-heading)',
            textAlign: 'center',
            margin: '0 0 var(--space-6)',
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          aioson-auth
        </h1>

        {bindingId ? (
          <p
            style={{
              textAlign: 'center',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 'var(--space-5)',
            }}
          >
            {bindingId}
          </p>
        ) : (
          <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--semantic-red)', marginBottom: 'var(--space-5)' }}>
            ⚠ Nenhum binding especificado
          </p>
        )}

        <div
          style={{
            display: 'flex',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-1)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {(['login', 'register', 'forgot'] as Tab[]).map((t) => (
            <button key={t} onClick={() => { setTab(t); setMessage(null); }} style={tabStyle(tab === t)}>
              {t === 'login' ? 'Entrar' : t === 'register' ? 'Cadastrar' : 'Esqueci'}
            </button>
          ))}
        </div>

        {message && (
          <div
            style={{
              marginBottom: 'var(--space-4)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)',
              ...(message.type === 'success'
                ? { background: 'var(--semantic-green-dim)', color: 'var(--semantic-green)' }
                : { background: 'var(--semantic-red-dim)', color: 'var(--semantic-red)' }),
            }}
          >
            {message.text}
          </div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>

          {tab !== 'forgot' && (
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            </div>
          )}

          <button
            type="button"
            onClick={tab === 'login' ? handleLogin : tab === 'register' ? handleRegister : handleForgot}
            disabled={loading}
            style={{
              width: '100%',
              height: 'var(--control-md)',
              background: loading ? 'var(--accent-dim)' : 'var(--accent)',
              color: 'var(--accent-contrast)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'var(--transition-fast)',
              marginTop: 'var(--space-2)',
            }}
            onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.background = 'var(--accent-hover)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--accent)'; }}
          >
            {loading ? 'Aguarde...' : tab === 'login' ? 'Entrar' : tab === 'register' ? 'Cadastrar' : 'Recuperar senha'}
          </button>
        </form>
      </div>
    </div>
  );
}
