import RestError from '../errors/rest.error';
import ItemRepository from '../repositories/item.repository';

export default abstract class ItemService<T> {
  constructor(
    protected repository: ItemRepository<T>,
    protected itemName: string
  ) {}

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
