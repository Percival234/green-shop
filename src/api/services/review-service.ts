import { Message } from '@/types/message';
import { CreateReviewType, ReviewType } from '@/types/review';

import { axiosInstance, axiosWithAuth } from '@/api/api';

export class ReviewService {
  static async getMany(id: string) {
    return (await axiosInstance.get<ReviewType[]>(`/reviews/${id}`)).data;
  }

  static async create(review: CreateReviewType) {
    return (await axiosWithAuth.post<Message>('/reviews', review)).data;
  }

  static async delete(id: string) {
    return (await axiosWithAuth.delete<Message>(`/reviews/${id}`)).data;
  }
}
