import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomersDTO from '../dtos/ICreateCustomersDTO';

export default interface ICustomersRepository {
  findByEmail(email: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  create(data: ICreateCustomersDTO): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
}
