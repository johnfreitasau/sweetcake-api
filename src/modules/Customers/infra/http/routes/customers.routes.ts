import { Router } from 'express';
// import multer from 'multer';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '@config/upload';
import CustomersController from '../controllers/CustomersController';
import validateCustomerList from '../validators/CustomerList';
import validateCustomerCreate from '../validators/CustomerCreate';
import validateCustomerUpdate from '../validators/CustomerUpdate';

const customersRouter = Router();
// const upload = multer(uploadConfig.multer);

const customersController = new CustomersController();

customersRouter.post('/', validateCustomerCreate, customersController.create);

customersRouter.get('/', validateCustomerList, customersController.index);

customersRouter.put('/:id', validateCustomerUpdate, customersController.update);

customersRouter.delete('/:id', customersController.delete);

export default customersRouter;
