import { type ServiceError } from './errors.types';

export type CreateUpdateResponse<T> = {
  data?: T;
  error?: ServiceError;
};
