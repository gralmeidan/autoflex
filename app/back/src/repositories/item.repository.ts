import { FindOptions, IncludeOptions } from 'sequelize';
import ModelType from '../types/model.type';

export default abstract class ItemRepository<T> {
  constructor(protected model: ModelType) {}

  protected defaultOptions = (
    include?: Pick<IncludeOptions, 'model' | 'as'>
  ): FindOptions => ({
    include: [
      {
        ...include,
        through: { attributes: ['quantity'], as: 'info' },
      },
    ],
  });

  protected _findAll(options?: FindOptions) {
    return this.model.findAll(options) as Promise<T>;
  }

  protected _findById(id: string, options?: FindOptions) {
    return this.model.findByPk(id, options) as Promise<T>;
  }

  public abstract findAll(query?: Record<string, boolean>): Promise<T>;

  public abstract findById(id: string): Promise<T>;
}
