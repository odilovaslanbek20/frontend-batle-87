import { create } from "zustand";

export const useStore = create((set) => ({
  isOpen: false,
  isOpenModal: () => set((state) => ({ isOpen: !state.isOpen })),
}))