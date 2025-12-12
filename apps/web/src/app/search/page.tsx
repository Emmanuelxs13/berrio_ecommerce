'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { searchProducts } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'newest'>('relevance');
  const [priceRange, setPriceRange] = useState<'all' | '0-50' | '50-100' | '100-200' | '200+'>('all');

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', query, sortBy, priceRange],
    queryFn: async () => {
      if (!query) return [];
      const results = await searchProducts(query);
      
      // Apply sorting
      let sorted = [...results];
      switch (sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default:
          // relevance - keep original order
          break;
      }

      // Apply price filter
      if (priceRange !== 'all') {
        sorted = sorted.filter(product => {
          const price = product.price;
          switch (priceRange) {
            case '0-50':
              return price <= 50000;
            case '50-100':
              return price > 50000 && price <= 100000;
            case '100-200':
              return price > 100000 && price <= 200000;
            case '200+':
              return price > 200000;
            default:
              return true;
          }
        });
      }

      return sorted;
    },
    enabled: !!query,
  });

  const clearFilters = () => {
    setSortBy('relevance');
    setPriceRange('all');
  };

  const hasActiveFilters = sortBy !== 'relevance' || priceRange !== 'all';

  if (!query) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Busca productos
          </h1>
          <p className="text-gray-600 mb-6">
            Usa la barra de búsqueda para encontrar los productos que necesitas
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const resultsCount = searchResults?.length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resultados de búsqueda
        </h1>
        <p className="text-gray-600">
          {resultsCount > 0 ? (
            <>
              Mostrando <span className="font-semibold">{resultsCount}</span> {resultsCount === 1 ? 'resultado' : 'resultados'} para &quot;<span className="font-semibold text-gray-900">{query}</span>&quot;
            </>
          ) : (
            <>
              No se encontraron resultados para &quot;<span className="font-semibold text-gray-900">{query}</span>&quot;
            </>
          )}
        </p>
      </div>

      {resultsCount > 0 && (
        <>
          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Ordenar:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="relevance">Más relevantes</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="newest">Más recientes</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Precio:
                </label>
                <select
                  id="price"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as typeof priceRange)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos</option>
                  <option value="0-50">Hasta $50.000</option>
                  <option value="50-100">$50.000 - $100.000</option>
                  <option value="100-200">$100.000 - $200.000</option>
                  <option value="200+">Más de $200.000</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {resultsCount === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No encontramos resultados
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Intenta con otros términos de búsqueda o explora nuestras categorías
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Ver todos los productos
            </Link>
            <Link
              href="/offers"
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Ver ofertas
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
