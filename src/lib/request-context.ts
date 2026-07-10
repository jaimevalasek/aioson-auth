import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

const REQUEST_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

export function requestContext(req: Request, res: Response, next: NextFunction): void {
  const suppliedRequestId = req.header('x-request-id')?.trim();
  const requestId = suppliedRequestId && REQUEST_ID_PATTERN.test(suppliedRequestId)
    ? suppliedRequestId
    : crypto.randomUUID();

  res.locals.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}

export function getRequestId(res: Response): string {
  const requestId = res.locals.requestId;
  if (typeof requestId === 'string' && REQUEST_ID_PATTERN.test(requestId)) return requestId;

  const generatedRequestId = crypto.randomUUID();
  res.locals.requestId = generatedRequestId;
  res.setHeader('X-Request-Id', generatedRequestId);
  return generatedRequestId;
}
