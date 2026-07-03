import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma.js';
import { getGlobalSettings } from './GlobalSettingsAction.js';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_TTL_SECS = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL_SECS = 7 * 24 * 60 * 60; // 7 days

import { JWT_SECRET } from '../lib/jwt-secret.js';

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
  bindingId?: string
): Promise<LoginOutput> {
  const user = await prisma.globalUser.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  if (!user.password_hash) throw new Error('This account uses social login');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

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
  return createSession(user.id, user.email, bindingId);
}

// ─── Session management ───────────────────────────────────────────────────

async function createSession(
  userId: string,
  email: string,
  bindingId?: string
): Promise<LoginOutput> {
  // Embute permissions no payload do JWT quando bindingId é fornecido. Apps
  // que validam offline (ou que cacham `/me`) decidem UI sem N requests pra
  // `/rbac/check`. /rbac/check segue valendo como defense-in-depth server-side.
  // Ver auth-integration-gaps.md (Slice A) no aioson-play.
  const permissions = bindingId
    ? await safeGetPermissionsForBinding(userId, bindingId)
    : undefined;

  const jwtPayload: Record<string, unknown> = { sub: userId, email };
  if (bindingId) jwtPayload['binding_id'] = bindingId;
  if (permissions) jwtPayload['permissions'] = permissions;

  const accessToken = jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL_SECS,
  });
  const refreshToken = uuidv4();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECS * 1000);

  await prisma.authSession.create({
    data: { id: uuidv4(), user_id: userId, token: refreshToken, expires_at: expiresAt },
  });

  return { accessToken, refreshToken, user: { id: userId, email, name: '' } };
}

export async function logout(refreshToken: string): Promise<void> {
  await prisma.authSession.deleteMany({ where: { token: refreshToken } });
}

export async function validateRefreshToken(
  refreshToken: string,
  bindingId?: string
): Promise<LoginOutput> {
  const session = await prisma.authSession.findFirst({ where: { token: refreshToken } });
  if (!session) throw new Error('Invalid refresh token');

  if (session.expires_at < new Date()) {
    await prisma.authSession.delete({ where: { id: session.id } });
    throw new Error('Refresh token expired');
  }

  const user = await prisma.globalUser.findUnique({ where: { id: session.user_id } });
  if (!user) throw new Error('User not found');

  // Rotate refresh token. Re-agrega permissions ao gerar o novo access token
  // — isto é o que torna refresh um caminho legítimo pra atualizar permissions
  // após mudança de role/permission no painel.
  await prisma.authSession.delete({ where: { id: session.id } });
  return createSession(user.id, user.email, bindingId);
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
  } catch {
    throw new Error('Invalid or expired token');
  }
  // Lazy import pra evitar circular dep (TokenRevocationAction usa prisma).
  const { isUserRevoked } = await import('./TokenRevocationAction.js');
  if (await isUserRevoked(payload.sub)) {
    throw new Error('Invalid or expired token');
  }
  const result: TokenPayload = { sub: payload.sub, email: payload.email };
  if (payload.binding_id) result.binding_id = payload.binding_id;
  if (payload.permissions) result.permissions = payload.permissions;
  return result;
}

// ─── Forgot / Reset Password ─────────────────────────────────────────────

export async function forgotPassword(email: string): Promise<{ sent: boolean }> {
  const user = await prisma.globalUser.findUnique({ where: { email } });
  if (!user) return { sent: true }; // Don't reveal if email exists

  const resetToken = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.recoveryToken.create({
    data: { id: uuidv4(), user_id: user.id, token: resetToken, expires_at: expiresAt, used: false },
  });

  const settings = await getGlobalSettings();
  if (settings?.smtp_host) {
    console.log(`[forgot-password] token for ${email}: ${resetToken}`);
  }

  return { sent: true };
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean }> {
  const recovery = await prisma.recoveryToken.findFirst({
    where: { token, used: false, expires_at: { gt: new Date() } },
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
