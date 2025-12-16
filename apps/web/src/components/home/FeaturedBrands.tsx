'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getPopularBrands } from '@/data/brands';

/**
 * Sección de marcas populares para la página Home
 * Muestra las marcas más populares con su logo y contador de productos
 */
export function FeaturedBrands() {
  // Obtener las 8 marcas más populares
  const brands = getPopularBrands(8);

  return (
    <section className="py-16 bg-dark-950">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-dark-50 via-accent-400 to-purple-400 bg-clip-text text-transparent">
            Marcas Destacadas
          </h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">
            Descubre productos de las marcas más reconocidas del mercado
          </p>
        </div>

        {/* Grid de Marcas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => {
            return (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group"
              >
                <Card
                  hover
                  className="flex flex-col items-center justify-center p-6 h-32 transition-all hover:border-accent-500/50"
                >
                  {/* Logo simulado con inicial */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500/20 to-purple-500/20 border border-accent-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-accent-400">
                      {brand.name.charAt(0)}
                    </span>
                  </div>

                  {/* Nombre */}
                  <h3 className="font-semibold text-xs text-center text-dark-300 group-hover:text-accent-400 transition-colors line-clamp-1">
                    {brand.name}
                  </h3>

                  {/* Badge con contador (solo desktop) */}
                  <Badge
                    variant="default"
                    className="hidden sm:inline-flex mt-1 text-xs"
                  >
                    {brand._count.products}
                  </Badge>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Link a todas las marcas */}
        <div className="text-center mt-12">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 px-6 py-3 border border-dark-700 bg-dark-900/50 backdrop-blur-sm text-dark-200 font-semibold rounded-xl hover:border-accent-500 hover:text-accent-400 transition-all hover:scale-105"
          >
            Ver Todas las Marcas
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
