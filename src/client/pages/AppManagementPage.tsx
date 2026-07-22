import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { ownerFetch, readOwnerError } from '../lib/owner-fetch';

interface Permission { id: string; name: string; resource: string; action: string }
interface Profile {
  id: string; name: string; description: string; is_system: boolean;
  permissions: Array<{ permission: Permission }>;
}
interface Access {
  user_id: string; status: string;
  user: { id: string; email: string; name: string; disabled_at: string | null };
  profile: Profile;
}
interface Management {
  binding: {
    id: string; app_name: string; app_slug: string; enable_rbac: boolean;
    manifest_sync_status: string; manifest_sync_error: string | null;
    allowed_origins_json: string;
  };
  profiles: Profile[];
  accesses: Access[];
  permissions: Permission[];
}
interface LinkForm { email: string; name: string; profileId: string }
interface ProfileForm { id?: string; name: string; description: string; permissionIds: string[] }

export default function AppManagementPage() {
  const { bindingId = '' } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Management | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [linkForm, setLinkForm] = useState<LinkForm | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileForm | null>(null);
  const [archiveTarget, setArchiveTarget] = useState<Profile | null>(null);
  const [origins, setOrigins] = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      const response = await ownerFetch(`/api/auth/admin/bindings/${bindingId}/management`);
      if (!response.ok) throw new Error(await readOwnerError(response));
      const next = await response.json() as Management;
      setData(next);
      const parsed = JSON.parse(next.binding.allowed_origins_json || '[]');
      setOrigins(Array.isArray(parsed) ? parsed.join('\n') : '');
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, [bindingId]);

  async function linkPerson() {
    if (!linkForm) return;
    setSaving(true); setError('');
    try {
      const response = await ownerFetch(`/api/auth/admin/bindings/${bindingId}/accesses`, {
        method: 'POST',
        body: JSON.stringify({
          email: linkForm.email.trim(), name: linkForm.name.trim(),
          ...(linkForm.profileId ? { profile_id: linkForm.profileId } : {}),
        }),
      });
      if (!response.ok) throw new Error(await readOwnerError(response));
      setLinkForm(null); await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); }
    finally { setSaving(false); }
  }

  async function unlinkPerson(userId: string) {
    const response = await ownerFetch(`/api/auth/admin/bindings/${bindingId}/operators/${userId}`, { method: 'DELETE' });
    if (!response.ok) setError(await readOwnerError(response)); else await load();
  }

  async function saveProfile() {
    if (!profileForm) return;
    setSaving(true); setError('');
    try {
      const response = await ownerFetch(
        `/api/auth/admin/bindings/${bindingId}/profiles${profileForm.id ? `/${profileForm.id}` : ''}`,
        {
          method: profileForm.id ? 'PUT' : 'POST', body: JSON.stringify({
          name: profileForm.name.trim(), description: profileForm.description.trim(),
          permission_ids: profileForm.permissionIds,
        }),
        },
      );
      if (!response.ok) throw new Error(await readOwnerError(response));
      setProfileForm(null); await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); }
    finally { setSaving(false); }
  }

  async function archiveProfile() {
    if (!archiveTarget) return;
    setSaving(true); setError('');
    try {
      const response = await ownerFetch(`/api/auth/admin/bindings/${bindingId}/profiles/${archiveTarget.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(await readOwnerError(response));
      setArchiveTarget(null); await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); }
    finally { setSaving(false); }
  }

  async function saveOrigins() {
    setSaving(true); setError('');
    try {
      const values = origins.split('\n').map((value) => value.trim()).filter(Boolean);
      const response = await ownerFetch(`/api/auth/admin/bindings/${bindingId}/origins`, {
        method: 'PUT', body: JSON.stringify({ origins: values }),
      });
      if (!response.ok) throw new Error(await readOwnerError(response));
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)); }
    finally { setSaving(false); }
  }

  const selectableProfiles = data?.profiles.filter((profile) => !profile.is_system) ?? [];
  const editedProfileInUse = Boolean(profileForm?.id && data?.accesses.some((access) => access.profile.id === profileForm.id));
  return (
    <AuthLayout
      title={data?.binding.app_name ?? 'Gerenciar app'}
      subtitle="Acesso simples por app; perfis aparecem somente quando o app declara permissões."
      onBack={() => navigate('/auth/apps')}
    >
      {error && <div className="ao-alert ao-alert--danger auth-message" role="alert">{error}</div>}
      {loading ? <div className="auth-empty"><div><h2>Carregando app</h2></div></div> : !data ? (
        <section className="ao-card ao-card--compact">
          <div className="auth-empty"><div>
            <h2>Não foi possível abrir este app</h2>
            <p>Abra novamente pelo AIOSON Play para gerar um acesso administrativo temporário.</p>
            <button className="ao-btn ao-btn--secondary" onClick={() => void load()} type="button">Tentar novamente</button>
          </div></div>
        </section>
      ) : <>
        {data.binding.manifest_sync_status === 'failed' && <div className="ao-alert ao-alert--warning auth-message" role="status">A última sincronização falhou. O catálogo anterior foi preservado. {data.binding.manifest_sync_error}</div>}
        <section className="ao-card ao-card--compact">
          <div className="ao-card__header"><div><h2 className="ao-card__title">Quem pode acessar</h2><p className="ao-card__subtitle">{data.accesses.length} pessoa(s) vinculada(s).</p></div>
            <button className="ao-btn ao-btn--primary" type="button" onClick={() => setLinkForm({ email: '', name: '', profileId: selectableProfiles[0]?.id ?? '' })}>Vincular pessoa</button>
          </div>
          {data.accesses.length === 0 ? <div className="auth-empty"><div><h2>Ninguém vinculado</h2><p>Vincule a primeira pessoa para permitir o login.</p></div></div> : <div className="ao-card__body ao-card__body--flush"><div className="ao-table-wrap"><table className="ao-table ao-table--compact">
            <thead><tr><th>Pessoa</th><th>Perfil</th><th>Estado</th><th aria-label="Ações" /></tr></thead>
            <tbody>{data.accesses.map((access) => <tr key={access.user_id}><td><strong>{access.user.name || 'Sem nome'}</strong><p className="auth-table-note">{access.user.email}</p></td><td>{access.profile.is_system ? 'Acesso' : access.profile.name}</td><td>{access.user.disabled_at ? 'Pessoa desativada' : access.status}</td><td><button className="ao-btn ao-btn--danger ao-btn--sm" onClick={() => void unlinkPerson(access.user_id)} type="button">Desvincular</button></td></tr>)}</tbody>
          </table></div></div>}
        </section>

        {data.binding.enable_rbac && <section className="ao-card ao-card--compact" style={{ marginTop: 'var(--ao-space-4)' }}>
          <div className="ao-card__header"><div><h2 className="ao-card__title">Perfis</h2><p className="ao-card__subtitle">Agrupe as permissões declaradas pelo app.</p></div><button className="ao-btn ao-btn--secondary" type="button" onClick={() => setProfileForm({ name: '', description: '', permissionIds: [] })}>Novo perfil</button></div>
          <div className="ao-card__body"><div className="auth-access-grid">{selectableProfiles.map((profile) => <button className="auth-access-card" key={profile.id} type="button" onClick={() => setProfileForm({ id: profile.id, name: profile.name, description: profile.description, permissionIds: profile.permissions.map(({ permission }) => permission.id) })}><span className="auth-access-card__meta">{profile.permissions.length} permissões</span><span className="auth-access-card__title">{profile.name}</span><span className="auth-access-card__body">{profile.description || 'Sem descrição'}</span><span className="auth-access-card__action">Editar perfil</span></button>)}</div></div>
          <div className="ao-card__body"><h3>Permissões do app</h3><div className="auth-role-list">{data.permissions.map((permission) => <span className="ao-chip ao-chip--sm" key={permission.id}>{permission.name}</span>)}</div><p className="auth-table-note">Este catálogo é somente leitura e vem do manifesto do app.</p></div>
        </section>}

        <section className="ao-card ao-card--compact" style={{ marginTop: 'var(--ao-space-4)' }}>
          <div className="ao-card__header"><div><h2 className="ao-card__title">Domínios permitidos</h2><p className="ao-card__subtitle">Um origin exato por linha. Domínios remotos precisam usar HTTPS.</p></div></div>
          <div className="ao-card__body"><textarea className="ao-input" rows={4} value={origins} onChange={(event) => setOrigins(event.target.value)} placeholder="https://app.suaempresa.com" /><div className="auth-selected-actions"><button className="ao-btn ao-btn--secondary" onClick={() => void saveOrigins()} disabled={saving} type="button">Salvar domínios</button></div></div>
        </section>
      </>}

      {linkForm && <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation"><section className="ao-modal" role="dialog" aria-modal="true" aria-labelledby="link-person-title"><header className="ao-modal__header"><div><h2 className="ao-modal__title" id="link-person-title">Vincular pessoa</h2><p className="ao-modal__subtitle">Se a conta ainda não existir, ela será criada com credencial pendente.</p></div><button className="ao-modal__close" onClick={() => setLinkForm(null)} type="button">×</button></header><div className="ao-modal__body"><div className="auth-modal-form"><label className="ao-field"><span className="ao-field__label">Nome</span><input className="ao-input" value={linkForm.name} onChange={(event) => setLinkForm({ ...linkForm, name: event.target.value })} /></label><label className="ao-field"><span className="ao-field__label">E-mail</span><input className="ao-input" type="email" value={linkForm.email} onChange={(event) => setLinkForm({ ...linkForm, email: event.target.value })} /></label>{data?.binding.enable_rbac && <label className="ao-field"><span className="ao-field__label">Perfil</span><select className="ao-select" value={linkForm.profileId} onChange={(event) => setLinkForm({ ...linkForm, profileId: event.target.value })}>{selectableProfiles.map((profile) => <option value={profile.id} key={profile.id}>{profile.name}</option>)}</select></label>}</div></div><footer className="ao-modal__footer auth-modal-actions"><button className="ao-btn ao-btn--secondary" onClick={() => setLinkForm(null)} type="button">Cancelar</button><button className="ao-btn ao-btn--primary" disabled={saving || !linkForm.name.trim() || !linkForm.email.trim() || Boolean(data?.binding.enable_rbac && !linkForm.profileId)} onClick={() => void linkPerson()} type="button">Vincular</button></footer></section></div>}
      {profileForm && <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation"><section className="ao-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title"><header className="ao-modal__header"><div><h2 className="ao-modal__title" id="profile-title">{profileForm.id ? 'Editar perfil' : 'Novo perfil'}</h2><p className="ao-modal__subtitle">As permissões disponíveis são definidas pelo manifesto do app.</p></div><button className="ao-modal__close" onClick={() => setProfileForm(null)} type="button" aria-label="Fechar">×</button></header><div className="ao-modal__body"><div className="auth-modal-form"><label className="ao-field"><span className="ao-field__label">Nome</span><input className="ao-input" maxLength={64} value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} /></label><label className="ao-field"><span className="ao-field__label">Descrição</span><input className="ao-input" maxLength={240} value={profileForm.description} onChange={(event) => setProfileForm({ ...profileForm, description: event.target.value })} /></label><fieldset className="ao-field"><legend className="ao-field__label">Permissões</legend>{data?.permissions.map((permission) => <label key={permission.id}><input type="checkbox" checked={profileForm.permissionIds.includes(permission.id)} onChange={(event) => setProfileForm({ ...profileForm, permissionIds: event.target.checked ? [...profileForm.permissionIds, permission.id] : profileForm.permissionIds.filter((id) => id !== permission.id) })} /> {permission.name}</label>)}</fieldset>{editedProfileInUse && <p className="auth-table-note">Este perfil está em uso. Troque ou desvincule as pessoas antes de arquivá-lo.</p>}</div></div><footer className="ao-modal__footer auth-modal-actions">{profileForm.id && <button className="ao-btn ao-btn--danger" disabled={saving || editedProfileInUse} onClick={() => { const target = selectableProfiles.find((profile) => profile.id === profileForm.id); if (target) { setProfileForm(null); setArchiveTarget(target); } }} type="button">Arquivar perfil</button>}<button className="ao-btn ao-btn--secondary" onClick={() => setProfileForm(null)} type="button">Cancelar</button><button className="ao-btn ao-btn--primary" disabled={saving || !profileForm.name.trim()} onClick={() => void saveProfile()} type="button">{saving ? 'Salvando' : profileForm.id ? 'Salvar alterações' : 'Criar perfil'}</button></footer></section></div>}
      {archiveTarget && <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation"><section className="ao-modal ao-modal--alert" role="dialog" aria-modal="true" aria-labelledby="archive-profile-title"><header className="ao-modal__header"><div><h2 className="ao-modal__title" id="archive-profile-title">Arquivar perfil?</h2><p className="ao-modal__subtitle">O perfil deixa de aparecer para novos vínculos.</p></div><button className="ao-modal__close" onClick={() => setArchiveTarget(null)} type="button" aria-label="Fechar">×</button></header><div className="ao-modal__body"><p className="auth-danger-copy"><strong>{archiveTarget.name}</strong> será arquivado.</p></div><footer className="ao-modal__footer auth-modal-actions"><button className="ao-btn ao-btn--secondary" onClick={() => setArchiveTarget(null)} disabled={saving} type="button">Cancelar</button><button className="ao-btn ao-btn--danger" onClick={() => void archiveProfile()} disabled={saving} type="button">{saving ? 'Arquivando' : 'Arquivar'}</button></footer></section></div>}
    </AuthLayout>
  );
}
