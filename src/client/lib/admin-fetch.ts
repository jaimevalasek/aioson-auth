export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(input, { ...init, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers } });
  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    const returnTo = `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/login?redirect=${encodeURIComponent(returnTo)}`);
    throw new Error('admin_session_invalid');
  }
  return response;
}
