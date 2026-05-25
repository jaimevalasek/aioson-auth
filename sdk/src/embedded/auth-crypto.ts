import { createHmac, createHash, randomBytes, randomUUID } from 'node:crypto';

const BCRYPT_ROUNDS = 12;

export const ACCESS_TTL_SECS = 15 * 60;
export const REFRESH_TTL_SECS = 7 * 24 * 60 * 60;
export const REVOCATION_TTL_SECS = ACCESS_TTL_SECS;
export const RESET_TOKEN_TTL_SECS = 15 * 60;

export function generateId(): string {
  return randomUUID();
}

// ─── Password (bcryptjs, lazy-loaded) ───────────────────────────────────────

type BcryptLike = { hash(s: string, rounds: number): Promise<string>; compare(s: string, h: string): Promise<boolean> };
let _bc: BcryptLike | null = null;

async function bc(): Promise<BcryptLike> {
  if (_bc) return _bc;
  try {
    const mod = await import('bcryptjs');
    _bc = (mod as unknown as { default?: BcryptLike }).default ?? (mod as unknown as BcryptLike);
    return _bc;
  } catch {
    throw new Error('[aioson-auth/embedded] bcryptjs is required. Install: npm i bcryptjs');
  }
}

export async function hashPassword(password: string): Promise<string> {
  return (await bc()).hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await bc()).compare(password, hash);
}

// ─── JWT HS256 (zero deps) ──────────────────────────────────────────────────

export interface EmbeddedTokenPayload {
  sub: string;
  email: string;
  binding_id: string;
  permissions: string[];
  type: 'access' | 'refresh';
  iat: number;
  exp: number;
}

export function signJwt(
  claims: Omit<EmbeddedTokenPayload, 'iat' | 'exp'>,
  secret: string,
  ttlSecs: number,
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: EmbeddedTokenPayload = { ...claims, iat: now, exp: now + ttlSecs };
  const h = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const b = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(`${h}.${b}`).digest('base64url');
  return `${h}.${b}.${sig}`;
}

export function verifyJwt(token: string, secret: string): EmbeddedTokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [h, b, sig] = parts as [string, string, string];
  const expected = createHmac('sha256', secret).update(`${h}.${b}`).digest('base64url');
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(b, 'base64url').toString('utf8')) as EmbeddedTokenPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function signAccessToken(
  user: { id: string; email: string },
  bindingId: string,
  permissions: string[],
  secret: string,
): string {
  return signJwt(
    { sub: user.id, email: user.email, binding_id: bindingId, permissions, type: 'access' },
    secret,
    ACCESS_TTL_SECS,
  );
}

export function signRefreshToken(
  user: { id: string; email: string },
  bindingId: string,
  secret: string,
): string {
  return signJwt(
    { sub: user.id, email: user.email, binding_id: bindingId, permissions: [], type: 'refresh' },
    secret,
    REFRESH_TTL_SECS,
  );
}

// ─── Reset Token ────────────────────────────────────────────────────────────

export function generateResetToken(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString('hex');
  const hash = createHash('sha256').update(raw).digest('hex');
  return { raw, hash };
}

export function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

export function generateTempPassword(): string {
  return randomBytes(12).toString('base64url').slice(0, 16);
}
