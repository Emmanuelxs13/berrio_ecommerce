import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartSummary } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  summary: CartSummary;
}

const SHIPPING_COST = 5.0; // $5 envío estándar
const FREE_SHIPPING_THRESHOLD = 50.0; // Envío gratis sobre $50
const TAX_RATE = 0.16; // 16% IVA

const calculateSummary = (items: CartItem[]): CartSummary => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const discount = items.reduce((sum, item) => {
    if (item.discount) {
      return sum + ((item.price * item.discount) / 100) * item.quantity;
    }
    return sum;
  }, 0);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    itemCount,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      summary: {
        subtotal: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        itemCount: 0,
      },

      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === product.id);

        let newItems: CartItem[];

        if (existingItem) {
          // Verificar stock disponible
          const newQuantity = existingItem.quantity + product.quantity;
          if (newQuantity > product.stock) {
            console.warn('Stock insuficiente');
            return;
          }

          newItems = items.map((i) =>
            i.id === product.id ? { ...i, quantity: newQuantity } : i
          );
        } else {
          // Verificar stock al agregar nuevo
          if (product.quantity > product.stock) {
            console.warn('Stock insuficiente');
            return;
          }

          newItems = [...items, product];
        }

        set({
          items: newItems,
          summary: calculateSummary(newItems),
        });
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((i) => i.id !== productId);
        set({
          items: newItems,
          summary: calculateSummary(newItems),
        });
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items;
        const item = items.find((i) => i.id === productId);

        if (!item) return;

        // Si cantidad es 0, remover el item
        if (quantity === 0) {
          get().removeItem(productId);
          return;
        }

        // Verificar stock
        if (quantity > item.stock) {
          console.warn('Stock insuficiente');
          return;
        }

        const newItems = items.map((i) =>
          i.id === productId ? { ...i, quantity } : i
        );

        set({
          items: newItems,
          summary: calculateSummary(newItems),
        });
      },

      clearCart: () =>
        set({
          items: [],
          summary: {
            subtotal: 0,
            discount: 0,
            shipping: 0,
            tax: 0,
            total: 0,
            itemCount: 0,
          },
        }),

      getItemQuantity: (productId) => {
        const item = get().items.find((i) => i.id === productId);
        return item?.quantity || 0;
      },

      isInCart: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
    }),
    {
      name: 'berrio-cart-storage',
      version: 1,
    }
  )
);
