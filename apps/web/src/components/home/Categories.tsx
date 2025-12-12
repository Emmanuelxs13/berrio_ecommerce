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
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  Camera,
};

interface Category {
  id: string;
  name: string;
  icon?: string;
  parentId?: string | null;
  _count?: {
    products: number;
  };
}

export function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const mainCategories =
    (categories as Category[] | undefined)
      ?.filter((cat) => !cat.parentId)
      .slice(0, 6) || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-9 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...new Array(6)].map((_, i) => (
              <Skeleton
                key={`category-skeleton-${i}`}
                className="h-40 rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
            Compra por Categoría
          </h2>
          <p className="text-gray-600 text-lg">
            Encuentra exactamente lo que estás buscando
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mainCategories.map((category) => {
            const Icon = iconMap[category.icon || ''] || Smartphone;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group"
              >
                <Card hover className="flex flex-col items-center p-6 h-full">
                  <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full group-hover:scale-110 transition-transform mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-center text-sm mb-2">
                    {category.name}
                  </h3>
                  {category._count && (
                    <Badge variant="default">{category._count.products}</Badge>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
