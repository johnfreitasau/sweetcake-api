import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import ICreateCategoryDTO from '../../../dtos/ICreateCategoryDTO';
import IFindAllWithPaginationAndSearchDTO from '../../../dtos/IFindAllWithPaginationAndSearchDTO';
import Category from '../entities/Category';

interface IFindCategories {
  id: string;
}

interface IResponseFindAllWithPaginationAndSearch {
  categories: Category[];
  count: number;
}

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch> {
    const { name, page } = data;

    const query = this.ormRepository
      .createQueryBuilder('categories')
      .take(10)
      .skip((page - 1) * 10)
      .orderBy('categories.created_at', 'DESC');

    if (name !== 'undefined') {
      query.where('name ILIKE :name', { name: `%${name}%` });
    }

    const [categories, count] = await query.getManyAndCount();

    return {
      categories,
      count,
    };
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllById(categories: IFindCategories[]): Promise<Category[]> {
    return this.ormRepository.findByIds(categories);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const customer = await this.ormRepository.findOne(id);

    return customer;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return category;
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}
