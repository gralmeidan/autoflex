import { Identifier } from 'sequelize';

export type RecipeEntry = {
  productId: Identifier;
  materialId: Identifier;
  quantity: number;
};
