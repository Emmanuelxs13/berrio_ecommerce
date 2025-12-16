'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Grid3x3, List } from 'lucide-react';
import Breadcrumb, { BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { ProductCard } from '@/components/products/ProductCard';
import { getBrandBySlug } from '@/data/brands';

type ViewMode = 'grid' | 'list';
type SortOption =
  | 'relevance'
  | 'price-low'
  | 'price-high'
  | 'newest'
  | 'popular';

/**
 * Página de marca individual
 * Muestra productos filtrados por marca con opciones de ordenamiento
 */
export default function BrandPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Obtener datos de la marca
  const brand = getBrandBySlug(slug);

  // Productos filtrados por marca (simulado)
  const brandProducts = useMemo(() => {
    if (!brand) return [];

    // Simulamos productos de la marca
    const mockProducts = Array.from(
      { length: brand._count?.products || 12 },
      (_, i) => ({
        id: `${brand.id}-${i + 1}`,
        name: `${brand.name} Producto ${i + 1}`,
        description: `Descripción del producto ${i + 1} de ${brand.name}`,
        price: Math.floor(Math.random() * 2000) + 100,
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
        stock: Math.floor(Math.random() * 100) + 1,
        images: [`/images/products/product-${(i % 10) + 1}.jpg`],
        categoryId: `cat-${i % 6}`,
        category: {
          id: `cat-${i % 6}`,
          name: [
            'Electrónica',
            'Moda',
            'Hogar',
            'Deportes',
            'Juguetes',
            'Libros',
          ][i % 6],
          slug: [
            'electronica',
            'moda',
            'hogar',
            'deportes',
            'juguetes',
            'libros',
          ][i % 6],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        brand: {
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
        },
        featured: Math.random() > 0.8,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 500) + 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
    return mockProducts;
  }, [brand]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const products = [...brandProducts];

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
  }, [brandProducts, sortBy]);

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Marca no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          La marca que buscas no existe o ha sido eliminada.
        </p>
        <Link
          href="/brands"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Ver todas las marcas
        </Link>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Marcas', href: '/brands' },
    { label: brand.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section de la marca */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>

          <div className="flex items-center gap-8">
            {/* Logo de la marca */}
            <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-5xl font-bold text-primary-600">
                {brand.name[0]}
              </span>
            </div>

            {/* Información de la marca */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{brand.name}</h1>
              {brand.description && (
                <p className="text-lg text-white/90 mb-4">
                  {brand.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {brand._count?.products || 0} productos disponibles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
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

        {/* Grid de productos */}
        {sortedProducts.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
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
                No hay productos disponibles
              </h3>
              <p className="text-gray-600 mb-6">
                Actualmente no hay productos de esta marca en stock.
              </p>
              <Link
                href="/brands"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explorar otras marcas
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

      {/* Información adicional de la marca */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Acerca de {brand.name}
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {brand.description}
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {brand._count?.products || 0}
                  </div>
                  <div className="text-sm text-gray-600">
                    Productos disponibles
                  </div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    4.5
                  </div>
                  <div className="text-sm text-gray-600">
                    Calificación promedio
                  </div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ⭐
                  </div>
                  <div className="text-sm text-gray-600">Marca verificada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
