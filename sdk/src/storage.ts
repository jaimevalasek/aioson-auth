import type { TokenStorage, StorageKey } from './types.js';

/**
 * In-memory storage. Default no `createAuthClient`. Tokens somem ao
 * recarregar — bom para SSR ou cenários sem persistência.
 */
export function memoryStorage(): TokenStorage {
  const map: Partial<Record<StorageKey, string | null>> = {};
  return {
    get(key) {
      return map[key] ?? null;
    },
    set(key, value) {
      map[key] = value;
    },
  };
}

/**
 * `localStorage` adapter. Use em browsers para sobreviver a reloads.
 * Falha silenciosamente em ambientes sem `window.localStorage` (SSR,
 * Node sem polyfill) — cai pra memória.
 */
export function localStorageAdapter(prefix = 'aioson-auth'): TokenStorage {
  const hasLS =
    typeof globalThis !== 'undefined' &&
    typeof (globalThis as { localStorage?: Storage }).localStorage !== 'undefined';

  if (!hasLS) {
    return memoryStorage();
  }

  const ls = (globalThis as { localStorage: Storage }).localStorage;
  const k = (key: StorageKey) => `${prefix}:${key}`;

  return {
    get(key) {
      return ls.getItem(k(key));
    },
    set(key, value) {
      if (value === null) ls.removeItem(k(key));
      else ls.setItem(k(key), value);
    },
  };
}
