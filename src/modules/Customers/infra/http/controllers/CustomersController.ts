import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
    } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
    });

    return response.json(classToClass(customer));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { deleted, name, page } = request.query;

    console.log('deleted-controller:', deleted);

    const listCustomers = container.resolve(ListCustomersService);

    const { customers, count } = await listCustomers.execute({
      deleted: deleted === 'true',
      name: String(name),
      page: Number(page),
    });

    response.header('X-Total-Count', `${count}`);
    response.header('Access-Control-Expose-Headers', 'X-Total-Count');

    return response.json(customers);
  }
}
