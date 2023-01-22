import ProductModel from '../database/models/product.model';
import MaterialModel from '../database/models/material.model';
import ItemRepository from './item.repository';

export default class MaterialRepository extends ItemRepository<MaterialModel> {
  constructor() {
    super(MaterialModel);
  }

  public findAll() {
    return super.findAll({
      model: ProductModel,
      as: 'products',
    });
  }
}
