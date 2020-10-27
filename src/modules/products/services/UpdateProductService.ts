import { injectable, inject } from 'tsyringe';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/infra/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  category: string;
  unitPrice: number;
  qtyDiscount: number;
  discount: number;
  notes: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    category,
    unitPrice,
    qtyDiscount,
    discount,
    notes,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product does not exist.');
    }

    Object.assign(product, {
      name,
      category,
      unitPrice,
      qtyDiscount,
      discount,
      notes,
    });

    const updatedProduct = await this.productsRepository.save(product);

    return updatedProduct;
  }
}

export default UpdateProductService;
