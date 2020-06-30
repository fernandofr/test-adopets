import 'reflect-metadata';

import ReadProductService from './ReadProductService';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

describe('CreateProduct', () => {
  it('should be able to list products', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const readProduct = new ReadProductService(fakeProductsRepository);
    const createProduct = new CreateProductService(fakeProductsRepository);

    await createProduct.execute({
      name: 'Golden Premier',
      description:
        'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs with the ideal level of all nutrients.',
      price: 120.0,
      stock: 10,
      category: 'dog food',
    });

    await createProduct.execute({
      name: 'Golden Premier Premiun',
      description:
        'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs with the ideal level of all nutrients.',
      price: 120.0,
      stock: 10,
      category: 'dog food',
    });

    const findProducts = await readProduct.execute(1, 10, {});

    expect(findProducts.products).toBeInstanceOf(Array);
  });
});
