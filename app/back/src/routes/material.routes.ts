import MaterialController from '../controllers/material.controller';
import MaterialModel from '../database/models/material.model';
import ItemRoutes from './item.routes';

export default class MaterialRoutes extends ItemRoutes<MaterialModel> {
  constructor() {
    super(new MaterialController());
  }

  public get router() {
    return this._router;
  }
}

export const { router: MaterialRouter } = new MaterialRoutes();
