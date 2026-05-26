export { createAuthClient, redirectToSso, handleSsoCallback } from './client.js';
export type { AuthClient, SsoOptions } from './client.js';
export { AuthError, inferErrorCode } from './errors.js';
export type { AuthErrorCode } from './errors.js';
export { memoryStorage, localStorageAdapter } from './storage.js';
export { decodeJwtPayload, isTokenExpired } from './jwt.js';
export type {
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
  StorageKey,
  TokenPayload,
  TokenStorage,
  User,
} from './types.js';
