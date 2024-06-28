import { useUserStore } from '@/store/userStore';
import { useEventStore } from '@/store/eventStore';

export const useRequiredAuth = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  const open = useEventStore((state) => state.open);

  const authCheck = <Args extends any[], Return>(func: (...args: Args) => Return) => {
    return (...args: Args) => {
      if (isAuth) {
        return func(...args);
      } else {
        open('authModal');
      }
    };
  };

  return authCheck;
};
