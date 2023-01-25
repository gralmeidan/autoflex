import { type AxiosError } from 'axios';

export type ApiError = Required<
  Pick<
    AxiosError<{
      message: string;
    }>,
    'response'
  >
>;

export type ServiceError = {
  status: number;
  message: string;
};
