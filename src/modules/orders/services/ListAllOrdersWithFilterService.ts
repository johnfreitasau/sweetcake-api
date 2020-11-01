import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';

interface IRequest {
  deleted: boolean;
  page: number;
  name: string;
}

interface IResponse {
  orders: Order[];
  count: number;
}

@injectable()
class ListAllOrdersWithFilterService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ deleted, page, name }: IRequest): Promise<IResponse> {
    const {
      orders,
      count,
    } = await this.ordersRepository.findAllWithFilterOptions({
      deleted,
      page,
      name,
    });

    return { orders, count };
  }
}

export default ListAllOrdersWithFilterService;
