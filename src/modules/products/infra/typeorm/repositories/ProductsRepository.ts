import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '../../../repositories/IProductsRepository';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';
import IFindAllWithPaginationAndSearchDTO from '../../../dtos/IFindAllWithPaginationAndSearchDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

interface IResponseFindAllWithPaginationAndSearch {
  products: Product[];
  count: number;
}

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch> {
    const { name, page } = data;

    const query = this.ormRepository
      .createQueryBuilder('products')
      .take(7)
      .skip((page - 1) * 7)
      .orderBy('products.created_at', 'DESC');

    if (name !== 'undefined') {
      query.where('name ILIKE :name', { name: `%${name}%` });
    }

    const [products, count] = await query.getManyAndCount();

    return {
      products,
      count,
    };
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    return this.ormRepository.findByIds(products);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const customer = await this.ormRepository.findOne(id);

    return customer;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async create({
    name,
    category,
    unitPrice,
    qtyDiscount,
    discount,
    notes,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      category,
      unitPrice,
      qtyDiscount,
      discount,
      notes,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}
