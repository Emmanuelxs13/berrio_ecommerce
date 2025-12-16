'use client';

import { useState } from 'react';
import { Check, Copy, Tag } from 'lucide-react';

interface CouponCardProps {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  expiresAt: Date;
  description: string;
}

/**
 * Componente de tarjeta de cupón de descuento
 * Permite copiar el código al portapapeles
 */
export function CouponCard({
  code,
  discount,
  type,
  minPurchase,
  expiresAt,
  description,
}: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const discountText =
    type === 'percentage' ? `${discount}% OFF` : `$${discount} OFF`;

  const isExpired = new Date() > expiresAt;
  const daysLeft = Math.ceil(
    (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      className={`relative bg-gradient-to-br from-accent-500 via-purple-500 to-pink-500 rounded-2xl p-1 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all ${isExpired ? 'opacity-50 grayscale' : ''}`}
    >
      {/* Contenido interno */}
      <div className="bg-dark-900/95 backdrop-blur-xl rounded-xl p-6 h-full">
        {/* Header con icono */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-accent-500/20 to-purple-500/20 border border-accent-500/30 rounded-lg">
              <Tag className="h-6 w-6 text-accent-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                {discountText}
              </h3>
              <p className="text-sm text-dark-300">{description}</p>
            </div>
          </div>
        </div>

        {/* Código del cupón */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-dark-400 mb-2">
            CÓDIGO DEL CUPÓN:
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-dark-800/50 border-2 border-dashed border-dark-700 rounded-lg px-4 py-3">
              <code className="font-mono text-xl font-black text-dark-100 tracking-wider">
                {code}
              </code>
            </div>
            <button
              onClick={handleCopy}
              disabled={isExpired}
              className={`px-4 py-3 rounded-lg font-bold transition-all ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-accent-600 to-purple-600 text-white hover:from-accent-500 hover:to-purple-500'
              } ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 inline mr-1" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 inline mr-1" />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Condiciones */}
        <div className="space-y-2 text-sm">
          {minPurchase && (
            <p className="text-dark-300">
              📦 Compra mínima:{' '}
              <span className="font-bold text-dark-100">
                ${minPurchase.toLocaleString('es-MX')}
              </span>
            </p>
          )}
          <p
            className={`font-semibold ${isExpired ? 'text-red-400' : daysLeft <= 3 ? 'text-orange-400' : 'text-dark-300'}`}
          >
            {isExpired ? (
              <>⏰ Expirado</>
            ) : daysLeft === 0 ? (
              <>⏰ Expira hoy</>
            ) : daysLeft === 1 ? (
              <>⏰ Expira mañana</>
            ) : (
              <>⏰ Expira en {daysLeft} días</>
            )}
          </p>
        </div>

        {/* Badge de estado */}
        {isExpired && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              EXPIRADO
            </span>
          </div>
        )}
      </div>

      {/* Efecto de borde animado (solo si no está expirado) */}
      {!isExpired && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
      )}
    </div>
  );
}
