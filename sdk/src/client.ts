import { AuthError, inferErrorCode } from './errors.js';
import { decodeJwtPayload, isTokenExpired } from './jwt.js';
import { memoryStorage } from './storage.js';
import type {
  AuthClientOptions,
  AuthSession,
  ForgotPasswordInput,
  LoginInput,
  MePayload,
  OAuthInput,
  RegisterInput,
  RegisterOutput,
  ResetPasswordInput,
  SessionListener,
  TokenPayload,
  TokenStorage,
  User,
} from './types.js';

export interface AuthClient {
  /**
   * Cria conta de operador no binding. Não loga automaticamente — chame
   * `login()` em seguida se quiser sessão iniciada.
   */
  register(input: RegisterInput): Promise<RegisterOutput>;
  /** Faz login email+senha. Persiste tokens no storage. */
  login(input: LoginInput): Promise<AuthSession>;
  /** Faz login OAuth (Google/GitHub) — o app já fez o handshake. */
  loginOAuth(input: OAuthInput): Promise<AuthSession>;
  /** Revoga refresh token e limpa storage. */
  logout(): Promise<void>;
  /** Dispara e-mail de recuperação (ou loga no servidor se SMTP off). */
  forgotPassword(input: ForgotPasswordInput): Promise<{ sent: boolean }>;
  /** Conclui recuperação com o token recebido por e-mail. */
  resetPassword(input: ResetPasswordInput): Promise<{ success: boolean }>;
  /**
   * Renova o access token usando o refresh persistido. Atualiza storage.
   * Lança `AuthError('refresh_failed')` se refresh inválido/expirado.
   */
  refresh(): Promise<AuthSession>;
  /**
   * Chama `GET /me`. Retorna `null` se não há access token (não-logado).
   * Lança AuthError se token presente mas inválido (com autoRefresh
   * habilitado, tenta refresh antes de propagar).
   */
  me(): Promise<MePayload | null>;
  /**
   * Atalho server-side: `GET /me/permissions`. Retorna permissions agregadas
   * fresh do DB sem precisar do payload completo do `/me`. Útil para apps
   * que validam JWT offline (JWKS) e só precisam confirmar permissions.
   */
  mePermissions(): Promise<readonly string[]>;
  /**
   * Defense-in-depth server-side. Chama `GET /rbac/check`. Use só para
   * ações críticas — para UI condicional, prefira `hasPermission()` que
   * lê o JWT em memória.
   */
  check(permission: string): Promise<boolean>;
  /**
   * Lê permissions do JWT em memória. Zero requests. `null` se não logado
   * ou se o token não carrega `permissions` (binding sem RBAC).
   */
  hasPermission(permission: string): boolean | null;
  /** Lista permissions do JWT em memória, ou `null`. */
  getPermissions(): readonly string[] | null;
  /** Access token atual (ou `null` se não logado). */
  getAccessToken(): Promise<string | null>;
  /** Snapshot da sessão (sem hit no servidor). */
  getSession(): Promise<AuthSession | null>;
  /**
   * Inscreve listener pra mudanças de sessão (login, logout, refresh).
   * Retorna `unsubscribe`.
   */
  onSessionChange(listener: SessionListener): () => void;
}

/**
 * Cria um cliente do aioson-auth. Imutável após criação.
 *
 * @example
 * ```ts
 * const auth = createAuthClient({
 *   baseUrl: 'http://localhost:3001',
 *   bindingId: process.env.AIOSON_BINDING_ID!,
 * });
 * const { user } = await auth.login({ email: 'a@b.com', password: '...' });
 * if (auth.hasPermission('orders:create')) { ... }
 * ```
 */
