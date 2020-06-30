import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';

import ICategorysRepository from '@modules/categorys/repositories/ICategorysRepository';

import Category from '../../infra/typeorm/entities/Category';

class CategorysRepository implements ICategorysRepository {
  private categorys: Category[] = [];

  public async findAllCategorys(): Promise<Category[]> {
    return this.categorys;
  }

  public async findCategoryByTitle(title: string): Promise<string> {
    const category = this.categorys.find(
      findCategory => findCategory.title === title,
    );

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return category.id;
  }

  public async create(title: string): Promise<Category> {
    if (!title) {
      throw new AppError('Please enter a valid category.');
    }

    let category = this.categorys.find(
      findCategory => findCategory.title === title,
    );

    if (!category) {
      category = new Category();

      Object.assign(category, {
        id: uuid(),
        title,
      });

      this.categorys.push(category);
    }

    return category;
  }
}

export default CategorysRepository;
