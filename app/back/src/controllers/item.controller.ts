import { Request, Response } from 'express';
import ItemService from '../services/item.service';
import HTTP_STATUS from 'http-status-codes';

export default abstract class ItemController<T> {
  constructor(protected service: ItemService<T>) {}

  public findAll = async (_req: Request, res: Response) => {
    const response = await this.service.findAll();
    return res.status(HTTP_STATUS.OK).json(response);
  };

  public findById = async (req: Request, res: Response) => {
    const response = await this.service.findById(req.params.id);
    return res.status(HTTP_STATUS.OK).json(response);
  };

  public create = async (req: Request, res: Response) => {
    const response = await this.service.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json(response);
  };

  public update = async (req: Request, res: Response) => {
    const response = await this.service.update(req.params.id, req.body);
    return res.status(HTTP_STATUS.OK).json(response);
  };

  public remove = async (req: Request, res: Response) => {
    await this.service.remove(req.params.id);
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  };
}
