import { Model, STRING, INTEGER, DOUBLE } from 'sequelize';
import db from '.';
import MaterialModel from './material.model';
import MaterialProductModel from './materialProduct.model';

class ProductModel extends Model {
  declare id: number;
  declare name: string;
  declare value: number;
}

ProductModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    value: DOUBLE,
    thumb: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'product',
    timestamps: false,
    tableName: 'products',
  }
);

ProductModel.belongsToMany(MaterialModel, {
  as: 'materials',
  through: MaterialProductModel,
  foreignKey: 'productId',
  otherKey: 'materialId',
});

MaterialModel.belongsToMany(ProductModel, {
  as: 'products',
  through: MaterialProductModel,
  foreignKey: 'materialId',
  otherKey: 'productId',
});

export default ProductModel;
