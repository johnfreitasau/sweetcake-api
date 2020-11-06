import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/errors/AppError';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import Contract from '@modules/orders/infra/typeorm/entities/Order';

interface IRequest {
  order_id: string;
}

@injectable()
class ListOrderWithAllRelationsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<Contract> {
    const order = await this.ordersRepository.findByIdWithAllRelations(
      order_id,
    );

    if (!order) {
      throw new AppError('Order does not exist.');
    }

    return order;
  }
}

export default ListOrderWithAllRelationsService;
