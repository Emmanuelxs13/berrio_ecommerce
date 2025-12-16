'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { FavoriteButton } from './FavoriteButton';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils';

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

  // Calcular precio final con descuento
  const finalPrice =
    product.discount && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="relative h-full rounded-lg border border-dark-800 bg-dark-900/50 overflow-hidden transition-all hover:border-dark-700 hover:shadow-xl hover:shadow-accent-500/5">
        {/* Image Container */}
        <div className="relative aspect-square bg-dark-800/50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.discount && product.discount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-dark-800/90 backdrop-blur-sm border border-dark-700 text-dark-300 text-xs font-medium px-2 py-1 rounded">
                Agotado
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <FavoriteButton productId={product.id} size="md" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs font-medium text-accent-400 uppercase tracking-wide">
              {typeof product.brand === 'string'
                ? product.brand
                : product.brand.name}
            </p>
          )}

          {/* Title */}
          <h3 className="font-semibold text-dark-50 text-sm line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= 4
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-dark-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-dark-400">4.0</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.discount && product.discount > 0 ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-dark-50">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="text-sm text-dark-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium">
                  Ahorra {formatPrice(product.price - finalPrice)}
                </p>
              </>
            ) : (
              <span className="text-xl font-bold text-dark-50">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || inCart || isAddingToCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 font-medium text-sm rounded-lg transition-all ${
              product.stock === 0
                ? 'bg-dark-800 text-dark-500 cursor-not-allowed border border-dark-700'
                : inCart
                  ? 'bg-emerald-500 text-white cursor-not-allowed'
                  : isAddingToCart
                    ? 'bg-accent-600 text-white scale-95'
                    : 'bg-accent-600 hover:bg-accent-700 text-white'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {product.stock === 0
                ? 'Agotado'
                : inCart
                  ? 'En Carrito'
                  : isAddingToCart
                    ? 'Agregado'
                    : 'Agregar'}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
