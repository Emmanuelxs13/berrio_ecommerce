/**
 * Datos mock de categorías para el e-commerce
 * Estructura jerárquica de categorías con subcategorías
 */

import { Category, CategoryTree } from '@/types/category';

export const mockCategories: CategoryTree[] = [
  {
    id: '1',
    name: 'Electrónica',
    slug: 'electronica',
    description: 'Tecnología y dispositivos electrónicos',
    image: '/images/categories/electronics.jpg',
    icon: 'Monitor',
    parentId: null,
    level: 0,
    order: 1,
    isActive: true,
    productCount: 456,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    children: [
      {
        id: '1-1',
        name: 'Computadoras',
        slug: 'computadoras',
        description: 'Laptops, desktops y accesorios',
        parentId: '1',
        level: 1,
        order: 1,
        isActive: true,
        productCount: 124,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '1-1-1',
            name: 'Laptops',
            slug: 'laptops',
            parentId: '1-1',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 67,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '1-1-2',
            name: 'Desktops',
            slug: 'desktops',
            parentId: '1-1',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 34,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '1-1-3',
            name: 'Monitores',
            slug: 'monitores',
            parentId: '1-1',
            level: 2,
            order: 3,
            isActive: true,
            productCount: 23,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
      {
        id: '1-2',
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Teléfonos inteligentes y accesorios',
        parentId: '1',
        level: 1,
        order: 2,
        isActive: true,
        productCount: 198,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '1-2-1',
            name: 'iPhone',
            slug: 'iphone',
            parentId: '1-2',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 89,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '1-2-2',
            name: 'Samsung',
            slug: 'samsung',
            parentId: '1-2',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 76,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '1-2-3',
            name: 'Xiaomi',
            slug: 'xiaomi',
            parentId: '1-2',
            level: 2,
            order: 3,
            isActive: true,
            productCount: 33,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
      {
        id: '1-3',
        name: 'Audio',
        slug: 'audio',
        description: 'Audífonos, bocinas y equipos de audio',
        parentId: '1',
        level: 1,
        order: 3,
        isActive: true,
        productCount: 89,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '1-3-1',
            name: 'Audífonos',
            slug: 'audifonos',
            parentId: '1-3',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 56,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '1-3-2',
            name: 'Bocinas',
            slug: 'bocinas',
            parentId: '1-3',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 33,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
      {
        id: '1-4',
        name: 'Cámaras',
        slug: 'camaras',
        description: 'Cámaras digitales y accesorios',
        parentId: '1',
        level: 1,
        order: 4,
        isActive: true,
        productCount: 45,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Moda',
    slug: 'moda',
    description: 'Ropa, calzado y accesorios',
    image: '/images/categories/fashion.jpg',
    icon: 'Shirt',
    parentId: null,
    level: 0,
    order: 2,
    isActive: true,
    productCount: 832,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    children: [
      {
        id: '2-1',
        name: 'Ropa de Hombre',
        slug: 'ropa-hombre',
        parentId: '2',
        level: 1,
        order: 1,
        isActive: true,
        productCount: 312,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '2-1-1',
            name: 'Camisetas',
            slug: 'camisetas-hombre',
            parentId: '2-1',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 89,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '2-1-2',
            name: 'Pantalones',
            slug: 'pantalones-hombre',
            parentId: '2-1',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 76,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '2-1-3',
            name: 'Chaquetas',
            slug: 'chaquetas-hombre',
            parentId: '2-1',
            level: 2,
            order: 3,
            isActive: true,
            productCount: 45,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
      {
        id: '2-2',
        name: 'Ropa de Mujer',
        slug: 'ropa-mujer',
        parentId: '2',
        level: 1,
        order: 2,
        isActive: true,
        productCount: 389,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '2-2-1',
            name: 'Vestidos',
            slug: 'vestidos',
            parentId: '2-2',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 123,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '2-2-2',
            name: 'Blusas',
            slug: 'blusas',
            parentId: '2-2',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 98,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '2-2-3',
            name: 'Pantalones',
            slug: 'pantalones-mujer',
            parentId: '2-2',
            level: 2,
            order: 3,
            isActive: true,
            productCount: 87,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
      {
        id: '2-3',
        name: 'Calzado',
        slug: 'calzado',
        parentId: '2',
        level: 1,
        order: 3,
        isActive: true,
        productCount: 131,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '2-3-1',
            name: 'Deportivos',
            slug: 'zapatos-deportivos',
            parentId: '2-3',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 67,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '2-3-2',
            name: 'Casuales',
            slug: 'zapatos-casuales',
            parentId: '2-3',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 64,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Hogar',
    slug: 'hogar',
    description: 'Muebles y decoración para el hogar',
    image: '/images/categories/home.jpg',
    icon: 'Home',
    parentId: null,
    level: 0,
    order: 3,
    isActive: true,
    productCount: 567,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    children: [
      {
        id: '3-1',
        name: 'Muebles',
        slug: 'muebles',
        parentId: '3',
        level: 1,
        order: 1,
        isActive: true,
        productCount: 234,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [
          {
            id: '3-1-1',
            name: 'Sala',
            slug: 'muebles-sala',
            parentId: '3-1',
            level: 2,
            order: 1,
            isActive: true,
            productCount: 89,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '3-1-2',
            name: 'Recámara',
            slug: 'muebles-recamara',
            parentId: '3-1',
            level: 2,
            order: 2,
            isActive: true,
            productCount: 76,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
          {
            id: '3-1-3',
            name: 'Comedor',
            slug: 'muebles-comedor',
            parentId: '3-1',
            level: 2,
            order: 3,
            isActive: true,
            productCount: 69,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            children: [],
          },
        ],
      },
      {
        id: '3-2',
        name: 'Decoración',
        slug: 'decoracion',
        parentId: '3',
        level: 1,
        order: 2,
        isActive: true,
        productCount: 198,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '3-3',
        name: 'Iluminación',
        slug: 'iluminacion',
        parentId: '3',
        level: 1,
        order: 3,
        isActive: true,
        productCount: 135,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
    ],
  },
  {
    id: '4',
    name: 'Deportes',
    slug: 'deportes',
    description: 'Artículos deportivos y fitness',
    image: '/images/categories/sports.jpg',
    icon: 'Dumbbell',
    parentId: null,
    level: 0,
    order: 4,
    isActive: true,
    productCount: 423,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    children: [
      {
        id: '4-1',
        name: 'Fitness',
        slug: 'fitness',
        parentId: '4',
        level: 1,
        order: 1,
        isActive: true,
        productCount: 167,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '4-2',
        name: 'Deportes al aire libre',
        slug: 'deportes-aire-libre',
        parentId: '4',
        level: 1,
        order: 2,
        isActive: true,
        productCount: 145,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '4-3',
        name: 'Deportes acuáticos',
        slug: 'deportes-acuaticos',
        parentId: '4',
        level: 1,
        order: 3,
        isActive: true,
        productCount: 111,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
    ],
  },
  {
    id: '5',
    name: 'Juguetes',
    slug: 'juguetes',
    description: 'Juguetes y juegos para niños',
    image: '/images/categories/toys.jpg',
    icon: 'Gamepad2',
    parentId: null,
    level: 0,
    order: 5,
    isActive: true,
    productCount: 356,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    children: [
      {
        id: '5-1',
        name: 'Juegos de mesa',
        slug: 'juegos-mesa',
        parentId: '5',
        level: 1,
        order: 1,
        isActive: true,
        productCount: 123,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '5-2',
        name: 'Muñecas',
        slug: 'munecas',
        parentId: '5',
        level: 1,
        order: 2,
        isActive: true,
        productCount: 98,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '5-3',
        name: 'Construcción',
        slug: 'juegos-construccion',
        parentId: '5',
        level: 1,
        order: 3,
        isActive: true,
        productCount: 135,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
    ],
  },
  {
    id: '6',
    name: 'Libros',
    slug: 'libros',
    description: 'Libros, revistas y material educativo',
    image: '/images/categories/books.jpg',
    icon: 'BookOpen',
    parentId: null,
    level: 0,
    order: 6,
    isActive: true,
    productCount: 789,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    children: [
      {
        id: '6-1',
        name: 'Ficción',
        slug: 'libros-ficcion',
        parentId: '6',
        level: 1,
        order: 1,
        isActive: true,
        productCount: 312,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '6-2',
        name: 'No ficción',
        slug: 'libros-no-ficcion',
        parentId: '6',
        level: 1,
        order: 2,
        isActive: true,
        productCount: 267,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
      {
        id: '6-3',
        name: 'Infantil',
        slug: 'libros-infantil',
        parentId: '6',
        level: 1,
        order: 3,
        isActive: true,
        productCount: 210,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        children: [],
      },
    ],
  },
];

/**
 * Obtiene todas las categorías principales (nivel 0)
 */
export const getMainCategories = (): CategoryTree[] => {
  return mockCategories.filter((cat) => cat.level === 0);
};

/**
 * Obtiene una categoría por su slug
 */
export const getCategoryBySlug = (slug: string): CategoryTree | undefined => {
  const findInTree = (categories: CategoryTree[]): CategoryTree | undefined => {
    for (const cat of categories) {
      if (cat.slug === slug) return cat;
      if (cat.children && cat.children.length > 0) {
        const found = findInTree(cat.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findInTree(mockCategories);
};

/**
 * Obtiene una categoría por su ID
 */
export const getCategoryById = (id: string): CategoryTree | undefined => {
  const findInTree = (categories: CategoryTree[]): CategoryTree | undefined => {
    for (const cat of categories) {
      if (cat.id === id) return cat;
      if (cat.children && cat.children.length > 0) {
        const found = findInTree(cat.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findInTree(mockCategories);
};

/**
 * Obtiene el breadcrumb path de una categoría
 */
export const getCategoryBreadcrumb = (slug: string): CategoryTree[] => {
  const path: CategoryTree[] = [];

  const findPath = (
    categories: CategoryTree[],
    targetSlug: string
  ): boolean => {
    for (const cat of categories) {
      path.push(cat);

      if (cat.slug === targetSlug) {
        return true;
      }

      if (cat.children && cat.children.length > 0) {
        if (findPath(cat.children, targetSlug)) {
          return true;
        }
      }

      path.pop();
    }
    return false;
  };

  findPath(mockCategories, slug);
  return path;
};

/**
 * Obtiene todas las subcategorías de una categoría
 */
export const getSubcategories = (categoryId: string): CategoryTree[] => {
  const category = getCategoryById(categoryId);
  return category?.children || [];
};

/**
 * Aplana el árbol de categorías a una lista
 */
export const flattenCategories = (): Category[] => {
  const result: Category[] = [];

  const flatten = (categories: CategoryTree[]) => {
    categories.forEach((cat) => {
      const { children, ...categoryData } = cat;
      result.push(categoryData);
      if (children && children.length > 0) {
        flatten(children);
      }
    });
  };

  flatten(mockCategories);
  return result;
};
