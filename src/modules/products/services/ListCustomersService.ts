import { injectable, inject } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IRequest {
  deleted: boolean;
  page: number;
  name: string;
}

interface IResponse {
  customers: Customer[];
  count: number;
}

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ deleted, page, name }: IRequest): Promise<IResponse> {
    const {
      customers,
      count,
    } = await this.customersRepository.findAllWithPaginationAndSearch({
      deleted,
      page,
      name,
    });

    return { customers, count };
  }
}

export default ListCustomersService;
