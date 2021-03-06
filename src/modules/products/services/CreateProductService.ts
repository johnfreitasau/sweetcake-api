import { injectable, inject } from 'tsyringe';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/infra/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  name: string;
  categoryId: string;
  unitPrice: number;
  notes: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    categoryId,
    unitPrice,
    notes,
  }: IRequest): Promise<Product> {
    const checkIfProductExists = await this.productsRepository.findByName(name);

    if (checkIfProductExists) {
      throw new AppError('Product name already exists.');
    }

    const product = await this.productsRepository.create({
      name,
      categoryId,
      unitPrice,
      notes,
    });

    return product;
  }
}

export default CreateProductService;
