import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { resolveDashboardOwnerContext, type DashboardOwnerContext } from '../lib/dashboard-owner-context';

interface AppBinding {
  id: string;
  app_name: string;
  app_slug?: string;
  enable_2fa: boolean;
  enable_rbac: boolean;
}

type InventoryLifecycle = 'installed' | 'development';
type InventorySource = 'marketplace' | 'dev_link' | 'draft' | 'unknown';

interface PlayAppInventoryItem {
  id: string;
  inventory_id: string;
  lifecycle: InventoryLifecycle;
  source: InventorySource;
  app_slug: string | null;
  app_name: string;
  version: string | null;
  supports_auth: boolean;
  accepted_roles: string[];
  manifest_fingerprint: string | null;
  warnings: string[];
  last_seen_at: string;
  archived_at: string | null;
}

type InventoryAccess =
  | { status: 'loading' }
  | { status: 'ready' }
  | { status: 'missing-owner-context' }
  | { status: 'error'; message: string };

type RowState =
  | 'detected_with_binding'
  | 'detected_without_binding'
  | 'binding_not_detected'
  | 'development_draft'
  | 'archived'
  | 'binding_registered';

interface DashboardRow {
  key: string;
  appName: string;
  slug: string | null;
  lifecycle: InventoryLifecycle | 'binding';
  source: InventorySource | 'binding';
  state: RowState;
  lastSeenAt: string | null;
  version: string | null;
  supportsAuth: boolean;
  acceptedRoles: string[];
  warnings: string[];
  fingerprintPrefix: string | null;
  binding: AppBinding | null;
}

function bindingSlug(binding: AppBinding): string | null {
  const slug = binding.app_slug?.trim();
  return slug || null;
}

function buildRows(
  inventory: PlayAppInventoryItem[],
  bindings: AppBinding[],
  inventoryLoaded: boolean,
): DashboardRow[] {
  const bindingsBySlug = new Map<string, AppBinding>();
  for (const binding of bindings) {
    const slug = bindingSlug(binding);
    if (slug && !bindingsBySlug.has(slug)) bindingsBySlug.set(slug, binding);
  }

  const activeInventorySlugs = new Set(
    inventory
      .filter((item) => !item.archived_at && item.app_slug)
      .map((item) => item.app_slug as string),
  );

  const rows = inventory.map((item): DashboardRow => {
    const binding = item.app_slug ? bindingsBySlug.get(item.app_slug) ?? null : null;
    let state: RowState = 'detected_without_binding';
    if (item.archived_at) state = 'archived';
    else if (item.lifecycle === 'development') state = 'development_draft';
    else if (binding) state = 'detected_with_binding';

    return {
      key: `inventory:${item.id}`,
      appName: item.app_name,
      slug: item.app_slug,
      lifecycle: item.lifecycle,
      source: item.source,
      state,
      lastSeenAt: item.last_seen_at,
      version: item.version,
      supportsAuth: item.supports_auth,
      acceptedRoles: item.accepted_roles,
      warnings: item.warnings,
      fingerprintPrefix: item.manifest_fingerprint?.slice(0, 12) ?? null,
      binding,
    };
  });

  for (const binding of bindings) {
    const slug = bindingSlug(binding);
    const isMissing = inventoryLoaded && (!slug || !activeInventorySlugs.has(slug));
    if (!inventoryLoaded || isMissing) {
      rows.push({
        key: `binding:${binding.id}`,
        appName: binding.app_name || slug || 'App vinculado',
        slug,
        lifecycle: 'binding',
        source: 'binding',
        state: inventoryLoaded ? 'binding_not_detected' : 'binding_registered',
        lastSeenAt: null,
        version: null,
        supportsAuth: true,
        acceptedRoles: [],
        warnings: [],
        fingerprintPrefix: null,
        binding,
      });
    }
  }

  return rows.sort((a, b) => stateOrder(a.state) - stateOrder(b.state) || a.appName.localeCompare(b.appName));
}

function stateOrder(state: RowState): number {
  return {
    detected_with_binding: 0,
    detected_without_binding: 1,
    development_draft: 2,
    binding_not_detected: 3,
    archived: 4,
    binding_registered: 5,
  }[state];
}

function stateLabel(state: RowState): string {
  return {
    detected_with_binding: 'detectado com binding',
    detected_without_binding: 'detectado sem binding',
    binding_not_detected: 'binding sem app detectado',
    development_draft: 'draft em desenvolvimento',
    archived: 'arquivado',
    binding_registered: 'binding cadastrado',
  }[state];
}

