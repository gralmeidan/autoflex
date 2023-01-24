import ProductModel from '../database/models/product.model';
import MaterialModel from '../database/models/material.model';
import ItemRepository from './item.repository';

export default class MaterialRepository extends ItemRepository<MaterialModel> {
  constructor() {
    super(MaterialModel);
  }

  public findAll() {
    return this._findAll();
  }

  public findById(id: string) {
    return this._findById(
      id,
      this.defaultOptions({
        model: ProductModel,
        as: 'products',
      })
    );
  }

  public create(
    obj: MaterialModel & Record<string, unknown>
  ): Promise<MaterialModel> {
    return this._create(obj);
  }

  public update(
    id: string,
    obj: MaterialModel & Record<string, unknown>
  ): Promise<[affectedCount: number]> {
    return this._update(id, obj);
  }
}
