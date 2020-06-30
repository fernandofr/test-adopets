import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IReadProductDTO from '../dtos/IReadProductDTO';
import IQueryParamsProductDTO from '../dtos/IQueryParamsProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(id: string, data: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  findAll(
    page: number,
    limit: number,
    params: IQueryParamsProductDTO,
  ): Promise<IReadProductDTO>;
}
