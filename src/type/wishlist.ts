import { ProductType } from './product';

export type WishlistType = {
  _id: string;
  userId: string;
  products: ProductType[];
  createdAt: Date;
  updatedAt: Date;
};
