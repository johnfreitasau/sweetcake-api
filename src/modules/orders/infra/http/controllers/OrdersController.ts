import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
// import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import ListAllOrdersWithFilterService from '@modules/orders/services/ListAllOrdersWithFilterService';
// import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      customerId,
      paymentMethod,
      isPaid,
      isPickup,
      deliveryFee,
      // status,
      deliveryDate,
      products,
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customerId,
      paymentMethod,
      isPaid,
      isPickup,
      deliveryFee,
      // status,
      deliveryDate,
      products,
    });

    return response.json(order);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const {
  //     name,
  //     email,
  //     phoneNumber,
  //     address,
  //     city,
  //     postalCode,
  //     notes,
  //   } = request.body;

  //   const updateCustomer = container.resolve(UpdateCustomerService);

  //   await updateCustomer.execute({
  //     name,
  //     email,
  //     phoneNumber,
  //     address,
  //     city,
  //     postalCode,
  //     notes,
  //     id: request.params.id,
  //   });
  //   return response.status(204).json();
  // }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, page, deleted } = request.query;

    // console.log('deleted-controller:', deleted);

    const listOrdersWithFilter = container.resolve(
      ListAllOrdersWithFilterService,
    );

    const { orders, count } = await listOrdersWithFilter.execute({
      name: String(name),
      page: Number(page),
      deleted: Boolean(deleted),
    });

    response.header('X-Total-Count', `${count}`);
    response.header('Access-Control-Expose-Headers', 'X-Total-Count');

    return response.json(orders);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteCustomer = container.resolve(DeleteCustomerService);

  //   await deleteCustomer.execute({ id });

  //   return response.status(204).json();
  // }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const contract_id = request.params.id;

  //   const listContractWithAllRelations = container.resolve(
  //     ListOrderWithAllRelationsService,
  //   );

  //   const contract = await listOrderWithAllRelations.execute({
  //     contract_id,
  //   });

  //   return response.json(contract);
  // }
}
