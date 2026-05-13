export { createAuthClient } from './client.js';
export type { AuthClient } from './client.js';
export { AuthError, inferErrorCode } from './errors.js';
export type { AuthErrorCode } from './errors.js';
export { memoryStorage, localStorageAdapter } from './storage.js';
export { decodeJwtPayload, isTokenExpired } from './jwt.js';
export type {
  AuthClientOptions,
  AuthSession,
  LoginInput,
  MePayload,
  OAuthInput,
  SessionListener,
  StorageKey,
  TokenPayload,
  TokenStorage,
  User,
} from './types.js';
