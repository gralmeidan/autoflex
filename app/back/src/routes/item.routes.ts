import validateIdParams from '../middlewares/validateIdParams.middleware';
import ItemController from '../controllers/item.controller';
import * as express from 'express';

export default abstract class ItemRoutes<T> {
  protected _router: express.Router;

  constructor(protected controller: ItemController<T>) {
    this._router = express.Router();

    this._router.get('/', controller.findAll);
    this._router.post('/', controller.create);

    this._router.use('/:id', validateIdParams('id'));

    this._router.get('/:id', controller.findById);
    this._router.put('/:id', controller.update);
    this._router.delete('/:id', controller.remove);
  }
}
