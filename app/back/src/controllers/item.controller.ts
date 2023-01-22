import { Request, Response } from 'express';
import ItemService from '../services/item.service';
import HTTP_STATUS from 'http-status-codes';

export default abstract class ItemController<T> {
  constructor(protected service: ItemService<T>) {}

  public async findAll(_req: Request, res: Response) {
    const response = await this.service.findAll();
    return res.status(HTTP_STATUS.OK).json(response);
  }
}
