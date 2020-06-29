import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateProductService from './UpdateProductService';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let productUpdateService: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    productUpdateService = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able to update the product', async () => {
    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Golden Premier',
      description:
        'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs.',
      price: 120.0,
      stock: 10,
      category: 'dog food',
    });

    const updatedProduct = await productUpdateService.execute(product.id, {
      name: 'Golden Premier Top',
      description:
        'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs.',
      price: 120.0,
      stock: 10,
      category: 'dog food',
    });

    expect(updatedProduct.name).toBe('Golden Premier Top');
  });

  it('should not be able to update the product with id invalid', async () => {
    await expect(
      productUpdateService.execute('', {
        name: 'Golden Premier Top',
        description:
          'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs.',
        price: 120.0,
        stock: 10,
        category: 'dog food',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
