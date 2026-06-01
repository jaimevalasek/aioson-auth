// Cookie names shared by every adapter (Express, Next). Centralized here so the
// framework-neutral core and all transport adapters agree on a single contract.
export const COOKIE_ACCESS = 'aioson_access';
export const COOKIE_REFRESH = 'aioson_refresh';
