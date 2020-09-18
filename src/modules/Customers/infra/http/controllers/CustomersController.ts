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
}
