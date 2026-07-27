import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductSelection } from "../types";

const buildCartItemId = (product: Product, selection: ProductSelection) =>
  [product.id, selection.calda, selection.fruta, [...selection.acompanhamentos].sort().join(",")].join("|");

type CartState = {
  items: CartItem[];
  addItem: (product: Product, selection: ProductSelection) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, selection) =>
        set((state) => {
          const cartItemId = buildCartItemId(product, selection);
          const existing = state.items.find((item) => item.cartItemId === cartItemId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { cartItemId, product, quantity: 1, selection }] };
        }),
      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),
      updateQuantity: (cartItemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.cartItemId !== cartItemId) };
          }
          return {
            items: state.items.map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: "cardapio-cart" }
  )
);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.product.preco * item.quantity, 0);
