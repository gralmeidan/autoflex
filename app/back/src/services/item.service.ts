import * as Joi from 'joi';
import RestError from '../errors/rest.error';
import ItemRepository from '../repositories/item.repository';

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
}
