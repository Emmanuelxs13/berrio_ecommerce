'use client';

import { ShoppingBag, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Alert } from '@/components/ui/Alert';

export default function CartPage() {
  const { items, summary } = useCartStore();

  // Estado vacío
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-600 to-purple-600 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">Mi Carrito</h1>
              <p className="text-white/80 mt-2">
                {summary.itemCount}{' '}
                {summary.itemCount === 1 ? 'producto' : 'productos'} en tu
                carrito
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stock Warning */}
        {items.some((item) => item.stock < 5) && (
          <Alert variant="warning" className="mb-6">
            <strong>Atención:</strong> Algunos productos tienen stock limitado.
            ¡Completa tu compra pronto!
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Items Header */}
            <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 p-4">
              <h2 className="font-semibold text-lg text-dark-50">
                Productos ({items.length})
              </h2>
            </div>

            {/* Items */}
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/5 border border-accent-500/20 backdrop-blur-sm rounded-xl p-4 flex gap-3">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-accent-500/20 rounded-full flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-accent-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-accent-300 mb-1">
                    Envío Gratis
                  </h3>
                  <p className="text-sm text-dark-300">
                    En compras mayores a $50.
                    {summary.subtotal < 50 && (
                      <> Agrega ${(50 - summary.subtotal).toFixed(2)} más.</>
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 backdrop-blur-sm rounded-xl p-4 flex gap-3">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-300 mb-1">
                    Devoluciones Fáciles
                  </h3>
                  <p className="text-sm text-dark-300">
                    30 días para devolver tu compra si no estás satisfecho
                  </p>
                </div>
              </div>
            </div>

            {/* Out of Stock Warning */}
            {items.some((item) => item.quantity > item.stock) && (
              <Alert variant="error" className="mt-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <strong>Stock insuficiente:</strong> Algunos productos no
                    tienen la cantidad solicitada disponible. Por favor ajusta
                    las cantidades antes de continuar.
                  </div>
                </div>
              </Alert>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 p-8">
          <h3 className="text-lg font-semibold text-center text-dark-50 mb-6">
            ¿Por qué comprar con nosotros?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="h-8 w-8 text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-dark-100 mb-2">Pago Seguro</h4>
              <p className="text-sm text-dark-400">
                Encriptación SSL y pagos protegidos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="h-8 w-8 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-dark-100 mb-2">Garantía</h4>
              <p className="text-sm text-dark-400">
                Productos originales con garantía oficial
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="h-8 w-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-dark-100 mb-2">Envío Rápido</h4>
              <p className="text-sm text-dark-400">
                Entrega en 24-48 horas hábiles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="h-8 w-8 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-dark-100 mb-2">Soporte 24/7</h4>
              <p className="text-sm text-dark-400">
                Atención al cliente siempre disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
