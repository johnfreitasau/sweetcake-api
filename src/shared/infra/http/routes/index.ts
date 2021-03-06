import { Router } from 'express';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);

export default routes;
