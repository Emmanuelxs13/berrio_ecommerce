'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { Loading } from '@/components/ui/Loading';
import { Tag, TrendingUp, Zap, Sparkles, Clock } from 'lucide-react';

export default function OffersPage() {
  // Fetch products with discounts
  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['offers-products'],
    queryFn: () =>
      getProducts({
        page: 1,
        limit: 20,
        featured: true, // Can filter by featured offers
      }),
  });

  // Filter products with discount > 0
  const offersProducts = productsResponse?.products.filter(
    (product) => product.discount && product.discount > 0
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 min-h-screen">
      <div className="container-custom py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse shadow-lg">
            <Zap className="h-5 w-5" />
            OFERTAS ESPECIALES
            <Sparkles className="h-5 w-5" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            🔥 Ofertas Irresistibles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Aprovecha los mejores descuentos en tecnología. ¡Ofertas por tiempo
            limitado!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
              <div className="text-4xl font-black text-red-500 mb-2">
                {offersProducts?.length || 0}
              </div>
              <p className="text-sm font-bold text-gray-700">
                Productos en Oferta
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="text-4xl font-black text-orange-500 mb-2">
                Hasta 50%
              </div>
              <p className="text-sm font-bold text-gray-700">
                De Descuento
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center justify-center gap-2 text-4xl font-black text-pink-500 mb-2">
                <Clock className="h-10 w-10" />
                24h
              </div>
              <p className="text-sm font-bold text-gray-700">
                Ofertas del Día
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Tag className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-1">
                  ¡Ofertas Flash Activas!
                </h3>
                <p className="text-white/90">
                  Descuentos exclusivos que no durarán mucho tiempo
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg whitespace-nowrap">
              ⏰ Termina en: 23:45:12
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {offersProducts && offersProducts.length > 0 ? (
          <>
            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {offersProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-200">
              <TrendingUp className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                ¿No encontraste lo que buscabas?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Explora nuestro catálogo completo con miles de productos en
                tecnología
              </p>
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl transition-all hover:scale-105"
              >
                Ver Todos los Productos
              </a>
            </div>
          </>
        ) : (
          // Empty State
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
              <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-50 to-pink-50">
                <Tag className="h-12 w-12 text-red-400" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-3">
                No hay Ofertas Activas
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                En este momento no tenemos ofertas especiales, pero pronto
                tendremos increíbles descuentos
              </p>

              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl transition-all hover:scale-105"
              >
                Ver Todos los Productos
              </a>
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100">
                <div className="text-4xl mb-3">🔔</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Alertas de Ofertas
                </h3>
                <p className="text-sm text-gray-600">
                  Suscríbete para recibir notificaciones de nuevas ofertas
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Ofertas Flash
                </h3>
                <p className="text-sm text-gray-600">
                  Descuentos sorpresa que duran solo 24 horas
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border border-orange-100">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Regalos Exclusivos
                </h3>
                <p className="text-sm text-gray-600">
                  Sorpresas especiales con tus compras en oferta
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Info Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-200 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">💯</div>
              <h3 className="font-bold text-gray-900 mb-2">
                Garantía de Precio
              </h3>
              <p className="text-sm text-gray-600">
                Si encuentras un precio mejor, te igualamos la oferta
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-bold text-gray-900 mb-2">
                Envío Gratis
              </h3>
              <p className="text-sm text-gray-600">
                En todas las ofertas sin mínimo de compra
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-900 mb-2">
                Compra Segura
              </h3>
              <p className="text-sm text-gray-600">
                Protección total en todas tus transacciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
