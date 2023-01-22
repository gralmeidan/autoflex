import { Model, STRING, INTEGER, DOUBLE } from 'sequelize';
import db from '.';

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
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'product',
    timestamps: false,
    tableName: 'products',
  }
);

export default ProductModel;
