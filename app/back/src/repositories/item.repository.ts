import { IncludeOptions } from 'sequelize';
import ModelType from '../types/model.type';

export default abstract class ItemRepository<T> {
  constructor(protected model: ModelType) {}

  public findAll(include: Pick<IncludeOptions, 'model' | 'as'>) {
    return this.model.findAll({
      include: [
        {
          ...include,
          through: { attributes: ['quantity'], as: 'info' },
        },
      ],
    }) as Promise<T>;
  }
}
