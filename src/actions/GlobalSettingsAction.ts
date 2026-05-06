import { prisma } from '../lib/prisma.js';
import { encrypt, decrypt } from '../lib/crypto.js';
import { z } from 'zod';

const GlobalSettingsSchema = z.object({
  google_client_id: z.string().nullable(),
  google_client_secret: z.string().nullable(),
  github_client_id: z.string().nullable(),
  github_client_secret: z.string().nullable(),
  smtp_host: z.string().nullable(),
  smtp_port: z.number().int().positive().nullable(),
  smtp_user: z.string().nullable(),
  smtp_pass: z.string().nullable(),
  smtp_from_email: z.string().email().nullable(),
});

export type GlobalSettingsInput = z.infer<typeof GlobalSettingsSchema>;
export type GlobalSettingsOutput = z.infer<typeof GlobalSettingsSchema>;

function applySecretsEncryption(input: GlobalSettingsInput): GlobalSettingsInput {
  return {
    ...input,
    google_client_secret: input.google_client_secret ? encrypt(input.google_client_secret) : null,
    github_client_secret: input.github_client_secret ? encrypt(input.github_client_secret) : null,
    smtp_pass: input.smtp_pass ? encrypt(input.smtp_pass) : null,
  };
}

function applySecretsDecryption(input: GlobalSettingsInput): GlobalSettingsInput {
  const result = { ...input };
  try {
    if (result.google_client_secret) result.google_client_secret = decrypt(result.google_client_secret);
    if (result.github_client_secret) result.github_client_secret = decrypt(result.github_client_secret);
    if (result.smtp_pass) result.smtp_pass = decrypt(result.smtp_pass);
  } catch {
    // Secret could not be decrypted - field is still encrypted or corrupted
  }
  return result;
}

export async function getGlobalSettings(): Promise<GlobalSettingsOutput | null> {
  const settings = await prisma.globalSettings.findFirst();
  if (!settings) return null;

  return applySecretsDecryption({
    google_client_id: settings.google_client_id,
    google_client_secret: settings.google_client_secret,
    github_client_id: settings.github_client_id,
    github_client_secret: settings.github_client_secret,
    smtp_host: settings.smtp_host,
    smtp_port: settings.smtp_port,
    smtp_user: settings.smtp_user,
    smtp_pass: settings.smtp_pass,
    smtp_from_email: settings.smtp_from_email,
  });
}

export async function saveGlobalSettings(input: GlobalSettingsInput): Promise<GlobalSettingsOutput> {
  const parsed = GlobalSettingsSchema.parse(input);
  const encrypted = applySecretsEncryption(parsed);

  const existing = await prisma.globalSettings.findFirst();

  if (existing) {
    const updated = await prisma.globalSettings.update({
      where: { id: existing.id },
      data: {
        google_client_id: encrypted.google_client_id,
        google_client_secret: encrypted.google_client_secret,
        github_client_id: encrypted.github_client_id,
        github_client_secret: encrypted.github_client_secret,
        smtp_host: encrypted.smtp_host,
        smtp_port: encrypted.smtp_port,
        smtp_user: encrypted.smtp_user,
        smtp_pass: encrypted.smtp_pass,
        smtp_from_email: encrypted.smtp_from_email,
      },
    });

    return applySecretsDecryption({
      google_client_id: updated.google_client_id,
      google_client_secret: updated.google_client_secret,
      github_client_id: updated.github_client_id,
      github_client_secret: updated.github_client_secret,
      smtp_host: updated.smtp_host,
      smtp_port: updated.smtp_port,
      smtp_user: updated.smtp_user,
      smtp_pass: updated.smtp_pass,
      smtp_from_email: updated.smtp_from_email,
    });
  }

  const created = await prisma.globalSettings.create({
    data: {
      google_client_id: encrypted.google_client_id,
      google_client_secret: encrypted.google_client_secret,
      github_client_id: encrypted.github_client_id,
      github_client_secret: encrypted.github_client_secret,
      smtp_host: encrypted.smtp_host,
      smtp_port: encrypted.smtp_port,
      smtp_user: encrypted.smtp_user,
      smtp_pass: encrypted.smtp_pass,
      smtp_from_email: encrypted.smtp_from_email,
    },
  });

  return applySecretsDecryption({
    google_client_id: created.google_client_id,
    google_client_secret: created.google_client_secret,
    github_client_id: created.github_client_id,
    github_client_secret: created.github_client_secret,
    smtp_host: created.smtp_host,
    smtp_port: created.smtp_port,
    smtp_user: created.smtp_user,
    smtp_pass: created.smtp_pass,
    smtp_from_email: created.smtp_from_email,
  });
}
