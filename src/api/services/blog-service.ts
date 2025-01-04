import { BlogType } from '@/types/blog';

import { axiosInstance } from '@/api/api';

export class BlogService {
  static async getMany({ limit }: { limit: number }) {
    return (await axiosInstance.get<BlogType[]>(`/blogs?limit=${limit}`)).data;
  }

  static async getById(id: string) {
    return (await axiosInstance.get<BlogType>(`/blogs/${id}`)).data;
  }
}
