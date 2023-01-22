import ItemRepository from '../repositories/item.repository';

export default abstract class ItemService<T> {
  constructor(protected repository: ItemRepository<T>) {}

  public findAll = () => this.repository.findAll();

  public findById = (id: string) => this.repository.findById(id);
}
