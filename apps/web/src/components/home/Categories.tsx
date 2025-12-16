'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Monitor,
  Shirt,
  Home,
  Dumbbell,
  Baby,
  BookOpen,
  LucideIcon,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getMainCategories } from '@/data/categories';

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Shirt,
  Home,
  Dumbbell,
  Baby,
  BookOpen,
};

/**
 * Sección de categorías principales para la página Home
 * Muestra las 6 categorías principales con iconos y contador de productos
 */
export function Categories() {
  // Obtener categorías principales desde los datos mock
  const categories = getMainCategories();

  return (
    <section className="section-sm bg-dark-950">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Compra por Categoría
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Explora nuestra amplia selección de productos organizados en
            categorías
          </p>
        </div>

        {/* Grid de Categorías */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => {
            // Obtener el componente de icono desde el mapa
            const Icon = category.icon
              ? iconMap[category.icon] || Monitor
              : Monitor;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <Card
                  hover
                  className="flex flex-col items-center p-6 h-full transition-all"
                >
                  {/* Icono con gradiente */}
                  <div className="p-4 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-4 border border-accent-500/20">
                    <Icon className="h-8 w-8 text-accent-400" />
                  </div>

                  {/* Nombre */}
                  <h3 className="font-semibold text-center text-sm mb-2 text-dark-100 group-hover:text-accent-400 transition-colors">
                    {category.name}
                  </h3>

                  {/* Badge con contador */}
                  <Badge
                    variant="default"
                    className="bg-accent-500/10 text-accent-400 border border-accent-500/20 group-hover:bg-accent-500/20"
                  >
                    {category.productCount} productos
                  </Badge>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Link a todas las categorías */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-accent-500/50"
          >
            Ver Todas las Categorías
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
