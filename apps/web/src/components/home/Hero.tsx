'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Fondo con gradiente y mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />

      {/* Efectos de luz animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="relative container-custom z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-500/10 to-purple-500/10 border border-accent-500/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent-400" />
              <span className="text-sm font-medium text-dark-200">
                Tecnología de última generación
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-dark-50">El futuro de la </span>
                <br />
                <span className="text-gradient animate-gradient-x">
                  Tecnología
                </span>
                <br />
                <span className="text-dark-50">a tu alcance</span>
              </h1>

              <p className="text-lg md:text-xl text-dark-400 max-w-2xl leading-relaxed">
                Descubre smartphones, laptops y accesorios premium de las marcas
                más reconocidas.
                <span className="text-dark-300 font-semibold">
                  {' '}
                  Calidad garantizada
                </span>{' '}
                y los mejores precios del mercado.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-accent-500/50 transition-all duration-300 hover:scale-105"
              >
                Explorar Productos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-800/50 backdrop-blur-sm border-2 border-dark-700 hover:border-accent-500/50 text-dark-100 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-dark-800"
              >
                Ver Ofertas
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary">
                  500+
                </div>
                <div className="text-sm text-dark-400">Productos</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary">
                  50K+
                </div>
                <div className="text-sm text-dark-400">Clientes Felices</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary">
                  4.9★
                </div>
                <div className="text-sm text-dark-400">Calificación</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div
            className="grid gap-4 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Envío Express"
              description="Recibe tus productos en 24-48 horas"
              gradient="from-accent-500 to-accent-700"
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Compra 100% Segura"
              description="Garantía y protección en todas tus compras"
              gradient="from-emerald-500 to-emerald-700"
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Mejores Precios"
              description="Ofertas exclusivas y descuentos especiales"
              gradient="from-purple-500 to-purple-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-dark-800 bg-gradient-to-b from-dark-900/90 to-dark-900/50 backdrop-blur-xl p-6 transition-all duration-300 hover:border-dark-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/10">
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-dark-50 mb-1 group-hover:text-gradient-primary transition-colors">
            {title}
          </h3>
          <p className="text-dark-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
