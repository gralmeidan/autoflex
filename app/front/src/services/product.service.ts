import {
  type ProductIndividual,
  type ProductByFindAll,
} from '../types/products.types';
import ItemService from './item.service';

class ProductService extends ItemService<
  ProductIndividual,
  ProductByFindAll[]
> {
  constructor() {
    super('products');
  }
}

// Seems redundant but we're declaring the variable first for intellisense
const productService = new ProductService();
export default productService;
