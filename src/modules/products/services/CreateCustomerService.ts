import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/infra/errors/AppError';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    name,
    email,
    phoneNumber,
    address,
    city,
    postalCode,
    notes,
  }: IRequest): Promise<Customer> {
    const checkIfCustomerExists = await this.customersRepository.findByEmail(
      email,
    );

    if (checkIfCustomerExists) {
      throw new AppError('Email already exists.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
    });

    return customer;
  }
}

export default CreateCustomerService;
