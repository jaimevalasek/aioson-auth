export function normalizeCookieDomain(domain: string | undefined): string | undefined {
  if (domain === undefined) return undefined;
  const trimmed = domain.trim();
  if (!trimmed) return undefined;
  if (
    trimmed.startsWith('.') ||
    trimmed.includes('://') ||
    trimmed.includes('/') ||
    /\s/.test(trimmed)
  ) {
    throw new Error('[aioson/auth-sdk] cookieDomain must be an exact host, without dot prefix');
  }
  return trimmed;
}
