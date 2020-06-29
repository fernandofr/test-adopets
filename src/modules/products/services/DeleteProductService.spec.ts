import 'reflect-metadata';

import DeleteProductService from './DeleteProductService';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

describe('DeleteProduct', () => {
  it('should be able to delete a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const deleteProduct = new DeleteProductService(fakeProductsRepository);
    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Golden Premier',
      description:
        'Golden Formula Adults Chicken and Rice is a complete food that provides adult dogs with the ideal level of all nutrients.',
      price: 120.0,
      stock: 10,
      category: 'dog food',
    });

    deleteProduct.execute(product.id);

    expect(product).toHaveProperty('id');
  });
});
