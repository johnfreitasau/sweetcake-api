import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import IFindAllWithPaginationAndSearchDTO from '../dtos/IFindAllWithPaginationAndSearchDTO';

interface IFindCategories {
  id: string;
}

interface IResponseFindAllWithPaginationAndSearch {
  categories: Category[];
  count: number;
}

export default interface ICategoriesRepository {
  findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch>;
  deleteById(id: string): Promise<void>;
  findAllById(categories: IFindCategories[]): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}
