import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '@config/upload';
import validateProductList from '../validators/ProductList';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
// const upload = multer(uploadConfig.multer);

const productsController = new ProductsController();

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      category: Joi.string().required(),
      unitPrice: Joi.number().required(),
      qtyDiscount: Joi.number().optional(),
      discount: Joi.number().optional(),
      notes: Joi.string().allow(''),
    },
  }),
  productsController.create,
);

productsRouter.get('/', validateProductList, productsController.index);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      category: Joi.string().required(),
      unitPrice: Joi.number().required(),
      qtyDiscount: Joi.number().optional(),
      discount: Joi.number().optional(),
      notes: Joi.string().allow(''),
    },
  }),
  productsController.update,
);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
