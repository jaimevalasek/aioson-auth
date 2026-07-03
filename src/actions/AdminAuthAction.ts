import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

import { JWT_SECRET } from '../lib/jwt-secret.js';
const ADMIN_TOKEN_TTL_SECS = 8 * 60 * 60; // 8 hours

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface AdminLoginOutput {
  accessToken: string;
  user: { id: string; email: string };
}

export async function adminLogin(input: AdminLoginInput): Promise<AdminLoginOutput> {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const { email, password } = schema.parse(input);

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: ADMIN_TOKEN_TTL_SECS }
  );

  return { accessToken, user: { id: user.id, email: user.email } };
}

export function verifyAdminToken(token: string): { userId: string; email: string } {
  const payload = jwt.verify(token, JWT_SECRET) as { sub: string; email: string };
  return { userId: payload.sub, email: payload.email };
}
