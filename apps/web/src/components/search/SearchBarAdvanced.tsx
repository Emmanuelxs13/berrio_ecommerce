'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  X,
  Loader2,
  TrendingUp,
  Mic,
  Clock,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { getPopularBrands } from '@/data/brands';
import { getMainCategories } from '@/data/categories';

interface SearchBarAdvancedProps {
  className?: string;
}

/**
 * SearchBar avanzado con:
 * - Búsqueda por voz
 * - Historial de búsquedas
 * - Sugerencias de categorías y marcas
 * - Filtros rápidos
 */
export function SearchBarAdvanced({ className = '' }: SearchBarAdvancedProps) {
  const [isMounted, setIsMounted] = useState(false);

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

  const { history, addToHistory, removeFromHistory, clearHistory } =
    useSearchHistory();
  const {
    isListening,
    transcript,
    startListening,
    hasRecognitionSupport,
    error: voiceError,
  } = useSpeechRecognition();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const searchRef = useRef<HTMLDivElement>(null);
  const popularBrands = getPopularBrands(6);
  const mainCategories = getMainCategories().slice(0, 6);

  // Asegurar que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Actualizar búsqueda cuando se recibe transcript de voz
  useEffect(() => {
    if (transcript) {
      handleSearchChange(transcript);
    }
  }, [transcript, handleSearchChange]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  const handleVoiceSearch = () => {
    if (isListening) return;
    startListening();
  };

  const handleSearchWithFilters = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToHistory({
        query: searchQuery,
        categoryId: selectedCategory || undefined,
        brandId: selectedBrand || undefined,
      });
      handleSearchSubmit(e);
    }
  };

  // No renderizar nada hasta que esté montado en el cliente
  if (!isMounted) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full h-11 pl-11 pr-4 rounded-lg bg-elegant-navy/50 border border-elegant-wine/20 text-dark-50 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-900/50 focus:border-accent-900/50 transition-all"
            disabled
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
        </div>
      </div>
    );
  }

  const handleHistoryClick = (item: {
    query: string;
    categoryId?: string;
    brandId?: string;
  }) => {
    handleSearchChange(item.query);
    if (item.categoryId) setSelectedCategory(item.categoryId);
    if (item.brandId) setSelectedBrand(item.brandId);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchWithFilters} className="w-full">
        <div className="relative group">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setShowResults(true)}
            placeholder="Buscar productos, categorías o marcas..."
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-3 pl-12 pr-28 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
          />

          {/* Search Icon */}
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />

          {/* Right Icons */}
          <div className="absolute right-3 top-2.5 flex items-center gap-1">
            {/* Voice Search Button */}
            {hasRecognitionSupport && (
              <button
                type="button"
                onClick={handleVoiceSearch}
                disabled={isListening}
                className={`p-1.5 rounded-full transition-colors ${
                  isListening
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : 'hover:bg-gray-200 text-gray-500'
                }`}
                title="Buscar por voz"
              >
                <Mic className="h-4 w-4" />
              </button>
            )}

            {/* Filters Button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 rounded-full transition-colors ${
                showFilters || selectedCategory || selectedBrand
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-200 text-gray-500'
              }`}
              title="Filtros"
            >
              <Filter className="h-4 w-4" />
            </button>

            {/* Loading Spinner */}
            {isSearching && (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            )}

            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  handleClearSearch();
                  setSelectedCategory('');
                  setSelectedBrand('');
                }}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                title="Limpiar"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Filtros Rápidos */}
        {showFilters && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              {/* Categoría */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  {mainCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marca */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Marca
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  {popularBrands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Limpiar filtros */}
            {(selectedCategory || selectedBrand) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedBrand('');
                }}
                className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </form>

      {/* Voice Error */}
      {voiceError && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {voiceError}
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[520px] overflow-y-auto z-50 animate-fade-in">
          {/* Historial de búsquedas */}
          {!searchQuery && history.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Búsquedas recientes
                  </span>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Limpiar
                </button>
              </div>
              <div className="space-y-1">
                {history.slice(0, 5).map((item, index) => (
                  <div
                    key={`history-${item.query}-${item.timestamp || index}`}
                    className="flex items-center justify-between group"
                  >
                    <button
                      type="button"
                      onClick={() => handleHistoryClick(item)}
                      className="flex-1 text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700"
                    >
                      <span>{item.query}</span>
                      {(item.categoryId || item.brandId) && (
                        <span className="ml-2 text-xs text-gray-400">
                          • con filtros
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => removeFromHistory(index)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sugerencias rápidas */}
          {!searchQuery && (
            <>
              {/* Categorías populares */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Categorías populares
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {mainCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-blue-600">
                        {cat.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Marcas populares */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Marcas populares
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {popularBrands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.slug}`}
                      className="px-3 py-2 text-center hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700 hover:text-blue-600"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Resultados de búsqueda */}
          {searchQuery.length >= 2 && (
            <>
              {isSearching ? (
                <div className="p-8 text-center">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Buscando productos...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {searchResults.length} resultado
                      {searchResults.length !== 1 ? 's' : ''} encontrado
                      {searchResults.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="py-2">
                    {searchResults.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => handleResultClick(product.id)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={product.images[0] || '/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {product.brand?.name}
                          </p>
                          <p className="text-sm font-bold text-blue-600 mt-1">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setShowResults(false)}
                      className="block w-full text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Ver todos los resultados →
                    </Link>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    No encontramos resultados
                  </p>
                  <p className="text-xs text-gray-500">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
