import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  page: number;
  name: string;
}

interface IResponse {
  products: Product[];
  count: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ page, name }: IRequest): Promise<IResponse> {
    const {
      products,
      count,
    } = await this.productsRepository.findAllWithPaginationAndSearch({
      page,
      name,
    });

    return { products, count };
  }
}

export default ListProductsService;
