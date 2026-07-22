export interface DashboardOwnerContext {
  token: string;
  playId: string;
}

export interface DashboardOwnerContextEnvironment {
  fetchFn: typeof fetch;
  history: Pick<History, 'replaceState'>;
  localStorage: Storage;
  location: Pick<Location, 'hash' | 'pathname' | 'search'>;
  sessionStorage: Storage;
}

export const OWNER_CONTEXT_PARAM = 'owner_context';

const OWNER_TOKEN_KEYS = [
  'aiosonOwnerBearer',
  'aiosonComBearer',
  'aioson-play:owner-bearer',
  'aioson-play:session',
];
const PLAY_ID_KEYS = ['aiosonPlayId', 'aioson_play_id', 'aioson-play:aioson_play_id'];

export function getDashboardOwnerContextEnvironment(): DashboardOwnerContextEnvironment {
  return {
    // WebView2 exige que o fetch nativo preserve Window como receiver.
    // Guardar `fetch` sem bind e chamá-lo como propriedade causa
    // "Failed to execute 'fetch' on 'Window': Illegal invocation".
    fetchFn: window.fetch.bind(window),
    history: window.history,
    localStorage,
    location: window.location,
    sessionStorage,
  };
}

export async function resolveDashboardOwnerContext(
  environment: DashboardOwnerContextEnvironment = getDashboardOwnerContextEnvironment(),
): Promise<DashboardOwnerContext | null> {
  if (
    hasOwnerContextCode(environment.location.search)
    || hasOwnerContextCode(environment.location.hash)
    || hasOwnerContextPath(environment.location.pathname)
  ) {
    try {
      const owner = await consumeOwnerContextFromUrl(environment);
      if (!owner) {
        clearStoredOwnerContext(environment);
        throw new Error('invalid_owner_context');
      }
      return owner;
    } catch (err) {
      clearStoredOwnerContext(environment);
      throw err;
    }
  }

  return readOwnerContext(environment);
}

export function hasOwnerContextCode(search: string): boolean {
  const code = new URLSearchParams(search.replace(/^[?#]/, '')).get(OWNER_CONTEXT_PARAM)?.trim();
  return Boolean(code);
}

export function hasOwnerContextPath(pathname: string): boolean {
  return /^\/auth\/handoff\/[^/]+\/apps(?:\/[^/]+)?$/.test(pathname);
}

export function readOwnerContext(environment: DashboardOwnerContextEnvironment): DashboardOwnerContext | null {
  const token = firstStorageValue(environment, OWNER_TOKEN_KEYS, extractToken);
  const playId = firstStorageValue(environment, PLAY_ID_KEYS, extractPlayId);
  return token && playId ? { token, playId } : null;
}

function firstStorageValue(
  environment: DashboardOwnerContextEnvironment,
  keys: string[],
  mapper: (value: string) => string | null,
): string | null {
  for (const key of keys) {
    const raw = environment.sessionStorage.getItem(key) ?? environment.localStorage.getItem(key);
    if (!raw) continue;
    const mapped = mapper(raw);
    if (mapped) return mapped;
  }
  return null;
}

function extractToken(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed) as { access_token?: unknown; token?: unknown };
    const token = parsed.access_token ?? parsed.token;
    return typeof token === 'string' && token.trim() ? token.trim() : null;
  } catch {
    return trimmed;
  }
}

function extractPlayId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed) as { aioson_play_id?: unknown; playId?: unknown };
    const value = parsed.aioson_play_id ?? parsed.playId;
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  } catch {
    return trimmed;
  }
}

function writeOwnerContext(environment: DashboardOwnerContextEnvironment, owner: DashboardOwnerContext): void {
  environment.sessionStorage.setItem('aiosonOwnerBearer', owner.token);
  environment.sessionStorage.setItem('aiosonPlayId', owner.playId);
}

function clearStoredOwnerContext(environment: DashboardOwnerContextEnvironment): void {
  for (const key of [...OWNER_TOKEN_KEYS, ...PLAY_ID_KEYS]) {
    environment.sessionStorage.removeItem(key);
    environment.localStorage.removeItem(key);
  }
}

function consumeContextCodeFromUrl(environment: DashboardOwnerContextEnvironment): string | null {
  const searchParams = new URLSearchParams(environment.location.search);
  const hashParams = new URLSearchParams(environment.location.hash.replace(/^#/, ''));
  const hasHashContext = hashParams.has(OWNER_CONTEXT_PARAM);
  const pathMatch = environment.location.pathname.match(/^\/auth\/handoff\/([^/]+)(\/apps(?:\/[^/]+)?)$/);
  const pathCode = pathMatch?.[1] ? decodeURIComponent(pathMatch[1]).trim() : null;
  const code = searchParams.get(OWNER_CONTEXT_PARAM)?.trim()
    ?? hashParams.get(OWNER_CONTEXT_PARAM)?.trim()
    ?? pathCode;
  if (!code) return null;

  searchParams.delete(OWNER_CONTEXT_PARAM);
  hashParams.delete(OWNER_CONTEXT_PARAM);
  const nextSearch = searchParams.toString();
  const nextHash = hasHashContext
    ? hashParams.toString()
    : environment.location.hash.replace(/^#/, '');
  const nextPathname = pathMatch?.[2] ? `/auth${pathMatch[2]}` : environment.location.pathname;
  const nextUrl = `${nextPathname}${nextSearch ? `?${nextSearch}` : ''}${nextHash ? `#${nextHash}` : ''}`;
  environment.history.replaceState(null, '', nextUrl);
  return code;
}

async function consumeOwnerContextFromUrl(
  environment: DashboardOwnerContextEnvironment,
): Promise<DashboardOwnerContext | null> {
  const code = consumeContextCodeFromUrl(environment);
  if (!code) return null;

  const response = await environment.fetchFn('/api/auth/admin/dashboard-context/consume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner_context: code }),
  });
  if (!response.ok) throw new Error(await readError(response));

  const data = await response.json() as { token?: unknown; playId?: unknown };
  if (typeof data.token !== 'string' || typeof data.playId !== 'string') {
    throw new Error('invalid_owner_context_response');
  }

  const owner = { token: data.token, playId: data.playId };
  writeOwnerContext(environment, owner);
  return owner;
}

async function readError(response: Response): Promise<string> {
  const data = await response.json().catch(() => null) as { error?: string } | null;
  return data?.error ?? `HTTP ${response.status}`;
}
