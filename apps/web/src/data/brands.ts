/**
 * Datos mock de marcas para el e-commerce
 */

import { Brand } from '@/types';

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    slug: 'apple',
    logo: '/images/brands/apple.png',
    description:
      'Productos Apple de última generación. iPhone, MacBook, iPad y más.',
    _count: {
      products: 145,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Samsung',
    slug: 'samsung',
    logo: '/images/brands/samsung.png',
    description:
      'Tecnología Samsung de primera calidad. Smartphones, TVs y electrodomésticos.',
    _count: {
      products: 198,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '3',
    name: 'Sony',
    slug: 'sony',
    logo: '/images/brands/sony.png',
    description:
      'Innovación Sony. Cámaras, audio y entretenimiento de alta calidad.',
    _count: {
      products: 87,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '4',
    name: 'Nike',
    slug: 'nike',
    logo: '/images/brands/nike.png',
    description: 'Just Do It. Ropa y calzado deportivo de máxima calidad.',
    _count: {
      products: 234,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '5',
    name: 'Adidas',
    slug: 'adidas',
    logo: '/images/brands/adidas.png',
    description: 'Impossible is Nothing. Equipamiento deportivo premium.',
    _count: {
      products: 189,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '6',
    name: 'Dell',
    slug: 'dell',
    logo: '/images/brands/dell.png',
    description: 'Computadoras y laptops Dell para profesionales y gamers.',
    _count: {
      products: 76,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '7',
    name: 'HP',
    slug: 'hp',
    logo: '/images/brands/hp.png',
    description:
      'Hewlett-Packard. Impresoras, computadoras y tecnología empresarial.',
    _count: {
      products: 112,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '8',
    name: 'LG',
    slug: 'lg',
    logo: '/images/brands/lg.png',
    description: "Life's Good. Electrodomésticos y electrónica de consumo.",
    _count: {
      products: 134,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '9',
    name: 'Xiaomi',
    slug: 'xiaomi',
    logo: '/images/brands/xiaomi.png',
    description:
      'Innovación Xiaomi. Smartphones y gadgets inteligentes a precios accesibles.',
    _count: {
      products: 167,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '10',
    name: 'Canon',
    slug: 'canon',
    logo: '/images/brands/canon.png',
    description: 'Cámaras e impresoras Canon de calidad profesional.',
    _count: {
      products: 89,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '11',
    name: 'Nikon',
    slug: 'nikon',
    logo: '/images/brands/nikon.png',
    description: 'Cámaras y óptica Nikon para fotógrafos exigentes.',
    _count: {
      products: 67,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '12',
    name: 'Bose',
    slug: 'bose',
    logo: '/images/brands/bose.png',
    description: 'Audio premium Bose. Audífonos y bocinas de alta fidelidad.',
    _count: {
      products: 45,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '13',
    name: 'JBL',
    slug: 'jbl',
    logo: '/images/brands/jbl.png',
    description: 'Sonido JBL potente y nítido. Bocinas y audífonos para todos.',
    _count: {
      products: 78,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '14',
    name: 'Puma',
    slug: 'puma',
    logo: '/images/brands/puma.png',
    description: 'Forever Faster. Ropa y calzado deportivo Puma.',
    _count: {
      products: 156,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '15',
    name: 'Reebok',
    slug: 'reebok',
    logo: '/images/brands/reebok.png',
    description: 'Be More Human. Equipamiento deportivo Reebok.',
    _count: {
      products: 123,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '16',
    name: 'Microsoft',
    slug: 'microsoft',
    logo: '/images/brands/microsoft.png',
    description:
      'Surface, Xbox y software Microsoft para productividad y entretenimiento.',
    _count: {
      products: 91,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '17',
    name: 'Lenovo',
    slug: 'lenovo',
    logo: '/images/brands/lenovo.png',
    description: 'Computadoras y dispositivos Lenovo para trabajo y estudio.',
    _count: {
      products: 104,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '18',
    name: 'Asus',
    slug: 'asus',
    logo: '/images/brands/asus.png',
    description: 'Laptops y componentes Asus para gamers y profesionales.',
    _count: {
      products: 87,
    },
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
];

/**
 * Obtiene todas las marcas ordenadas alfabéticamente
 */
export const getAllBrands = (): Brand[] => {
  return [...mockBrands].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Obtiene una marca por su slug
 */
export const getBrandBySlug = (slug: string): Brand | undefined => {
  return mockBrands.find((brand) => brand.slug === slug);
};

/**
 * Obtiene una marca por su ID
 */
export const getBrandById = (id: string): Brand | undefined => {
  return mockBrands.find((brand) => brand.id === id);
};

/**
 * Obtiene las marcas más populares (mayor número de productos)
 */
export const getPopularBrands = (limit: number = 6): Brand[] => {
  return [...mockBrands]
    .sort((a, b) => (b._count?.products || 0) - (a._count?.products || 0))
    .slice(0, limit);
};

/**
 * Busca marcas por nombre
 */
export const searchBrands = (query: string): Brand[] => {
  const lowerQuery = query.toLowerCase();
  return mockBrands.filter((brand) =>
    brand.name.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Agrupa marcas por letra inicial
 */
export const getBrandsByLetter = (): Record<string, Brand[]> => {
  const grouped: Record<string, Brand[]> = {};

  mockBrands.forEach((brand) => {
    const firstLetter = brand.name[0].toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(brand);
  });

  // Ordenar cada grupo alfabéticamente
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
};
