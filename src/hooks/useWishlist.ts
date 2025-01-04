import { useQuery } from '@tanstack/react-query';

import { useUser } from './useUser';

import { WishlistService } from '@/api/services/wishlist-service';

export const useWishlist = () => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: WishlistService.getUserWishlist,
    enabled: !!user,
  });
};
