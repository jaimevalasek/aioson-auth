import {
  resolveDashboardOwnerContext,
  type DashboardOwnerContext,
} from './dashboard-owner-context';

let ownerContextPromise: Promise<DashboardOwnerContext | null> | null = null;

async function getOwnerContext(): Promise<DashboardOwnerContext | null> {
  // React StrictMode monta o componente duas vezes em desenvolvimento. O
  // owner_context é de uso único, portanto cargas concorrentes compartilham
  // o mesmo consumo antes de acessar o sessionStorage.
  ownerContextPromise ??= resolveDashboardOwnerContext();
  try {
    const owner = await ownerContextPromise;
    if (!owner) ownerContextPromise = null;
    return owner;
  } catch (error) {
    ownerContextPromise = null;
    throw error;
  }
}

export async function ensureOwnerContext(): Promise<DashboardOwnerContext> {
  const owner = await getOwnerContext();
  if (!owner) throw new Error('Abra esta administração a partir do AIOSON Play.');
  return owner;
}

export async function ownerFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const owner = await ensureOwnerContext();
  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${owner.token}`,
      'X-Aioson-Play-Id': owner.playId,
      ...init.headers,
    },
  });
}

export async function readOwnerError(response: Response) {
  const body = await response.json().catch(() => null) as {
    error?: string | { code?: string; message?: string };
  } | null;
  if (typeof body?.error === 'string') return body.error;
  const messages: Record<string, string> = {
    email_already_registered: 'Já existe uma pessoa cadastrada com este e-mail.',
    person_has_accesses: 'Desvincule esta pessoa de todos os apps antes de excluir a conta.',
    ownership_conflict: 'Este cadastro não pertence a esta instalação do AIOSON Play.',
    validation_failed: 'Revise os campos informados e tente novamente.',
  };
  if (body?.error?.code && messages[body.error.code]) return messages[body.error.code];
  return body?.error?.message ?? `HTTP ${response.status}`;
}
