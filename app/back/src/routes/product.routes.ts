import IProduct from '../interfaces/product.interface';
import ProductController from '../controllers/product.controller';
import ItemRoutes from './item.routes';

export default class ProductRoutes extends ItemRoutes<IProduct> {
  constructor() {
    super(new ProductController());
  }

  public get router() {
    return this._router;
  }
}

export const { router: ProductRouter } = new ProductRoutes();
