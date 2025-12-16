/**
 * Datos mock para ofertas, cupones y ofertas flash
 */

// Ofertas Flash (tiempo limitado con stock)
export const mockFlashDeals = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    image: '/products/iphone-15-pro.jpg',
    originalPrice: 29999,
    discountPrice: 24999,
    discountPercentage: 17,
    totalStock: 50,
    soldStock: 38,
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 horas
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    image: '/products/samsung-s24.jpg',
    originalPrice: 27999,
    discountPrice: 21999,
    discountPercentage: 21,
    totalStock: 30,
    soldStock: 27,
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 horas
  },
  {
    id: '3',
    name: 'MacBook Air M2 16GB 512GB',
    image: '/products/macbook-air-m2.jpg',
    originalPrice: 34999,
    discountPrice: 29999,
    discountPercentage: 14,
    totalStock: 25,
    soldStock: 12,
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 horas
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Audífonos',
    image: '/products/sony-wh1000xm5.jpg',
    originalPrice: 8999,
    discountPrice: 6499,
    discountPercentage: 28,
    totalStock: 100,
    soldStock: 45,
    expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10 horas
  },
];

// Cupones de descuento
export const mockCoupons = [
  {
    code: 'BIENVENIDA25',
    discount: 25,
    type: 'percentage' as const,
    minPurchase: 1000,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    description: 'Primera compra',
  },
  {
    code: 'TECH500',
    discount: 500,
    type: 'fixed' as const,
    minPurchase: 3000,
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días
    description: 'Tecnología',
  },
  {
    code: 'FLASH50',
    discount: 50,
    type: 'percentage' as const,
    minPurchase: 5000,
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 día
    description: 'Oferta Flash',
  },
  {
    code: 'ENVIOGRATIS',
    discount: 150,
    type: 'fixed' as const,
    minPurchase: 999,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    description: 'Envío gratis',
  },
];

// Categorías para filtros
export const offerCategories = [
  { id: 'all', name: 'Todas' },
  { id: 'electronics', name: 'Electrónica' },
  { id: 'fashion', name: 'Moda' },
  { id: 'home', name: 'Hogar' },
  { id: 'sports', name: 'Deportes' },
  { id: 'toys', name: 'Juguetes' },
];

// Marcas para filtros
export const offerBrands = [
  { id: 'all', name: 'Todas' },
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'sony', name: 'Sony' },
  { id: 'lg', name: 'LG' },
  { id: 'dell', name: 'Dell' },
  { id: 'nike', name: 'Nike' },
  { id: 'adidas', name: 'Adidas' },
];

// Tipos de ofertas
export const offerTypes = [
  { id: 'all', name: 'Todas las ofertas' },
  { id: 'flash', name: 'Ofertas Flash' },
  { id: 'daily', name: 'Ofertas del Día' },
  { id: 'weekend', name: 'Ofertas de Fin de Semana' },
  { id: 'clearance', name: 'Liquidación' },
];

// Rangos de descuento para filtros
export const discountRanges = [
  { id: 'all', name: 'Todos los descuentos', min: 0, max: 100 },
  { id: '10-25', name: '10% - 25%', min: 10, max: 25 },
  { id: '25-50', name: '25% - 50%', min: 25, max: 50 },
  { id: '50+', name: 'Más de 50%', min: 50, max: 100 },
];
