import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const bindingId = process.env.AIOSON_AUTH_SMOKE_BINDING_ID;
const email = process.env.AIOSON_AUTH_SMOKE_EMAIL;
const password = process.env.AIOSON_AUTH_SMOKE_PASSWORD;
const playId = process.env.AIOSON_AUTH_SMOKE_PLAY_ID ?? 'isolated-smoke-play';

if (!bindingId || !email || !password) {
  throw new Error('Isolated smoke seed requires binding id, email and password');
}

const prisma = new PrismaClient();

try {
  const passwordHash = await bcrypt.hash(password, 4);
  const role = await prisma.role.upsert({
    where: { name: 'admin' },
    create: { name: 'admin', description: 'Isolated smoke administrator' },
    update: {},
  });
  await prisma.appBinding.upsert({
    where: { id: bindingId },
    create: {
      id: bindingId,
      app_name: 'Flow Deck Smoke',
      app_slug: 'flow-deck',
      connection_name: 'isolated-smoke',
      enable_rbac: true,
      aioson_play_id: playId,
    },
    update: { enable_rbac: true, aioson_play_id: playId },
  });
  const user = await prisma.globalUser.upsert({
    where: { email },
    create: { email, password_hash: passwordHash, name: 'Flow Deck Smoke', aioson_play_origin_id: playId },
    update: { password_hash: passwordHash, aioson_play_origin_id: playId },
  });
  await prisma.userRole.upsert({
    where: { user_id_role_id_binding_id: { user_id: user.id, role_id: role.id, binding_id: bindingId } },
    create: { user_id: user.id, role_id: role.id, binding_id: bindingId, aioson_play_origin_id: playId },
    update: { aioson_play_origin_id: playId },
  });
  console.log(JSON.stringify({ bindingId, userId: user.id }));
} finally {
  await prisma.$disconnect();
}
