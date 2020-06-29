import 'reflect-metadata';

import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

describe('CreateProduct', () => {
  it('should be able to create new product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Golden Premier',
      description:
        'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs with the ideal level of all nutrients.',
      price: 120.0,
      stock: 10,
      category: 'dog food',
    });

    expect(product).toHaveProperty('id');
  });
});
