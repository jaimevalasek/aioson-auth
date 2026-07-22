import { prisma } from './prisma.js';

const RESERVED_AUTH_SEGMENTS = new Set([
  'admin', 'bindings', 'settings', 'shell', 'oauth', 'refresh', 'register',
]);

export function isLoopbackOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return ['http:', 'https:'].includes(url.protocol)
      && Boolean(url.port)
      && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
  } catch {
    return false;
  }
}

export function extractBindingIdFromAuthPath(pathname: string): string | null {
  const match = pathname.match(/^\/api\/auth\/([^/?#]+)/);
  const candidate = match?.[1];
  if (!candidate || RESERVED_AUTH_SEGMENTS.has(candidate)) return null;
  return candidate;
}

export async function isOriginAllowedForRequest(origin: string, pathname: string): Promise<boolean> {
  const rawAllowed = process.env['ALLOWED_ORIGINS']?.trim();
  const allowAny = rawAllowed === '*'
    && process.env['NODE_ENV'] !== 'production'
    && process.env['AIOSON_AUTH_ALLOW_ANY_ORIGIN'] === 'true';
  if (allowAny) return true;

  if (rawAllowed && rawAllowed !== '*') {
    const configured = rawAllowed.split(',').map((entry) => entry.trim()).filter(Boolean);
    if (configured.includes(origin)) return true;
  }
  if (isLoopbackOrigin(origin)) return true;

  const bindingId = extractBindingIdFromAuthPath(pathname);
  if (!bindingId) return false;
  const binding = await prisma.appBinding.findUnique({
    where: { id: bindingId }, select: { allowed_origins_json: true },
  });
  if (!binding) return false;
  try {
    const origins = JSON.parse(binding.allowed_origins_json) as unknown;
    return Array.isArray(origins) && origins.some((entry) => entry === origin);
  } catch {
    return false;
  }
}
