import * as express from 'express';
import RecipeController from '../controllers/recipe.controller';
import validateIdParams from '../middlewares/validateIdParams.middleware';

export default class FileRoutes {
  protected _router: express.Router;

  constructor(protected controller = new RecipeController()) {
    this._router = express.Router();

    this._router.post('/', controller.appendToRecipe);
    this._router.put('/', controller.updateRecipe);

    this._router.use(
      '/:productId/:materialId',
      validateIdParams('productId', 'materialId')
    );

    this._router.delete('/:productId/:materialId', controller.removeFromRecipe);
  }

  public get router(): express.Router {
    return this._router;
  }
}

export const { router: RecipeRouter } = new FileRoutes();
