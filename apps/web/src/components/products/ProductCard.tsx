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
      <div className="relative h-full rounded-xl border border-elegant-wine/20 bg-gradient-to-br from-elegant-navy/80 to-elegant-deep/60 backdrop-blur-xl overflow-hidden transition-all hover:border-accent-900/50 hover:shadow-2xl hover:shadow-accent-900/20 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-elegant-deep/50 to-black/50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient elegante */}
          <div className="absolute inset-0 bg-gradient-to-t from-elegant-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges elegantes */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.discount && product.discount > 0 && (
              <div className="bg-gradient-to-r from-accent-900 to-elegant-wine text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-accent-900/50">
                -{product.discount}% OFF
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-elegant-navy/90 backdrop-blur-sm border border-elegant-wine/30 text-dark-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                Agotado
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform group-hover:scale-110">
            <FavoriteButton productId={product.id} size="md" />
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
          <h3 className="font-bold text-dark-50 text-base line-clamp-2 min-h-[3rem] leading-tight">
            {product.name}{' '}
          </h3>

          {/* Rating elegante */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 4 ? 'text-gold-400 fill-gold-400' : 'text-dark-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-dark-300 font-medium">4.0</span>
          </div>

          {/* Price - Elegante con gradiente */}
          <div className="space-y-1.5">
            {product.discount && product.discount > 0 ? (
              <>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-dark-50 to-accent-300 bg-clip-text text-transparent">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="text-base text-dark-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-xs text-success-400 font-semibold">
                  Ahorra {formatPrice(product.price - finalPrice)}
                </p>
              </>
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-dark-50 to-accent-300 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Elegante */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || inCart || isAddingToCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm rounded-lg transition-all shadow-lg ${
              product.stock === 0
                ? 'bg-elegant-deep border border-elegant-wine/30 text-dark-500 cursor-not-allowed'
                : inCart
                  ? 'bg-success-600 text-white cursor-not-allowed shadow-success-600/30'
                  : isAddingToCart
                    ? 'bg-gradient-to-r from-accent-900 to-elegant-wine text-white scale-95 shadow-accent-900/50'
                    : 'bg-gradient-to-r from-accent-900 to-elegant-wine hover:from-accent-800 hover:to-elegant-wine/90 text-white shadow-accent-900/30 hover:shadow-accent-900/50'
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
