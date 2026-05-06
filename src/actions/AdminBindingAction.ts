// S1B.4 da feature aioson-play-identity (ADR-02).
//
// Cria/recupera o `AppBinding` correspondente a um par
// `(aioson_play_id, app_slug)` de forma idempotente. A chamada vem do dono
// (já validado pelo middleware `validate_owner_bearer`); aqui só persistimos.

import { prisma } from '../lib/prisma.js';

export interface UpsertAdminBindingInput {
  aioson_play_id: string;
  app_slug: string;
  app_name: string;
  accepted_roles: string[];
}

export interface UpsertAdminBindingResult {
  binding_id: string;
  /** `true` apenas no primeiro POST; `false` em re-call idempotente. */
  created: boolean;
}

const ALLOWED_ROLES = new Set(['admin', 'manager', 'operator', 'viewer']);

export function isValidAcceptedRoles(roles: unknown): roles is string[] {
  if (!Array.isArray(roles)) return false;
  if (roles.length === 0) return true; // vazio é permitido (BR — só dono)
  return roles.every((r) => typeof r === 'string' && ALLOWED_ROLES.has(r));
}

const APP_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidAppSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && APP_SLUG_REGEX.test(slug);
}

/**
 * Idempotente por `(aioson_play_id, app_slug)`. Não há unique constraint no
 * schema (legado), então usamos `findFirst + create` em transação. Conflito
 * por race é improvável (admin endpoint, contention baixa); se ocorrer, o 2º
 * INSERT vai criar duplicata — corrigido em fase futura com unique index.
 */
export async function upsertAdminBinding(
  input: UpsertAdminBindingInput
): Promise<UpsertAdminBindingResult> {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.appBinding.findFirst({
      where: {
        aioson_play_id: input.aioson_play_id,
        app_slug: input.app_slug,
      },
      select: { id: true },
    });

    if (existing) {
      return { binding_id: existing.id, created: false };
    }

    // Persistimos `accepted_roles` em `system_permissions` (campo legado;
    // em fase futura pode ganhar coluna dedicada se a UI precisar listar
    // separadamente).
    const created = await tx.appBinding.create({
      data: {
        aioson_play_id: input.aioson_play_id,
        app_slug: input.app_slug,
        app_name: input.app_name,
        connection_name: '', // gerenciado pelas rotas /api/auth/bindings legadas
        system_permissions: JSON.stringify(input.accepted_roles),
        enable_2fa: false,
        enable_rbac: true,
      },
      select: { id: true },
    });

    return { binding_id: created.id, created: true };
  });
}
