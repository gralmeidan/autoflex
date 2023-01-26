import * as Joi from 'joi';
import RecipeRepository from '../repositories/recipe.repository';
import validateSchema from './schemas/utils/validateSchema';
import { RecipeEntry } from '../types/recipes.type';
import ProductService from './product.service';
import MaterialService from './material.service';
import recipeEntrySchema from './schemas/recipe.schema';
import HTTP_STATUS from 'http-status-codes';
import RestError from '../errors/rest.error';

export default class RecipeService {
  protected schema: Joi.ObjectSchema;

  constructor(protected repo = new RecipeRepository()) {
    this.schema = Joi.object(recipeEntrySchema);
  }

  public async appendToRecipe(obj: RecipeEntry) {
    const value = validateSchema(this.schema, obj);

    if (await this.repo.findByIds(value.productId, value.materialId)) {
      throw new RestError(HTTP_STATUS.CONFLICT, 'Entry already exists!');
    }

    await new ProductService().findById(value.productId);
    await new MaterialService().findById(value.materialId);

    return this.repo.appendToRecipe(value);
  }

  public async updateRecipe(obj: RecipeEntry) {
    const value = validateSchema(this.schema, obj);

    if (!(await this.repo.findByIds(value.productId, value.materialId))) {
      throw new RestError(HTTP_STATUS.NOT_FOUND, 'Entry not found!');
    }

    await this.repo.updateRecipe(value);

    return {
      ...value,
    };
  }

  public async removeRecipe(obj: Omit<RecipeEntry, 'quantity'>) {
    return this.repo.removeFromRecipe(obj);
  }
}
