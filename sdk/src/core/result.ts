// Framework-neutral result contract (architecture.md § 6, D1).
//
// Auth flows return an AuthResult instead of touching any transport object.
// Each adapter (Express, Next App Router) translates it: Express -> res.cookie/json,
// Next -> NextResponse + cookies() from next/headers. One source of truth for the
// auth logic; adapters only translate transport.

export interface CookieSpec {
  name: string;
  value: string;
  /** Time-to-live in seconds. Adapters convert to maxAge/expires as their API requires. */
  maxAgeSecs: number;
}

export interface AuthResult {
  status: number;
  body: unknown;
  /** Cookies to set on the response (e.g. access/refresh on login). */
  setCookies?: CookieSpec[];
  /** Cookie names to clear (e.g. on logout / password change). */
  clearCookies?: string[];
}

export function ok(
  body: unknown,
  opts?: { setCookies?: CookieSpec[]; clearCookies?: string[] },
): AuthResult {
  return { status: 200, body, ...opts };
}

export function fail(status: number, message: string): AuthResult {
  return { status, body: { error: message } };
}
