import * as Joi from 'joi';
import RestError from '../errors/rest.error';
import ItemRepository from '../repositories/item.repository';
import validateSchema from './schemas/utils/validateSchema';

export default abstract class ItemService<T> {
  protected schema: Joi.AlternativesSchema;

  constructor(
    protected repository: ItemRepository<T>,
    protected itemName: string,
    schema: Record<string, Joi.Schema>
  ) {
    const updateItemSchema = Joi.object(schema).min(1);
    const newItemSchema = Joi.object(schema).fork(Object.keys(schema), value =>
      value.required()
    );

    this.schema = Joi.when(Joi.ref('$isNew'), {
      is: true,
      then: newItemSchema,
      otherwise: updateItemSchema,
    });
  }

  public findAll = (filters?: Record<string, boolean>) =>
    this.repository.findAll(filters);

  public findById = async (id: string) => {
    const resp = await this.repository.findById(id);

    if (!resp) {
      throw new RestError(404, `${this.itemName} not found!`);
    }

    return resp;
  };

  public create = async (obj: Partial<T>) => {
    const value = validateSchema(this.schema, obj, { isNew: true });

    return this.repository.create(value);
  };

  public update = async (id: string, obj: Partial<T>) => {
    const value = validateSchema(this.schema, obj, { isNew: false });

    const resp = (await this.findById(id)) as unknown as { dataValues: T };

    await this.repository.update(id, value);

    return {
      ...resp.dataValues,
      ...value,
    };
  };

  public remove = async (id: string) => this.repository.remove(id);
}
