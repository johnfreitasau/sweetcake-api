import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/errors/AppError';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const checkIfOrderExists = await this.ordersRepository.findById(id);

    if (!checkIfOrderExists) {
      throw new AppError('Order does not exist.');
    }

    await this.ordersRepository.deleteById(id);
  }
}

export default DeleteOrderService;
