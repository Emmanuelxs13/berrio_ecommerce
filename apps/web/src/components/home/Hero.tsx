'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative container-custom py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Nuevos productos cada semana</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
              Los Mejores
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-200">
                Dispositivos
              </span>
              <br />
              Electrónicos
            </h1>

            <p className="text-lg md:text-xl text-blue-50 max-w-xl leading-relaxed">
              Encuentra smartphones, laptops, tablets y accesorios de las marcas
              más reconocidas. Calidad garantizada y los mejores precios del
              mercado.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl md:text-4xl font-bold">500+</div>
                <div className="text-blue-100 text-sm">Productos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">50K+</div>
                <div className="text-blue-100 text-sm">Clientes</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">4.9★</div>
                <div className="text-blue-100 text-sm">Calificación</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Explorar Productos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Ver Ofertas Especiales
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div
            className="grid grid-cols-1 gap-4 lg:gap-6 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <FeatureCard
              icon={<Zap className="h-7 w-7" />}
              title="Envío Express"
              description="Recibe tus productos en 24-48 horas en todo el país"
              gradient="from-yellow-400 to-orange-500"
            />
            <FeatureCard
              icon={<Shield className="h-7 w-7" />}
              title="Compra 100% Segura"
              description="Garantía y protección en todas tus compras"
              gradient="from-green-400 to-emerald-500"
            />
            <FeatureCard
              icon={<Truck className="h-7 w-7" />}
              title="Envío Gratis"
              description="En compras superiores a $999 MXN"
              gradient="from-blue-400 to-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
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
    <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
