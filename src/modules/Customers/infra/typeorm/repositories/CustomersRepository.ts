import { getRepository, Repository } from 'typeorm';
import ICustomersRepository from '../../../repositories/ICustomersRepository';
import ICreateCustomersDTO from '../../../dtos/ICreateCustomersDTO';
import IFindAllWithPaginationAndSearchDTO from '../../../dtos/IFindAllWithPaginationAndSearchDTO';
import IFindAllDTO from '../../../dtos/IFindAllDTO';
import Customer from '../entities/Customer';

interface IResponseFindAllWithPaginationAndSearch {
  customers: Customer[];
  count: number;
}

export default class CustomersRepository implements ICustomersRepository {
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

  public async findAll({ deleted }: IFindAllDTO): Promise<Customer[]> {
    const customers = await this.ormRepository.find({ withDeleted: deleted });

    return customers;
  }

  public async findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch> {
    const { deleted, name, page } = data;

    const query = this.ormRepository
      .createQueryBuilder('customers')
      .take(10)
      .skip((page - 1) * 10)
      .orderBy('customers.created_at', 'DESC');

    if (name) {
      query.where('name LIKE :name', { name: `%${name}%` });
    }

    if (deleted) {
      query.withDeleted().andWhere('deleted_at IS NOT NULL');
    }

    const [customers, count] = await query.getManyAndCount();

    return {
      customers,
      count,
    };
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
