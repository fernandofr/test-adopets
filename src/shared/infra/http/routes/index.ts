import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionRouter from '@modules/users/infra/http/routes/session.route';
import categorysRouter from '@modules/categorys/infra/http/routes/categorys.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/categorys', ensureAuthenticated, categorysRouter);
routes.use('/products', ensureAuthenticated, productsRouter);

export default routes;
