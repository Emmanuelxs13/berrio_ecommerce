'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  readonly items: BreadcrumbItem[];
  readonly className?: string;
}

/**
 * Componente de breadcrumb para navegación jerárquica
 * Muestra el camino de navegación actual
 */
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-dark-400 ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home link */}
      <Link
        href="/"
        className="hover:text-accent-400 transition-colors"
        aria-label="Inicio"
      >
        <Home className="w-4 h-4" />
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const key = item.href || item.label;

        return (
          <div
            key={`breadcrumb-${key}-${index}`}
            className="flex items-center space-x-2"
          >
            <ChevronRight className="w-4 h-4 text-dark-600" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-accent-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? 'text-dark-50 font-medium' : ''}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
