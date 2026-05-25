export { runEmbeddedMigrations } from './migrate.js';
export { AIOSON_AUTH_TABLES, CONFLICT_TABLE_NAMES, getMigrationStatements } from './schema.js';
export type { AiosonAuthTable } from './schema.js';
export {
  generateId,
  hashPassword,
  verifyPassword,
  signJwt,
  verifyJwt,
  signAccessToken,
  signRefreshToken,
  generateResetToken,
  hashToken,
  generateTempPassword,
  ACCESS_TTL_SECS,
  REFRESH_TTL_SECS,
  REVOCATION_TTL_SECS,
  RESET_TOKEN_TTL_SECS,
} from './auth-crypto.js';
export type { EmbeddedTokenPayload } from './auth-crypto.js';
export { createQueries } from './queries.js';
export type { UserRow, RoleRow, RevocationRow, ResetTokenRow } from './queries.js';
export { bootstrap } from './bootstrap.js';
export type { BootstrapOptions, BootstrapResult } from './bootstrap.js';
export { createAuthRouter } from './handlers.js';
export type { EmbeddedHandlerConfig } from './handlers.js';
export { createRevocationChecker } from './revocation-checker.js';
export type { RevocationChecker } from './revocation-checker.js';
export { createEmbeddedBackend } from './backend.js';
export type { EmbeddedBackend, EmbeddedBackendConfig } from './backend.js';
export type {
  AuthPasswordResetToken,
  AuthPermission,
  AuthRevocation,
  AuthRole,
  AuthRolePermission,
  AuthUser,
  AuthUserRole,
  DbProvider,
  EmbeddedConfig,
  MigrateOptions,
  MigrateResult,
  PrismaClientLike,
  RevocationReason,
} from './types.js';
