import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { AuthClient } from '../client.js';
import type { AuthSession, LoginInput, OAuthInput } from '../types.js';

interface AuthContextValue {
  client: AuthClient;
  session: AuthSession | null;
  loading: boolean;
  /** Última tentativa de login/refresh que falhou (limpa em sucesso). */
  error: Error | null;
  login: (input: LoginInput) => Promise<AuthSession>;
  loginOAuth: (input: OAuthInput) => Promise<AuthSession>;
  logout: () => Promise<void>;
  refresh: () => Promise<AuthSession>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  client: AuthClient;
  children: ReactNode;
}

/**
 * Provider de auth. Coloque em volta da app inteira.
 *
 * @example
 * ```tsx
 * const auth = createAuthClient({ baseUrl, bindingId, storage: localStorageAdapter() });
 *
 * function App() {
 *   return <AuthProvider client={auth}>{children}</AuthProvider>;
 * }
 * ```
 */
export function AuthProvider({ client, children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  // Hidrata estado inicial a partir do storage e subscreve mudanças.
  useEffect(() => {
    mountedRef.current = true;

    let unsubscribe = () => {};

    (async () => {
      const initial = await client.getSession();
      if (mountedRef.current) {
        setSession(initial);
        setLoading(false);
      }
    })();

    unsubscribe = client.onSessionChange((s) => {
      if (mountedRef.current) {
        setSession(s);
      }
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [client]);

  const login = useCallback(
    async (input: LoginInput): Promise<AuthSession> => {
      setError(null);
      try {
        return await client.login(input);
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        throw e;
      }
    },
    [client]
  );

  const loginOAuth = useCallback(
    async (input: OAuthInput): Promise<AuthSession> => {
      setError(null);
      try {
        return await client.loginOAuth(input);
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        throw e;
      }
    },
    [client]
  );

  const logout = useCallback(async (): Promise<void> => {
    await client.logout();
  }, [client]);

  const refresh = useCallback(async (): Promise<AuthSession> => {
    setError(null);
    try {
      return await client.refresh();
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    }
  }, [client]);

  const value = useMemo<AuthContextValue>(
    () => ({ client, session, loading, error, login, loginOAuth, logout, refresh }),
    [client, session, loading, error, login, loginOAuth, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Acessa estado e ações de auth. Deve estar dentro de `<AuthProvider>`.
 *
 * @example
 * ```tsx
 * function NavBar() {
 *   const { session, logout } = useAuth();
 *   if (!session) return <Link to="/login">Entrar</Link>;
 *   return <button onClick={logout}>{session.user.email}</button>;
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

interface UsePermissionResult {
  /** `true` permitido, `false` negado, `null` sem informação (não logado ou sem RBAC). */
  allowed: boolean | null;
  /** Lista de permissions atuais do JWT, ou `null`. */
  permissions: readonly string[] | null;
}

/**
 * Lê permissions do JWT em memória — zero requests. Use para UI condicional.
 * Para ações críticas server-side, prefira `useAuth().client.check(perm)`.
 *
 * @example
 * ```tsx
 * function DeleteButton() {
 *   const { allowed } = usePermission('orders:delete');
 *   if (allowed === false) return null;
 *   return <button>Apagar</button>;
 * }
 * ```
 */
export function usePermission(permission: string): UsePermissionResult {
  const { client, session } = useAuth();
  // Recalcula a cada mudança de sessão (login/refresh emitem).
  return useMemo<UsePermissionResult>(() => {
    void session; // mantém dep — se a sessão mudou, refazemos a leitura.
    return {
      allowed: client.hasPermission(permission),
      permissions: client.getPermissions(),
    };
  }, [client, permission, session]);
}
