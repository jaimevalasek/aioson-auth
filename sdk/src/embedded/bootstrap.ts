import {
  generateId,
  generateResetToken,
  generateTempPassword,
  hashPassword,
  RESET_TOKEN_TTL_SECS,
} from './auth-crypto.js';
import { createQueries } from './queries.js';
import type { DbProvider, PrismaClientLike } from './types.js';

export interface BootstrapOptions {
  prisma: PrismaClientLike;
  provider: DbProvider;
  ownerEmail: string;
  ownerRole?: string;
}

export interface BootstrapResult {
  created: boolean;
  userId?: string;
  tempPassword?: string;
  resetToken?: string;
}

export async function bootstrap(opts: BootstrapOptions): Promise<BootstrapResult> {
  const q = createQueries(opts.prisma, opts.provider);
  const roleName = opts.ownerRole ?? 'admin';

  // AC-SE-04: idempotent — if users already exist, silent no-op
  const count = await q.countUsers();
  if (count > 0) {
    return { created: false };
  }

  const userId = generateId();
  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  await q.insertUser({
    id: userId,
    email: opts.ownerEmail,
    password_hash: passwordHash,
    name: 'Admin',
  });

  // Create role if it doesn't exist, then assign
  let role = await q.findRoleByName(roleName);
  if (!role) {
    const roleId = generateId();
    await q.insertRole({ id: roleId, name: roleName, description: `Bootstrap ${roleName} role` });
    role = { id: roleId, name: roleName, description: '', created_at: new Date().toISOString() };
  }

  await q.assignRoleToUser({
    id: generateId(),
    userId,
    roleId: role.id,
    grantedBy: null,
  });

  // Generate password reset token (TTL 15min) for out-of-band delivery
  const { raw, hash } = generateResetToken();
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_SECS * 1000);
  await q.insertResetToken({ id: generateId(), userId, tokenHash: hash, expiresAt });

  console.log('[aioson-auth/embedded] Bootstrap complete:');
  console.log(`  Email: ${opts.ownerEmail}`);
  console.log(`  Role: ${roleName}`);
  console.log(`  Temp password: ${tempPassword}`);
  console.log(`  Reset token (TTL 15min): ${raw}`);

  return { created: true, userId, tempPassword, resetToken: raw };
}
