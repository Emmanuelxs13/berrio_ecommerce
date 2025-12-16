'use client';

import { useQuery } from '@tanstack/react-query';
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
      <section className="section bg-dark-950">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            Productos Destacados
          </h2>
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
    <section className="section bg-dark-950">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Productos Destacados
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Los productos más populares seleccionados especialmente para ti
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
