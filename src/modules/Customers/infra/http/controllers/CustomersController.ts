import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

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
    console.log('chegou aqui 1');

    const createCustomer = container.resolve(CreateCustomerService);
    console.log('chegou aqui 2');
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
}
