// Seeds idempotentes:
// 1. AdminUser default (admin@admin.com / 12345678) — login da UI de
//    administração do aioson-auth.
// 2. 5 roles padrão (aioson-play-identity ADR-03): owner, admin, manager,
//    operator, viewer. Apps consumidores referenciam via accepted_roles[]
//    no manifest. O role `owner` existe na tabela mas é filtrado da UI de
//    cadastro de operador (é determinado por bypass — Bearer aioson.com).

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface DefaultRole {
  name: string;
  description: string;
}

const DEFAULT_ROLES: DefaultRole[] = [
  {
    name: 'owner',
    description:
      'Dono da instalação. Bypass de auth — não cadastrado aqui, derivado do Bearer aioson.com.',
  },
  { name: 'admin', description: 'Administra o app em nome do dono.' },
  { name: 'manager', description: 'Supervisão.' },
  { name: 'operator', description: 'Operação no dia-a-dia.' },
  { name: 'viewer', description: 'Somente leitura.' },
];

async function seedAdminUser() {
  const email = 'admin@admin.com';
  const password = '12345678';
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log('[seed] Admin user already exists');
    return;
  }

  await prisma.adminUser.create({
    data: { email, password_hash: passwordHash },
  });
  console.log('[seed] Admin user created: admin@admin.com / 12345678');
}

async function seedDefaultRoles() {
  for (const role of DEFAULT_ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      create: { name: role.name, description: role.description },
      update: { description: role.description },
    });
  }
  console.log(`[seed] ${DEFAULT_ROLES.length} default roles ensured (idempotent)`);
}

async function main() {
  await seedAdminUser();
  await seedDefaultRoles();
}

main()
  .catch((err) => {
    console.error('[seed] error:', err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
