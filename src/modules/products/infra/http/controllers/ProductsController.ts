import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ReadProductService from '@modules/products/services/ReadProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import CreateCategoryService from '@modules/categorys/services/CreateCategoryService';

interface IQueryParams {
  page?: number;
  limit?: number;
}

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const readProduct = container.resolve(ReadProductService);
    const products = await readProduct.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, category, price, stock } = request.body;

    const createCategory = container.resolve(CreateCategoryService);
    const createProduct = container.resolve(CreateProductService);

    const findOrCreateCategory = await createCategory.execute({
      title: category,
    });

    const product = await createProduct.execute({
      name,
      description,
      price,
      stock,
      category: findOrCreateCategory.id,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price, stock, category } = request.body;

    const createCategory = container.resolve(CreateCategoryService);
    const updateService = container.resolve(UpdateProductService);

    const findOrCreateCategory = await createCategory.execute({
      title: category,
    });

    const product = await updateService.execute(id, {
      name,
      description,
      price,
      stock,
      category: findOrCreateCategory.id,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    deleteProduct.execute(id);

    return response.status(204).send();
  }
}
