// connection_string_keyring.ts — IPC via HTTP localhost pro aioson-play Tauri.
//
// Lê connection string do Tauri keyring (onde aioson-play grava no
// `federation_activate`). Decisão cravada em shared-decisions §Connection
// string handling: aioson-auth NUNCA toca OS keyring direto — só via Tauri
// command exposto pelo Play.
//
// Contrato (architecture-play-federation.md § 6.1 + agent-3.status.md):
//   GET http://127.0.0.1:5180/api/federation/keyring/connection-string?aioson_play_id=X
//   Authorization: Bearer ${AIOSON_FEDERATION_BRIDGE_TOKEN}
//
// Token vem via env var `AIOSON_FEDERATION_BRIDGE_TOKEN` injetada pelo
// aioson-play quando spawna o sidecar (lib.rs::do_spawn_app_runtime estende
// env de service). Em dev local: dono precisa setar manualmente.

const BRIDGE_HOST = process.env['AIOSON_PLAY_BRIDGE_HOST'] ?? '127.0.0.1';
const BRIDGE_PORT = process.env['AIOSON_PLAY_BRIDGE_PORT'] ?? '5180';
const BRIDGE_BASE = `http://${BRIDGE_HOST}:${BRIDGE_PORT}`;
const REQUEST_TIMEOUT_MS = 5_000;

function bearerToken(): string | null {
  const t = process.env['AIOSON_FEDERATION_BRIDGE_TOKEN'];
  return t && t.length > 0 ? t : null;
}

export class KeyringBridgeError extends Error {
  constructor(
    message: string,
    public readonly kind:
      | 'no_token'
      | 'unauthorized'
      | 'not_found'
      | 'network'
      | 'malformed_response',
  ) {
    super(message);
    this.name = 'KeyringBridgeError';
  }
}

/**
 * Lê a connection string gravada no keyring do aioson-play. Retorna `null`
 * quando o keyring não tem entry pra esse `aioson_play_id` (Federação não
 * ativada ainda). Lança `KeyringBridgeError` em casos de auth/network.
 */
export async function readConnectionString(
  aiosonPlayId: string,
): Promise<string | null> {
  const token = bearerToken();
  if (!token) {
    throw new KeyringBridgeError(
      'AIOSON_FEDERATION_BRIDGE_TOKEN não setado',
      'no_token',
    );
  }

  const url = `${BRIDGE_BASE}/api/federation/keyring/connection-string?aioson_play_id=${encodeURIComponent(
    aiosonPlayId,
  )}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
  } catch (err) {
    throw new KeyringBridgeError(
      `falha de rede ao consultar keyring bridge: ${(err as Error).message}`,
      'network',
    );
  } finally {
    clearTimeout(timeout);
  }

  if (res.status === 401 || res.status === 403) {
    throw new KeyringBridgeError(
      `keyring bridge rejeitou bearer (HTTP ${res.status})`,
      'unauthorized',
    );
  }

  if (res.status === 404) {
    // Keyring sem entry — Federação não ativada ainda. Não é erro.
    return null;
  }

  if (!res.ok) {
    throw new KeyringBridgeError(
      `keyring bridge inesperado (HTTP ${res.status})`,
      'network',
    );
  }

  type Payload = { connection_string?: unknown };
  let body: Payload;
  try {
    body = (await res.json()) as Payload;
  } catch {
    throw new KeyringBridgeError('resposta não-JSON', 'malformed_response');
  }

  const cs = body.connection_string;
  if (typeof cs !== 'string' || cs.length === 0) {
    return null;
  }
  return cs;
}

export async function readStagedConnectionString(
  credentialReference: string,
  aiosonPlayId: string,
): Promise<string | null> {
  const token = bearerToken();
  if (!token) throw new KeyringBridgeError('bridge token ausente', 'no_token');
  const params = new URLSearchParams({
    credential_reference: credentialReference,
    aioson_play_id: aiosonPlayId,
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${BRIDGE_BASE}/api/auth-database/keyring/staged?${params}`, {
      headers: { Authorization: `Bearer ${token}` }, signal: controller.signal,
    });
    if (response.status === 401 || response.status === 403) throw new KeyringBridgeError('bridge rejeitou bearer', 'unauthorized');
    if (response.status === 404) return null;
    if (!response.ok) throw new KeyringBridgeError('bridge indisponível', 'network');
    const body = await response.json() as { connection_string?: unknown };
    return typeof body.connection_string === 'string' && body.connection_string ? body.connection_string : null;
  } catch (error) {
    if (error instanceof KeyringBridgeError) throw error;
    throw new KeyringBridgeError('falha de rede no bridge', 'network');
  } finally { clearTimeout(timeout); }
}
