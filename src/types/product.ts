import { SizeType } from './size';
import { CategoryType } from './category';

export type ProductType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  sale: number;
  quantity: number;
  size: SizeType;
  description: string;
  rating: number;
  category: CategoryType;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductInfoType = ProductType & {
  reviewsLength: number;
};
