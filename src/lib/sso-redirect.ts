export function isAllowedSsoRedirectUri(redirectUri: string): boolean {
  let url: URL;
  try {
    url = new URL(redirectUri);
  } catch {
    return false;
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.hash) {
    return false;
  }

  if (isLocalPlayOrigin(url)) return true;

  const configuredOrigins = process.env['ALLOWED_ORIGINS']
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

  return configuredOrigins.some((origin) => {
    try {
      return new URL(origin).origin === url.origin;
    } catch {
      return false;
    }
  });
}

function isLocalPlayOrigin(url: URL): boolean {
  return url.protocol === 'http:'
    && Boolean(url.port)
    && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
}
