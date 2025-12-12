'use client';

import { useFavoritesStore } from '@/store/favorites';
import { useCartStore } from '@/store/cart';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/lib/api';
import { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Tag, Package } from 'lucide-react';
import { Loading } from '@/components/ui/Loading';

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const { removeFavorite, clearFavorites } = useFavoritesStore();
  const { addItem, isInCart } = useCartStore();

  // Fetch favorite products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['favorite-products', favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];

      // Fetch all favorite products
      const promises = favorites.map((id) => getProductById(id));
      const results = await Promise.all(promises);
      return results.filter((p) => p !== null) as Product[];
    },
    enabled: favorites.length > 0,
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity: 1,
      image: product.images[0],
      stock: product.stock,
      brand: typeof product.brand === 'string' ? product.brand : product.brand.name,
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    removeFavorite(productId);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (favorites.length === 0 || !products || products.length === 0) {
    return (
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Empty State */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-50 to-pink-50">
              <Heart className="h-12 w-12 text-red-400 animate-pulse" />
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Tu Lista de Deseos está Vacía
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Guarda tus productos favoritos y recibe notificaciones cuando
              estén en oferta
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl transition-all hover:scale-105"
              >
                <Package className="h-5 w-5" />
                Ver Todos los Productos
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-8 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all hover:scale-105"
              >
                <Tag className="h-5 w-5" />
                Ver Ofertas Especiales
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100">
              <div className="text-4xl mb-3">💙</div>
              <h3 className="font-bold text-gray-900 mb-2">
                Guarda tus Favoritos
              </h3>
              <p className="text-sm text-gray-600">
                Accede rápidamente a los productos que más te gustan
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="font-bold text-gray-900 mb-2">
                Alertas de Precio
              </h3>
              <p className="text-sm text-gray-600">
                Te notificamos cuando tus favoritos estén en oferta
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border border-orange-100">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Compra Rápida</h3>
              <p className="text-sm text-gray-600">
                Añade a carrito con un solo clic desde favoritos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              Mi Lista de Deseos
            </h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'}{' '}
              guardados
            </p>
          </div>

          {/* Clear All Button */}
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 hover:border-red-300 transition-all"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Limpiar Todo</span>
            </button>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm text-purple-900 flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span>
              <strong>Tip:</strong> Los productos en tu lista de deseos se
              guardan automáticamente. ¡Nunca perderás tus favoritos!
            </span>
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Product Image */}
            <Link href={`/products/${product.id}`} className="block relative">
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount Badge */}
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg">
                    -{product.discount}%
                  </div>
                )}

                {/* Remove from Favorites */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFavorite(product.id);
                  }}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-red-50 transition-colors group/heart"
                  title="Eliminar de favoritos"
                >
                  <Heart className="h-5 w-5 text-red-500 fill-red-500 group-hover/heart:scale-110 transition-transform" />
                </button>

                {/* Stock Badge */}
                {product.stock < 5 && product.stock > 0 && (
                  <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ¡Solo {product.stock} disponibles!
                  </div>
                )}

                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Agotado
                    </div>
                  </div>
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              {/* Brand */}
              <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">
                {typeof product.brand === 'string' ? product.brand : product.brand.name}
              </p>

              {/* Name */}
              <Link href={`/products/${product.id}`}>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
              <div className="mb-4">
                {product.discount && product.discount > 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">
                      $
                      {(
                        product.price *
                        (1 - product.discount / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-black text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {product.stock > 0 ? (
                  <>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCart(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {isInCart(product.id) ? 'En Carrito' : 'Añadir'}
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-bold text-gray-500 cursor-not-allowed"
                  >
                    Agotado
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-200 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">
              Compra Inteligente
            </h3>
            <p className="text-sm text-gray-600">
              Compara precios y características de tus productos favoritos
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">📲</div>
            <h3 className="font-bold text-gray-900 mb-2">
              Sincronización Total
            </h3>
            <p className="text-sm text-gray-600">
              Tu lista de deseos está disponible en todos tus dispositivos
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-bold text-gray-900 mb-2">Ideas de Regalo</h3>
            <p className="text-sm text-gray-600">
              Comparte tu lista de deseos para que otros sepan qué regalarte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
