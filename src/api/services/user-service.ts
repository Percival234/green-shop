import { Message } from '@/types/message';
import { UpdatePasswordType, UpdateUserType, UserType } from '@/types/user';

import { axiosWithAuth } from '@/api/api';

export class UserService {
  static async delete(userId: string) {
    return (await axiosWithAuth.delete<Message>(`/users/${userId}`)).data;
  }

  static async getCurrent() {
    return (await axiosWithAuth.get<UserType>('/users/current')).data;
  }

  static async update(userId: string, userData: UpdatePasswordType | UpdateUserType) {
    return (await axiosWithAuth.patch<Message>(`/users/${userId}`, userData)).data;
  }
}
