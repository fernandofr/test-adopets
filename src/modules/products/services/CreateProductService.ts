import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create(data);

    return product;
  }
}

export default CreateProductService;
