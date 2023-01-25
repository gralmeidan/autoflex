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
}
