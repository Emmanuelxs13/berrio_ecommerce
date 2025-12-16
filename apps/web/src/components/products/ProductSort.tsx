'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import type { ProductFilters } from '@/types';

interface ProductSortProps {
  currentSort?: ProductFilters['sortBy'];
}

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'popular', label: 'Más populares' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'name_asc', label: 'Nombre: A-Z' },
  { value: 'name_desc', label: 'Nombre: Z-A' },
] as const;

export function ProductSort({ currentSort = 'newest' }: ProductSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    params.set('page', '1'); // Reset a página 1 al ordenar
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="appearance-none bg-dark-900/50 border border-dark-700 text-dark-50 rounded-lg px-4 py-2 pr-10 text-sm font-medium hover:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 cursor-pointer transition-colors"
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-dark-900"
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400 pointer-events-none" />
    </div>
  );
}
