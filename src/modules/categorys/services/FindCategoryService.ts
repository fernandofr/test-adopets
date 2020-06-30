import { injectable, inject } from 'tsyringe';
import ICategorysRepository from '../repositories/ICategorysRepository';

@injectable()
class FindCategoryService {
  constructor(
    @inject('CategorysRepository')
    private categorysRepository: ICategorysRepository,
  ) {}

  public async execute(title: string): Promise<string> {
    return this.categorysRepository.findCategoryByTitle(title);
  }
}

export default FindCategoryService;
