import { Message } from '@/types/message';
import { UpdatePasswordType, UpdateUserType, UserType } from '@/types/user';

import { axiosWithAuth } from '@/api/api';

export class UserService {
  static async delete() {
    return (await axiosWithAuth.delete<Message>('/users')).data;
  }

  static async getCurrent() {
    return (await axiosWithAuth.get<UserType>('/users/current')).data;
  }

  static async update(userData: UpdatePasswordType | UpdateUserType) {
    return (await axiosWithAuth.patch<Message>('/users', userData)).data;
  }
}
