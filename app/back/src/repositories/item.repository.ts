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

  protected _create(obj: T & Record<string, unknown>) {
    return this.model.create(obj) as Promise<T>;
  }

  protected _update(id: string, obj: T & Record<string, unknown>) {
    return this.model.update(obj, {
      where: { id },
    });
  }

  public abstract findAll(query?: Record<string, boolean>): Promise<T>;

  public abstract findById(id: string): Promise<T>;

  public abstract create(obj: T & Record<string, unknown>): Promise<T>;

  public abstract update(
    id: string,
    obj: T & Record<string, unknown>
  ): Promise<[affectedCount: number]>;

  public remove(id: string) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
