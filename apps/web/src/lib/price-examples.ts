/**
 * 🇨🇴 DEMO - Precios en Pesos Colombianos
 *
 * Este archivo muestra ejemplos de cómo se formatean los precios
 * en toda la aplicación usando la función formatPrice()
 */

import { formatPrice } from '@/lib/utils';

// Ejemplos de productos con precios en COP
export const productExamples = [
  {
    name: 'iPhone 15 Pro Max',
    price: 5499000,
    formatted: formatPrice(5499000), // $ 5.499.000
  },
  {
    name: 'Samsung Galaxy S24',
    price: 3899000,
    formatted: formatPrice(3899000), // $ 3.899.000
  },
  {
    name: 'MacBook Pro M3',
    price: 8999000,
    formatted: formatPrice(8999000), // $ 8.999.000
  },
  {
    name: 'iPad Air',
    price: 2799000,
    formatted: formatPrice(2799000), // $ 2.799.000
  },
  {
    name: 'AirPods Pro',
    price: 899000,
    formatted: formatPrice(899000), // $ 899.000
  },
  {
    name: 'Apple Watch Series 9',
    price: 1899000,
    formatted: formatPrice(1899000), // $ 1.899.000
  },
];

// Ejemplos de totales de carrito
export const cartExamples = [
  {
    description: 'Subtotal (3 productos)',
    amount: 12397000,
    formatted: formatPrice(12397000), // $ 12.397.000
  },
  {
    description: 'Envío',
    amount: 15000,
    formatted: formatPrice(15000), // $ 15.000
  },
  {
    description: 'Total',
    amount: 12412000,
    formatted: formatPrice(12412000), // $ 12.412.000
  },
];

// Ejemplos de ofertas y descuentos
export const offerExamples = [
  {
    product: 'Samsung Galaxy Buds2 Pro',
    originalPrice: 799000,
    discountedPrice: 599000,
    savings: 200000,
    formattedOriginal: formatPrice(799000), // $ 799.000
    formattedDiscounted: formatPrice(599000), // $ 599.000
    formattedSavings: formatPrice(200000), // $ 200.000
    discountPercentage: '25%',
  },
];

/**
 * Características del formato COP:
 *
 * ✅ Locale: es-CO (Colombia)
 * ✅ Moneda: COP (Peso Colombiano)
 * ✅ Sin decimales (minimumFractionDigits: 0)
 * ✅ Separador de miles: punto (.)
 * ✅ Símbolo: $ (antes del número)
 *
 * Ejemplos:
 * - 50000 → $ 50.000
 * - 1000000 → $ 1.000.000
 * - 15000000 → $ 15.000.000
 */

export default productExamples;
