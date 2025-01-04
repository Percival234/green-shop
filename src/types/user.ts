export enum UserRoles {
  User = 'user',
  Admin = 'admin',
}

export type UserType = {
  _id: string;
  role: UserRoles;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserType = Omit<UserType, '_id' | 'createdAt' | 'updatedAt' | 'role'>;

export type UpdatePasswordType = {
  password: string;
};
