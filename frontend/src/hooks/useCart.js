import { getCart } from "@/app/api/cartApi";
import { create } from "zustand";

export const useCart = create((set) => ({
  listCart: [],
  addCart: (item) => set((state) => ({ listCart: [...state.listCart, item] })),
  removeCart: (id) =>
    set((state) => ({
      listCart: state.listCart.filter((item) => item.productId !== id),
    })),
  fetchCart: async (token) => {
    const res = await getCart(token);
    set({ listCart: res });
  },
}));
