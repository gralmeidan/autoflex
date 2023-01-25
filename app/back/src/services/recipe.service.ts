import * as Joi from 'joi';
import RecipeRepository from '../repositories/recipe.repository';
import validateSchema from './schemas/utils/validateSchema';
import { RecipeEntry } from '../types/recipes.type';
import ProductService from './product.service';
import MaterialService from './material.service';
import recipeEntrySchema from './schemas/recipe.schema';

export default class RecipeService {
  protected schema: Joi.ObjectSchema;

  constructor(protected repo = new RecipeRepository()) {
    this.schema = Joi.object(recipeEntrySchema);
  }

  public async appendToRecipe(obj: RecipeEntry) {
    const value = validateSchema(this.schema, obj);

    await new ProductService().findById(value.productId);
    await new MaterialService().findById(value.materialId);

    return this.repo.appendToRecipe(value);
  }
}
