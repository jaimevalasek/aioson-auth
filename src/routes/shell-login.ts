// Shell login endpoint — feature play-federation S2B.
//
// POST /api/auth/shell/login
// Body: { email, password }
// Resp: { accessToken, refreshToken, user: { id, email, name } }
//
// Endpoint PUBLIC (sem Bearer prévio). Usado pelo `ShellLoginPage` no
// satélite — operador entra email + senha e ganha JWT operador com
// `binding_id="shell"` (binding especial pra distinguir de login de app
// específico). Tokens emitidos têm TTL + revogação normais.
//
// Não cria sessão de UI no Play — aioson-play armazena o JWT no Tauri
// keyring (vide architecture-play-federation.md § 6.4 fluxo de login
// operador). Apps spawnados consumem via env vars VITE_AIOSON_AUTH_*.

import { Router } from 'express';
import { z } from 'zod';
import { login } from '../actions/AuthAction.js';

export const shellLoginRouter = Router();

const ShellLoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const SHELL_BINDING_ID = 'shell';

shellLoginRouter.post('/login', async (req, res) => {
  const parsed = ShellLoginBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'invalid_body',
      details: parsed.error.flatten(),
    });
  }
  try {
    const result = await login(
      parsed.data.email,
      parsed.data.password,
      SHELL_BINDING_ID,
    );
    return res.json(result);
  } catch (err) {
    const message = (err as Error).message ?? 'login failed';
    // login() lança "Invalid credentials" pra senha errada/user ausente. Não
    // diferencia pra evitar enumeration.
    if (message.toLowerCase().includes('invalid credentials')) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }
    if (message.includes('social login')) {
      return res.status(400).json({ error: 'use_social_login' });
    }
    return res.status(500).json({ error: 'internal_error', message });
  }
});
