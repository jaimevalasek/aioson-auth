// Tipos canônicos do aioson-auth. Espelho do contrato em
// aioson-auth/docs/integration-manual.md.

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Payload do JWT do access token. Desde Slice A (2026-05-13) inclui
 * `binding_id` e `permissions` quando o login foi feito contra um binding
 * com RBAC habilitado.
 */
export interface TokenPayload {
  sub: string;
  email: string;
  binding_id?: string;
  permissions?: string[];
  iat?: number;
  exp?: number;
}

/** Resposta do GET /me. Mesmo shape do TokenPayload menos iat/exp. */
export interface MePayload {
  sub: string;
  email: string;
  binding_id?: string;
  permissions?: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface OAuthInput {
  email: string;
  provider: 'google' | 'github';
  providerId: string;
  name?: string;
}

export interface AuthClientOptions {
  /** URL base do aioson-auth, ex.: `http://localhost:3001`. */
  baseUrl: string;
  /** UUID do AppBinding criado pelo admin no painel. */
  bindingId: string;
  /**
   * Onde guardar tokens. Default: `memoryStorage()`. Em browsers use
   * `localStorageAdapter()` para persistir entre reloads.
   */
  storage?: TokenStorage;
  /**
   * Se true (default), a próxima request após 401 tenta renovar o access
   * token automaticamente usando o refresh token armazenado.
   */
  autoRefresh?: boolean;
  /**
   * Implementação de fetch customizada (default: `globalThis.fetch`).
   * Útil para testes ou para injetar interceptors.
   */
  fetch?: typeof fetch;
}

export type StorageKey = 'access' | 'refresh';

export interface TokenStorage {
  get(key: StorageKey): string | null | Promise<string | null>;
  set(key: StorageKey, value: string | null): void | Promise<void>;
}

export type SessionListener = (session: AuthSession | null) => void;
