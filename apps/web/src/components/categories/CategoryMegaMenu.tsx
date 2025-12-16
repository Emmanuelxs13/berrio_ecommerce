'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CategoryTree } from '@/types/category';
import { getMainCategories } from '@/data/categories';

/**
 * Mega menú de categorías con subcategorías
 * Se muestra en el Header al hacer hover sobre "Categorías"
 */
export default function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const mainCategories = getMainCategories();

  const handleMouseEnter = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const getActiveCategoryData = (): CategoryTree | undefined => {
    return mainCategories.find((cat) => cat.id === activeCategory);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCategory(null);
      }}
    >
      {/* Botón de Categorías */}
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-300 hover:text-accent-400 rounded-lg hover:bg-dark-800/50 transition-colors">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span>Categorías</span>
      </button>

      {/* Espacio invisible para evitar que se cierre el menú */}
      {isOpen && <div className="absolute top-full left-0 h-2 w-full" />}

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 w-screen max-w-6xl z-50 animate-fade-in">
          <div className="bg-dark-900 border border-dark-800 rounded-lg shadow-2xl">
            <div className="flex">
              {/* Panel izquierdo: Categorías principales */}
              <div className="w-64 bg-dark-900/50 border-r border-dark-800 rounded-l-lg">
                .
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">
                    Todas las categorías
                  </h3>
                  <nav className="space-y-1">
                    {mainCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          activeCategory === category.id
                            ? 'bg-accent-600/20 border border-accent-500/30 text-accent-400 font-medium'
                            : 'text-dark-300 hover:bg-dark-800 hover:text-dark-50'
                        }`}
                        onMouseEnter={() => handleMouseEnter(category.id)}
                      >
                        <span>{category.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-dark-500">
                            {category.productCount}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Panel derecho: Subcategorías */}
              <div className="flex-1 p-6 bg-dark-900/80 backdrop-blur-sm rounded-r-lg">
                {' '}
                {activeCategory ? (
                  <div>
                    {(() => {
                      const activeCat = getActiveCategoryData();
                      if (!activeCat) return null;

                      return (
                        <>
                          {/* Encabezado de la categoría activa */}
                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-dark-50 mb-1">
                              {activeCat.name}
                            </h3>
                            {activeCat.description && (
                              <p className="text-sm text-dark-400">
                                {activeCat.description}
                              </p>
                            )}
                          </div>

                          {/* Grid de subcategorías */}
                          {activeCat.children &&
                          activeCat.children.length > 0 ? (
                            <div className="grid grid-cols-3 gap-6">
                              {activeCat.children.map((subcategory) => (
                                <div key={subcategory.id}>
                                  <Link
                                    href={`/categories/${subcategory.slug}`}
                                    className="block mb-3 font-semibold text-dark-100 hover:text-accent-400 transition-colors"
                                  >
                                    {subcategory.name}
                                    <span className="ml-2 text-xs text-dark-500 font-normal">
                                      ({subcategory.productCount})
                                    </span>
                                  </Link>

                                  {/* Sub-subcategorías */}
                                  {subcategory.children &&
                                    subcategory.children.length > 0 && (
                                      <ul className="space-y-2">
                                        {subcategory.children.map(
                                          (subSubcat) => (
                                            <li key={subSubcat.id}>
                                              <Link
                                                href={`/categories/${subSubcat.slug}`}
                                                className="text-sm text-dark-400 hover:text-accent-400 transition-colors"
                                              >
                                                {subSubcat.name}
                                                <span className="ml-1 text-xs text-dark-500">
                                                  ({subSubcat.productCount})
                                                </span>
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-dark-400"></p>
                              <Link
                                href={`/categories/${activeCat.slug}`}
                                className="inline-block mt-4 text-accent-400 hover:text-accent-300 font-medium"
                              >
                                Ver todos los productos
                              </Link>
                            </div>
                          )}

                          {/* Enlace para ver todos los productos de la categoría */}
                          {activeCat.children &&
                            activeCat.children.length > 0 && (
                              <div className="mt-6 pt-4 border-t border-dark-800">
                                <Link
                                  href={`/categories/${activeCat.slug}`}
                                  className="text-sm text-accent-400 hover:text-accent-300 font-medium inline-flex items-center gap-1"
                                >
                                  Ver todos los productos de {activeCat.name}
                                  <ChevronRight className="w-4 h-4" />
                                </Link>
                              </div>
                            )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-dark-400">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 text-dark-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                      <p className="text-sm">
                        Pasa el cursor sobre una categoría para ver sus
                        subcategorías
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer con enlace a todas las categorías */}
            <div className="bg-dark-900/50 px-6 py-3 border-t border-dark-800 rounded-b-lg">
              <Link
                href="/categories"
                className="text-sm text-accent-400 hover:text-accent-300 font-medium inline-flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Ver todas las categorías
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
