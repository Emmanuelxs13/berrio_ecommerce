'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, TrendingUp, Zap, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { FavoriteButton } from './FavoriteButton';
import { useState } from 'react';

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCartStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const inCart = isInCart(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart || product.stock === 0) return;

    setIsAddingToCart(true);

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity: 1,
      image: product.images[0],
      stock: product.stock,
      brand:
        typeof product.brand === 'string' ? product.brand : product.brand.name,
    });

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsAddingToCart(false);
  };

  const imageUrl = product.images?.[0] || '/placeholder-product.png';

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="relative h-full rounded-2xl border border-dark-800 bg-gradient-to-b from-dark-900/90 to-dark-900/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent-500/10 hover:-translate-y-2 hover:border-dark-700">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-dark-900 to-dark-800 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.discount && product.discount > 0 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <TrendingUp className="h-3 w-3" />-{product.discount}%
              </div>
            )}
            {product.featured && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-accent-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <Zap className="h-3 w-3" />
                Destacado
              </div>
            )}
            {product.stock > 0 && product.stock < 10 && (
              <div className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Solo {product.stock} disponibles
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-dark-800/90 backdrop-blur-sm border border-dark-700 text-dark-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Agotado
              </div>
            )}
            {inCart && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <Check className="h-3 w-3" />
                En Carrito
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <FavoriteButton productId={product.id} size="md" />
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium text-center">
              Click para ver detalles
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs font-bold text-accent-400 uppercase tracking-wider">
              {typeof product.brand === 'string'
                ? product.brand
                : product.brand.name}
            </p>
          )}

          {/* Title */}
          <h3 className="font-bold text-dark-50 text-base line-clamp-2 min-h-[3rem] group-hover:text-accent-400 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={`star-${product.id}-${i}`}
                  className={`h-4 w-4 ${
                    i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-dark-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-dark-300">4.0</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.discount && product.discount > 0 ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gradient-primary">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm text-dark-500 line-through font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-semibold">
                  ¡Ahorra $
                  {(product.price * (product.discount / 100)).toFixed(2)}!
                </p>
              </>
            ) : (
              <span className="text-3xl font-bold text-gradient-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || inCart || isAddingToCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition-all duration-300 ${
              product.stock === 0
                ? 'bg-dark-800 text-dark-500 cursor-not-allowed border border-dark-700'
                : inCart
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white cursor-not-allowed'
                  : isAddingToCart
                    ? 'bg-emerald-500 text-white scale-95'
                    : 'bg-gradient-to-r from-accent-600 to-purple-600 text-white hover:from-accent-700 hover:to-purple-700 hover:shadow-lg hover:shadow-accent-500/50 hover:scale-105'
            }`}
          >
            <ShoppingCart
              className={`h-5 w-5 ${isAddingToCart ? 'animate-bounce' : ''}`}
            />
            <span>
              {product.stock === 0
                ? 'Agotado'
                : inCart
                  ? 'En el Carrito'
                  : isAddingToCart
                    ? '¡Agregado!'
                    : 'Agregar al Carrito'}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
