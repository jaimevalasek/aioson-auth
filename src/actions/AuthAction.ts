import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createHash } from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma.js';
import { getGlobalSettings } from './GlobalSettingsAction.js';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_TTL_SECS = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL_SECS = 7 * 24 * 60 * 60; // 7 days

import { JWT_SECRET } from '../lib/jwt-secret.js';
import { AuthError } from '../lib/auth-error.js';

export interface LoginOutput {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string };
}

/**
 * Agrega permissions do user para um binding. Não-fatal: se RBAC está
 * desabilitado no binding (ou binding inválido), retorna `[]` em vez de
 * propagar erro — assim o login básico continua funcionando mesmo em
 * bindings sem RBAC habilitado.
 */
async function safeGetPermissionsForBinding(
  userId: string,
  bindingId: string
): Promise<string[]> {
  try {
    const { getUserPermissionsForBinding } = await import('./RbacAction.js');
    return await getUserPermissionsForBinding(userId, bindingId);
  } catch {
    return [];
  }
}

// ─── Register ────────────────────────────────────────────────────────────────

export async function register(
  email: string,
  password: string
): Promise<{ userId: string; verified: boolean }> {
  const existing = await prisma.globalUser.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.globalUser.create({
    data: { id: uuidv4(), email, password_hash: passwordHash, name: '' },
  });

  return { userId: user.id, verified: false };
}

// ─── Login ────────────────────────────────────────────────────────────────

export async function login(
  email: string,
  password: string,
  bindingId: string
): Promise<LoginOutput> {
  const user = await prisma.globalUser.findUnique({ where: { email } });
  if (!user) throw new AuthError('invalid_credentials');

  if (!user.password_hash) throw new AuthError('invalid_credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new AuthError('invalid_credentials');

  return createSession(user.id, user.email, bindingId);
}

// ─── OAuth Login ──────────────────────────────────────────────────────────

export async function oauthLogin(
  email: string,
  name?: string,
  bindingId?: string
): Promise<LoginOutput> {
  let user = await prisma.globalUser.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.globalUser.create({
      data: { id: uuidv4(), email, password_hash: null, name: name ?? '' },
    });
  }
  return createSession(user.id, user.email, requireBindingId(bindingId));
}

// ─── Session management ───────────────────────────────────────────────────

async function createSession(
  userId: string,
  email: string,
  bindingId: string,
  client: SessionClient = prisma,
): Promise<LoginOutput> {
  // Embute permissions no payload do JWT quando bindingId é fornecido. Apps
  // que validam offline (ou que cacham `/me`) decidem UI sem N requests pra
  // `/rbac/check`. /rbac/check segue valendo como defense-in-depth server-side.
  // Ver auth-integration-gaps.md (Slice A) no aioson-play.
  const permissions = await safeGetPermissionsForBinding(userId, bindingId);

  const jwtPayload: Record<string, unknown> = { sub: userId, email, binding_id: bindingId };
  if (permissions.length > 0) jwtPayload['permissions'] = permissions;

  const accessToken = jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL_SECS,
  });
  const refreshToken = uuidv4();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECS * 1000);

  await client.authSession.create({
    data: {
      id: uuidv4(),
      user_id: userId,
      token: refreshToken,
      binding_id: bindingId,
      expires_at: expiresAt,
    },
  });

  return { accessToken, refreshToken, user: { id: userId, email, name: '' } };
}

type SessionClient = {
  authSession: Pick<typeof prisma.authSession, 'create'>;
};

function requireBindingId(bindingId?: string): string {
  const normalizedBindingId = bindingId?.trim();
  if (!normalizedBindingId) throw new AuthError('validation_failed');
  return normalizedBindingId;
}

export async function logout(refreshToken: string, bindingId: string): Promise<void> {
  const session = await prisma.authSession.findFirst({ where: { token: refreshToken } });
  if (!session) throw new AuthError('refresh_invalid');
  if (!session.binding_id) {
    await prisma.authSession.delete({ where: { id: session.id } });
    throw new AuthError('session_reauthentication_required');
  }
  if (session.binding_id !== bindingId) throw new AuthError('binding_mismatch');
  await prisma.authSession.delete({ where: { id: session.id } });
}

