'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Category, Brand, ProductFilters as ProductFiltersType } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  currentFilters: ProductFiltersType;
  onFilterChange?: () => void;
}

export function ProductFilters({
  categories,
  brands,
  currentFilters,
  onFilterChange,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice?.toString() || '');

  const updateFilters = (key: string, value: string | boolean | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === null || value === '' || value === false) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }
    
    // Reset página al cambiar filtros
    params.set('page', '1');
    
    router.push(`/products?${params.toString()}`);
    onFilterChange?.();
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
    onFilterChange?.();
  };

  const clearAllFilters = () => {
    router.push('/products');
    setMinPrice('');
    setMaxPrice('');
    onFilterChange?.();
  };

  const hasActiveFilters =
    currentFilters.categoryId ||
    currentFilters.brandId ||
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.inStock ||
    currentFilters.featured;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm"
          >
            Limpiar
          </Button>
        )}
      </div>

      {/* Categorías */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="font-semibold mb-3 flex items-center justify-between">
          Categorías
          {currentFilters.categoryId && (
            <button
              onClick={() => updateFilters('category', null)}
              className="text-primary-600 text-sm hover:underline"
            >
              Limpiar
            </button>
          )}
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => {
            const isSelected = currentFilters.categoryId === category.id;
            return (
              <button
                key={category.id}
                onClick={() =>
                  updateFilters('category', isSelected ? null : category.id)
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>{category.name}</span>
                {category._count && (
                  <span className="text-xs text-gray-500">
                    ({category._count.products})
                  </span>
                )}
                {isSelected && <Check className="h-4 w-4 text-primary-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Marcas */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="font-semibold mb-3 flex items-center justify-between">
          Marcas
          {currentFilters.brandId && (
            <button
              onClick={() => updateFilters('brand', null)}
              className="text-primary-600 text-sm hover:underline"
            >
              Limpiar
            </button>
          )}
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {brands.map((brand) => {
            const isSelected = currentFilters.brandId === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() =>
                  updateFilters('brand', isSelected ? null : brand.id)
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>{brand.name}</span>
                {brand._count && (
                  <span className="text-xs text-gray-500">
                    ({brand._count.products})
                  </span>
                )}
                {isSelected && <Check className="h-4 w-4 text-primary-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rango de Precio */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="font-semibold mb-3">Precio</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Mínimo</label>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="$0"
                className="text-sm"
                min="0"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Máximo</label>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="$999"
                className="text-sm"
                min="0"
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePriceFilter}
            className="w-full"
          >
            Aplicar
          </Button>
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="font-semibold mb-3">Disponibilidad</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={currentFilters.inStock || false}
            onChange={(e) => updateFilters('inStock', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm">Solo productos en stock</span>
        </label>
      </div>

      {/* Destacados */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="font-semibold mb-3">Otros</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={currentFilters.featured || false}
            onChange={(e) => updateFilters('featured', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm">Solo productos destacados</span>
        </label>
      </div>
    </div>
  );
}
