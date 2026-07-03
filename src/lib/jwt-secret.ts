// Segredo de assinatura dos JWTs (access/admin).
//
// AU-G2 (auditoria federação 2026-07-02): o fallback antigo era a string
// FIXA 'dev-secret-change-in-production' — em qualquer instalação sem a env
// JWT_SECRET, quem conhecesse o default forjava tokens de operador/admin.
// Agora a ordem é:
//   1. env JWT_SECRET (>= 16 chars) — controle explícito do operador;
//   2. arquivo persistido `prisma/.jwt-secret` (gerado por instalação,
//      0600 em Unix) — tokens sobrevivem a restart sem env;
//   3. gerado em memória (só se persistir falhar) — tokens invalidam no
//      próximo boot, com warning.
//
// Modelo master-como-servidor: satélites NUNCA verificam JWT localmente
// (toda validação bate no aioson-auth do master), então este segredo não
// precisa ser distribuído entre máquinas.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SECRET_FILE = path.resolve(process.cwd(), 'prisma', '.jwt-secret');

function resolveSecret(): string {
  const fromEnv = process.env['JWT_SECRET']?.trim();
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  if (fromEnv) {
    console.warn('[jwt-secret] JWT_SECRET da env tem menos de 16 chars — ignorado, usando segredo persistido.');
  }

  try {
    const existing = fs.readFileSync(SECRET_FILE, 'utf8').trim();
    if (existing.length >= 32) return existing;
  } catch {
    // ausente/ilegível — gera abaixo
  }

  const generated = crypto.randomBytes(48).toString('base64url');
  try {
    fs.writeFileSync(SECRET_FILE, generated, { mode: 0o600 });
  } catch (err) {
    console.warn(
      '[jwt-secret] não consegui persistir o segredo gerado — tokens serão invalidados no próximo restart:',
      err,
    );
  }
  return generated;
}

export const JWT_SECRET = resolveSecret();
