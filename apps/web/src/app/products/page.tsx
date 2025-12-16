'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getProducts, getCategories, getBrands } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { Pagination } from '@/components/products/Pagination';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ProductFilters as ProductFiltersType } from '@/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Construir filtros desde URL params
  const filters: ProductFiltersType = {
    search: searchParams.get('search') || undefined,
    categoryId: searchParams.get('category') || undefined,
    brandId: searchParams.get('brand') || undefined,
    minPrice: searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined,
    maxPrice: searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined,
    inStock: searchParams.get('inStock') === 'true' || undefined,
    featured: searchParams.get('featured') === 'true' || undefined,
    sortBy:
      (searchParams.get('sortBy') as ProductFiltersType['sortBy']) || 'newest',
    page: Number(searchParams.get('page')) || 1,
    limit: 12,
  };

  // Queries
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container-custom py-8 bg-dark-950">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros Skeleton */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 p-6">
              <div className="h-6 bg-dark-800 rounded w-24 mb-4 animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={`filter-skeleton-${i}`}
                    className="h-4 bg-dark-800 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Productos Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }, (_, i) => (
                <ProductCardSkeleton key={`product-skeleton-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container-custom py-8 bg-dark-950">
        <Alert variant="error" title="Error al cargar productos">
          Hubo un problema al cargar los productos. Por favor intenta de nuevo.
        </Alert>
      </div>
    );
  }

  const products = productsData?.products || [];
  const total = productsData?.total || 0;
  const totalPages = productsData?.totalPages || 1;

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-accent-600 to-purple-600 text-white py-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative container-custom">
          <h1 className="text-4xl font-bold mb-4">
            {filters.search
              ? `Resultados para "${filters.search}"`
              : 'Nuestros Productos'}
          </h1>
          <p className="text-white/80 text-lg">{total} productos encontrados</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros - Desktop */}
          <div className="hidden lg:block">
            <ProductFilters
              categories={categories || []}
              brands={brands || []}
              currentFilters={filters}
            />
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
              {/* Botón filtros mobile */}
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowFilters(true)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm text-dark-300 hidden sm:inline">
                  {products.length} de {total} productos
                </span>
                <ProductSort currentSort={filters.sortBy} />
              </div>
            </div>

            {/* Grid de productos */}
            {products.length === 0 ? (
              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="h-8 w-8 text-dark-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-50 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-dark-300 mb-6">
                    Intenta ajustar los filtros o realiza una búsqueda diferente
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.href = '/products';
                      }
                    }}
                  >
                    Ver todos los productos
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={filters.page || 1}
                    totalPages={totalPages}
                    baseUrl="/products"
                    searchParams={searchParams}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de filtros mobile */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-dark-900 border-r border-dark-800 shadow-2xl animate-slideIn overflow-y-auto">
            <div className="sticky top-0 bg-dark-900 border-b border-dark-800 p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold text-dark-50">Filtros</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <X className="h-5 w-5 text-dark-400" />
              </button>
            </div>
            <div className="p-4">
              <ProductFilters
                categories={categories || []}
                brands={brands || []}
                currentFilters={filters}
                onFilterChange={() => setShowFilters(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
