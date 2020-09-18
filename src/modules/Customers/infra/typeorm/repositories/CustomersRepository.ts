import { getRepository, Repository } from 'typeorm';
import ICustomersRepository from '../../../repositories/ICustomersRepository';
import ICreateCustomersDTO from '../../../dtos/ICreateCustomersDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { email },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne(id);

    return customer;
  }

  public async create({
    name,
    email,
    phoneNumber,
    address,
    city,
    postalCode,
    notes,
  }: ICreateCustomersDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      notes,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
}

export default CustomersRepository;
