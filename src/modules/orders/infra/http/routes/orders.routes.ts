import { Router } from 'express';

import validateOrderCreate from '../validators/OrderCreate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.post('/', validateOrderCreate, ordersController.create);

ordersRouter.get('/', ordersController.index);

// ordersRouter.get('/:id', ordersController.show);

// ordersRouter.put(
//   '/:id',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       email: Joi.string().email().required(),
//       phoneNumber: Joi.string(),
//       address: Joi.string(),
//       city: Joi.string(),
//       postalCode: Joi.string(),
//       notes: Joi.string().allow(''),
//     },
//   }),
//   ordersController.update,
// );

ordersRouter.delete('/:id', ordersController.delete);

export default ordersRouter;
