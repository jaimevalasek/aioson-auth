import { randomBytes } from 'crypto';
import { Router } from 'express';
import { validateOwnerBearer } from '../middleware/validate_owner_bearer.js';
import { extractAiosonComToken } from '../services/aioson_com_validator.js';

export const adminDashboardContextRouter = Router();

const CONTEXT_TTL_MS = 2 * 60 * 1000;
const MAX_CONTEXTS = 128;
const CONTEXT_CODE_REGEX = /^[A-Za-z0-9_-]{32,96}$/;

interface DashboardContextEntry {
  token: string;
  playId: string;
  ownerUserId: string;
  expiresAt: number;
}

const contexts = new Map<string, DashboardContextEntry>();

function pruneExpiredContexts(now = Date.now()): void {
  for (const [code, entry] of contexts) {
    if (entry.expiresAt <= now) contexts.delete(code);
  }

  if (contexts.size <= MAX_CONTEXTS) return;
  for (const code of contexts.keys()) {
    contexts.delete(code);
    if (contexts.size <= MAX_CONTEXTS) break;
  }
}

adminDashboardContextRouter.post('/', validateOwnerBearer, (req, res) => {
  const owner = req.aiosonOwner;
  const token = extractAiosonComToken(req.headers.authorization);
  if (!owner || !token) {
    return res.status(500).json({ error: 'middleware_did_not_populate_owner' });
  }

  pruneExpiredContexts();
  const code = randomBytes(32).toString('base64url');
  contexts.set(code, {
    token,
    playId: owner.aioson_play_id,
    ownerUserId: owner.user.user_id,
    expiresAt: Date.now() + CONTEXT_TTL_MS,
  });

  return res.json({
    owner_context: code,
    expires_in_seconds: CONTEXT_TTL_MS / 1000,
  });
});

adminDashboardContextRouter.post('/consume', (req, res) => {
  const code = typeof req.body?.owner_context === 'string'
    ? req.body.owner_context.trim()
    : '';
  if (!CONTEXT_CODE_REGEX.test(code)) {
    return res.status(400).json({ error: 'invalid_owner_context' });
  }

  const entry = contexts.get(code);
  contexts.delete(code);
  if (!entry || entry.expiresAt <= Date.now()) {
    return res.status(404).json({ error: 'owner_context_expired' });
  }

  return res.json({
    token: entry.token,
    playId: entry.playId,
    ownerUserId: entry.ownerUserId,
    expires_at: new Date(entry.expiresAt).toISOString(),
  });
});
