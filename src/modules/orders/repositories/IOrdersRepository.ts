import Order from '../infra/typeorm/entities/Order';
import ICreateOrdersDTO from '../dtos/ICreateOrdersDTO';
import IFilterOptionsDTO from '../dtos/IFilterOptionsDTO';

interface IFindAllandCountResponse {
  orders: Order[];
  count: number;
}

export default interface IOrdersRepository {
  findAllWithFilterOptions(
    data: IFilterOptionsDTO,
  ): Promise<IFindAllandCountResponse>;
  findById(id: string): Promise<Order | undefined>;
  findByIdWithAllRelations(id: string): Promise<Order | undefined>;
  create(data: ICreateOrdersDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  deleteById(id: string): Promise<void>;
}
