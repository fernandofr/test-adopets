import Product from '../infra/typeorm/entities/Product';

export default interface IReadProductDTO {
  products: Product[];
  count: number;
}
