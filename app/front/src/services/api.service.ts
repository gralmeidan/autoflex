import { type ApiError } from '../types/errors.types';

export default abstract class ApiService {
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
