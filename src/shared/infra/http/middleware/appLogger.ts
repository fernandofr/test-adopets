import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export default function AppLogger(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const log = {
    method: request.method,
    url: request.originalUrl,
    user: request.user ? request.user.id : 'route without authentication',
    body: request.body,
    params: request.params,
  };

  logger.info(JSON.stringify(log));
  return next();
}
