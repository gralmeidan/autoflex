import MaterialRepository from '../repositories/material.repository';
import MaterialModel from '../database/models/material.model';
import ItemService from './item.service';
import materialSchema from './schemas/material.schema';

export default class MaterialService extends ItemService<MaterialModel> {
  constructor() {
    super(new MaterialRepository(), 'Material', materialSchema);
  }
}