export async function validateRefreshToken(
  refreshToken: string,
  bindingId: string
): Promise<LoginOutput> {
  const requiredBindingId = requireBindingId(bindingId);
  return prisma.$transaction(async (tx) => {
    const session = await tx.authSession.findFirst({ where: { token: refreshToken } });
    if (!session) throw new AuthError('refresh_invalid');

    if (!session.binding_id) {
      await tx.authSession.delete({ where: { id: session.id } });
      throw new AuthError('session_reauthentication_required');
    }
    if (session.binding_id !== requiredBindingId) throw new AuthError('binding_mismatch');

    if (session.expires_at < new Date()) {
      await tx.authSession.delete({ where: { id: session.id } });
      throw new AuthError('refresh_invalid');
    }

    const user = await tx.globalUser.findUnique({ where: { id: session.user_id } });
    if (!user) {
      await tx.authSession.delete({ where: { id: session.id } });
      throw new AuthError('refresh_invalid');
    }

    // Delete + create happen in the same transaction so a refresh token can
    // produce at most one successor session under concurrent requests.
    try {
      await tx.authSession.delete({ where: { id: session.id } });
    } catch {
      throw new AuthError('refresh_invalid');
    }
    return createSession(user.id, user.email, requiredBindingId, tx);
  });
}

export async function getRefreshSessionUser(refreshToken: string): Promise<LoginOutput['user']> {
  const session = await prisma.authSession.findFirst({ where: { token: refreshToken } });
  if (!session || !session.binding_id || session.expires_at < new Date()) {
    throw new AuthError('refresh_invalid');
  }

  const user = await prisma.globalUser.findUnique({ where: { id: session.user_id } });
  if (!user) throw new AuthError('refresh_invalid');
  return { id: user.id, email: user.email, name: user.name };
}

// ─── Token validation ─────────────────────────────────────────────────────

export interface TokenPayload {
  sub: string;
  email: string;
  /** Binding contra o qual o token foi emitido (presente quando o login passou bindingId). */
  binding_id?: string;
  /** Permissions agregadas no login/refresh para o binding acima (Slice A). */
  permissions?: string[];
}

/**
 * Valida o JWT + checa lista de revogação imediata (ADR-07). Quando o user
 * tem entry ativa em `TokenRevocation`, mesmo um JWT ainda dentro do TTL
 * é rejeitado.
 *
 * Async porque a checagem de revocation toca o DB. Todos os callers já
 * estão em contexto async (route handlers).
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) throw new AuthError('expired_token');
    throw new AuthError('invalid_token');
  }
  // Lazy import pra evitar circular dep (TokenRevocationAction usa prisma).
  const { isUserRevoked } = await import('./TokenRevocationAction.js');
  if (await isUserRevoked(payload.sub)) {
    throw new AuthError('revoked_token');
  }
  const result: TokenPayload = { sub: payload.sub, email: payload.email };
  if (payload.binding_id) result.binding_id = payload.binding_id;
  if (payload.permissions) result.permissions = payload.permissions;
  return result;
}

export function assertAccessTokenBinding(payload: TokenPayload, bindingId: string): void {
  if (!payload.binding_id || payload.binding_id !== bindingId) {
    throw new AuthError('binding_mismatch');
  }
}

// ─── Forgot / Reset Password ─────────────────────────────────────────────

export async function forgotPassword(email: string): Promise<{ sent: boolean }> {
  const user = await prisma.globalUser.findUnique({ where: { email } });
  if (!user) return { sent: true }; // Don't reveal if email exists

  const resetToken = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.recoveryToken.create({
    data: { id: uuidv4(), user_id: user.id, token: hashRecoveryToken(resetToken), expires_at: expiresAt, used: false },
  });

  const settings = await getGlobalSettings();
  if (settings?.smtp_host) {
    // Delivery is intentionally delegated to the configured mail transport.
    // Tokens and recipient identifiers must never be written to process logs.
    console.info(JSON.stringify({
      timestamp: new Date().toISOString(),
      component: 'aioson-auth',
      operation: 'password_recovery_requested',
      status: 202,
    }));
  }

  return { sent: true };
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean }> {
  const recovery = await prisma.recoveryToken.findFirst({
    where: { token: hashRecoveryToken(token), used: false, expires_at: { gt: new Date() } },
  });
  if (!recovery) throw new Error('Invalid or expired reset token');

  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await prisma.globalUser.update({
    where: { id: recovery.user_id },
    data: { password_hash: passwordHash },
  });

  await prisma.recoveryToken.update({ where: { id: recovery.id }, data: { used: true } });

  // Invalidate all sessions for this user
  await prisma.authSession.deleteMany({ where: { user_id: recovery.user_id } });

  return { success: true };
}

function hashRecoveryToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

// ─── Get user from token ─────────────────────────────────────────────────

export async function getUserFromToken(token: string): Promise<{
  id: string;
  email: string;
  name: string;
} | null> {
  try {
    const payload = await verifyAccessToken(token);
    const user = await prisma.globalUser.findUnique({ where: { id: payload.sub } });
    if (!user) return null;
    return { id: user.id, email: user.email, name: user.name };
  } catch {
    return null;
  }
}
