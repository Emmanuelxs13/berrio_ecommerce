'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Loader2, TrendingUp } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const {
    searchQuery,
    isSearching,
    searchResults,
    showResults,
    handleSearchChange,
    handleClearSearch,
    handleResultClick,
    handleSearchSubmit,
    setShowResults,
  } = useSearch();

  const searchRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="relative group">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
            placeholder="Buscar iPhone, MacBook, Samsung..."
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
          />
          
          {/* Search Icon */}
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />

          {/* Loading Spinner */}
          {isSearching && (
            <div className="absolute right-12 top-3.5">
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            </div>
          )}

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[480px] overflow-y-auto z-50 animate-fade-in">
          {isSearching ? (
            // Loading State
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-600">Buscando productos...</p>
            </div>
          ) : searchResults.length > 0 ? (
            // Results
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="py-2">
                {searchResults.slice(0, 8).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={product.images[0] || '/placeholder-product.png'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-blue-600 font-semibold mb-1">
                        {typeof product.brand === 'string' ? product.brand : product.brand.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {product.discount && product.discount > 0 ? (
                          <>
                            <span className="text-lg font-black text-gray-900">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-black text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <TrendingUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* View All Results */}
              {searchResults.length > 8 && (
                <div className="p-3 border-t border-gray-100">
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowResults(false)}
                    className="block text-center text-sm font-bold text-blue-600 hover:text-blue-700 py-2"
                  >
                    Ver todos los {searchResults.length} resultados →
                  </Link>
                </div>
              )}
            </>
          ) : (
            // No Results
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                No se encontraron resultados
              </p>
              <p className="text-xs text-gray-600">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
