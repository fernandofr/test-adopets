import { uuid } from 'uuidv4';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../../infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async create({
    name,
    description,
    price,
    stock,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuid(),
      name,
      description,
      price,
      stock,
      category_id: category,
    });

    this.products.push(product);

    return product;
  }

  public async update(id: string, data: Product): Promise<Product> {
    const findIndex = this.products.findIndex(product => product.id === id);

    const product = this.products[findIndex];
    Object.assign(product, data);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.products.findIndex(product => product.id === id);
    this.products.splice(findIndex, 1);
  }
}

export default ProductsRepository;
