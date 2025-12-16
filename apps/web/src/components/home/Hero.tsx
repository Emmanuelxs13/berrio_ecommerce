'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Star,
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-dark-950 overflow-hidden">
      {/* Fondo minimalista con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-dark-950" />

      {/* Patrón de puntos sutil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative container-custom py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge minimalista */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-600/10 border border-accent-600/20">
              <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
              <span className="text-sm font-medium text-accent-400">
                Productos Premium 2025
              </span>
            </div>

            {/* Heading - Limpio y directo */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 leading-tight">
                Tecnología de última generación
              </h1>
              <p className="text-lg md:text-xl text-dark-400 leading-relaxed max-w-xl">
                Descubre los mejores productos tecnológicos con garantía y envío
                gratis en compras superiores a{' '}
                <span className="text-dark-300 font-semibold">$ 100.000</span>
              </p>
            </div>

            {/* CTAs - Minimalistas */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-all"
              >
                Ver Productos
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-dark-700 hover:border-dark-600 text-dark-300 hover:text-dark-50 font-medium rounded-lg transition-all"
              >
                Ver Ofertas
              </Link>
            </div>

            {/* Trust Indicators - Minimalistas */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-dark-800/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent-400" />
                  <div className="text-xl font-bold text-dark-50">100%</div>
                </div>
                <div className="text-xs text-dark-500">Garantía Original</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent-400" />
                  <div className="text-xl font-bold text-dark-50">24h</div>
                </div>
                <div className="text-xs text-dark-500">Envío Express</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent-400" />
                  <div className="text-xl font-bold text-dark-50">5000+</div>
                </div>
                <div className="text-xs text-dark-500">Clientes Felices</div>
              </div>
            </div>
          </div>

          {/* Product Showcase - Minimalista */}
          <div className="relative">
            {/* Card principal del producto destacado */}
            <div className="relative bg-dark-900/50 backdrop-blur-sm border border-dark-800/50 rounded-2xl p-8 shadow-2xl">
              {/* Badge de oferta */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                -20% OFF
              </div>

              {/* Imagen del producto (placeholder) */}
              <div className="aspect-square mb-6 bg-dark-800/50 rounded-xl flex items-center justify-center">
                <Sparkles className="h-24 w-24 text-dark-600" />
              </div>

              {/* Info del producto */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-dark-50 mb-1">
                    iPhone 15 Pro Max
                  </h3>
                  <p className="text-sm text-dark-400">
                    256GB - Titanio Natural
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-dark-400">(128 reseñas)</span>
                </div>

                {/* Precio */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-dark-50">
                    $ 4.399.000
                  </span>
                  <span className="text-lg text-dark-500 line-through">
                    $ 5.499.000
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href="/products/iphone-15-pro-max"
                  className="block w-full py-3 bg-accent-600 hover:bg-accent-700 text-white text-center font-medium rounded-lg transition-all"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>

            {/* Elemento decorativo - Minimalista */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-600/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
