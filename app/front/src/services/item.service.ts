import axios from 'axios';

export default abstract class ItemService<FindOneType, FindAllType> {
  protected baseUrl: string;

  constructor(protected type: string) {
    this.baseUrl = `http://localhost:3001/${type}`;
  }

  public async fetchAll(
    query?: Record<string, string | number | boolean>,
  ): Promise<FindAllType> {
    return axios
      .get(`${this.baseUrl}?${this.encodeQueryObj(query)}`)
      .then(({ data }) => data as FindAllType);
  }

  public async fetchOne(id: number | string): Promise<FindOneType> {
    return axios.get(`${this.baseUrl}/${id}`);
  }

  protected encodeQueryObj(
    query: Record<string, string | number | boolean> = {},
  ): string {
    return Object.keys(query)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]),
      )
      .join(',');
  }
}
