import { Model, INTEGER } from 'sequelize';
import db from '.';

class MaterialProductModel extends Model {
  declare materialId: number;
  declare productId: number;
  declare quantity: number;
}

MaterialProductModel.init(
  {
    materialId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    quantity: INTEGER,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'materialProduct',
    timestamps: false,
    tableName: 'materials_products',
  }
);

export default MaterialProductModel;
