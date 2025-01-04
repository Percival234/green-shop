import { Message } from '@/types/message';
import { WishlistType } from '@/types/wishlist';

import { axiosWithAuth } from '@/api/api';

export class WishlistService {
  static async getUserWishlist() {
    return (await axiosWithAuth.get<WishlistType>('/wishlists')).data;
  }

  static async clear() {
    return (await axiosWithAuth.delete<Message>('/wishlists')).data;
  }

  static async update(productId: string) {
    return (await axiosWithAuth.patch<Message>('/wishlists', { productId })).data;
  }
}
