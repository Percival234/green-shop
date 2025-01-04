import '@tanstack/react-query';
import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { SERVER_URL } from '@/constants/SERVER_URL';

import { AuthService } from './services/auth-service';

import { catchError } from '@/helpers/catchError';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{ message: string }>;
  }
}

const axiosConfig: CreateAxiosDefaults = {
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);
const axiosWithAuth = axios.create(axiosConfig);

axiosWithAuth.interceptors.request.use((config) => {
  const token = AuthService.getToken();

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config;

    if (originalRequest) {
      if (
        (error?.response?.status === 401 ||
          catchError(error) === 'jwt expired' ||
          catchError(error) === 'Token is missing') &&
        error.config &&
        !error.config._retry
      ) {
        originalRequest._retry = true;

        try {
          await AuthService.getNewToken();

          return axiosWithAuth.request(originalRequest);
        } catch (error) {
          if (catchError(error) === 'jwt expired') {
            AuthService.removeToken();
          }
        }
      }
    }

    throw error;
  }
);

export { axiosWithAuth, axiosInstance };
