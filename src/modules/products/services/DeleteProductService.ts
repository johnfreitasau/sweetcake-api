import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const checkIfProductExists = await this.productsRepository.findById(id);

    if (!checkIfProductExists) {
      throw new AppError('Product does not exist.');
    }

    await this.productsRepository.deleteById(id);
  }
}

export default DeleteProductService;
