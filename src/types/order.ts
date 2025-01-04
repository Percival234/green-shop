import { CartItemType } from './cartItem';

export enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

export type OrderType = {
  _id: string;
  status: OrderStatus;
  userId: string | null;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  city: string;
  shipping: number;
  totalPrice: number;
  payment: string;
  cartItems: CartItemType[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrderType = Omit<OrderType, '_id' | 'createdAt' | 'updatedAt' | 'cartItems'> & {
  cartItems: {
    count: number;
    product: string;
  }[];
};
