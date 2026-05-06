import { useState, useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';

interface Settings {
  google_client_id: string | null;
  google_client_secret: string | null;
  github_client_id: string | null;
  github_client_secret: string | null;
  smtp_host: string | null;
  smtp_port: number | null;
  smtp_user: string | null;
  smtp_pass: string | null;
  smtp_from_email: string | null;
}

const emptySettings: Settings = {
  google_client_id: '',
  google_client_secret: '',
  github_client_id: '',
  github_client_secret: '',
  smtp_host: '',
  smtp_port: 587,
  smtp_user: '',
  smtp_pass: '',
  smtp_from_email: '',
};

function cardStyle() {
  return {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--shadow-sm)',
  };
}

function sectionStyle() {
  return {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-5)',
  };
}

function sectionHeader(icon: React.ReactNode, title: string, subtitle: string) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--accent-dim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-heading)',
          margin: 0,
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.4 }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function fieldRow(children: React.ReactNode) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'var(--space-4)',
    }}>
      {children}
    </div>
  );
}

function Field({
  label,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-2)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.04em',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: 'var(--control-md)',
          padding: '0 var(--space-3)',
          background: 'var(--bg-base)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-heading)',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px var(--accent-dim)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-medium)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/settings')
      .then((r) => r.json())
      .then((data: Settings) => {
        setSettings({
          google_client_id: data.google_client_id ?? '',
          google_client_secret: data.google_client_secret ? '••••••••' : '',
          github_client_id: data.github_client_id ?? '',
          github_client_secret: data.github_client_secret ? '••••••••' : '',
          smtp_host: data.smtp_host ?? '',
          smtp_port: data.smtp_port ?? 587,
          smtp_user: data.smtp_user ?? '',
          smtp_pass: data.smtp_pass ? '••••••••' : '',
          smtp_from_email: data.smtp_from_email ?? '',
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleChange(field: keyof Settings, value: string | number) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload: Partial<Settings> = {
      google_client_id: settings.google_client_id || null,
      google_client_secret: settings.google_client_secret && !settings.google_client_secret.startsWith('•') ? settings.google_client_secret : undefined,
      github_client_id: settings.github_client_id || null,
      github_client_secret: settings.github_client_secret && !settings.github_client_secret.startsWith('•') ? settings.github_client_secret : undefined,
      smtp_host: settings.smtp_host || null,
      smtp_port: settings.smtp_port || null,
      smtp_user: settings.smtp_user || null,
      smtp_pass: settings.smtp_pass && !settings.smtp_pass.startsWith('•') ? settings.smtp_pass : undefined,
      smtp_from_email: settings.smtp_from_email || null,
    };

    try {
      const res = await fetch('/api/auth/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso.' });
    } catch {
      setMessage({ type: 'error', text: 'Falha ao salvar. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AuthLayout title="Configurações Globais" subtitle="Configure OAuth e SMTP para todos os apps.">
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Configurações Globais"
      subtitle="Configure OAuth e SMTP para todos os apps vinculados."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {message && (
          <div style={{
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            ...(message.type === 'success'
              ? { background: 'rgba(81, 207, 167, 0.12)', color: 'rgb(81, 207, 167)' }
              : { background: 'rgba(239, 68, 68, 0.12)', color: 'rgb(239, 68, 68)' }),
          }}>
            {message.text}
          </div>
        )}

        {/* OAuth */}
        <div style={cardStyle()}>
          <div style={sectionStyle()}>
            {sectionHeader(
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>,
              'Login Social (OAuth)',
              'Google e GitHub para autenticação via provedor.'
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                <Field
                  label="Google Client ID"
                  value={settings.google_client_id}
                  onChange={(v) => handleChange('google_client_id', v)}
                />
                <Field
                  label="Google Client Secret"
                  type="password"
                  value={settings.google_client_secret}
                  onChange={(v) => handleChange('google_client_secret', v)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                <Field
                  label="GitHub Client ID"
                  value={settings.github_client_id}
                  onChange={(v) => handleChange('github_client_id', v)}
                />
                <Field
                  label="GitHub Client Secret"
                  type="password"
                  value={settings.github_client_secret}
                  onChange={(v) => handleChange('github_client_secret', v)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SMTP */}
        <div style={cardStyle()}>
          <div style={sectionStyle()}>
            {sectionHeader(
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>,
              'E-mail (SMTP)',
              'Servidor de envio de e-mails para recuperação de senha e notificações.'
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
                <Field
                  label="Host"
                  value={settings.smtp_host}
                  onChange={(v) => handleChange('smtp_host', v)}
                />
                <Field
                  label="Porta"
                  type="number"
                  value={String(settings.smtp_port ?? 587)}
                  onChange={(v) => handleChange('smtp_port', Number(v))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                <Field
                  label="Usuário"
                  value={settings.smtp_user}
                  onChange={(v) => handleChange('smtp_user', v)}
                />
                <Field
                  label="Senha"
                  type="password"
                  value={settings.smtp_pass}
                  onChange={(v) => handleChange('smtp_pass', v)}
                />
              </div>

              <Field
                label="From Email"
                type="email"
                value={settings.smtp_from_email}
                onChange={(v) => handleChange('smtp_from_email', v)}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              height: 'var(--control-md)',
              padding: '0 var(--space-6)',
              background: saving ? 'var(--accent-dim)' : 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => { if (!saving) (e.target as HTMLButtonElement).style.background = 'var(--accent-hover)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--accent)'; }}
          >
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
