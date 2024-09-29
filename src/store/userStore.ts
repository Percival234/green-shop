import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { UserType } from '@/types/user';
import { ProductType } from '@/types/product';

type UserState = {
  isAuth: boolean;
  user: null | UserType;
  wishlist: ProductType[];
};

type UserAction = {
  logout: () => void;
  setUser: (user: UserType) => void;
  setIsAuth: (token: string) => void;
  setWishlist: (wishlist: ProductType[]) => void;
};

const initialState: UserState = {
  user: null,
  wishlist: [],
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
          state.wishlist = [];
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
      setWishlist: (wishlist) =>
        set((state) => {
          state.wishlist = wishlist;
        }),
    })),
    {
      name: 'user-localstorage',
    }
  )
);
