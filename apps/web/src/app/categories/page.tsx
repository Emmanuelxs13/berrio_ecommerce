'use client';

import Link from 'next/link';
import { ChevronRight, Package } from 'lucide-react';
import { getMainCategories } from '@/data/categories';

/**
 * Página de listado de todas las categorías
 * Muestra todas las categorías principales con sus subcategorías
 */
export default function AllCategoriesPage() {
  const mainCategories = getMainCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Todas las Categorías</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Explora nuestra amplia selección de productos organizados por
            categorías. Encuentra exactamente lo que buscas.
          </p>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span>{mainCategories.length} Categorías principales</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span>
                {mainCategories.reduce((acc, cat) => acc + cat.productCount, 0)}{' '}
                Productos totales
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de categorías */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Encabezado de la categoría */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
                <Link
                  href={`/categories/${category.slug}`}
                  className="group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Icono */}
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg
                        className="w-8 h-8 text-primary-600"
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
                    </div>

                    {/* Nombre y descripción */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-gray-600 mt-1">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <span className="text-primary-600 font-medium">
                          {category.productCount} productos
                        </span>
                        {category.children && category.children.length > 0 && (
                          <span className="text-gray-500">
                            • {category.children.length} subcategorías
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Flecha */}
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              {/* Subcategorías */}
              {category.children && category.children.length > 0 && (
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.children.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        href={`/categories/${subCategory.slug}`}
                        className="group p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {subCategory.name}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 flex-shrink-0 mt-1" />
                        </div>
                        {subCategory.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {subCategory.description}
                          </p>
                        )}
                        <div className="text-xs text-primary-600 font-medium">
                          {subCategory.productCount} productos
                        </div>

                        {/* Sub-subcategorías */}
                        {subCategory.children &&
                          subCategory.children.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex flex-wrap gap-1">
                                {subCategory.children
                                  .slice(0, 3)
                                  .map((subSubCat) => (
                                    <span
                                      key={subSubCat.id}
                                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded group-hover:bg-white"
                                    >
                                      {subSubCat.name}
                                    </span>
                                  ))}
                                {subCategory.children.length > 3 && (
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded group-hover:bg-white">
                                    +{subCategory.children.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {mainCategories.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No hay categorías disponibles
              </h2>
              <p className="text-gray-600">
                Actualmente no hay categorías configuradas. Por favor, vuelve
                más tarde.
              </p>
            </div>
          </div>
        )}

        {/* Ayuda */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                Utiliza nuestra barra de búsqueda para encontrar productos
                específicos o contáctanos para ayudarte.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/search"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Buscar productos →
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contactar soporte →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
