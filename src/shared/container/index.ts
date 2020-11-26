import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
