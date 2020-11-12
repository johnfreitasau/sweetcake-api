import { getRepository, Repository } from 'typeorm';
import IOrdersRepository from '../../../repositories/IOrdersRepository';
import IFilterOptionsDTO from '../../../dtos/IFilterOptionsDTO';
import ICreateOrdesDTO from '../../../dtos/ICreateOrdersDTO';
// import IFindAllWithPaginationAndSearchDTO from '../../../dtos/IFindAllWithPaginationAndSearchDTO';
import Order from '../entities/Order';

interface IFindAllandCountResponse {
  orders: Order[];
  count: number;
}

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findAllWithFilterOptions({
    page,
    name,
  }: // deleted,
  IFilterOptionsDTO): Promise<IFindAllandCountResponse> {
    const query = this.ormRepository
      .createQueryBuilder('orders')
      .innerJoinAndSelect('orders.customer', 'customer')
      // .where(`orders.deliveryDate' ${deleted ? 'IS NOT' : 'IS'} NULL`)
      .take(7)
      .skip((page - 1) * 7)
      .orderBy('orders.number', 'DESC');

    if (name !== 'undefined') {
      query.where('customer.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id);

    return order;
  }

  public async create({
    customer,
    paymentMethod,
    isPaid,
    isPickup,
    deliveryFee,
    finalPrice,
    status,
    deliveryDate,
    products,
  }: ICreateOrdesDTO): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      paymentMethod,
      isPaid,
      isPickup,
      deliveryFee,
      finalPrice,
      status,
      deliveryDate,
      orderItems: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async save(customer: Order): Promise<Order> {
    return this.ormRepository.save(customer);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByIdWithAllRelations(
    id: string,
  ): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['customer', 'orderItems', 'orderItems.product'],
    });

    return order;
  }
  // public async findAll({ deleted }: IFindAllDTO): Promise<Order[]> {
  //   const customers = await this.ormRepository.find({ withDeleted: deleted });

  //   return customers;
  // }

  // public async findAllWithPaginationAndSearch(
  //   data: IFindAllWithPaginationAndSearchDTO,
  // ): Promise<IResponseFindAllWithPaginationAndSearch> {
  //   const { deleted, name, page } = data;

  //   const query = this.ormRepository
  //     .createQueryBuilder('customers')
  //     .take(7)
  //     .skip((page - 1) * 7)
  //     .orderBy('customers.created_at', 'DESC');

  //   if (name) {
  //     query.andWhere('name ILIKE :name', { name: `%${name}%` });
  //   }

  //   if (deleted) {
  //     query.withDeleted().andWhere('deleted_at IS NOT NULL');
  //   }

  //   const [customers, count] = await query.getManyAndCount();

  //   return {
  //     customers,
  //     count,
  //   };
  // }
}
