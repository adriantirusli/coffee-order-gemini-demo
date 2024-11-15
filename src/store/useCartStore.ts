import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface CartItem {
  id: string;
  productId: number;
  productName: string;
  basePrice: number;
  quantity: number;
  modifiers: {
    size?: string;
    extras?: string[];
    ice?: string;
    sweetness?: string;
    diary?: string;
  };
  modifiersCost: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalCost: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => ({
          items: [...state.items, { ...newItem, id: uuidv4() }],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
      totalCost: () => {
        const { items } = get();
        return items.reduce(
          (sum, item) =>
            sum + (item.basePrice + item.modifiersCost) * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
