import { injectable, inject } from 'tsyringe';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import AppError from '@shared/infra/errors/AppError';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category does not exist.');
    }

    Object.assign(category, {
      name,
    });

    const updatedCategory = await this.categoriesRepository.save(category);

    return updatedCategory;
  }
}

export default UpdateCategoryService;
