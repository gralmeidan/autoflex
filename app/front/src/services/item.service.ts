import axios, { type AxiosInstance } from 'axios';

export default abstract class ItemService<FindOneType, FindAllType> {
  protected client: AxiosInstance;

  constructor(protected type: string) {
    this.client = axios.create({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      baseURL: `http://localhost:3001/${type}`,
      timeout: 1000,
    });
  }

  public async fetchAll(): Promise<FindAllType> {
    return this.client.get('/').then(({ data }) => data as FindAllType);
  }

  public async fetchOne(id: number | string): Promise<FindOneType> {
    return this.client.get(`/${id}`);
  }
}
