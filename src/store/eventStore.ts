import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type EventState = {
  filter: boolean;
  authModal: boolean;
  logoutModal: boolean;
  checkoutModal: boolean;
  userDeleteModal: boolean;
};

type EventActions = {
  open: (name: keyof EventState) => void;
  close: (name: keyof EventState) => void;
  toggle: (name: keyof EventState) => void;
};

const initialState: EventState = {
  filter: true,
  authModal: false,
  logoutModal: false,
  checkoutModal: false,
  userDeleteModal: false,
};

export const useEventStore = create<EventState & EventActions>()(
  immer((set) => ({
    ...initialState,
    open: (name) =>
      set((state) => {
        state[name] = true;
      }),
    close: (name) =>
      set((state) => {
        state[name] = false;
      }),
    toggle: (name) =>
      set((state) => {
        state[name] = !state[name];
      }),
  }))
);
