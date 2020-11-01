import { Router } from 'express';
// import multer from 'multer';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '@config/upload';
import validateProductList from '../validators/ProductList';
import validateProductUpdate from '../validators/ProductUpdate';
import validateProductCreate from '../validators/ProductCreate';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
// const upload = multer(uploadConfig.multer);

const productsController = new ProductsController();

productsRouter.post('/', validateProductCreate, productsController.create);

productsRouter.get('/', validateProductList, productsController.index);

productsRouter.put('/:id', validateProductUpdate, productsController.update);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
