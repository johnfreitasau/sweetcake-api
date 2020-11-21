import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/infra/errors/AppError';
import Order from '@modules/orders/infra/typeorm/entities/Order';

interface IRequest {
  orderId: string;
}

@injectable()
class CompleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ orderId }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order does not exists');
    }

    const finalPrice = order.finalPrice + order.deliveryFee;

    Object.assign(order, {
      finalPrice,
      collect_at: new Date(),
      status: 'Closed',
    });

    await this.ordersRepository.save(order);

    return order;
  }
}

export default CompleteOrderService;
