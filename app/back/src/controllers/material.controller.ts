import MaterialService from '../services/material.service';
import MaterialModel from '../database/models/material.model';
import ItemController from './item.controller';

export default class MaterialController extends ItemController<MaterialModel> {
  constructor() {
    super(new MaterialService());
  }
}
