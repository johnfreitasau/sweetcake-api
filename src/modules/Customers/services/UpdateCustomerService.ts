import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/infra/errors/AppError';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    phoneNumber,
    address,
    city,
    postalCode,
    notes,
  }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer does not exist.');
    }

    Object.assign(customer, {
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
    });

    const updatedCustomer = await this.customersRepository.save(customer);

    return updatedCustomer;
  }
}

export default UpdateCustomerService;
