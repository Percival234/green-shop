import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ProductType } from '@/type/product';
import { CartItemType } from '@/type/cartItem';

import { SHIPPING } from '@/constants/SHIPPING';
import { PAYMENT_METHODS } from '@/constants/PAYMENT_METHODS';

type CartState = {
  cartItems: CartItemType[];
  shipping: number;
  totalPrice: number;
  payment: string;
};

type CartActions = {
  setPayment: (payment: string) => void;
  clearCart: () => void;
  setTotalPrice: (totalPrice: number) => void;
  addToCart: (product: ProductType, count: number) => void;
  removeFromCart: (id: string) => void;
  increaseItemCount: (id: string) => void;
  decreaseItemCount: (id: string) => void;
};

const initialState: CartState = {
  cartItems: [],
  shipping: SHIPPING,
  totalPrice: 0,
  payment: PAYMENT_METHODS[0],
};

export const useCartStore = create<CartState & CartActions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setPayment: (payment) => {
        set((state) => {
          state.payment = payment;
        });
      },
      clearCart: () =>
        set((state) => {
          state.cartItems = [];
        }),
      setTotalPrice: (totalPrice) =>
        set((state) => {
          state.totalPrice = totalPrice;
        }),
      addToCart: (product, count) =>
        set((state) => {
          state.cartItems.push({ product, count });
        }),
      removeFromCart: (id) =>
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.product._id !== id);
        }),
      increaseItemCount: (id) =>
        set((state) => {
          state.cartItems = state.cartItems.map((item) => {
            return item.product._id === id ? { ...item, count: item.count + 1 } : item;
          });
        }),
      decreaseItemCount: (id) =>
        set((state) => {
          state.cartItems = state.cartItems.map((item) => {
            return item.product._id === id ? { ...item, count: item.count - 1 } : item;
          });
        }),
    })),
    {
      name: 'cart-localstorage',
    }
  )
);
