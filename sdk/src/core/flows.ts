// Framework-neutral auth flows (architecture.md § 6/§ 7, D1 + D2).
//
// These functions hold the auth business logic, reusing the embedded engine
// primitives (queries, auth-crypto, revocation-checker). They take a neutral
// input + deps and return an AuthResult — no Express/Next types here. Both the
// Express adapter (embedded/handlers.ts) and the future Next adapter delegate
// to these. Behaviour mirrors the previous inline Express handlers exactly
// (same status codes, bodies and cookie semantics), with signupCore added (D2).
//
// Validation is intentionally lightweight/manual (no Zod) to preserve the SDK's
// zero-dependency ethos (auth-crypto is zero-dep, bcryptjs is a lazy peer).
// Revisit if flow validation grows in complexity.

import {
  signAccessToken,
  signRefreshToken,
  verifyPassword,
  verifyJwt,
  generateId,
  generateResetToken,
  hashToken,
  hashPassword,
  ACCESS_TTL_SECS,
  REFRESH_TTL_SECS,
  REVOCATION_TTL_SECS,
  RESET_TOKEN_TTL_SECS,
} from '../embedded/auth-crypto.js';
import { createQueries } from '../embedded/queries.js';
import type { RevocationChecker } from '../embedded/revocation-checker.js';
import { COOKIE_ACCESS, COOKIE_REFRESH } from './cookies.js';
import { type AuthResult, ok, fail } from './result.js';

/** The query surface produced by `createQueries(prisma, provider)`. */
export type Queries = ReturnType<typeof createQueries>;

/** A revocation checker (callable) that also exposes `invalidate`. */
export type RevocationCheck = RevocationChecker & { invalidate: (userId: string) => void };

export interface FlowDeps {
  queries: Queries;
  jwtSecret: string;
  bindingId: string;
  checkRevocation: RevocationCheck;
  /** D2 signup policy. When false AND at least one user exists, signup is rejected. Default true. */
  allowSignup?: boolean;
  /** Role granted to the very first user (bootstrap). Default 'admin' (matches embedded bootstrap). */
  firstUserRole?: string;
  /** Role granted to subsequent signups. Default 'viewer'. */
  defaultRole?: string;
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

/** Mint access+refresh tokens for a user and return them as an AuthResult with cookies. */
function buildSession(
  deps: FlowDeps,
  user: { id: string; email: string; name: string },
  permissions: string[],
  status: number,
): AuthResult {
  const accessToken = signAccessToken({ id: user.id, email: user.email }, deps.bindingId, permissions, deps.jwtSecret);
  const refreshToken = signRefreshToken({ id: user.id, email: user.email }, deps.bindingId, deps.jwtSecret);
  return {
    status,
    body: { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } },
    setCookies: [
      { name: COOKIE_ACCESS, value: accessToken, maxAgeSecs: ACCESS_TTL_SECS },
      { name: COOKIE_REFRESH, value: refreshToken, maxAgeSecs: REFRESH_TTL_SECS },
    ],
  };
}

// ─── login ────────────────────────────────────────────────────────────────

export interface LoginInput {
  email?: unknown;
  password?: unknown;
}

export async function loginCore(deps: FlowDeps, input: LoginInput): Promise<AuthResult> {
  const email = asString(input.email);
  const password = asString(input.password);
  if (!email || !password) return fail(400, 'Email and password required');

  const user = await deps.queries.findUserByEmail(email);
  if (!user) return fail(401, 'Invalid credentials');

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return fail(401, 'Invalid credentials');

  const permissions = await deps.queries.getUserPermissions(user.id, deps.bindingId);
  await deps.queries.updateLastLogin(user.id);
  return buildSession(deps, user, permissions, 200);
}

// ─── signup (D2 — gap filled by Onda 1) ─────────────────────────────────────

export interface SignupInput {
  email?: unknown;
  password?: unknown;
  name?: unknown;
}

/**
 * Standalone self-service registration with bootstrap-aware policy:
 *  - first user ever  → always allowed; granted `firstUserRole` (default 'admin')
 *  - subsequent users → require `allowSignup` (default true); granted `defaultRole` (default 'viewer')
 * Auto-logs in on success (Jetstream-style), returning 201 + session cookies.
 */
export async function signupCore(deps: FlowDeps, input: SignupInput): Promise<AuthResult> {
  const email = asString(input.email);
  const password = asString(input.password);
  const name = asString(input.name);
  if (!email || !password) return fail(400, 'Email and password required');

  const existing = await deps.queries.findUserByEmail(email);
  if (existing) return fail(409, 'Email already registered');

  const isFirstUser = (await deps.queries.countUsers()) === 0;
  const allowSignup = deps.allowSignup ?? true;
  if (!isFirstUser && !allowSignup) return fail(403, 'Signup disabled');

  const roleName = isFirstUser ? (deps.firstUserRole ?? 'admin') : (deps.defaultRole ?? 'viewer');

  const userId = generateId();
  const passwordHash = await hashPassword(password);
  await deps.queries.insertUser({ id: userId, email, password_hash: passwordHash, name });

  // Ensure the role exists, then assign it (same pattern as embedded bootstrap).
  let role = await deps.queries.findRoleByName(roleName);
  if (!role) {
    const roleId = generateId();
    await deps.queries.insertRole({ id: roleId, name: roleName, description: `${roleName} role` });
    role = { id: roleId, name: roleName, description: '', created_at: new Date().toISOString() };
  }
  await deps.queries.assignRoleToUser({ id: generateId(), userId, roleId: role.id, grantedBy: null });

  const permissions = await deps.queries.getUserPermissions(userId, deps.bindingId);
  return buildSession(deps, { id: userId, email, name }, permissions, 201);
}

