// Slice D (auth-integration-gaps.md): aceita JWT tanto no header
// `Authorization: Bearer <jwt>` (preferido, RFC 6750) quanto na query
// `?token=<jwt>` (retro-compat com integrações antigas).
//
// Usado pelos handlers que validam access token: /me, /rbac/check, /2fa/*.

import type { Request } from 'express';

export function extractAccessToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.slice('Bearer '.length).trim();
    if (token) return token;
  }
  const q = req.query['token'];
  if (typeof q === 'string' && q) return q;
  return null;
}
