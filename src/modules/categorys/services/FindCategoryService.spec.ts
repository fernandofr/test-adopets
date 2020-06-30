import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FindCategoryService from './FindCategoryService';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategorysRepository';

let fakeCategoryRepository: FakeCategoryRepository;
let findCategoryService: FindCategoryService;

describe('FindCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    findCategoryService = new FindCategoryService(fakeCategoryRepository);
  });

  it('should be able to find category by title', async () => {
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
    );

    const category = await createCategoryService.execute({ title: 'dog food' });
    await createCategoryService.execute({ title: 'cat food' });

    const findCategory = await findCategoryService.execute('dog food');

    expect(category.id).toBe(findCategory);
  });

  it('should not be able to find category with title not exist ', async () => {
    await expect(findCategoryService.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
