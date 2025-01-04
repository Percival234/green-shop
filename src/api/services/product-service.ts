import { ProductInfoType, ProductType } from '@/types/product';

import { axiosInstance } from '@/api/api';

export class ProductService {
  static async getById(id: string) {
    return (await axiosInstance.get<ProductInfoType>(`/products/${id}`)).data;
  }

  static async getRelated(categoryId: string, productId: string) {
    return (
      await axiosInstance.get<{ products: ProductType[]; pagesCount: number }>(
        `/products?categories=${categoryId}&exclude=${productId}&limit=12`
      )
    ).data;
  }

  static async getMany() {
    return (
      await axiosInstance.get<{ products: ProductType[]; pagesCount: number }>(
        `/products?${new URLSearchParams(window.location.search)}`
      )
    ).data;
  }
}
