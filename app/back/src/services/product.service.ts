import ProductRepository from '../repositories/product.repository';
import ItemService from './item.service';
import IProduct from '../interfaces/product.interface';
import productSchema from './schemas/product.schema';

export default class ProductService extends ItemService<IProduct> {
  constructor() {
    super(new ProductRepository(), 'Product', productSchema);
  }
}
