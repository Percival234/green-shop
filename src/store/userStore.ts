import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { UserType } from '@/types/user';

type UserState = {
  isAuth: boolean;
  user: null | UserType;
};

type UserAction = {
  logout: () => void;
  setUser: (user: UserType) => void;
  setIsAuth: (token: string) => void;
};

const initialState: UserState = {
  user: null,
  isAuth: false,
};

export const useUserStore = create<UserState & UserAction>()(
  persist(
    immer((set) => ({
      ...initialState,
      logout: () =>
        set((state) => {
          state.user = null;
          state.isAuth = false;
          localStorage.removeItem('token');
        }),
      setIsAuth: (token) =>
        set((state) => {
          state.isAuth = true;
          localStorage.setItem('token', token);
        }),
      setUser: (user) =>
        set((state) => {
          state.user = user;
          state.isAuth = true;
        }),
    })),
    {
      name: 'user-localstorage',
    }
  )
);
