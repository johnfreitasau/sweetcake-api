import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
// import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import ListAllOrdersWithFilterService from '@modules/orders/services/ListAllOrdersWithFilterService';
import ListOrderWithAllRelationsService from '@modules/orders/services/ListOrderWithAllRelationsService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';
import CloseOrderService from '@modules/orders/services/CloseOrderService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, page, deleted } = request.query;

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrder = container.resolve(DeleteOrderService);

    await deleteOrder.execute({ id });

    return response.status(204).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const order_id = request.params.id;

    const listOrderWithAllRelations = container.resolve(
      ListOrderWithAllRelationsService,
    );

    const order = await listOrderWithAllRelations.execute({
      order_id,
    });

    return response.json(order);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const orderId = req.params.id;

    const closeOrder = container.resolve(CloseOrderService);

    const order = await closeOrder.execute({
      orderId,
    });

    return res.json(order);
  }
}
