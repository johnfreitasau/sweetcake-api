import { Router } from 'express';
// import multer from 'multer';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import validateCategoryList from '../validators/CategoryList';
import validateCategoryUpdate from '../validators/CategoryUpdate';
import validateCategoryCreate from '../validators/CategoryCreate';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
// const upload = multer(uploadConfig.multer);

const categoriesController = new CategoriesController();

categoriesRouter.post('/', validateCategoryCreate, categoriesController.create);

categoriesRouter.get('/', validateCategoryList, categoriesController.index);

categoriesRouter.put(
  '/:id',
  validateCategoryUpdate,
  categoriesController.update,
);

categoriesRouter.delete('/:id', categoriesController.delete);

export default categoriesRouter;
