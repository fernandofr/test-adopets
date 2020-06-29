import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import AppError from '@shared/errors/AppError';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      skip: 0,
      take: 10,
    });

    return products;
  }

  public async create({
    name,
    description,
    price,
    stock,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      price,
      stock,
      category_id: category,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async update(id: string, data: Product): Promise<Product> {
    const product = await this.ormRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    const mergedData = this.ormRepository.merge(product, data);
    await this.ormRepository.save(mergedData);

    return mergedData;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProductsRepository;
