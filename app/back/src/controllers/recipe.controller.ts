import { Request, Response } from 'express';
import RecipeService from '../services/recipe.service';
import HTTP_STATUS from 'http-status-codes';

export default class RecipeController {
  constructor(protected service = new RecipeService()) {}

  public appendToRecipe = async (req: Request, res: Response) => {
    const resp = await this.service.appendToRecipe(req.body);
    return res.status(HTTP_STATUS.CREATED).json(resp);
  };

  public updateRecipe = async (req: Request, res: Response) => {
    const resp = await this.service.updateRecipe(req.body);
    return res.status(HTTP_STATUS.OK).json(resp);
  };
}
