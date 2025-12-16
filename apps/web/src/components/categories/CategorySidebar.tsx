'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CategoryTree } from '@/types/category';
import { getMainCategories } from '@/data/categories';

interface CategorySidebarProps {
  activeSlug?: string;
  className?: string;
}

/**
 * Sidebar de categorías con árbol expandible
 * Muestra categorías y subcategorías en formato de árbol
 */
export default function CategorySidebar({
  activeSlug,
  className = '',
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const mainCategories = getMainCategories();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: string) =>
    expandedCategories.includes(categoryId);

  const renderCategory = (category: CategoryTree, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const expanded = isExpanded(category.id);
    const isActive = category.slug === activeSlug;

    return (
      <div key={category.id}>
        <div
          className={`flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
            isActive
              ? 'bg-primary-50 text-primary-600 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          <Link
            href={`/categories/${category.slug}`}
            className="flex-1 flex items-center gap-2"
          >
            <span className="text-sm">{category.name}</span>
            <span className="text-xs text-gray-400">
              ({category.productCount})
            </span>
          </Link>

          {hasChildren && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleCategory(category.id);
              }}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label={expanded ? 'Contraer' : 'Expandir'}
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {hasChildren && expanded && (
          <div className="mt-1">
            {category.children!.map((child) =>
              renderCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="font-semibold text-gray-900 mb-4">Categorías</h3>
      <nav className="space-y-1">
        <Link
          href="/products"
          className={`flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors ${
            !activeSlug
              ? 'bg-primary-50 text-primary-600 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>Todos los productos</span>
        </Link>
        {mainCategories.map((category) => renderCategory(category))}
      </nav>
    </div>
  );
}
