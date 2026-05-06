// S1B.4 da feature aioson-play-identity (ADR-02).
//
// Middleware Express para os endpoints `/api/auth/admin/*`. Garante que o
// caller é o dono de uma instalação aioson-play conhecida:
//
//   1. Extrai Bearer aioson.com do header Authorization (aceita formato
//      `aioson-com:<jwt>` do ADR-01 e `Bearer <jwt>` puro como fallback).
//   2. Lê `X-Aioson-Play-Id` do header.
//   3. Valida o Bearer via `validateAiosonComBearer` (cache 60s).
//   4. Confirma com aioson-com que o aioson_play_id pertence ao user do Bearer
//      via `checkInstallationOwnership` (cache 5min).
//
// Decisões/erros mapeados:
//   - 401 invalid_or_expired_token  → Bearer inválido OU aioson.com OFFLINE
//   - 403 ownership_conflict        → Bearer válido mas aioson_play_id é de outro dono
//   - 404 installation_not_found    → aioson_play_id não existe em aioson-com
//   - 503 validation_unavailable    → aioson.com offline E sem cache (raro,
//                                       degraded mode UI handles)
//
// O resultado bem-sucedido grava em `req.aiosonOwner` o user record + o
// aioson_play_id pro handler usar (sem refazer chamadas).

import type { Request, Response, NextFunction } from 'express';
import {
  extractAiosonComToken,
  validateAiosonComBearer,
  type AiosonComUser,
} from '../services/aioson_com_validator.js';
import { checkInstallationOwnership } from '../services/aioson_play_installation_validator.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      aiosonOwner?: {
        user: AiosonComUser;
        aioson_play_id: string;
      };
    }
  }
}

export async function validateOwnerBearer(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const jwt = extractAiosonComToken(req.headers.authorization);
  if (!jwt) {
    res.status(401).json({ error: 'invalid_or_expired_token' });
    return;
  }

  const aiosonPlayId = req.header('x-aioson-play-id');
  if (!aiosonPlayId) {
    res.status(400).json({ error: 'missing_x_aioson_play_id' });
    return;
  }

  const user = await validateAiosonComBearer(jwt);
  if (!user) {
    res.status(401).json({ error: 'invalid_or_expired_token' });
    return;
  }

  const ownership = await checkInstallationOwnership(jwt, aiosonPlayId);
  switch (ownership) {
    case 'matches':
      req.aiosonOwner = { user, aioson_play_id: aiosonPlayId };
      next();
      return;
    case 'mismatch':
      res.status(403).json({ error: 'ownership_conflict' });
      return;
    case 'not_found':
      res.status(404).json({ error: 'installation_not_found' });
      return;
    case 'unavailable':
    default:
      res.status(503).json({ error: 'validation_unavailable' });
      return;
  }
}
