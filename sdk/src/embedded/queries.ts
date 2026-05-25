import type { DbProvider, PrismaClientLike, RevocationReason } from './types.js';

// ─── Provider helpers ───────────────────────────────────────────────────────

function ph(provider: DbProvider, n: number): string {
  return provider === 'postgresql' ? `$${n}` : '?';
}

function nowExpr(provider: DbProvider): string {
  return provider === 'sqlite' ? "datetime('now')" : 'NOW()';
}

function toNumber(v: unknown): number {
  if (typeof v === 'bigint') return Number(v);
  return Number(v ?? 0);
}

// ─── Row types ──────────────────────────────────────────────────────────────

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  email_verified: number | boolean;
  created_at: string | Date;
  last_login_at: string | Date | null;
}

export interface RevocationRow {
  id: string;
  user_id: string;
  revoked_at: string | Date;
  reason: string;
  expires_at: string | Date;
}

export interface RoleRow {
  id: string;
  name: string;
  description: string;
  created_at: string | Date;
}

export interface ResetTokenRow {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string | Date;
  used_at: string | Date | null;
  created_at: string | Date;
}

// ─── Factory ────────────────────────────────────────────────────────────────

export function createQueries(prisma: PrismaClientLike, provider: DbProvider) {
  const $ = (n: number) => ph(provider, n);
  const NOW = nowExpr(provider);

  return {
    // ── Users ─────────────────────────────────────────────────────────────

    async findUserByEmail(email: string): Promise<UserRow | null> {
      const rows = await prisma.$queryRawUnsafe<UserRow[]>(
        `SELECT * FROM aioson_auth_users WHERE email = ${$(1)}`,
        email,
      );
      return rows[0] ?? null;
    },

    async findUserById(id: string): Promise<UserRow | null> {
      const rows = await prisma.$queryRawUnsafe<UserRow[]>(
        `SELECT * FROM aioson_auth_users WHERE id = ${$(1)}`,
        id,
      );
      return rows[0] ?? null;
    },

    async insertUser(data: {
      id: string;
      email: string;
      password_hash: string;
      name: string;
    }): Promise<void> {
      await prisma.$executeRawUnsafe(
        `INSERT INTO aioson_auth_users (id, email, password_hash, name) VALUES (${$(1)}, ${$(2)}, ${$(3)}, ${$(4)})`,
        data.id, data.email, data.password_hash, data.name,
      );
    },

    async updateLastLogin(userId: string): Promise<void> {
      await prisma.$executeRawUnsafe(
        `UPDATE aioson_auth_users SET last_login_at = ${NOW} WHERE id = ${$(1)}`,
        userId,
      );
    },

    async updatePassword(userId: string, passwordHash: string): Promise<void> {
      await prisma.$executeRawUnsafe(
        `UPDATE aioson_auth_users SET password_hash = ${$(1)} WHERE id = ${$(2)}`,
        passwordHash, userId,
      );
    },

    async countUsers(): Promise<number> {
      const rows = await prisma.$queryRawUnsafe<Array<{ c: unknown }>>(
        'SELECT COUNT(*) AS c FROM aioson_auth_users',
      );
      return toNumber(rows[0]?.c);
    },

    // ── Roles ─────────────────────────────────────────────────────────────

    async findRoleByName(name: string): Promise<RoleRow | null> {
      const rows = await prisma.$queryRawUnsafe<RoleRow[]>(
        `SELECT * FROM aioson_auth_roles WHERE name = ${$(1)}`,
        name,
      );
      return rows[0] ?? null;
    },

    async insertRole(data: {
      id: string;
      name: string;
      description: string;
    }): Promise<void> {
      await prisma.$executeRawUnsafe(
        `INSERT INTO aioson_auth_roles (id, name, description) VALUES (${$(1)}, ${$(2)}, ${$(3)})`,
        data.id, data.name, data.description,
      );
    },

    async assignRoleToUser(data: {
      id: string;
      userId: string;
      roleId: string;
      grantedBy: string | null;
    }): Promise<void> {
      await prisma.$executeRawUnsafe(
        `INSERT INTO aioson_auth_user_roles (id, user_id, role_id, granted_by) VALUES (${$(1)}, ${$(2)}, ${$(3)}, ${$(4)})`,
        data.id, data.userId, data.roleId, data.grantedBy,
      );
    },

    // ── Permissions (via role assignments) ────────────────────────────────

    async getUserPermissions(userId: string, _bindingId: string): Promise<string[]> {
      const rows = await prisma.$queryRawUnsafe<Array<{ name: string }>>(
        `SELECT DISTINCT p.name
         FROM aioson_auth_user_roles ur
         JOIN aioson_auth_role_permissions rp ON rp.role_id = ur.role_id
         JOIN aioson_auth_permissions p ON p.id = rp.permission_id
         WHERE ur.user_id = ${$(1)}`,
        userId,
      );
      return rows.map(r => r.name);
    },

    // ── Revocations ──────────────────────────────────────────────────────

    async insertRevocation(data: {
      id: string;
      userId: string;
      reason: RevocationReason;
      expiresAt: Date;
    }): Promise<void> {
      const expiresStr = data.expiresAt.toISOString();
      await prisma.$executeRawUnsafe(
        `INSERT INTO aioson_auth_revocations (id, user_id, reason, expires_at) VALUES (${$(1)}, ${$(2)}, ${$(3)}, ${$(4)})`,
        data.id, data.userId, data.reason, expiresStr,
      );
    },

    async getActiveRevocations(userId: string): Promise<RevocationRow[]> {
      return prisma.$queryRawUnsafe<RevocationRow[]>(
        `SELECT * FROM aioson_auth_revocations WHERE user_id = ${$(1)} AND expires_at > ${NOW}`,
        userId,
      );
    },

    // ── Password Reset Tokens ────────────────────────────────────────────

    async insertResetToken(data: {
      id: string;
      userId: string;
      tokenHash: string;
      expiresAt: Date;
    }): Promise<void> {
      const expiresStr = data.expiresAt.toISOString();
      await prisma.$executeRawUnsafe(
        `INSERT INTO aioson_auth_password_reset_tokens (id, user_id, token_hash, expires_at) VALUES (${$(1)}, ${$(2)}, ${$(3)}, ${$(4)})`,
        data.id, data.userId, data.tokenHash, expiresStr,
      );
    },

    async findValidResetToken(tokenHash: string): Promise<ResetTokenRow | null> {
      const rows = await prisma.$queryRawUnsafe<ResetTokenRow[]>(
        `SELECT * FROM aioson_auth_password_reset_tokens WHERE token_hash = ${$(1)} AND expires_at > ${NOW} AND used_at IS NULL`,
        tokenHash,
      );
      return rows[0] ?? null;
    },

    async markResetTokenUsed(tokenId: string): Promise<void> {
      await prisma.$executeRawUnsafe(
        `UPDATE aioson_auth_password_reset_tokens SET used_at = ${NOW} WHERE id = ${$(1)}`,
        tokenId,
      );
    },
  };
}
