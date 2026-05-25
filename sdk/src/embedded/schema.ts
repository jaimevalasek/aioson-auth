import type { DbProvider } from './types.js';

export const AIOSON_AUTH_TABLES = [
  'aioson_auth_users',
  'aioson_auth_roles',
  'aioson_auth_permissions',
  'aioson_auth_user_roles',
  'aioson_auth_role_permissions',
  'aioson_auth_revocations',
  'aioson_auth_password_reset_tokens',
] as const;

export type AiosonAuthTable = (typeof AIOSON_AUTH_TABLES)[number];

export const CONFLICT_TABLE_NAMES = ['users', 'roles', 'permissions'] as const;

// ─── SQLite ─────────────────────────────────────────────────────────────────

const SQLITE: string[] = [
  `CREATE TABLE IF NOT EXISTS aioson_auth_users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    email_verified INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_login_at TEXT
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_permissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_user_roles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES aioson_auth_users(id) ON DELETE CASCADE,
    role_id TEXT NOT NULL REFERENCES aioson_auth_roles(id) ON DELETE CASCADE,
    granted_by TEXT,
    granted_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, role_id)
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_role_permissions (
    id TEXT PRIMARY KEY,
    role_id TEXT NOT NULL REFERENCES aioson_auth_roles(id) ON DELETE CASCADE,
    permission_id TEXT NOT NULL REFERENCES aioson_auth_permissions(id) ON DELETE CASCADE,
    UNIQUE(role_id, permission_id)
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_revocations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    revoked_at TEXT NOT NULL DEFAULT (datetime('now')),
    reason TEXT NOT NULL DEFAULT 'admin',
    expires_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_aioson_auth_revocations_lookup ON aioson_auth_revocations(user_id, expires_at)`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_password_reset_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS idx_aioson_auth_reset_hash ON aioson_auth_password_reset_tokens(token_hash)`,
];

// ─── PostgreSQL ─────────────────────────────────────────────────────────────

const POSTGRESQL: string[] = [
  `CREATE TABLE IF NOT EXISTS aioson_auth_users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_permissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_user_roles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES aioson_auth_users(id) ON DELETE CASCADE,
    role_id TEXT NOT NULL REFERENCES aioson_auth_roles(id) ON DELETE CASCADE,
    granted_by TEXT,
    granted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, role_id)
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_role_permissions (
    id TEXT PRIMARY KEY,
    role_id TEXT NOT NULL REFERENCES aioson_auth_roles(id) ON DELETE CASCADE,
    permission_id TEXT NOT NULL REFERENCES aioson_auth_permissions(id) ON DELETE CASCADE,
    UNIQUE(role_id, permission_id)
  )`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_revocations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    revoked_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reason TEXT NOT NULL DEFAULT 'admin',
    expires_at TIMESTAMP NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_aioson_auth_revocations_lookup ON aioson_auth_revocations(user_id, expires_at)`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_password_reset_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS idx_aioson_auth_reset_hash ON aioson_auth_password_reset_tokens(token_hash)`,
];

// ─── MySQL ──────────────────────────────────────────────────────────────────

const MYSQL: string[] = [
  `CREATE TABLE IF NOT EXISTS aioson_auth_users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT '',
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_roles (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(191) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_permissions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(191) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_user_roles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    granted_by VARCHAR(36),
    granted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES aioson_auth_users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES aioson_auth_roles(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_role_permissions (
    id VARCHAR(36) PRIMARY KEY,
    role_id VARCHAR(36) NOT NULL,
    permission_id VARCHAR(36) NOT NULL,
    UNIQUE(role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES aioson_auth_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES aioson_auth_permissions(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_revocations (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    revoked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(50) NOT NULL DEFAULT 'admin',
    expires_at DATETIME NOT NULL,
    INDEX idx_aioson_auth_revocations_lookup (user_id, expires_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS aioson_auth_password_reset_tokens (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_aioson_auth_reset_hash (token_hash)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

const SCHEMAS: Record<DbProvider, string[]> = {
  sqlite: SQLITE,
  postgresql: POSTGRESQL,
  mysql: MYSQL,
};

export function getMigrationStatements(provider: DbProvider): string[] {
  return SCHEMAS[provider];
}
