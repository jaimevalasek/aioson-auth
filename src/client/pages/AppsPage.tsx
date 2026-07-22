import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { ensureOwnerContext } from '../lib/owner-fetch';

interface AppBinding {
  id: string;
  app_name: string;
  app_slug: string;
  auth_mode?: string;
  manifest_sync_status?: string;
  manifest_sync_error?: string | null;
  enable_rbac: boolean;
}

export default function AppsPage() {
  const [apps, setApps] = useState<AppBinding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      // Consome o handoff one-time antes de qualquer navegação interna. Sem
      // isso, clicar em Gerenciar descartaria o código antes de ele ser salvo.
      await ensureOwnerContext();
      const response = await fetch('/api/auth/bindings');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  return (
    <AuthLayout title="Apps" subtitle="Escolha um app para gerenciar quem pode entrar e, quando existirem, seus perfis.">
      {error && <div className="ao-alert ao-alert--danger auth-message" role="alert">{error}</div>}
      <section className="ao-card ao-card--compact">
        <div className="ao-card__header">
          <div>
            <h2 className="ao-card__title">Apps conectados</h2>
            <p className="ao-card__subtitle">As permissões são declaradas pelo próprio app e sincronizadas automaticamente.</p>
          </div>
          <button className="ao-btn ao-btn--ghost ao-btn--sm" onClick={() => void load()} disabled={loading} type="button">
            {loading ? 'Atualizando' : 'Atualizar'}
          </button>
        </div>
        {loading ? (
          <div className="auth-empty"><div><h2>Carregando apps</h2><p>Buscando vínculos de autenticação.</p></div></div>
        ) : apps.length === 0 ? (
          <div className="auth-empty"><div><h2>Nenhum app conectado</h2><p>Abra um app com autenticação pelo AIOSON Play para criar o primeiro vínculo.</p></div></div>
        ) : (
          <div className="ao-card__body ao-card__body--flush">
            <div className="ao-table-wrap">
              <table className="ao-table ao-table--compact">
                <thead><tr><th>App</th><th>Modo</th><th>Sincronização</th><th aria-label="Ações" /></tr></thead>
                <tbody>{apps.map((app) => (
                  <tr key={app.id}>
                    <td><strong>{app.app_name}</strong><p className="auth-table-note">{app.app_slug || app.id}</p></td>
                    <td><span className="ao-chip ao-chip--sm">{app.enable_rbac ? 'Perfis e permissões' : 'Somente autenticação'}</span></td>
                    <td>
                      <span className={`ao-chip ao-chip--sm${app.manifest_sync_status === 'failed' ? ' ao-chip--warning' : ' ao-chip--primary'}`}>
                        {app.manifest_sync_status === 'failed' ? 'Falha no sync' : 'Sincronizado'}
                      </span>
                    </td>
                    <td><Link className="ao-btn ao-btn--secondary ao-btn--sm" to={`/auth/apps/${app.id}`}>Gerenciar</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </AuthLayout>
  );
}
