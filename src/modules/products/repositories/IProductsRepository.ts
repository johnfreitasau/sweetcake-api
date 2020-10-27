import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IFindAllWithPaginationAndSearchDTO from '../dtos/IFindAllWithPaginationAndSearchDTO';

interface IFindProducts {
  id: string;
}

interface IResponseFindAllWithPaginationAndSearch {
  products: Product[];
  count: number;
}

export default interface IProductsRepository {
  findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch>;
  deleteById(id: string): Promise<void>;
  findAllById(products: IFindProducts[]): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}
