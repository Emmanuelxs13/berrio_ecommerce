'use client';

import { useFavoritesStore } from '@/store/favorites';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function FavoriteButton({
  productId,
  size = 'md',
  showLabel = false,
  className = '',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isProductFavorite = isFavorite(productId);

  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm p-2.5 shadow-lg hover:bg-white hover:scale-110 transition-all ${className}`}
      title={isProductFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      aria-label={
        isProductFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'
      }
    >
      <Heart
        className={`${sizes[size]} transition-all ${
          isProductFavorite
            ? 'text-red-500 fill-red-500 scale-110'
            : 'text-gray-600 group-hover:text-red-500'
        }`}
      />
      {showLabel && (
        <span
          className={`text-sm font-bold ${
            isProductFavorite ? 'text-red-500' : 'text-gray-700'
          }`}
        >
          {isProductFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
        </span>
      )}
    </button>
  );
}
