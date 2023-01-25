import axios from 'axios';
import { type ApiError } from '../types/errors.types';
import { type CreateUpdateResponse } from '../types/response.types';

export default abstract class ItemService<
  FindOneType,
  FindAllType,
  CreateInput,
> {
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

  public async create(
    obj: CreateInput,
  ): Promise<CreateUpdateResponse<FindOneType>> {
    return axios.post(this.baseUrl, { ...obj }).catch(this.handleError);
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
