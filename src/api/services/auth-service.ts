import Cookies from 'js-cookie';

import { Token } from '@/types/token';
import { Message } from '@/types/message';
import { CredentialsType } from '@/types/credentials';

import { axiosInstance, axiosWithAuth } from '@/api/api';

export class AuthService {
  static async login(credentials: CredentialsType) {
    const data = (await axiosInstance.post<Token>('/auth/login', credentials)).data;

    if (data.token) {
      AuthService.saveToken(data.token);
    }

    return data;
  }

  static async register(credentials: CredentialsType) {
    const data = (await axiosInstance.post<Token>('/auth/register', credentials)).data;

    if (data.token) {
      AuthService.saveToken(data.token);
    }

    return data;
  }

  static async getNewToken() {
    const data = (await axiosInstance.get<Token>('/auth/access-token')).data;

    if (data.token) {
      AuthService.saveToken(data.token);
    }

    return data;
  }

  static async logout() {
    return (await axiosWithAuth.post<Message>('/auth/logout')).data;
  }

  static getToken() {
    const token = Cookies.get('access_token') || null;
    return token;
  }

  static saveToken(token: string) {
    Cookies.set('access_token', token, {
      domain: 'localhost',
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + 30 * 60 * 1000),
    });
  }

  static removeToken() {
    Cookies.remove('access_token', { path: '/' });
  }
}
