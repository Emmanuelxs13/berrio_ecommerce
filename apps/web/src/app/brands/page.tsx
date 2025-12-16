'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Grid3x3, List } from 'lucide-react';
import { getAllBrands, getBrandsByLetter } from '@/data/brands';

type ViewMode = 'grid' | 'list' | 'alphabet';

/**
 * Página de listado de todas las marcas
 * Muestra marcas en grid, lista o agrupadas alfabéticamente
 */
export default function BrandsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const allBrands = getAllBrands();
  const brandsByLetter = getBrandsByLetter();

  // Filtrar marcas por búsqueda
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return allBrands;

    const query = searchQuery.toLowerCase();
    return allBrands.filter((brand) =>
      brand.name.toLowerCase().includes(query)
    );
  }, [allBrands, searchQuery]);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-accent-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Nuestras Marcas</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Explora productos de las mejores marcas del mercado. Calidad
            garantizada en cada compra.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="bg-white/20 border border-white/30 px-3 py-1 rounded-full">
              {allBrands.length} marcas disponibles
            </span>
            <span className="bg-white/20 border border-white/30 px-3 py-1 rounded-full">
              {allBrands.reduce(
                (acc, brand) => acc + (brand._count?.products || 0),
                0
              )}{' '}
              productos totales
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        {/* Barra de herramientas */}
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-dark-800 p-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Buscador */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Buscar marca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-dark-700 bg-dark-900/50 text-dark-50 placeholder:text-dark-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500"
              />
            </div>

            {/* Selector de vista */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-dark-300 mr-2">Vista:</span>
              <div className="flex items-center gap-1 border border-dark-700 rounded-lg p-1 bg-dark-900/30">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-accent-600 to-purple-600 text-white'
                      : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                  }`}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-accent-600 to-purple-600 text-white'
                      : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                  }`}
                  aria-label="Vista de lista"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('alphabet')}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    viewMode === 'alphabet'
                      ? 'bg-gradient-to-r from-accent-600 to-purple-600 text-white'
                      : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                  }`}
                >
                  A-Z
                </button>
              </div>
            </div>
          </div>

          {/* Contador de resultados */}
          {searchQuery && (
            <div className="mt-4 text-sm text-dark-300">
              {filteredBrands.length === 0 ? (
                <span>
                  No se encontraron marcas que coincidan con &quot;{searchQuery}
                  &quot;
                </span>
              ) : (
                <span>
                  Mostrando {filteredBrands.length} de {allBrands.length} marcas
                </span>
              )}
            </div>
          )}
        </div>

        {/* Vista Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-dark-800 p-6 hover:border-accent-500/50 hover:shadow-lg hover:shadow-accent-500/10 transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-600/20 to-purple-600/20 border border-accent-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent-400">
                      {brand.name[0]}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-dark-100 text-center mb-1 group-hover:text-accent-400 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-dark-500 text-center">
                  {brand._count?.products || 0} productos
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Vista Lista */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-dark-800 p-6 hover:border-accent-500/50 hover:shadow-lg hover:shadow-accent-500/10 transition-all flex items-center gap-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-accent-400">
                    {brand.name[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-dark-100 mb-1 group-hover:text-accent-400 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-dark-400 mb-2">
                    {brand.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-accent-400 font-medium">
                      {brand._count?.products || 0} productos
                    </span>
                  </div>
                </div>
                <svg
                  className="w-6 h-6 text-dark-600 group-hover:text-accent-400 group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        )}

        {/* Vista Alfabética */}
        {viewMode === 'alphabet' && !searchQuery && (
          <div className="space-y-8">
            {Object.keys(brandsByLetter)
              .sort((a, b) => a.localeCompare(b))
              .map((letter) => (
                <div
                  key={letter}
                  className="bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-dark-800 p-6"
                >
                  <h2 className="text-2xl font-bold text-accent-400 mb-6 pb-3 border-b border-dark-800">
                    {letter}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {brandsByLetter[letter].map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/brands/${brand.slug}`}
                        className="group flex items-center gap-4 p-4 rounded-lg hover:bg-dark-800/50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-accent-400">
                            {brand.name[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-dark-100 group-hover:text-accent-400 transition-colors truncate">
                            {brand.name}
                          </h3>
                          <p className="text-sm text-dark-500">
                            {brand._count?.products || 0} productos
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Empty state */}
        {filteredBrands.length === 0 && (
          <div className="bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-sm border border-dark-800 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-dark-800 border border-dark-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-dark-500" />
              </div>
              <h3 className="text-lg font-semibold text-dark-50 mb-2">
                No se encontraron marcas
              </h3>
              <p className="text-dark-400 mb-6">
                Intenta con otros términos de búsqueda o explora todas nuestras
                marcas.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-gradient-to-r from-accent-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-accent-500/20 transition-all"
              >
                Ver todas las marcas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
