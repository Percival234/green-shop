import { useQuery } from '@tanstack/react-query';

import { UserService } from '@/api/services/user-service';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: UserService.getCurrent,
  });
};
