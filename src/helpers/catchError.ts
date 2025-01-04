import { AxiosError } from 'axios';

export function catchError(error: unknown) {
  if (error instanceof AxiosError) {
    return error?.response?.data?.message || 'An unknown error occurred';
  }

  return 'An unknown error occurred';
}
