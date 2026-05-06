import { Router } from 'express';
import {
  listAppBindings,
  getBinding,
  createAppBinding,
  deleteAppBinding,
  updateAppBinding,
} from '../actions/AppBindingAction.js';
import { z } from 'zod';

const AIOSON_PLAY_HOST = process.env['AIOSON_PLAY_HOST'] || 'http://localhost:1420';

export const bindingsRouter = Router();

bindingsRouter.get('/', async (_req, res) => {
  try {
    const bindings = await listAppBindings();
    return res.json(bindings);
  } catch (err) {
    console.error('[bindings/list]', err);
    return res.status(500).json({ error: 'Failed to list bindings' });
  }
});

bindingsRouter.get('/:id', async (req, res) => {
  try {
    const binding = await getBinding(req.params['id']);
    if (!binding) return res.status(404).json({ error: 'Binding not found' });
    return res.json(binding);
  } catch (err) {
    console.error('[bindings/get]', err);
    return res.status(500).json({ error: 'Failed to get binding' });
  }
});

bindingsRouter.post('/', async (req, res) => {
  try {
    const schema = z.object({
      app_name: z.string().min(1),
      connection_name: z.string().min(1),
      enable_2fa: z.boolean().default(false),
      enable_rbac: z.boolean().default(false),
    });
    const parsed = schema.parse(req.body);

    // fetch connection URL from aioson-play
    const connRes = await fetch(`${AIOSON_PLAY_HOST}/internal/connections/${encodeURIComponent(parsed.connection_name)}`);
    if (!connRes.ok) {
      return res.status(400).json({ error: 'Connection not found in aioson-play' });
    }
    const conn = await connRes.json() as { prismaUrl?: string; filePath?: string; driver?: string };
    let dbUrl: string;
    if (conn.prismaUrl) {
      dbUrl = conn.prismaUrl;
    } else if (conn.driver === 'sqlite' && conn.filePath) {
      dbUrl = `file:${conn.filePath}`;
    } else {
      return res.status(400).json({ error: 'Connection has no usable database URL' });
    }

    const binding = await createAppBinding(parsed, dbUrl);
    return res.status(201).json(binding);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('[bindings/create]', err);
    return res.status(500).json({ error: 'Failed to create binding' });
  }
});

bindingsRouter.delete('/:id', async (req, res) => {
  try {
    await deleteAppBinding(req.params['id']);
    return res.status(204).send();
  } catch (err) {
    console.error('[bindings/delete]', err);
    return res.status(500).json({ error: 'Failed to delete binding' });
  }
});

bindingsRouter.patch('/:id', async (req, res) => {
  try {
    const schema = z.object({
      app_name: z.string().min(1).optional(),
      connection_name: z.string().min(1).optional(),
      enable_2fa: z.boolean().optional(),
      enable_rbac: z.boolean().optional(),
    });
    const parsed = schema.parse(req.body);

    let dbUrl: string | undefined;
    if (parsed.enable_2fa !== undefined || parsed.enable_rbac !== undefined) {
      const existing = await getBinding(req.params['id']);
      if (!existing) return res.status(404).json({ error: 'Binding not found' });

      const connRes = await fetch(
        `${AIOSON_PLAY_HOST}/internal/connections/${encodeURIComponent(existing.connection_name)}`
      );
      if (connRes.ok) {
        const conn = await connRes.json() as { prismaUrl?: string; filePath?: string; driver?: string };
        if (conn.prismaUrl) dbUrl = conn.prismaUrl;
        else if (conn.driver === 'sqlite' && conn.filePath) dbUrl = `file:${conn.filePath}`;
      }
    }

    const updated = await updateAppBinding(req.params['id'], parsed, dbUrl);
    return res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('[bindings/update]', err);
    return res.status(500).json({ error: 'Failed to update binding' });
  }
});
