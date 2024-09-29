import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/UI/Loading/Loading';

import { useUserStore } from '@/store/userStore';

import { getUser } from '@/API/API';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser } = useUserStore((state) => state);
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

  if (isPending) return <LoadingPage />;
  return <>{children}</>;
};
