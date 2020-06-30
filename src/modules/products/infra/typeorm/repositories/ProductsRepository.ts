import { getRepository, Repository, Like } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IReadProductDTO from '@modules/products/dtos/IReadProductDTO';
import IQueryParamsProductDTO from '@modules/products/dtos/IQueryParamsProductDTO';

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

  public async findAll(
    page: number,
    limit: number,
    params: IQueryParamsProductDTO,
  ): Promise<IReadProductDTO> {
    const [data, count] = await this.ormRepository.findAndCount({
      skip: ((page as number) - 1) * (limit as number),
      take: limit as number,
      where: params,
    });

    return { products: data, count };
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
