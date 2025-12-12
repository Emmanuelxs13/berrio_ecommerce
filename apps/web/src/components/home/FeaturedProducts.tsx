'use client';

import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '@/lib/api';
import { ProductCard } from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Productos Destacados
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Los productos más populares seleccionados especialmente para ti
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
