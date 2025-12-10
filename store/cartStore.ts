// store/cartStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductVariant } from "@/types/product";

export type CartItem = {
  // line id trong giỏ (duy nhất mỗi dòng)
  id: string;

  // để mapping về product/variant khi cần gửi backend
  productId: string;
  variantId?: string;

  name: string;
  thumbnail?: string;
  size?: string;
  color?: string;

  basePrice: number;
  salePrice?: number;

  quantity: number;
};

type CartState = {
  items: CartItem[];

  addToCart: (product: Product, variant?: ProductVariant) => void;
  removeFromCart: (id: string) => void;

  updateQuantity: (id: string, quantity: number) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, variant) =>
        set((state) => {
          // lineId duy nhất cho mỗi dòng giỏ hàng
          const lineId = variant ? `${product.id}::${variant.id}` : product.id;

          const existing = state.items.find((i) => i.id === lineId);

          if (existing) {
            // nếu đã có → +1 quantity
            return {
              items: state.items.map((i) =>
                i.id === lineId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          const basePrice = variant?.price ?? product.basePrice;
          const salePrice = product.salePrice; // nếu có salePrice thì dùng, ko thì undefined

          const newItem: CartItem = {
            id: lineId,
            productId: product.id,
            variantId: variant?.id,

            name: product.name,
            thumbnail: variant?.image ?? product.thumbnail,
            size: variant?.size,
            color: variant?.color,

            basePrice,
            salePrice,
            quantity: 1,
          };

          return {
            items: [...state.items, newItem],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            // nếu quantity <= 0 thì xoá luôn
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }

          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),

      increaseQty: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        get().updateQuantity(id, item.quantity + 1);
      },

      decreaseQty: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        get().updateQuantity(id, item.quantity - 1);
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
