import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class MaterialModel extends Model {
  declare id: number;
  declare name: string;
  declare quantity: number;
}

MaterialModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    quantity: INTEGER,
    thumb: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'material',
    timestamps: false,
    tableName: 'materials',
  }
);

export default MaterialModel;
