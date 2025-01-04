import { DetailType } from '@/types/detail';
import { axiosInstance } from '@/api/api';

export class DetailService {
  static async getProductDetails(productId: string) {
    return (await axiosInstance.get<DetailType[]>(`/details/${productId}`)).data;
  }
}
