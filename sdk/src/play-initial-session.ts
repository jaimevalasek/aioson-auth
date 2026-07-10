import type { InitialAuthSession } from './types.js';

export type PlayInitialSessionEnv = {
  VITE_AIOSON_AUTH_ACCESS_TOKEN?: string;
  VITE_AIOSON_AUTH_REFRESH_TOKEN?: string;
  VITE_AIOSON_AUTH_OPERATOR_EMAIL?: string;
};

/**
 * Converts the optional Play SSO injection into the explicit SDK input. The
 * client still verifies the JWT binding before it persists this session.
 */
export function initialSessionFromPlayEnv(env: PlayInitialSessionEnv): InitialAuthSession | undefined {
  const accessToken = env.VITE_AIOSON_AUTH_ACCESS_TOKEN?.trim();
  const refreshToken = env.VITE_AIOSON_AUTH_REFRESH_TOKEN?.trim();
  if (!accessToken || !refreshToken) return undefined;

  const email = env.VITE_AIOSON_AUTH_OPERATOR_EMAIL?.trim();
  return {
    accessToken,
    refreshToken,
    ...(email ? { user: { id: '', email, name: '' } } : {}),
  };
}
