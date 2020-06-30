import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionRouter from '@modules/users/infra/http/routes/session.route';
import categorysRouter from '@modules/categorys/infra/http/routes/categorys.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import appLogger from '../middleware/appLogger';

const routes = Router();

routes.use('/users', appLogger, usersRouter);
routes.use('/session', appLogger, sessionRouter);
routes.use('/categorys', ensureAuthenticated, appLogger, categorysRouter);
routes.use('/products', ensureAuthenticated, appLogger, productsRouter);

export default routes;
