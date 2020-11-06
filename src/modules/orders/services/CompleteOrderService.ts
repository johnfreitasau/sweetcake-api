import { injectable, inject } from 'tsyringe';
// import { differenceInCalendarDays } from 'date-fns';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/infra/errors/AppError';
import Order from '@modules/orders/infra/typeorm/entities/Order';

interface IRequest {
  orderId: string;
  // collect_price: number;
}

@injectable()
class CompleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    orderId,
  }: // collect_price = 0,
  IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order does not exists');
    }

    // const timeOffRent = differenceInCalendarDays(
    //   new Date(),
    //   contract.created_at,
    // );

    // const finalPrice =
    //   order.unitPrice * timeOffRent +
    //   order.deliveryFee +
    //   collect_price;

    const finalPrice = order.finalPrice + order.deliveryFee;

    Object.assign(order, {
      // collect_price,
      finalPrice,
      collect_at: new Date(),
    });

    await this.ordersRepository.save(order);

    return order;
  }
}

export default CompleteOrderService;
