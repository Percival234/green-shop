import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/UI/Loading/Loading';

import { useUserStore } from '@/store/userStore';

import { getUser, getWishlist } from '@/API/API';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setWishlist } = useUserStore((state) => state);
  const {
    data: user,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser, isFetching]);

  const {
    data: wishlist,
    refetch,
    isFetching: isFetchingWishlist,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  useEffect(() => {
    if (wishlist) {
      setWishlist(wishlist.products);
    }
  }, [wishlist, setWishlist, isFetchingWishlist]);

  if (isPending) return <LoadingPage />;
  return <>{children}</>;
};
