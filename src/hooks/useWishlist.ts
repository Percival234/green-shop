import { useQuery } from '@tanstack/react-query';

import { getWishlist } from '@/API/API';

export const useWishlist = () => {
  const response = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  return response;
};
