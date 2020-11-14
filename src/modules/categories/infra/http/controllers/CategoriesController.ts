import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name,
    });

    return response.json(classToClass(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    await updateCategory.execute({
      id: request.params.id,
      name,
    });
    return response.status(204).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, page } = request.query;

    const listCategories = container.resolve(ListCategoriesService);

    const { categories, count } = await listCategories.execute({
      name: String(name),
      page: Number(page),
    });

    response.header('X-Total-Count', `${count}`);
    response.header('Access-Control-Expose-Headers', 'X-Total-Count');

    return response.json(categories);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({ id });

    return response.status(204).json();
  }
}
