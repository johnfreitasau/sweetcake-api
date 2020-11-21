import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, categoryId, unitPrice, notes } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      categoryId,
      unitPrice,
      notes,
    });

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, categoryId, unitPrice, notes } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    await updateProduct.execute({
      name,
      categoryId,
      unitPrice,
      notes,
      id: request.params.id,
    });
    return response.status(204).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, page } = request.query;

    const listProducts = container.resolve(ListProductsService);

    const { products, count } = await listProducts.execute({
      name: String(name),
      page: Number(page),
    });

    response.header('X-Total-Count', `${count}`);
    response.header('Access-Control-Expose-Headers', 'X-Total-Count');

    return response.json(products);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return response.status(204).json();
  }
}
