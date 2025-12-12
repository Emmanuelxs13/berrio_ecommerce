import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  product: any;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.productId === item.productId);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }

        const newState = get();
        set({
          itemCount: newState.items.reduce((sum, i) => sum + i.quantity, 0),
          subtotal: newState.items.reduce(
            (sum, i) => sum + i.product.price * i.quantity,
            0
          ),
        });
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((i) => i.id !== itemId) });
        const newState = get();
        set({
          itemCount: newState.items.reduce((sum, i) => sum + i.quantity, 0),
          subtotal: newState.items.reduce(
            (sum, i) => sum + i.product.price * i.quantity,
            0
          ),
        });
      },
      updateQuantity: (itemId, quantity) => {
        set({
          items: get().items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        });
        const newState = get();
        set({
          itemCount: newState.items.reduce((sum, i) => sum + i.quantity, 0),
          subtotal: newState.items.reduce(
            (sum, i) => sum + i.product.price * i.quantity,
            0
          ),
        });
      },
      clearCart: () => set({ items: [], itemCount: 0, subtotal: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
