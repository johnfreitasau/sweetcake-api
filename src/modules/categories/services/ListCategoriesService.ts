import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  page: number;
  name: string;
}

interface IResponse {
  categories: Category[];
  count: number;
}

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ page, name }: IRequest): Promise<IResponse> {
    const {
      categories,
      count,
    } = await this.categoriesRepository.findAllWithPaginationAndSearch({
      page,
      name,
    });

    return { categories, count };
  }
}

export default ListCategoriesService;
