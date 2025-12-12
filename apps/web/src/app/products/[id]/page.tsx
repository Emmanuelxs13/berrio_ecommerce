'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Package,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/lib/api';
import { useCartStore } from '@/store/cart';
import { Loading } from '@/components/ui/Loading';
import { FavoriteButton } from '@/components/products/FavoriteButton';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');

  const { addItem, isInCart, getItemQuantity } = useCartStore();

  // Fetch product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  // Fetch related products
  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', productId],
    queryFn: () => getRelatedProducts(productId),
    enabled: !!product,
  });

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (product && newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity,
      image: product.images[0],
      stock: product.stock,
      brand: typeof product.brand === 'string' ? product.brand : product.brand.name,
    });
  };

  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  };

  const calculateSavings = () => {
    if (!product || !product.discount) return 0;
    return product.price * (product.discount / 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              Producto No Encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 text-base font-bold text-white hover:from-blue-700 hover:to-cyan-600 transition-all"
            >
              Ver Todos los Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  return (
    <div className="bg-gray-50">
      <div className="container-custom py-6 md:py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link
            href="/products"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Productos
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">
                  -{product.discount}% OFF
                </div>
              )}

              {/* Stock Badge */}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-bold">
                    Agotado
                  </div>
                </div>
              )}

              {product.stock > 0 && product.stock < 5 && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ¡Solo {product.stock} disponibles!
                </div>
              )}

              {/* Favorite Button */}
              <div className="absolute top-4 right-4">
                <FavoriteButton productId={product.id} size="lg" />
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-500 ring-4 ring-blue-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <Link
                href={`/products?brand=${typeof product.brand === 'string' ? product.brand : product.brand.id}`}
                className="inline-block text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide mb-2"
              >
                {typeof product.brand === 'string' ? product.brand : product.brand.name}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-semibold">
                4.0 (124 reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="space-y-3">
                {product.discount && product.discount > 0 ? (
                  <>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-black text-gray-900">
                        ${calculateDiscountedPrice().toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                      <Check className="h-4 w-4" />
                      Ahorras ${calculateSavings().toFixed(2)} ({product.discount}%)
                    </div>
                  </>
                ) : (
                  <span className="text-4xl md:text-5xl font-black text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-700 font-bold">
                    En stock ({product.stock} disponibles)
                  </span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-red-700 font-bold">Agotado</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-gray-200 p-2">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      className="w-16 text-center text-lg font-bold border-0 focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  {inCart && (
                    <span className="text-sm text-gray-600">
                      Ya tienes <strong>{cartQuantity}</strong> en el carrito
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || (inCart && quantity + cartQuantity > product.stock)}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart className="h-6 w-6" />
                {product.stock === 0
                  ? 'Agotado'
                  : inCart
                  ? 'Añadir Más al Carrito'
                  : 'Añadir al Carrito'}
              </button>

              <button
                onClick={() => router.push('/cart')}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-white border-2 border-gray-200 px-8 py-4 text-lg font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Comprar Ahora
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Envío Gratis</p>
                  <p className="text-xs text-gray-600">En compras +$999</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Garantía</p>
                  <p className="text-xs text-gray-600">1 año oficial</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Devoluciones
                  </p>
                  <p className="text-xs text-gray-600">30 días gratis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex-1 px-6 py-4 text-base font-bold transition-colors ${
                activeTab === 'description'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Descripción
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 px-6 py-4 text-base font-bold transition-colors ${
                activeTab === 'specs'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Especificaciones
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' ? (
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <SpecRow label="Marca" value={typeof product.brand === 'string' ? product.brand : product.brand.name} />
                  <SpecRow label="Modelo" value={product.name} />
                  <SpecRow label="Disponibilidad" value={product.stock > 0 ? `${product.stock} unidades` : 'Agotado'} />
                </div>
                <div className="space-y-3">
                  <SpecRow label="Categoría" value={typeof product.category === 'string' ? product.category : product.category.name} />
                  <SpecRow label="Destacado" value={product.featured ? 'Sí' : 'No'} />
                  <SpecRow label="Precio" value={`$${product.price.toFixed(2)}`} />
                  {product.discount && product.discount > 0 && (
                    <SpecRow label="Descuento" value={`${product.discount}%`} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                Productos Relacionados
              </h2>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1"
              >
                Ver todos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Component
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-gray-600 font-semibold">{label}</span>
      <span className="text-gray-900 font-bold">{value}</span>
    </div>
  );
}
