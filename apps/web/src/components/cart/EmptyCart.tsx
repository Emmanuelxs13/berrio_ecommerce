'use client';

import { ShoppingCart, Package, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function EmptyCart() {
  const router = useRouter();

  const popularCategories = [
    { name: 'Smartphones', icon: '📱', path: '/products?category=smartphones' },
    { name: 'Laptops', icon: '💻', path: '/products?category=laptops' },
    { name: 'Auriculares', icon: '🎧', path: '/products?category=auriculares' },
    { name: 'Tablets', icon: '📱', path: '/products?category=tablets' },
  ];

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* Icono animado */}
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-primary-100 rounded-full blur-2xl opacity-50 animate-pulse" />
        <div className="relative w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
          <ShoppingCart className="h-16 w-16 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-2xl">🛒</span>
        </div>
      </div>

      {/* Mensaje principal */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Tu carrito está vacío
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        ¡Es hora de llenarlo con productos increíbles! 
        <br />
        Explora nuestro catálogo y encuentra lo que necesitas.
      </p>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/products')}
          className="group"
        >
          <Package className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          Ver Todos los Productos
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push('/offers')}
          className="group"
        >
          <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
          Ver Ofertas Especiales
        </Button>
      </div>

      {/* Categorías populares */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Categorías Populares
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {popularCategories.map((category) => (
            <Card
              key={category.name}
              hover
              className="cursor-pointer p-4 text-center"
              onClick={() => router.push(category.path)}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="text-sm font-medium text-gray-700">
                {category.name}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Envío Gratis</h4>
          <p className="text-sm text-gray-600">En compras mayores a $50</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Compra Segura</h4>
          <p className="text-sm text-gray-600">Pagos 100% protegidos</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Entrega Rápida</h4>
          <p className="text-sm text-gray-600">24-48 horas hábiles</p>
        </div>
      </div>
    </div>
  );
}
