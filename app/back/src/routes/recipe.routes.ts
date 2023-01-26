import * as express from 'express';
import RecipeController from '../controllers/recipe.controller';

export default class FileRoutes {
  protected _router: express.Router;

  constructor(protected controller = new RecipeController()) {
    this._router = express.Router();

    this._router.post('/', controller.appendToRecipe);
    this._router.put('/', controller.updateRecipe);
  }

  public get router(): express.Router {
    return this._router;
  }
}

export const { router: RecipeRouter } = new FileRoutes();