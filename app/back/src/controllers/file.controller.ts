import { Request, Response } from 'express';
import FileService from '../services/file.service';

export default class FileController {
  constructor(protected service = new FileService()) {}

  public findByName = async (req: Request, res: Response) => {
    const { fileName } = req.params;

    const file = await this.service.findByName(fileName);

    res.contentType('png').status(200).send(file);
  };
}
