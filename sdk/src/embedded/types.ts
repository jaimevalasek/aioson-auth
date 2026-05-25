export type DbProvider = 'sqlite' | 'postgresql' | 'mysql';

export interface PrismaClientLike {
  $executeRawUnsafe(query: string, ...values: unknown[]): Promise<number>;
  $queryRawUnsafe<T = unknown>(query: string, ...values: unknown[]): Promise<T>;
}

export interface EmbeddedConfig {
  prisma: PrismaClientLike;
  jwtSecret: string;
  bindingId: string;
  cookieDomain: string;
  provider?: DbProvider;
}

export interface MigrateOptions {
  prisma: PrismaClientLike;
  provider?: DbProvider;
}

export interface MigrateResult {
  provider: DbProvider;
  tablesCreated: string[];
  conflicts: string[];
  alreadyExisted: string[];
}

// ─── Entity types ───────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  email_verified: boolean;
  created_at: string;
  last_login_at: string | null;
}

export interface AuthRole {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface AuthPermission {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface AuthUserRole {
  id: string;
  user_id: string;
  role_id: string;
  granted_by: string | null;
  granted_at: string;
}

export interface AuthRolePermission {
  id: string;
  role_id: string;
  permission_id: string;
}

export type RevocationReason = 'logout' | 'admin' | 'password_change';

export interface AuthRevocation {
  id: string;
  user_id: string;
  revoked_at: string;
  reason: RevocationReason;
  expires_at: string;
}

export interface AuthPasswordResetToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  used_at: string | null;
  created_at: string;
}
