import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomersDTO from '../dtos/ICreateCustomersDTO';
import IFindAllWithPaginationAndSearchDTO from '../dtos/IFindAllWithPaginationAndSearchDTO';
import IFindAllDTO from '../dtos/IFindAllDTO';

interface IResponseFindAllWithPaginationAndSearch {
  customers: Customer[];
  count: number;
}

export default interface ICustomersRepository {
  findByEmail(email: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  create(data: ICreateCustomersDTO): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
  findAll(options: IFindAllDTO): Promise<Customer[]>;
  findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch>;
  deleteById(id: string): Promise<void>;
}
