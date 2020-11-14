import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/errors/AppError';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const checkIfCategoryExists = await this.categoriesRepository.findById(id);

    if (!checkIfCategoryExists) {
      throw new AppError('Category does not exist.');
    }

    await this.categoriesRepository.deleteById(id);
  }
}

export default DeleteCategoryService;
