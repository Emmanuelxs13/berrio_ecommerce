import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[]; // Array de product IDs
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  count: number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      count: 0,

      addFavorite: (productId) => {
        const favorites = get().favorites;
        if (!favorites.includes(productId)) {
          const newFavorites = [...favorites, productId];
          set({
            favorites: newFavorites,
            count: newFavorites.length,
          });
        }
      },

      removeFavorite: (productId) => {
        const newFavorites = get().favorites.filter((id) => id !== productId);
        set({
          favorites: newFavorites,
          count: newFavorites.length,
        });
      },

      toggleFavorite: (productId) => {
        const favorites = get().favorites;
        if (favorites.includes(productId)) {
          get().removeFavorite(productId);
        } else {
          get().addFavorite(productId);
        }
      },

      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      },

      clearFavorites: () => set({ favorites: [], count: 0 }),
    }),
    {
      name: 'berrio-favorites-storage',
      version: 1,
    }
  )
);
