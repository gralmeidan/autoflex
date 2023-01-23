import { readFile } from 'fs/promises';
import { join } from 'path';
import RestError from '../errors/rest.error';

export default class FileService {
  public async findByName(fileName: string) {
    try {
      const file = await readFile(join(__dirname, '../../public/', fileName));
      return file;
    } catch (error) {
      throw new RestError(404, 'File not found');
    }
  }
}
