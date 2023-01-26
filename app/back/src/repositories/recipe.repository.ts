import { Identifier } from 'sequelize';
import MaterialProductModel from '../database/models/materialProduct.model';

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
}
