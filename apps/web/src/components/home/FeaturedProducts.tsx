'use client';

import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '@/lib/api';
import { ProductCard } from '../products/ProductCard';

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4" />
                <div className="bg-gray-300 h-4 rounded w-3/4 mb-2" />
                <div className="bg-gray-300 h-4 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
          <p className="text-gray-600">
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
