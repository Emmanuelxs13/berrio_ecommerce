'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/api';
import { ProductCard } from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import type { Product } from '@/types';

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-dark-950">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-50">
              Productos Destacados
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={`featured-skeleton-${i}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-dark-950">
      <div className="container-custom">
        {/* Header minimalista */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark-50 mb-2">
              Productos Destacados
            </h2>
            <p className="text-dark-400">
              Los productos más populares de la temporada
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-400 hover:text-dark-50 border border-dark-700 hover:border-dark-600 rounded-lg transition-all"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA mobile */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-all"
          >
            Ver todos los productos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
