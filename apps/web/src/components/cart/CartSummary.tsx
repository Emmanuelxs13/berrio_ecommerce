'use client';

import { ArrowRight, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

export function CartSummary() {
  const router = useRouter();
  const { summary } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    // TODO: Implementar validación de cupón con backend
    if (couponCode.toLowerCase() === 'berrio10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido');
      setCouponApplied(false);
    }
  };

  const handleCheckout = () => {
    // TODO: Implementar checkout real
    router.push('/checkout');
  };

  const freeShippingRemaining = 50 - summary.subtotal;
  const showFreeShippingMessage = freeShippingRemaining > 0 && freeShippingRemaining < 50;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

      {/* Cupón */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Cupón de descuento
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setCouponError('');
              }}
              placeholder="Ingresa tu cupón"
              disabled={couponApplied}
              className={couponApplied ? 'bg-green-50 border-green-300' : ''}
            />
          </div>
          {couponApplied ? (
            <Button
              variant="outline"
              onClick={() => {
                setCouponApplied(false);
                setCouponCode('');
              }}
            >
              Quitar
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={!couponCode}
            >
              Aplicar
            </Button>
          )}
        </div>
        {couponApplied && (
          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <Tag className="h-4 w-4" />
            <span>Cupón aplicado correctamente</span>
          </div>
        )}
        {couponError && (
          <p className="mt-2 text-sm text-red-600">{couponError}</p>
        )}
      </div>

      {/* Free Shipping Progress */}
      {showFreeShippingMessage && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                ¡Casi lo logras!
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Agrega <strong>${freeShippingRemaining.toFixed(2)}</strong> más para obtener{' '}
                <strong>envío gratis</strong>
              </p>
              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${(summary.subtotal / 50) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Lines */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({summary.itemCount} items)</span>
          <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuentos</span>
            <span className="font-medium">-${summary.discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <span>Envío</span>
            {summary.shipping === 0 && (
              <Badge variant="success" className="text-xs">
                GRATIS
              </Badge>
            )}
          </div>
          <span className="font-medium">
            {summary.shipping === 0 ? 'Gratis' : `$${summary.shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>IVA (16%)</span>
          <span className="font-medium">${summary.tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-primary-600">
          ${summary.total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full mb-3"
        onClick={handleCheckout}
      >
        Proceder al Pago
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => router.push('/products')}
      >
        Continuar Comprando
      </Button>

      {/* Security Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex-1 flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xs">Compra segura</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-xs">Pagos protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
