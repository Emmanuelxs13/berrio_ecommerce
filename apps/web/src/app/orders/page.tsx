'use client';

import { Package, ChevronRight, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

// Mock data - en producción vendría del backend
const mockOrders = [
  {
    id: '1',
    orderNumber: 'BR2024001',
    date: '2024-12-10',
    status: 'delivered',
    statusText: 'Entregado',
    total: 156000,
    items: [
      {
        id: '1',
        name: 'Smartphone Samsung Galaxy A54',
        image: '/products/phone-1.jpg',
        quantity: 1,
        price: 156000,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'BR2024002',
    date: '2024-12-08',
    status: 'in_transit',
    statusText: 'En tránsito',
    total: 89000,
    items: [
      {
        id: '2',
        name: 'Auriculares Inalámbricos Sony WH-1000XM5',
        image: '/products/headphones-1.jpg',
        quantity: 1,
        price: 89000,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'BR2024003',
    date: '2024-12-05',
    status: 'processing',
    statusText: 'Procesando',
    total: 245000,
    items: [
      {
        id: '3',
        name: 'Laptop Dell Inspiron 15',
        image: '/products/laptop-1.jpg',
        quantity: 1,
        price: 245000,
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in_transit':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    router.push('/login?redirect=/orders');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Package className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">Mis Pedidos</h1>
              <p className="text-blue-100 mt-2">
                Hola {user?.name}, aquí puedes ver el estado de tus pedidos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Empty State */}
        {mockOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Aún no tienes pedidos
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Cuando realices tu primera compra, podrás ver el estado de tus pedidos aquí
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filter/Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  Mostrando <span className="font-semibold text-gray-900">{mockOrders.length}</span> pedidos
                </p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Todos los pedidos</option>
                <option>Entregados</option>
                <option>En tránsito</option>
                <option>Procesando</option>
                <option>Cancelados</option>
              </select>
            </div>

            {/* Orders List */}
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Orden</p>
                        <p className="font-bold text-gray-900">#{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fecha</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <p className="font-semibold text-gray-900">
                            {new Date(order.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-bold text-gray-900">
                          ${order.total.toLocaleString('es-CO')}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.statusText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ${item.price.toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Ver detalles
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    {order.status === 'delivered' && (
                      <Link
                        href={`/products/${order.items[0].id}#reviews`}
                        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Dejar reseña
                      </Link>
                    )}
                    {order.status === 'in_transit' && (
                      <button className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                        <MapPin className="w-5 h-5" />
                        Rastrear envío
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              ¿Necesitas ayuda con tu pedido?
            </h3>
            <p className="text-gray-700 mb-6">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier pregunta
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/help"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Centro de ayuda
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors"
              >
                Contactar soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
