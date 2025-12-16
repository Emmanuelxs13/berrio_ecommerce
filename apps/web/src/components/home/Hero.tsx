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
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Fondo elegante con gradiente oscuro animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-elegant-deep to-elegant-navy" />

      {/* Efectos de brillo dinámicos */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-900/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-elegant-wine/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid pattern tech */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4C0027 1px, transparent 1px),
              linear-gradient(to bottom, #4C0027 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative container-custom py-16 lg:py-24 w-full">
        <div className="max-w-5xl mx-auto">
          {/* Content centralizado */}
          <div className="text-center space-y-10">
            {/* Badge elegante con animación */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent-900/40 to-elegant-wine/40 border border-accent-900/60 backdrop-blur-xl shadow-2xl shadow-accent-900/30 animate-fade-in">
              <Star className="h-5 w-5 text-gold-400 fill-gold-400 animate-pulse" />
              <span className="text-base font-bold text-accent-300 tracking-wide">
                TECNOLOGÍA PREMIUM 2025
              </span>
              <Star
                className="h-5 w-5 text-gold-400 fill-gold-400 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </div>

            {/* Heading - Impactante */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-white via-accent-300 to-white bg-clip-text text-transparent animate-gradient-x">
                  El Futuro
                </span>
                <span
                  className="block mt-2 bg-gradient-to-r from-accent-400 via-elegant-wine to-accent-400 bg-clip-text text-transparent animate-gradient-x"
                  style={{ animationDelay: '0.5s' }}
                >
                  Es Ahora
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-200 leading-relaxed max-w-3xl mx-auto font-light">
                Descubre la nueva generación de{' '}
                <span className="text-accent-400 font-semibold">
                  smartphones
                </span>
                ,
                <span className="text-success-400 font-semibold"> laptops</span>{' '}
                y
                <span className="text-gold-400 font-semibold"> accesorios</span>{' '}
                que transformarán tu mundo digital
              </p>
            </div>

            {/* CTAs destacados */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
              <Link
                href="/products"
                className="group relative px-10 py-5 bg-gradient-to-r from-accent-900 to-elegant-wine rounded-xl font-bold text-lg text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent-900/60 shadow-xl shadow-accent-900/40"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explorar Productos
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-800 to-elegant-wine/90 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/offers"
                className="group px-10 py-5 border-2 border-accent-900/60 hover:border-accent-900 bg-accent-900/10 hover:bg-accent-900/20 backdrop-blur-xl text-accent-300 hover:text-accent-200 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <span className="flex items-center gap-3">
                  Ver Ofertas
                  <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Stats impactantes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-success-600/20 to-success-600/5 border border-success-600/30 backdrop-blur-sm hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-success-600/20">
                <div className="absolute inset-0 bg-gradient-to-br from-success-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-3">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-xl bg-success-600/30 group-hover:bg-success-600/40 transition-colors">
                      <Shield className="h-8 w-8 text-success-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white">100%</div>
                  <div className="text-sm text-success-300 font-semibold uppercase tracking-wider">
                    Garantía Oficial
                  </div>
                  <p className="text-xs text-dark-400">
                    Respaldo total del fabricante
                  </p>
                </div>
              </div>

              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-accent-900/20 to-accent-900/5 border border-accent-900/30 backdrop-blur-sm hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-accent-900/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-3">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-xl bg-accent-900/30 group-hover:bg-accent-900/40 transition-colors">
                      <Zap className="h-8 w-8 text-accent-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white">24h</div>
                  <div className="text-sm text-accent-300 font-semibold uppercase tracking-wider">
                    Envío Express
                  </div>
                  <p className="text-xs text-dark-400">
                    Recibe tu pedido al día siguiente
                  </p>
                </div>
              </div>

              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gold-600/20 to-gold-600/5 border border-gold-600/30 backdrop-blur-sm hover:scale-105 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-gold-600/20">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-3">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-xl bg-gold-600/30 group-hover:bg-gold-600/40 transition-colors">
                      <TrendingUp className="h-8 w-8 text-gold-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white">+5K</div>
                  <div className="text-sm text-gold-300 font-semibold uppercase tracking-wider">
                    Clientes Satisfechos
                  </div>
                  <p className="text-xs text-dark-400">
                    Confianza que nos respalda
                  </p>
                </div>
              </div>
            </div>

            {/* Info adicional */}
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-dark-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
                <span>
                  Envío gratis desde{' '}
                  <span className="text-success-400 font-bold">$ 100.000</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-accent-400 animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
                <span>
                  Hasta{' '}
                  <span className="text-accent-400 font-bold">12 cuotas</span>{' '}
                  sin interés
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
                <span>
                  Devolución{' '}
                  <span className="text-gold-400 font-bold">gratuita</span> 30
                  días
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
