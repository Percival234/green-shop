import { CategoryType } from '@/types/category';

import { axiosInstance } from '@/api/api';

export class CategoryService {
  static async getMany() {
    return (await axiosInstance.get<CategoryType[]>('/categories')).data;
  }
}
