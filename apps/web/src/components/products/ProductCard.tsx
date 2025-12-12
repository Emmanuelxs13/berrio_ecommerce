'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, TrendingUp, Zap, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { FavoriteButton } from './FavoriteButton';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
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
      brand: typeof product.brand === 'string' ? product.brand : product.brand.name,
    });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsAddingToCart(false);
  };

  const imageUrl = product.images?.[0] || '/placeholder-product.png';

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="relative h-full bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discount && product.discount > 0 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <TrendingUp className="h-3 w-3" />-{product.discount}%
              </div>
            )}
            {product.featured && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Zap className="h-3 w-3" />
                Destacado
              </div>
            )}
            {product.stock > 0 && product.stock < 10 && (
              <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Solo {product.stock} disponibles
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Agotado
              </div>
            )}
            {inCart && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Check className="h-3 w-3" />
                En Carrito
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FavoriteButton productId={product.id} size="md" />
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium text-center">
              Click para ver detalles
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {typeof product.brand === 'string' ? product.brand : product.brand.name}
            </p>
          )}

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {/* Mock rating - can be removed or made dynamic */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">4.0</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.discount && product.discount > 0 ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-semibold">
                  ¡Ahorra ${(product.price * (product.discount / 100)).toFixed(2)}!
                </p>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
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
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : inCart
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                : isAddingToCart
                ? 'bg-green-500 text-white scale-95'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:scale-105'
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
