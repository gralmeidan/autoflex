import axios from 'axios';

export default abstract class ItemService<FindOneType, FindAllType> {
  protected baseUrl: string;

  constructor(protected type: string) {
    this.baseUrl = `http://localhost:3001/${type}`;
  }

  public async fetchAll(): Promise<FindAllType> {
    return axios
      .get(`${this.baseUrl}/`)
      .then(({ data }) => data as FindAllType);
  }

  public async fetchOne(id: number | string): Promise<FindOneType> {
    return axios.get(`${this.baseUrl}/${id}`);
  }
}
