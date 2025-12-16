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
            className="w-full rounded-xl border border-dark-700 bg-dark-900/50 backdrop-blur-sm px-5 py-3 pl-12 text-sm text-dark-50 placeholder:text-dark-400 focus:border-accent-500 focus:bg-dark-900/80 focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all"
          />

          {/* Search Icon */}
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-dark-400 group-focus-within:text-accent-400 transition-colors" />

          {/* Loading Spinner */}
          {isSearching && (
            <div className="absolute right-12 top-3.5">
              <Loader2 className="h-5 w-5 text-accent-400 animate-spin" />
            </div>
          )}

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-3 p-1 hover:bg-dark-800 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-dark-400 hover:text-dark-300" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-dark-800 max-h-[480px] overflow-y-auto z-50 animate-fade-in">
          {isSearching ? (
            // Loading State
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 text-accent-400 animate-spin mx-auto mb-3" />
              <p className="text-sm text-dark-300">Buscando productos...</p>
            </div>
          ) : searchResults.length > 0 ? (
            // Results
            <>
              <div className="p-3 border-b border-dark-800">
                <p className="text-xs font-bold text-dark-400 uppercase tracking-wide">
                  {searchResults.length} resultado
                  {searchResults.length !== 1 ? 's' : ''} encontrado
                  {searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="py-2">
                {searchResults.slice(0, 8).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-dark-800/50 transition-colors text-left group"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 flex-shrink-0 bg-dark-800 rounded-lg overflow-hidden ring-1 ring-dark-700">
                      <Image
                        src={product.images[0] || '/placeholder-product.png'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded shadow-lg">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-dark-50 line-clamp-1 mb-1 group-hover:text-accent-400 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-accent-400 font-semibold mb-1">
                        {typeof product.brand === 'string'
                          ? product.brand
                          : product.brand.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {product.discount && product.discount > 0 ? (
                          <>
                            <span className="text-lg font-black bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                              $
                              {(
                                product.price *
                                (1 - product.discount / 100)
                              ).toFixed(2)}
                            </span>
                            <span className="text-xs text-dark-500 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-black text-dark-100">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <TrendingUp className="h-4 w-4 text-dark-500 group-hover:text-accent-400 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>

              {/* View All Results */}
              {searchResults.length > 8 && (
                <div className="p-3 border-t border-dark-800">
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowResults(false)}
                    className="block text-center text-sm font-bold text-accent-400 hover:text-accent-300 py-2 transition-colors"
                  >
                    Ver todos los {searchResults.length} resultados →
                  </Link>
                </div>
              )}
            </>
          ) : (
            // No Results
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 border border-dark-700 mb-3">
                <Search className="h-8 w-8 text-dark-400" />
              </div>
              <p className="text-sm font-bold text-dark-100 mb-1">
                No se encontraron resultados
              </p>
              <p className="text-xs text-dark-400">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