function formatDate(value: string | null): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}

async function readError(response: Response): Promise<string> {
  const data = await response.json().catch(() => null) as { error?: string } | null;
  return data?.error ?? `HTTP ${response.status}`;
}

function inventoryHeaders(owner: DashboardOwnerContext): HeadersInit {
  return {
    Authorization: `Bearer ${owner.token}`,
    'X-Aioson-Play-Id': owner.playId,
  };
}

export default function DashboardPage() {
  const [bindings, setBindings] = useState<AppBinding[]>([]);
  const [inventory, setInventory] = useState<PlayAppInventoryItem[]>([]);
  const [access, setAccess] = useState<InventoryAccess>({ status: 'loading' });
  const [loadingBindings, setLoadingBindings] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  async function loadDashboard() {
    setLoadingBindings(true);
    setAccess({ status: 'loading' });
    try {
      const bindingsResponse = await fetch('/api/auth/bindings');
      if (!bindingsResponse.ok) throw new Error(await readError(bindingsResponse));
      const bindingData = await bindingsResponse.json() as AppBinding[];
      setBindings(Array.isArray(bindingData) ? bindingData : []);
    } catch (err) {
      setBindings([]);
      setAccess({ status: 'error', message: String(err instanceof Error ? err.message : err) });
      setLoadingBindings(false);
      return;
    } finally {
      setLoadingBindings(false);
    }

    let owner: DashboardOwnerContext | null;
    try {
      owner = await resolveDashboardOwnerContext();
    } catch (err) {
      setInventory([]);
      setAccess({ status: 'error', message: String(err instanceof Error ? err.message : err) });
      return;
    }

    if (!owner) {
      setInventory([]);
      setAccess({ status: 'missing-owner-context' });
      return;
    }

    try {
      const response = await fetch('/api/auth/admin/app-inventory', {
        headers: inventoryHeaders(owner),
      });
      if (!response.ok) throw new Error(await readError(response));
      const data = await response.json() as { items?: PlayAppInventoryItem[] };
      setInventory(Array.isArray(data.items) ? data.items : []);
      setAccess({ status: 'ready' });
    } catch (err) {
      setInventory([]);
      setAccess({ status: 'error', message: String(err instanceof Error ? err.message : err) });
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  const inventoryLoaded = access.status === 'ready';
  const rows = useMemo(
    () => buildRows(inventory, bindings, inventoryLoaded),
    [inventory, bindings, inventoryLoaded],
  );
  const selectedRow = rows.find((row) => row.key === selectedKey) ?? rows[0] ?? null;
  const metrics = {
    detected: inventory.filter((item) => !item.archived_at).length,
    withBinding: rows.filter((row) => row.state === 'detected_with_binding').length,
    withoutBinding: rows.filter((row) => row.state === 'detected_without_binding').length,
    staleBindings: rows.filter((row) => row.state === 'binding_not_detected').length,
    drafts: rows.filter((row) => row.state === 'development_draft').length,
    archived: rows.filter((row) => row.state === 'archived').length,
  };

  return (
    <AuthLayout
      title="Painel de Autenticação"
      subtitle="Vínculos, operadores e inventário detectado pelo AIOSON Play."
    >
      <section className="auth-summary" aria-label="Resumo do inventário">
        <span className="ao-chip ao-chip--primary">{metrics.detected} detectados</span>
        <span className="ao-chip ao-chip--secondary">{metrics.withBinding} com binding</span>
        <span className="ao-chip">{metrics.withoutBinding} sem binding</span>
        <span className="ao-chip">{metrics.drafts} drafts</span>
        <span className="ao-chip">{metrics.staleBindings} bindings sem app</span>
        <span className="ao-chip">{metrics.archived} arquivados</span>
      </section>

      <div className="auth-users-toolbar">
        <div className="auth-summary" style={{ marginBottom: 0 }}>
          <Link className="ao-btn ao-btn--secondary" to="/auth/users">Operadores</Link>
          <Link className="ao-btn ao-btn--secondary" to="/auth/settings">Configurações</Link>
        </div>
        <button className="ao-btn ao-btn--ghost" type="button" onClick={() => void loadDashboard()} disabled={loadingBindings || access.status === 'loading'}>
          {loadingBindings || access.status === 'loading' ? 'Atualizando' : 'Atualizar'}
        </button>
      </div>

      {access.status === 'missing-owner-context' && (
        <div className="ao-alert ao-alert--warning ao-alert--compact auth-message" role="status">
          <div className="ao-alert__content">
            <p className="ao-alert__body">
              Inventário owner-scoped indisponível neste origin. Abra o painel a partir de um contexto que forneça Bearer do owner e X-Aioson-Play-Id, ou sincronize pelo AIOSON Play.
            </p>
          </div>
        </div>
      )}

      {access.status === 'error' && (
        <div className="ao-alert ao-alert--danger ao-alert--compact auth-message" role="alert">
          <div className="ao-alert__content">
            <p className="ao-alert__body">{access.message}</p>
          </div>
        </div>
      )}

      <section className="ao-card ao-card--compact">
        <div className="ao-card__header">
          <div>
            <h2 className="ao-card__title">Inventário e vínculos</h2>
            <p className="ao-card__subtitle">Estados de inventário não autorizam acesso e não criam binding automaticamente.</p>
          </div>
        </div>

        {loadingBindings ? (
          <div className="auth-empty">
            <div>
              <h2>Carregando dashboard</h2>
              <p>Buscando vínculos e inventário sincronizado.</p>
            </div>
          </div>
        ) : rows.length === 0 ? (
          <div className="auth-empty">
            <div>
              <h2>Nenhum app no dashboard</h2>
              <p>Sincronize o inventário pelo AIOSON Play ou crie um vínculo manual.</p>
            </div>
          </div>
        ) : (
          <div className="ao-card__body ao-card__body--flush">
            <div className="ao-table-wrap">
              <table className="ao-table ao-table--compact">
                <thead>
                  <tr>
                    <th>App</th>
                    <th>Lifecycle</th>
                    <th>Auth binding</th>
                    <th>Última detecção</th>
                    <th>Avisos</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key} onClick={() => setSelectedKey(row.key)} style={{ cursor: 'pointer' }}>
                      <td>
                        <strong>{row.appName}</strong>
                        <p className="auth-table-note">{row.slug ?? row.key}</p>
                      </td>
                      <td>
                        <span className="ao-chip ao-chip--sm">{row.lifecycle}</span>
                        <p className="auth-table-note">{row.source}</p>
                      </td>
                      <td>
                        <span className={`ao-chip ao-chip--sm${row.state === 'detected_with_binding' ? ' ao-chip--primary' : ''}`}>
                          {stateLabel(row.state)}
                        </span>
                        {row.binding && (
                          <p className="auth-table-note">
                            {row.binding.enable_rbac ? 'RBAC' : 'básico'}{row.binding.enable_2fa ? ' / 2FA' : ''}
                          </p>
                        )}
                      </td>
                      <td className="ao-td--mono">{formatDate(row.lastSeenAt)}</td>
                      <td>
                        {row.warnings.length === 0 ? (
                          <span className="auth-table-note">-</span>
                        ) : (
                          <div className="auth-role-list">
                            {row.warnings.map((warning) => (
                              <span className="ao-chip ao-chip--sm" title={warning} key={warning}>{warning}</span>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {selectedRow && (
        <section className="ao-card ao-card--compact" style={{ marginTop: 'var(--ao-space-4)' }}>
          <div className="ao-card__header">
            <div>
              <h2 className="ao-card__title">{selectedRow.appName}</h2>
              <p className="ao-card__subtitle">{stateLabel(selectedRow.state)}</p>
            </div>
          </div>
          <div className="ao-card__body">
            <div className="auth-summary">
              <span className="ao-chip">slug: {selectedRow.slug ?? '-'}</span>
              <span className="ao-chip">versão: {selectedRow.version ?? '-'}</span>
              <span className="ao-chip">lifecycle: {selectedRow.lifecycle}</span>
              <span className="ao-chip">source: {selectedRow.source}</span>
              <span className="ao-chip">auth: {selectedRow.supportsAuth ? 'suportado' : 'não declarado'}</span>
              <span className="ao-chip">fingerprint: {selectedRow.fingerprintPrefix ?? '-'}</span>
            </div>
            <div className="auth-summary" style={{ marginBottom: 0 }}>
              {(selectedRow.acceptedRoles.length > 0 ? selectedRow.acceptedRoles : ['sem roles declarados']).map((role) => (
                <span className="ao-chip ao-chip--sm" key={role}>{role}</span>
              ))}
              {selectedRow.warnings.map((warning) => (
                <span className="ao-chip ao-chip--sm" title={warning} key={warning}>{warning}</span>
              ))}
            </div>
          </div>
        </section>
      )}
    </AuthLayout>
  );
}
