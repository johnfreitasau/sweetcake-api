import { injectable, inject } from 'tsyringe';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import AppError from '@shared/infra/errors/AppError';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Category> {
    const checkIfCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (checkIfCategoryExists) {
      throw new AppError('Category name already exists.');
    }

    const category = await this.categoriesRepository.create({
      name,
    });

    return category;
  }
}

export default CreateCategoryService;
