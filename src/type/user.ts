export type UserType = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserType = Omit<UserType, '_id' | 'createdAt' | 'updatedAt'>;

export type UpdatePasswordType = {
  password: string;
};
