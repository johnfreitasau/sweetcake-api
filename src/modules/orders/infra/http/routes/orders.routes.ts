import { Router } from 'express';

import validateOrderCreate from '../validators/OrderCreate';
// import validateCompletedOrder from '../validators/OrderComplete';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.post('/', validateOrderCreate, ordersController.create);

ordersRouter.get('/', ordersController.index);

ordersRouter.get('/:id', ordersController.show);

ordersRouter.put('/:id/finish', ordersController.update);

ordersRouter.delete('/:id', ordersController.delete);

export default ordersRouter;
