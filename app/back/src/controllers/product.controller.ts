import HTTP_STATUS from 'http-status-codes';
import ProductService from '../services/product.service';
import ItemController from './item.controller';
import IProduct from '../interfaces/product.interface';
import { Request, Response } from 'express';

export default class ProductController extends ItemController<IProduct> {
  constructor(service = new ProductService()) {
    super(service);
  }

  public findAll = async (req: Request, res: Response) => {
    const response = await this.service.findAll({
      includeUncraftable: req.query?.includeUncraftable === 'true',
    });
    return res.status(HTTP_STATUS.OK).json(response);
  };
}
