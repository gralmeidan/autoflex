import * as Joi from 'joi';
import RecipeRepository from '../repositories/recipe.repository';
import validateSchema from './schemas/utils/validateSchema';
import { RecipeEntry } from '../types/recipes.type';
import ProductService from './product.service';
import MaterialService from './material.service';
import recipeEntrySchema from './schemas/recipe.schema';
import HTTP_STATUS from 'http-status-codes';
import RestError from '../errors/rest.error';
import { Identifier } from 'sequelize';

export default class RecipeService {
  protected schema: Joi.ObjectSchema;

  constructor(protected repo = new RecipeRepository()) {
    this.schema = Joi.object(recipeEntrySchema);
  }

  protected async checkForEntryDuplication(
    productId: Identifier,
    materialId: Identifier
  ) {
    const resp = await this.repo.findByIds(productId, materialId);

    if (resp) {
      throw new RestError(HTTP_STATUS.CONFLICT, 'Entry already exists!');
    }

    return resp;
  }

  public async appendToRecipe(obj: RecipeEntry) {
    const value = validateSchema(this.schema, obj);

    await this.checkForEntryDuplication(value.productId, value.materialId);

    await new ProductService().findById(value.productId);
    await new MaterialService().findById(value.materialId);

    return this.repo.appendToRecipe(value);
  }
}
