'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import Breadcrumb, { BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { ProductCard } from '@/components/products/ProductCard';
import { getCategoryBySlug, getCategoryBreadcrumb } from '@/data/categories';

type ViewMode = 'grid' | 'list';
type SortOption =
  | 'relevance'
  | 'price-low'
  | 'price-high'
  | 'newest'
  | 'popular';

/**
 * Página de categoría individual
 * Muestra productos filtrados por categoría con opciones de ordenamiento
 */
export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Obtener datos de la categoría
  const category = getCategoryBySlug(slug);
  const breadcrumbPath = getCategoryBreadcrumb(slug);

  // Productos filtrados por categoría (simulado)
  const categoryProducts = useMemo(() => {
    // Simulamos productos de la categoría
    const mockProducts = Array.from({ length: 12 }, (_, i) => ({
      id: `${category?.id}-${i + 1}`,
      name: `Producto ${i + 1} de ${category?.name}`,
      description: `Descripción del producto ${i + 1}`,
      price: Math.floor(Math.random() * 2000) + 100,
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : 0,
      stock: Math.floor(Math.random() * 100) + 1,
      images: [`/images/products/product-${(i % 10) + 1}.jpg`],
      categoryId: category?.id || '',
      category: {
        id: category?.id || '',
        name: category?.name || '',
        slug: category?.slug || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      brand: {
        id: `brand-${i % 5}`,
        name: ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'][i % 5],
        slug: ['apple', 'samsung', 'sony', 'nike', 'adidas'][i % 5],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      featured: false,
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 500) + 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    return mockProducts;
  }, [category]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const products = [...categoryProducts];

    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'newest':
        return products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'popular':
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return products;
    }
  }, [categoryProducts, sortBy]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Categoría no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          La categoría que buscas no existe o ha sido eliminada.
        </p>
        <Link
          href="/categories"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Ver todas las categorías
        </Link>
      </div>
    );
  }

  // Construir breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = breadcrumbPath.map((cat) => ({
    label: cat.name,
    href: `/categories/${cat.slug}`,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section de la categoría */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>

          {/* Título y descripción */}
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-lg text-white/90">{category.description}</p>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {category.productCount} productos
              </span>
              {category.children && category.children.length > 0 && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {category.children.length} subcategorías
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subcategorías */}
      {category.children && category.children.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Subcategorías
            </h2>
            <div className="flex flex-wrap gap-3">
              {category.children.map((subcat) => (
                <Link
                  key={subcat.id}
                  href={`/categories/${subcat.slug}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {subcat.name}
                  <span className="ml-2 text-xs text-gray-500">
                    ({subcat.productCount})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-600"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div
                className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
              >
                {/* Rango de precios */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Precio</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Menos de $500
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        $500 - $1,000
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        $1,000 - $2,000
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Más de $2,000
                      </span>
                    </label>
                  </div>
                </div>

                {/* Calificación */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Calificación
                  </h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                          {rating}
                          <svg
                            className="w-4 h-4 ml-1 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          y más
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Disponibilidad */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Disponibilidad
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        En stock
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        En oferta
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Envío gratis
                      </span>
                    </label>
                  </div>
                </div>

                {/* Botón de aplicar filtros */}
                <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Aplicar filtros
                </button>
              </div>
            </div>
          </aside>

          {/* Lista de productos */}
          <div className="flex-1">
            {/* Barra de herramientas */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Contador de productos */}
                <div className="text-sm text-gray-600">
                  Mostrando{' '}
                  <span className="font-medium text-gray-900">
                    {sortedProducts.length}
                  </span>{' '}
                  productos
                </div>

                <div className="flex items-center gap-4">
                  {/* Selector de ordenamiento */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="relevance">Más relevantes</option>
                      <option value="price-low">Precio: Menor a Mayor</option>
                      <option value="price-high">Precio: Mayor a Menor</option>
                      <option value="newest">Más recientes</option>
                      <option value="popular">Más populares</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Vista grid/list */}
                  <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      aria-label="Vista de cuadrícula"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      aria-label="Vista de lista"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid/List de productos */}
            {sortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No hay productos en esta categoría
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Intenta explorar otras categorías o ajusta tus filtros.
                  </p>
                  <Link
                    href="/categories"
                    className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Explorar categorías
                  </Link>
                </div>
              </div>
            )}

            {/* Paginación (simulada) */}
            {sortedProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Anterior
                  </button>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Siguiente
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
