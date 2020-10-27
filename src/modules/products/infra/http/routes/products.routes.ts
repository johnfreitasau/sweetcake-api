import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '@config/upload';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
// const upload = multer(uploadConfig.multer);

const productsController = new ProductsController();

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      category: Joi.string().email().required(),
      unitPrice: Joi.number(),
      qtyDiscount: Joi.number(),
      discountty: Joi.number(),
      notes: Joi.string().allow(''),
    },
  }),
  productsController.create,
);

productsRouter.get('/', productsController.index);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      category: Joi.string().email().required(),
      unitPrice: Joi.number(),
      qtyDiscount: Joi.number(),
      discountty: Joi.number(),
      notes: Joi.string().allow(''),
    },
  }),
  productsController.update,
);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
