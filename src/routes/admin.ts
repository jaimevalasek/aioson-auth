import { Router } from 'express';
import { adminLogin } from '../actions/AdminAuthAction.js';

export const adminRouter = Router();

adminRouter.post('/login', async (req, res) => {
  try {
    const result = await adminLogin(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(401).json({ error: String(err) });
  }
});
