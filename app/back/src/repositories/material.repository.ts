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

  public create = this._create;

  public update = this._update;
}