// ─── refresh ────────────────────────────────────────────────────────────────

export interface RefreshInput {
  refreshToken?: unknown;
}

export async function refreshCore(deps: FlowDeps, input: RefreshInput): Promise<AuthResult> {
  const rt = asString(input.refreshToken);
  if (!rt) return fail(400, 'Refresh token required');

  const payload = verifyJwt(rt, deps.jwtSecret);
  if (!payload || payload.type !== 'refresh') return fail(401, 'Invalid refresh token');

  if (await deps.checkRevocation(payload.sub, payload.iat)) return fail(401, 'Token revoked');

  const user = await deps.queries.findUserById(payload.sub);
  if (!user) return fail(401, 'User not found');

  const permissions = await deps.queries.getUserPermissions(user.id, deps.bindingId);
  return buildSession(deps, user, permissions, 200);
}

// ─── logout ───────────────────────────────────────────────────────────────

export interface TokenInput {
  /** Bearer token extracted from the request, if any. */
  token?: string | null;
}

export async function logoutCore(deps: FlowDeps, input: TokenInput): Promise<AuthResult> {
  const token = input.token ?? null;
  if (token) {
    const payload = verifyJwt(token, deps.jwtSecret);
    if (payload) {
      const expiresAt = new Date(Date.now() + REVOCATION_TTL_SECS * 1000);
      await deps.queries.insertRevocation({ id: generateId(), userId: payload.sub, reason: 'logout', expiresAt });
      deps.checkRevocation.invalidate(payload.sub);
    }
  }
  return { status: 200, body: { success: true }, clearCookies: [COOKIE_ACCESS, COOKIE_REFRESH] };
}

// ─── me ───────────────────────────────────────────────────────────────────

export async function meCore(deps: FlowDeps, input: TokenInput): Promise<AuthResult> {
  const token = input.token ?? null;
  if (!token) return fail(401, 'Missing token');

  const payload = verifyJwt(token, deps.jwtSecret);
  if (!payload) return fail(401, 'Invalid or expired token');

  if (await deps.checkRevocation(payload.sub, payload.iat)) return fail(401, 'Token revoked');

  return ok({
    sub: payload.sub,
    email: payload.email,
    binding_id: payload.binding_id,
    permissions: payload.permissions,
  });
}

// ─── password reset ─────────────────────────────────────────────────────────

export interface PasswordResetRequestInput {
  email?: unknown;
}

export async function passwordResetRequestCore(
  deps: FlowDeps,
  input: PasswordResetRequestInput,
): Promise<AuthResult> {
  const email = asString(input.email);
  if (!email) return fail(400, 'Email required');

  const user = await deps.queries.findUserByEmail(email);
  if (user) {
    const { raw, hash } = generateResetToken();
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_SECS * 1000);
    await deps.queries.insertResetToken({ id: generateId(), userId: user.id, tokenHash: hash, expiresAt });
    // Out-of-band delivery (email is Onda 2). Token surfaced via log for dev wiring.
    console.log(`[aioson-auth/embedded] Password reset token generated for ${email}: ${raw}`);
  }

  // Anti-enumeration: always reply identically whether or not the email exists.
  return ok({ sent: true });
}

export interface PasswordResetConfirmInput {
  token?: unknown;
  newPassword?: unknown;
}

export async function passwordResetConfirmCore(
  deps: FlowDeps,
  input: PasswordResetConfirmInput,
): Promise<AuthResult> {
  const rawToken = asString(input.token);
  const newPassword = asString(input.newPassword);
  if (!rawToken || !newPassword) return fail(400, 'Token and newPassword required');

  const tokenHash = hashToken(rawToken);
  const resetEntry = await deps.queries.findValidResetToken(tokenHash);
  if (!resetEntry) return fail(400, 'Invalid or expired token');

  const newHash = await hashPassword(newPassword);
  await deps.queries.updatePassword(resetEntry.user_id, newHash);
  await deps.queries.markResetTokenUsed(resetEntry.id);

  // Revoke any tokens minted before the password change.
  const expiresAt = new Date(Date.now() + REVOCATION_TTL_SECS * 1000);
  await deps.queries.insertRevocation({ id: generateId(), userId: resetEntry.user_id, reason: 'password_change', expiresAt });
  deps.checkRevocation.invalidate(resetEntry.user_id);

  return { status: 200, body: { success: true }, clearCookies: [COOKIE_ACCESS, COOKIE_REFRESH] };
}
