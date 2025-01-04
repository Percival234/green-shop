import { useEventStore } from '@/store/eventStore';

import { useUser } from './useUser';

export const useRequiredAuth = () => {
  const { data: user } = useUser();
  const open = useEventStore((state) => state.open);

  const authCheck = <Args extends any[], Return>(func: (...args: Args) => Return) => {
    return (...args: Args) => {
      if (user) {
        return func(...args);
      } else {
        open('authModal');
      }
    };
  };

  return authCheck;
};
