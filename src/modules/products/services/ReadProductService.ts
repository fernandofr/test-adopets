import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import IReadProductDTO from '../dtos/IReadProductDTO';
import IQueryParamsProductDTO from '../dtos/IQueryParamsProductDTO';

@injectable()
class ReadProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    page: number,
    limit: number,
    params: IQueryParamsProductDTO,
  ): Promise<IReadProductDTO> {
    return this.productsRepository.findAll(page, limit, params);
  }
}

export default ReadProductService;
