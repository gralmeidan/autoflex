import * as express from 'express';
import FileController from '../controllers/file.controller';

export default class FileRoutes {
  protected _router: express.Router;

  constructor(protected controller = new FileController()) {
    this._router = express.Router();

    this._router.get('/:fileName', controller.findByName);
  }

  public get router(): express.Router {
    return this._router;
  }
}

export const { router: FileRouter } = new FileRoutes();
