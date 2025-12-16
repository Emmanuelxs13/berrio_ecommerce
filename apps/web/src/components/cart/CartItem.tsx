'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { Badge } from '../ui/Badge';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  readonly item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const finalPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  const itemTotal = finalPrice * item.quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(item.id);
    } else if (newQuantity <= item.stock) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 hover:border-dark-700 transition-all">
      {/* Image */}
      <Link href={`/products/${item.productId}`} className="shrink-0 group/img">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-dark-800 ring-1 ring-dark-700">
          <Image
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            fill
            className="object-cover group-hover/img:scale-105 transition-transform"
          />
          {item.discount && (
            <Badge
              variant="error"
              className="absolute top-1 right-1 text-xs font-bold"
            >
              -{item.discount}%
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/products/${item.productId}`}
              className="font-semibold text-dark-50 hover:text-accent-400 transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            {item.brand && (
              <p className="text-sm text-dark-400 mt-1">{item.brand}</p>
            )}
          </div>

          {/* Remove button - Desktop */}
          <button
            onClick={() => removeItem(item.id)}
            className="hidden sm:flex p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            aria-label="Eliminar producto"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-dark-700 bg-dark-800/50 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2 hover:bg-dark-700 text-dark-300 hover:text-dark-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={item.quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="px-4 py-2 font-medium min-w-[3rem] text-center text-dark-100">
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2 hover:bg-dark-700 text-dark-300 hover:text-dark-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={item.quantity >= item.stock}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {item.stock < 10 && (
              <Badge variant="warning" className="text-xs">
                Solo {item.stock} disponibles
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            {item.discount ? (
              <>
                <div className="text-sm text-dark-500 line-through">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                  ${itemTotal.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-lg font-bold text-dark-100">
                ${itemTotal.toFixed(2)}
              </div>
            )}
            <div className="text-xs text-dark-400">
              ${finalPrice.toFixed(2)} c/u
            </div>
          </div>

          {/* Remove button - Mobile */}
          <button
            onClick={() => removeItem(item.id)}
            className="sm:hidden p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full flex items-center justify-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-sm font-medium">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
