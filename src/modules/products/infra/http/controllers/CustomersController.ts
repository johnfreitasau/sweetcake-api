import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
    } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    await updateCustomer.execute({
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
      id: request.params.id,
    });
    return response.status(204).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { deleted, name, page } = request.query;

    // console.log('deleted-controller:', deleted);

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.status(204).json();
  }
}
