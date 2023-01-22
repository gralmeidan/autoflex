import ItemController from '../controllers/item.controller';
import * as express from 'express';

export default abstract class ItemRoutes<T> {
  protected _router: express.Router;

  constructor(protected controller: ItemController<T>) {
    this._router = express.Router();

    this._router.get('/', controller.findAll);
    this._router.get('/:id', controller.findById);
  }
}
