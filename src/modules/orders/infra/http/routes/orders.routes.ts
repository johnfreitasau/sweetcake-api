import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '@config/upload';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
// const upload = multer(uploadConfig.multer);

const ordersController = new OrdersController();

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      postalCode: Joi.string(),
      notes: Joi.string(),
    },
  }),
  ordersController.create,
);

ordersRouter.get('/', ordersController.index);

ordersRouter.get('/:id', ordersController.show);

ordersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      postalCode: Joi.string(),
      notes: Joi.string().allow(''),
    },
  }),
  ordersController.update,
);

ordersRouter.delete('/:id', ordersController.delete);

export default ordersRouter;
