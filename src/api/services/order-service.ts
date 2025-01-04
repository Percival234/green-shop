import { Message } from '@/types/message';
import { CreateOrderType, OrderType } from '@/types/order';

import { axiosInstance, axiosWithAuth } from '@/api/api';

export class OrderService {
  static async getUserOrders() {
    return (await axiosWithAuth.get<OrderType[]>('/orders')).data;
  }

  static async create(order: CreateOrderType) {
    return (await axiosInstance.post<Message>('/orders', order)).data;
  }
}
