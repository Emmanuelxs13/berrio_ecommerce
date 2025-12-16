/**
 * Tipos para el sistema de categorías del e-commerce
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string | null;
  level: number; // 0 = categoría principal, 1 = subcategoría, 2 = sub-subcategoría
  order: number;
  isActive: boolean;
  productCount: number;
  children?: Category[];
  metadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
}

export interface CategoryFilter {
  categoryId?: string;
  parentId?: string;
  level?: number;
  isActive?: boolean;
  search?: string;
  includeChildren?: boolean;
}

export interface CategoryStats {
  totalCategories: number;
  totalProducts: number;
  averageProductsPerCategory: number;
  topCategories: {
    id: string;
    name: string;
    productCount: number;
    salesCount: number;
  }[];
}
