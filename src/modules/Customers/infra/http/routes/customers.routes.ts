import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '@config/upload';
import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
// const upload = multer(uploadConfig.multer);

const customersController = new CustomersController();

customersRouter.post(
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
  customersController.create,
);

customersRouter.get('/', customersController.index);

export default customersRouter;
