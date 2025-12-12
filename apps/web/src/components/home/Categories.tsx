'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api';
import Link from 'next/link';
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Camera,
} from 'lucide-react';

const iconMap: any = {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Camera,
};

export function Categories() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const mainCategories =
    categories?.filter((cat: any) => !cat.parentId).slice(0, 6) || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compra por Categoría</h2>
          <p className="text-gray-600">
            Encuentra exactamente lo que estás buscando
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mainCategories.map((category: any) => {
            const Icon = iconMap[category.icon] || Smartphone;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group"
              >
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-primary-500 hover:shadow-lg transition-all">
                  <div className="p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-center text-sm">
                    {category.name}
                  </h3>
                  {category._count && (
                    <p className="text-xs text-gray-500 mt-1">
                      {category._count.products} productos
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