export function createAuthClient(opts: AuthClientOptions): AuthClient {
  const storage: TokenStorage = opts.storage ?? memoryStorage();
  const autoRefresh = opts.autoRefresh ?? true;
  const resolvedUrl = opts.baseUrl
    ?? (opts.embedded && typeof location !== 'undefined' ? location.origin : undefined);
  if (!resolvedUrl) {
    throw new Error('[aioson/auth-sdk] baseUrl is required (or set embedded: true in a browser)');
  }
  const baseUrl = resolvedUrl.replace(/\/+$/, '');
  const bindingId = opts.bindingId;
  const fetchImpl = opts.fetch ?? globalThis.fetch.bind(globalThis);
  const listeners = new Set<SessionListener>();

  // Cache em memória do payload + user pra reads serem síncronos.
  let cachedAccess: string | null = null;
  let cachedRefresh: string | null = null;
  let cachedPayload: TokenPayload | null = null;
  let cachedUser: User | null = null;

  // Promise compartilhada de refresh em andamento (evita N refreshes
  // concorrentes quando múltiplas requests caem 401 ao mesmo tempo).
  let refreshInFlight: Promise<AuthSession> | null = null;

  async function loadFromStorage(): Promise<void> {
    cachedAccess = await storage.get('access');
    cachedRefresh = await storage.get('refresh');
    cachedPayload = cachedAccess ? decodeJwtPayload(cachedAccess) : null;
  }

  // Carrega tokens persistidos eagerly. Não await na construção (vai
  // resolver no primeiro chamada async).
  const hydrated = loadFromStorage();

  async function persistSession(session: AuthSession): Promise<void> {
    await hydrated;
    cachedAccess = session.accessToken;
    cachedRefresh = session.refreshToken;
    cachedPayload = decodeJwtPayload(session.accessToken);
    cachedUser = session.user;
    await storage.set('access', session.accessToken);
    await storage.set('refresh', session.refreshToken);
    emit(session);
  }

  async function clearSession(): Promise<void> {
    cachedAccess = null;
    cachedRefresh = null;
    cachedPayload = null;
    cachedUser = null;
    await storage.set('access', null);
    await storage.set('refresh', null);
    emit(null);
  }

  function emit(session: AuthSession | null): void {
    for (const l of listeners) {
      try {
        l(session);
      } catch {
        /* listener errors don't break others */
      }
    }
  }

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    opts2: { skipRetry?: boolean; authToken?: string } = {}
  ): Promise<T> {
    let response: Response;
    try {
      const headers: Record<string, string> = {};
      if (body) headers['Content-Type'] = 'application/json';
      // Slice D: usa `Authorization: Bearer` em vez de `?token=` (RFC 6750).
      // O servidor aceita ambos por retro-compat.
      if (opts2.authToken) headers['Authorization'] = `Bearer ${opts2.authToken}`;
      response = await fetchImpl(`${baseUrl}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (err) {
      throw new AuthError('network', String(err), 0);
    }

    if (response.status === 204) return undefined as T;

    const text = await response.text();
    let data: unknown = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      // Auto-refresh em 401 quando há refresh token. Só em chamadas que
      // não sejam refresh em si (evita loop).
      if (
        response.status === 401 &&
        autoRefresh &&
        !opts2.skipRetry &&
        cachedRefresh &&
        !path.includes('/refresh')
      ) {
        try {
          await refresh();
          return request(method, path, body, { skipRetry: true });
        } catch {
          // refresh falhou — propaga erro original do servidor abaixo.
        }
      }
      const msg = extractErrorMessage(data) ?? `HTTP ${response.status}`;
      throw new AuthError(inferErrorCode(response.status, msg), msg, response.status, data);
    }

    return data as T;
  }

  async function register(input: RegisterInput): Promise<RegisterOutput> {
    return await request<RegisterOutput>(
      'POST',
      `/api/auth/${bindingId}/register`,
      input
    );
  }

  async function forgotPassword(
    input: ForgotPasswordInput
  ): Promise<{ sent: boolean }> {
    return await request<{ sent: boolean }>(
      'POST',
      `/api/auth/${bindingId}/forgot-password`,
      input
    );
  }

  async function resetPassword(
    input: ResetPasswordInput
  ): Promise<{ success: boolean }> {
    return await request<{ success: boolean }>(
      'POST',
      `/api/auth/${bindingId}/reset-password`,
      input
    );
  }

  async function login(input: LoginInput): Promise<AuthSession> {
    const session = await request<AuthSession>(
      'POST',
      `/api/auth/${bindingId}/login`,
      input
    );
    await persistSession(session);
    return session;
  }

  async function loginOAuth(input: OAuthInput): Promise<AuthSession> {
    const session = await request<AuthSession>(
      'POST',
      `/api/auth/${bindingId}/oauth`,
      input
    );
    await persistSession(session);
    return session;
  }

  async function logout(): Promise<void> {
    await hydrated;
    const refreshToken = cachedRefresh;
    await clearSession();
    if (refreshToken) {
      try {
        await request<void>('POST', `/api/auth/${bindingId}/logout`, { refreshToken });
      } catch {
        // Tolerante: refresh já podia ter expirado/sido revogado server-side.
      }
    }
  }

  async function refresh(): Promise<AuthSession> {
    if (refreshInFlight) return refreshInFlight;
    refreshInFlight = (async () => {
      await hydrated;
      if (!cachedRefresh) {
        throw new AuthError('refresh_failed', 'No refresh token', 401);
      }
      try {
        const session = await request<AuthSession>(
          'POST',
          `/api/auth/${bindingId}/refresh`,
          { refreshToken: cachedRefresh },
          { skipRetry: true }
        );
        await persistSession(session);
        return session;
      } catch (err) {
        // Refresh falhou: limpa sessão pra que próxima chamada pareça not-logged.
        await clearSession();
        throw err;
      } finally {
        refreshInFlight = null;
      }
    })();
    return refreshInFlight;
  }

  async function me(): Promise<MePayload | null> {
    await hydrated;
    if (!cachedAccess) return null;

    // Sempre vai ao server pra validar TokenRevocation (defense-in-depth).
    // Otimização futura: skip se exp longe + cache TTL.
    return await request<MePayload>(
      'GET',
      `/api/auth/${bindingId}/me`,
      undefined,
      { authToken: cachedAccess }
    );
  }

  async function mePermissions(): Promise<readonly string[]> {
    await hydrated;
    if (!cachedAccess) return [];
    const res = await request<{ permissions: string[] }>(
      'GET',
      `/api/auth/${bindingId}/me/permissions`,
      undefined,
      { authToken: cachedAccess }
    );
    return res.permissions ?? [];
  }

  async function check(permission: string): Promise<boolean> {
    await hydrated;
    if (!cachedAccess) return false;
    const res = await request<{ allowed: boolean }>(
      'GET',
      `/api/auth/${bindingId}/rbac/check?permission=${encodeURIComponent(permission)}`,
      undefined,
      { authToken: cachedAccess }
    );
    return !!res.allowed;
  }

  function hasPermission(permission: string): boolean | null {
    if (!cachedPayload) return null;
    if (!cachedPayload.permissions) return null;
    return cachedPayload.permissions.includes(permission);
  }

  function getPermissions(): readonly string[] | null {
    return cachedPayload?.permissions ?? null;
  }

  async function getAccessToken(): Promise<string | null> {
    await hydrated;
    if (!cachedAccess) return null;
    if (cachedPayload && isTokenExpired(cachedPayload) && cachedRefresh && autoRefresh) {
      try {
        await refresh();
      } catch {
        return null;
      }
    }
    return cachedAccess;
  }

  async function getSession(): Promise<AuthSession | null> {
    await hydrated;
    if (!cachedAccess || !cachedRefresh) return null;
    if (!cachedUser) {
      // Reconstrói User a partir do JWT (best-effort) se sessão foi
      // hidratada do storage sem user em memória.
      if (cachedPayload) {
        cachedUser = { id: cachedPayload.sub, email: cachedPayload.email, name: '' };
      }
    }
    return cachedUser
      ? { accessToken: cachedAccess, refreshToken: cachedRefresh, user: cachedUser }
      : null;
  }

  function onSessionChange(listener: SessionListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return {
    register,
    login,
    loginOAuth,
    logout,
    forgotPassword,
    resetPassword,
    refresh,
    me,
    mePermissions,
    check,
    hasPermission,
    getPermissions,
    getAccessToken,
    getSession,
    onSessionChange,
  };
}

function extractErrorMessage(data: unknown): string | null {
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object' && 'error' in data) {
    const e = (data as { error: unknown }).error;
    if (typeof e === 'string') return e;
  }
  return null;
}

// ─── SSO helpers ─────────────────────────────────────────────────────────────

export interface SsoOptions {
  authUrl: string;
  bindingId: string;
  redirectUri?: string;
}

export function redirectToSso(opts: SsoOptions): void {
  const redirectUri = opts.redirectUri ?? `${window.location.origin}/sso/callback`;
  const url = `${opts.authUrl}/sso/authorize?binding_id=${encodeURIComponent(opts.bindingId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = url;
}

export function handleSsoCallback(storage?: TokenStorage): AuthSession | null {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const refresh = params.get('refresh');
  const userId = params.get('user_id');
  const email = params.get('email');

  if (!token || !refresh) return null;

  const session: AuthSession = {
    accessToken: token,
    refreshToken: refresh,
    user: { id: userId ?? '', email: email ?? '', name: '' },
  };

  if (storage) {
    storage.set('access', token);
    storage.set('refresh', refresh);
  }

  // Clean URL
  const url = new URL(window.location.href);
  url.searchParams.delete('token');
  url.searchParams.delete('refresh');
  url.searchParams.delete('user_id');
  url.searchParams.delete('email');
  window.history.replaceState({}, '', url.toString());

  return session;
}
