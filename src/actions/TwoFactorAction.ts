import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { prisma } from '../lib/prisma.js';
import { getBinding } from './AppBindingAction.js';

authenticator.options = { step: 30, window: 1 };

// ─── 2FA Setup ─────────────────────────────────────────────────────────

export async function generateTotpSecret(
  bindingId: string,
  userId: string
): Promise<{ secret: string; otpauthUrl: string; qrCode: string }> {
  const binding = await getBinding(bindingId);
  if (!binding) throw new Error('Binding not found');
  if (!binding.enable_2fa) throw new Error('2FA is not enabled for this app (403)');

  const user = await prisma.globalUser.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const secret = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(user.email, 'aioson-auth', secret);
  const qrCode = await QRCode.toDataURL(otpauthUrl);

  // Store pending secret (not active until verified)
  await prisma.globalUser.update({
    where: { id: userId },
    data: { totp_secret: `pending:${secret}` },
  });

  return { secret, otpauthUrl, qrCode };
}

export async function verifyTotpSetup(
  bindingId: string,
  userId: string,
  token: string
): Promise<{ verified: boolean }> {
  const binding = await getBinding(bindingId);
  if (!binding || !binding.enable_2fa) throw new Error('2FA is not enabled for this app (403)');

  const user = await prisma.globalUser.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  if (!user.totp_secret || !user.totp_secret.startsWith('pending:')) {
    throw new Error('No pending 2FA setup found');
  }

  const secret = user.totp_secret.replace('pending:', '');
  const valid = authenticator.verify({ token, secret });

  if (valid) {
    await prisma.globalUser.update({
      where: { id: userId },
      data: { totp_secret: secret },
    });
  }

  return { verified: valid };
}

export async function validateTotpToken(
  bindingId: string,
  userId: string,
  token: string
): Promise<boolean> {
  const binding = await getBinding(bindingId);
  if (!binding || !binding.enable_2fa) return false;

  const user = await prisma.globalUser.findUnique({ where: { id: userId } });
  if (!user || !user.totp_secret || user.totp_secret === 'pending:') return false;

  return authenticator.verify({ token, secret: user.totp_secret });
}

export async function disableTotp(bindingId: string, userId: string): Promise<void> {
  const binding = await getBinding(bindingId);
  if (!binding || !binding.enable_2fa) throw new Error('2FA is not enabled for this app (403)');

  await prisma.globalUser.update({
    where: { id: userId },
    data: { totp_secret: null },
  });
}
