import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

import '@shared/container';
import createConnection from '@shared/infra/typeorm';
import logger from './middleware/logger';
import routes from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    const error = {
      status: 'error',
      message: err.message,
    };

    logger.error(error);
    return response.status(err.statusCode).json(error);
  }

  logger.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
