import { useEffect, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { ownerFetch, readOwnerError } from '../lib/owner-fetch';

interface Person {
  id: string;
  email: string;
  name: string;
  disabled_at: string | null;
  credential_status: 'active' | 'pending';
  app_accesses: Array<{
    binding_id: string;
    status: string;
    binding: { app_name: string };
    profile: { name: string };
  }>;
}

interface PersonForm {
  id?: string;
  email: string;
  name: string;
  password: string;
}

const emptyForm: PersonForm = { email: '', name: '', password: '' };

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState<PersonForm | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Person | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const response = await ownerFetch('/api/auth/admin/bindings/people');
      if (!response.ok) throw new Error(await readOwnerError(response));
      const data = await response.json() as { people?: Person[] };
      setPeople(Array.isArray(data.people) ? data.people : []);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function savePerson() {
    if (!form) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const isEditing = Boolean(form.id);
      const body: { email: string; name: string; password?: string } = {
        email: form.email.trim(),
        name: form.name.trim(),
      };
      if (form.password) body.password = form.password;
      const response = await ownerFetch(
        isEditing ? `/api/auth/admin/bindings/people/${form.id}` : '/api/auth/admin/bindings/people',
        { method: isEditing ? 'PATCH' : 'POST', body: JSON.stringify(body) },
      );
      if (!response.ok) throw new Error(await readOwnerError(response));
      setForm(null);
      await load();
      setNotice(isEditing ? 'Pessoa atualizada.' : 'Pessoa cadastrada.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaving(false);
    }
  }

  async function toggle(person: Person) {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await ownerFetch(`/api/auth/admin/bindings/people/${person.id}/status`, {
        method: 'PATCH', body: JSON.stringify({ disabled: !person.disabled_at }),
      });
      if (!response.ok) throw new Error(await readOwnerError(response));
      await load();
      setNotice(person.disabled_at ? 'Pessoa reativada.' : 'Pessoa desativada.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaving(false);
    }
  }

  async function deletePerson() {
    if (!deleteTarget) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await ownerFetch(`/api/auth/admin/bindings/people/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(await readOwnerError(response));
      setDeleteTarget(null);
      await load();
      setNotice('Pessoa excluída.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaving(false);
    }
  }

  const isEditing = Boolean(form?.id);
  const passwordInvalid = Boolean(form?.password && form.password.length < 8);
  const saveDisabled = saving || !form?.name.trim() || !form?.email.trim() || passwordInvalid;

  return (
    <AuthLayout title="Pessoas" subtitle="Cadastre contas e consulte em quais apps cada pessoa pode entrar.">
      {error && <div className="ao-alert ao-alert--danger auth-message" role="alert">{error}</div>}
      {notice && <div className="ao-alert ao-alert--success auth-message" role="status">{notice}</div>}
      <section className="ao-card ao-card--compact">
        <div className="ao-card__header">
          <div>
            <h2 className="ao-card__title">Pessoas cadastradas</h2>
            <p className="ao-card__subtitle">Nome, e-mail, senha e estado ficam aqui; o acesso continua sendo definido em cada app.</p>
          </div>
          <button className="ao-btn ao-btn--primary" onClick={() => setForm(emptyForm)} type="button">
            Nova pessoa
          </button>
        </div>
        {loading ? (
          <div className="auth-empty"><div><h2>Carregando pessoas</h2><p>Buscando as contas desta instalação.</p></div></div>
        ) : people.length === 0 ? (
          <div className="auth-empty"><div><h2>Nenhuma pessoa cadastrada</h2><p>Cadastre uma pessoa aqui ou vincule alguém a partir da página de um app.</p></div></div>
        ) : (
          <div className="ao-card__body ao-card__body--flush">
            <div className="ao-table-wrap">
              <table className="ao-table ao-table--compact">
                <thead><tr><th>Pessoa</th><th>Apps</th><th>Credencial</th><th>Estado</th><th aria-label="Ações" /></tr></thead>
                <tbody>{people.map((person) => {
                  const linked = person.app_accesses.length > 0;
                  return <tr key={person.id}>
                    <td><strong>{person.name || 'Sem nome'}</strong><p className="auth-table-note">{person.email}</p></td>
                    <td>{linked ? <div className="auth-role-list">{person.app_accesses.map((access) => <span className="ao-chip ao-chip--sm" key={access.binding_id}>{access.binding.app_name} / {access.profile.name === '__access__' ? 'acesso' : access.profile.name}</span>)}</div> : <span className="auth-table-note">Sem apps vinculados</span>}</td>
                    <td><span className={`ao-chip ao-chip--sm${person.credential_status === 'pending' ? ' ao-chip--warning' : ' ao-chip--primary'}`}>{person.credential_status === 'pending' ? 'Pendente' : 'Ativa'}</span></td>
                    <td>{person.disabled_at ? 'Desativada' : 'Ativa'}</td>
                    <td><div className="auth-row-actions">
                      <button className="ao-btn ao-btn--ghost ao-btn--sm" onClick={() => setForm({ id: person.id, name: person.name, email: person.email, password: '' })} type="button">Editar</button>
                      <button className="ao-btn ao-btn--ghost ao-btn--sm" disabled={saving} onClick={() => void toggle(person)} type="button">{person.disabled_at ? 'Reativar' : 'Desativar'}</button>
                      <button className="ao-btn ao-btn--danger ao-btn--sm" disabled={linked} title={linked ? 'Desvincule a pessoa de todos os apps antes de excluir.' : undefined} onClick={() => setDeleteTarget(person)} type="button">Excluir</button>
                    </div></td>
                  </tr>;
                })}</tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {form && <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation">
        <section className="ao-modal" role="dialog" aria-modal="true" aria-labelledby="person-modal-title">
          <header className="ao-modal__header"><div>
            <h2 className="ao-modal__title" id="person-modal-title">{isEditing ? 'Editar pessoa' : 'Nova pessoa'}</h2>
            <p className="ao-modal__subtitle">{isEditing ? 'Defina uma senha nova somente quando quiser trocar a credencial.' : 'Defina uma senha agora ou deixe em branco para manter a credencial pendente.'}</p>
          </div><button className="ao-modal__close" onClick={() => setForm(null)} type="button" aria-label="Fechar">×</button></header>
          <div className="ao-modal__body">{error && <div className="ao-alert ao-alert--danger auth-message" role="alert">{error}</div>}<div className="auth-modal-form">
            <label className="ao-field"><span className="ao-field__label">Nome</span><input className="ao-input" maxLength={160} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label className="ao-field"><span className="ao-field__label">E-mail</span><input className="ao-input" type="email" maxLength={254} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <label className="ao-field"><span className="ao-field__label">Senha (opcional)</span><input className="ao-input" type="password" minLength={8} maxLength={128} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={isEditing ? 'Deixe em branco para manter' : 'Mínimo 8 caracteres'} /></label>
            {passwordInvalid && <p className="auth-table-note">A senha precisa ter pelo menos 8 caracteres.</p>}
          </div></div>
          <footer className="ao-modal__footer auth-modal-actions"><button className="ao-btn ao-btn--secondary" onClick={() => setForm(null)} disabled={saving} type="button">Cancelar</button><button className="ao-btn ao-btn--primary" disabled={saveDisabled} onClick={() => void savePerson()} type="button">{saving ? 'Salvando' : 'Salvar'}</button></footer>
        </section>
      </div>}

      {deleteTarget && <div className="ao-modal-backdrop ao-modal-backdrop--centered" role="presentation">
        <section className="ao-modal ao-modal--alert" role="dialog" aria-modal="true" aria-labelledby="delete-person-title">
          <header className="ao-modal__header"><div><h2 className="ao-modal__title" id="delete-person-title">Excluir pessoa?</h2><p className="ao-modal__subtitle">Esta ação apaga a conta e não pode ser desfeita.</p></div><button className="ao-modal__close" onClick={() => setDeleteTarget(null)} type="button" aria-label="Fechar">×</button></header>
          <div className="ao-modal__body">{error && <div className="ao-alert ao-alert--danger auth-message" role="alert">{error}</div>}<p className="auth-danger-copy"><strong>{deleteTarget.email}</strong> será excluído do aioson-auth.</p></div>
          <footer className="ao-modal__footer auth-modal-actions"><button className="ao-btn ao-btn--secondary" onClick={() => setDeleteTarget(null)} disabled={saving} type="button">Cancelar</button><button className="ao-btn ao-btn--danger" onClick={() => void deletePerson()} disabled={saving} type="button">{saving ? 'Excluindo' : 'Excluir'}</button></footer>
        </section>
      </div>}
    </AuthLayout>
  );
}
