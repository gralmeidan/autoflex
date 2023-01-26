import { Identifier } from 'sequelize';
import MaterialProductModel from '../database/models/materialProduct.model';
import { RecipeEntry } from '../types/recipes.type';

export default class RecipeRepository {
  protected model;

  constructor() {
    this.model = MaterialProductModel;
  }

  public appendToRecipe({
    productId,
    materialId,
    quantity,
  }: MaterialProductModel) {
    return this.model.create({
      productId,
      materialId,
      quantity,
    });
  }

  public findByIds(productId: Identifier, materialId: Identifier) {
    return this.model.findOne({
      where: {
        productId,
        materialId,
      },
    });
  }

  public updateRecipe({
    productId,
    materialId,
    quantity,
  }: MaterialProductModel) {
    return this.model.update(
      {
        quantity,
      },
      {
        where: {
          productId,
          materialId,
        },
      }
    );
  }

  public removeFromRecipe({
    productId,
    materialId,
  }: Omit<RecipeEntry, 'quantity'>) {
    return this.model.destroy({
      where: {
        productId,
        materialId,
      },
    });
  }
}
