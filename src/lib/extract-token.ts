// Access tokens só podem chegar pelo header canônico RFC 6750. Tokens em URL
// vazam com facilidade por logs, histórico, analytics e cabeçalho Referer.

import type { Request } from 'express';

export function extractAccessToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.slice('Bearer '.length).trim();
    if (token) return token;
  }
  return null;
}
