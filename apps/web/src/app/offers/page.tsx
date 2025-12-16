'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { Loading } from '@/components/ui/Loading';
import { CountdownTimer } from '@/components/offers/CountdownTimer';
import { FlashDealCard } from '@/components/offers/FlashDealCard';
import { CouponCard } from '@/components/offers/CouponCard';
import {
  Tag,
  TrendingUp,
  Zap,
  Sparkles,
  Filter,
  X,
  Gift,
  Flame,
} from 'lucide-react';
import {
  mockFlashDeals,
  mockCoupons,
  offerCategories,
  offerBrands,
  discountRanges,
} from '@/data/offers';

export default function OffersPage() {
  // Estados para filtros
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Fecha de expiración para ofertas del día (medianoche)
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Fetch products with discounts
  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['offers-products', selectedCategory, selectedBrand],
    queryFn: () =>
      getProducts({
        page: 1,
        limit: 50,
        featured: true,
      }),
  });

  // Filter products with discount > 0 and apply filters
  const offersProducts = productsResponse?.products.filter((product) => {
    if (!product.discount || product.discount <= 0) return false;

    // Filtro por categoría (mock - en producción usar product.category)
    if (selectedCategory !== 'all') {
      // Aquí iría la lógica real con product.category.slug === selectedCategory
    }

    // Filtro por marca (mock - en producción usar product.brand)
    if (selectedBrand !== 'all') {
      // Aquí iría la lógica real con product.brand.slug === selectedBrand
    }

    // Filtro por rango de descuento
    if (selectedDiscount !== 'all') {
      const range = discountRanges.find((r) => r.id === selectedDiscount);
      if (
        range &&
        (product.discount < range.min || product.discount > range.max)
      ) {
        return false;
      }
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-dark-950 min-h-screen">
      <div className="container-custom py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg shadow-red-500/20 border border-red-500/30">
            <Zap className="h-5 w-5" />
            OFERTAS ESPECIALES
            <Sparkles className="h-5 w-5" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-dark-50 mb-4">
            🔥 Ofertas Irresistibles
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-8">
            Aprovecha los mejores descuentos. ¡Ofertas por tiempo limitado!
          </p>

          {/* Temporizador principal */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-lg font-semibold text-dark-200">
              ⏰ Las ofertas del día terminan en:
            </p>
            <CountdownTimer targetDate={endOfDay} size="md" />
          </div>
        </div>

        {/* Sección de Ofertas Flash */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="h-8 w-8 text-red-500" />
              <h2 className="text-3xl font-black text-dark-50">
                Ofertas Flash
              </h2>
            </div>
            <span className="text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
              ¡Stock Limitado!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockFlashDeals.map((deal) => (
              <FlashDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>

        {/* Sección de Cupones */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-black text-dark-50">
              Cupones de Descuento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockCoupons.map((coupon) => (
              <CouponCard
                key={coupon.code}
                code={coupon.code}
                discount={coupon.discount}
                type={coupon.type}
                minPurchase={coupon.minPurchase}
                expiresAt={coupon.expiresAt}
                description={coupon.description}
              />
            ))}
          </div>
        </section>

        {/* Filtros */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-900/50 border-2 border-dark-700 text-dark-200 rounded-xl font-semibold hover:border-accent-500 hover:text-accent-400 transition-all"
          >
            <Filter className="h-5 w-5" />
            Filtros
            {(selectedCategory !== 'all' ||
              selectedBrand !== 'all' ||
              selectedDiscount !== 'all') && (
              <span className="bg-accent-600 text-white text-xs px-2 py-1 rounded-full">
                Activos
              </span>
            )}
          </button>

          {showFilters && (
            <div className="mt-4 bg-dark-900/50 backdrop-blur-sm rounded-2xl shadow-lg border border-dark-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filtro por categoría */}
                <div>
                  <label className="block text-sm font-bold text-dark-200 mb-3">
                    Categoría
                  </label>
                  <div className="space-y-2">
                    {offerCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-gradient-to-r from-accent-600 to-purple-600 text-white shadow-lg'
                            : 'bg-dark-800/50 text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por marca */}
                <div>
                  <label className="block text-sm font-bold text-dark-200 mb-3">
                    Marca
                  </label>
                  <div className="space-y-2">
                    {offerBrands.slice(0, 6).map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedBrand === brand.id
                            ? 'bg-gradient-to-r from-accent-600 to-purple-600 text-white shadow-lg'
                            : 'bg-dark-800/50 text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por descuento */}
                <div>
                  <label className="block text-sm font-bold text-dark-200 mb-3">
                    Descuento
                  </label>
                  <div className="space-y-2">
                    {discountRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setSelectedDiscount(range.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedDiscount === range.id
                            ? 'bg-gradient-to-r from-accent-600 to-purple-600 text-white shadow-lg'
                            : 'bg-dark-800/50 text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              {(selectedCategory !== 'all' ||
                selectedBrand !== 'all' ||
                selectedDiscount !== 'all') && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedBrand('all');
                      setSelectedDiscount('all');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sección de Productos en Oferta */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-dark-50">
              Todas las Ofertas
            </h2>
            <span className="text-sm font-semibold text-dark-400 bg-dark-800/50 px-4 py-2 rounded-full">
              {offersProducts?.length || 0} productos
            </span>
          </div>

          {/* Products Grid */}
          {offersProducts && offersProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {offersProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-900/50 backdrop-blur-sm rounded-2xl shadow-lg border border-dark-800">
              <Tag className="h-16 w-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark-50 mb-2">
                No hay productos con estos filtros
              </h3>
              <p className="text-dark-300 mb-6">
                Intenta ajustar los filtros para ver más opciones
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSelectedDiscount('all');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-accent-500/20 transition-all"
              >
                Ver Todas las Ofertas
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 bg-dark-900/50 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-dark-800">
          <TrendingUp className="h-16 w-16 text-accent-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-dark-50 mb-3">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-dark-300 mb-6 max-w-2xl mx-auto">
            Explora nuestro catálogo completo con miles de productos
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent-500/20 hover:shadow-xl hover:shadow-accent-500/30 transition-all hover:scale-105"
          >
            Ver Todos los Productos
          </a>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 bg-gradient-to-r from-dark-900/50 to-dark-900/30 border border-dark-800 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">💯</div>
              <h3 className="font-bold text-dark-50 mb-2">
                Garantía de Precio
              </h3>
              <p className="text-sm text-dark-400">
                Si encuentras un precio mejor, te igualamos la oferta
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-bold text-dark-50 mb-2">Envío Gratis</h3>
              <p className="text-sm text-dark-400">
                En todas las ofertas sin mínimo de compra
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-dark-50 mb-2">Compra Segura</h3>
              <p className="text-sm text-dark-400">
                Protección total en todas tus transacciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
