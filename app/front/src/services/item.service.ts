import axios from 'axios';
import { type ApiError } from '../types/errors.types';
import { type CreateUpdateResponse } from '../types/response.types';

export default abstract class ItemService<FindOneType, FindAllType> {
  protected baseUrl: string;

  constructor(protected type: string) {
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

  protected encodeQueryObj(
    query: Record<string, string | number | boolean> = {},
  ): string {
    return Object.keys(query)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]),
      )
      .join(',');
  }

  protected isApiError(error: unknown): error is ApiError {
    return 'response' in (error as ApiError);
  }

  protected handleError = (error: unknown) => {
    if (this.isApiError(error)) {
      const { response } = error;

      return {
        error: {
          status: error.response.status,
          message: response.data.message,
        },
      };
    }

    throw error;
  };
}
