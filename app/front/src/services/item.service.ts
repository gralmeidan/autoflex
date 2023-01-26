import axios from 'axios';
import { type CreateUpdateResponse } from '../types/response.types';
import ApiService from './api.service';

export default abstract class ItemService<
  FindOneType,
  FindAllType,
> extends ApiService {
  protected baseUrl: string;

  constructor(protected type: string) {
    super();
    this.baseUrl = `http://localhost:3001/${type}`;
  }

  public async fetchAll(query?: Record<string, string | number | boolean>) {
    return axios
      .get(`${this.baseUrl}?${this.encodeQueryObj(query)}`)
      .then(({ data }) => data as FindAllType);
  }

  public async fetchOne(id: number | string) {
    return axios
      .get(`${this.baseUrl}/${id}`)
      .then(({ data }) => data as FindOneType);
  }

  public async create(obj: {
    name: string;
    value?: number;
    quantity?: number;
  }): Promise<CreateUpdateResponse<FindOneType>> {
    return axios.post(this.baseUrl, { ...obj }).catch(this.handleError);
  }

  public async update(
    id: string,
    obj: {
      name?: string;
      value?: number;
      quantity?: number;
    },
  ): Promise<CreateUpdateResponse<FindOneType>> {
    return axios
      .put(`${this.baseUrl}/${id}`, { ...obj })
      .catch(this.handleError);
  }

  public async remove(id: string | number) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }
}
