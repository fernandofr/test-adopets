import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string, data: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.stock = data.stock;
    product.category_id = data.category;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;
