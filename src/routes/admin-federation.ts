// Federation admin endpoints — Lane 2 (play-federation S2B).
//
// Endpoints contractados em shared-decisions.md "aioson-auth endpoints":
//   POST /api/auth/admin/federation/test-connection
//   POST /api/auth/admin/federation/activate
//   GET  /api/auth/admin/federation/status
//   POST /api/auth/admin/federation/deactivate   (501 stub no MVP)
//
// Todos protegidos por `validateOwnerBearer` (ADR-02) — caller precisa de
// Bearer aioson.com válido + header X-Aioson-Play-Id que bata com a
// instalação que está chamando. Test-connection adicionalmente passa por
// rate-limit 5/min/user (ADR-F-07).

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { validateOwnerBearer } from '../middleware/validate_owner_bearer.js';
import {
  activateFederation,
  getFederationStatus,
  testConnection,
} from '../services/federation_orchestrator.js';
import { getPollerHealth } from '../services/revocation_poller.js';

export const adminFederationRouter = Router();

// Rate-limit ADR-F-07: 5 req/min/user pro test-connection. Key derivada do
// aiosonOwner.user.user_id pra evitar bypass via X-Forwarded-For.
const testConnectionLimiter = rateLimit({
  windowMs: 60_000,
  limit: 5,
  keyGenerator: (req) => req.aiosonOwner?.user.user_id ?? 'anonymous',
  message: { error: 'rate_limited' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const TestConnectionBodySchema = z.object({
  provider: z.enum(['postgresql', 'mysql']),
  connection_string: z.string().min(10),
});

adminFederationRouter.post(
  '/test-connection',
  validateOwnerBearer,
  testConnectionLimiter,
  async (req, res) => {
    const parsed = TestConnectionBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'invalid_body',
        details: parsed.error.flatten(),
      });
    }
    const result = testConnection(parsed.data.connection_string);
    if (!result.ok) {
      return res.status(400).json({
        error: result.code ?? 'invalid_connection_string',
        message: result.error,
      });
    }
    // Confirma que provider declarado bate com o detectado.
    if (result.provider !== parsed.data.provider) {
      return res.status(400).json({
        error: 'provider_mismatch',
        message: `body.provider=${parsed.data.provider} mas string aponta pra ${result.provider}`,
      });
    }
    return res.json({ ok: true, provider: result.provider });
  },
);

const ActivateBodySchema = z.object({
  project_id: z.string().min(1),
  project_name: z.string().optional(),
});

adminFederationRouter.post(
  '/activate',
  validateOwnerBearer,
  async (req, res) => {
    const parsed = ActivateBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'invalid_body',
        details: parsed.error.flatten(),
      });
    }
    const aiosonPlayId = req.aiosonOwner!.aioson_play_id;
    const result = await activateFederation({
      aiosonPlayId,
      projectId: parsed.data.project_id,
      projectName: parsed.data.project_name ?? null,
    });
    if (!result.ok) {
      const statusByCode: Record<string, number> = {
        invalid_connection_string: 400,
        tls_required: 400,
        build_mismatch: 400,
        keyring_unavailable: 502,
        keyring_empty: 409,
        probe_failed: 502,
        persist_failed: 500,
        internal_error: 500,
      };
      const status = statusByCode[result.code] ?? 500;
      return res.status(status).json({ error: result.code, message: result.error });
    }
    return res.json({
      ok: true,
      provider: result.provider,
      activated_at: result.activated_at,
    });
  },
);

adminFederationRouter.get(
  '/status',
  validateOwnerBearer,
  async (_req, res) => {
    const status = await getFederationStatus();
    return res.json({
      ...status,
      health: getPollerHealth(),
    });
  },
);

adminFederationRouter.post(
  '/deactivate',
  validateOwnerBearer,
  async (_req, res) => {
    // MVP: 501 Not Implemented. Roadmap futuro (vide architecture §9).
    return res.status(501).json({
      error: 'not_implemented',
      message:
        'Desativar Federação não está disponível no MVP — re-instale o Play em modo single-device pra reverter.',
    });
  },
);
