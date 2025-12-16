'use client';

import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { CountdownTimer } from './CountdownTimer';
import { Flame, ShoppingCart } from 'lucide-react';

interface FlashDeal {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  totalStock: number;
  soldStock: number;
  expiresAt: Date;
}

interface FlashDealCardProps {
  deal: FlashDeal;
}

/**
 * Componente de tarjeta para ofertas flash
 * Muestra producto, descuento, temporizador y progreso de stock
 */
export function FlashDealCard({ deal }: FlashDealCardProps) {
  const stockPercentage = (deal.soldStock / deal.totalStock) * 100;
  const remainingStock = deal.totalStock - deal.soldStock;
  const isLowStock = remainingStock <= 5;
  const isSoldOut = remainingStock === 0;

  return (
    <div className="group relative bg-gradient-to-b from-dark-900/90 to-dark-900/50 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 overflow-hidden border border-dark-800 hover:border-red-500/30">
      {/* Badge de oferta flash */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-black px-3 py-1 animate-pulse shadow-lg shadow-red-500/50">
          <Flame className="h-4 w-4 inline mr-1" />
          FLASH
        </Badge>
      </div>

      {/* Badge de descuento */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-gradient-to-r from-dark-900 to-dark-800 border border-dark-700 text-white font-black text-lg px-3 py-2 shadow-lg">
          -{deal.discountPercentage}%
        </Badge>
      </div>

      {/* Imagen del producto */}
      <Link href={`/products/${deal.id}`}>
        <div className="aspect-square bg-dark-800 relative overflow-hidden">
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
              <span className="text-white font-black text-2xl">AGOTADO</span>
            </div>
          )}
          <img
            src={deal.image}
            alt={deal.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Información */}
      <div className="p-5">
        {/* Nombre del producto */}
        <Link href={`/products/${deal.id}`}>
          <h3 className="font-bold text-dark-50 mb-3 line-clamp-2 group-hover:text-accent-400 transition-colors min-h-[48px]">
            {deal.name}
          </h3>
        </Link>

        {/* Precios */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              ${deal.discountPrice.toLocaleString('es-MX')}
            </span>
            <span className="text-sm text-dark-500 line-through">
              ${deal.originalPrice.toLocaleString('es-MX')}
            </span>
          </div>
          <span className="text-sm font-semibold text-emerald-400">
            ¡Ahorras $
            {(deal.originalPrice - deal.discountPrice).toLocaleString('es-MX')}!
          </span>
        </div>

        {/* Progreso de stock */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold text-dark-300">
              Stock disponible
            </span>
            <span
              className={`font-bold ${isLowStock ? 'text-red-400' : 'text-dark-200'}`}
            >
              {remainingStock} / {deal.totalStock}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="h-3 bg-dark-800 border border-dark-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                stockPercentage < 30
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                  : stockPercentage < 70
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                    : 'bg-gradient-to-r from-red-500 to-pink-600'
              }`}
              style={{ width: `${stockPercentage}%` }}
            />
          </div>

          {isLowStock && !isSoldOut && (
            <p className="text-xs text-red-400 font-bold mt-1 animate-pulse">
              ⚠️ ¡Solo quedan {remainingStock} unidades!
            </p>
          )}
        </div>

        {/* Temporizador */}
        <div className="mb-4">
          <p className="text-xs text-dark-400 font-semibold mb-2">
            Termina en:
          </p>
          <CountdownTimer
            targetDate={deal.expiresAt}
            size="sm"
            variant="compact"
          />
        </div>

        {/* Botón de compra */}
        <button
          disabled={isSoldOut}
          className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            isSoldOut
              ? 'bg-dark-800 text-dark-500 border border-dark-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-accent-600 to-purple-600 text-white hover:from-accent-500 hover:to-purple-500 hover:scale-105 shadow-lg hover:shadow-accent-500/20'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          {isSoldOut ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}
