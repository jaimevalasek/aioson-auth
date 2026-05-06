import { Router } from 'express';
import { getGlobalSettings, saveGlobalSettings } from '../actions/GlobalSettingsAction.js';
import { z } from 'zod';

export const settingsRouter = Router();

const SaveSettingsSchema = z.object({
  google_client_id: z.string().nullable().optional(),
  google_client_secret: z.string().nullable().optional(),
  github_client_id: z.string().nullable().optional(),
  github_client_secret: z.string().nullable().optional(),
  smtp_host: z.string().nullable().optional(),
  smtp_port: z.number().int().positive().nullable().optional(),
  smtp_user: z.string().nullable().optional(),
  smtp_pass: z.string().nullable().optional(),
  smtp_from_email: z.string().email().nullable().optional(),
});

settingsRouter.get('/', async (_req, res) => {
  try {
    const settings = await getGlobalSettings();
    if (!settings) {
      return res.json({
        google_client_id: null,
        google_client_secret: null,
        github_client_id: null,
        github_client_secret: null,
        smtp_host: null,
        smtp_port: null,
        smtp_user: null,
        smtp_pass: null,
        smtp_from_email: null,
      });
    }
    return res.json(settings);
  } catch (err) {
    console.error('[settings/get]', err);
    return res.status(500).json({ error: 'Failed to load settings' });
  }
});

settingsRouter.post('/', async (req, res) => {
  try {
    const parsed = SaveSettingsSchema.parse(req.body);
    const withNulls = {
      google_client_id: parsed.google_client_id ?? null,
      google_client_secret: parsed.google_client_secret ?? null,
      github_client_id: parsed.github_client_id ?? null,
      github_client_secret: parsed.github_client_secret ?? null,
      smtp_host: parsed.smtp_host ?? null,
      smtp_port: parsed.smtp_port ?? null,
      smtp_user: parsed.smtp_user ?? null,
      smtp_pass: parsed.smtp_pass ?? null,
      smtp_from_email: parsed.smtp_from_email ?? null,
    };
    const saved = await saveGlobalSettings(withNulls);
    return res.json(saved);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('[settings/save]', err);
    return res.status(500).json({ error: 'Failed to save settings' });
  }
});
