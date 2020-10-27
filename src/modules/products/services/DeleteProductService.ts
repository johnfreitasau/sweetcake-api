import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/errors/AppError';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const checkIfCustomerExists = await this.customersRepository.findById(id);

    if (!checkIfCustomerExists) {
      throw new AppError('Customer does not exist.');
    }

    await this.customersRepository.deleteById(id);
  }
}

export default DeleteCustomerService;
