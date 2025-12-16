'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, summary, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>(
    'shipping'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirigir si el carrito está vacío
  if (items.length === 0 && !orderPlaced) {
    router.push('/cart');
    return null;
  }

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    }
    if (
      !shippingInfo.email.trim() ||
      !/\S+@\S+\.\S+/.test(shippingInfo.email)
    ) {
      newErrors.email = 'Email válido es requerido';
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    if (!shippingInfo.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    if (!shippingInfo.state.trim()) {
      newErrors.state = 'El departamento es requerido';
    }
    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = 'El código postal es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!paymentInfo.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)';
    }
    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Nombre en la tarjeta es requerido';
    }
    if (!paymentInfo.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Fecha inválida (MM/YY)';
    }
    if (!paymentInfo.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV inválido (3-4 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Integrar con backend real
      // const order = await createOrder({
      //   items,
      //   shippingInfo,
      //   paymentInfo,
      //   summary,
      // });

      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Redirigir a página de confirmación después de 3 segundos
      setTimeout(() => {
        router.push('/orders');
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert(
        'Hubo un error al procesar tu pedido. Por favor intenta nuevamente.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Orden Exitosa
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            ¡Pedido Realizado!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu pedido ha sido procesado exitosamente. Recibirás un email de
            confirmación en breve.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Número de orden</p>
            <p className="text-2xl font-bold text-gray-900">
              #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ver mis pedidos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al carrito</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'shipping'
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {step !== 'shipping' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  '1'
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Envío</p>
              </div>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${
                step !== 'shipping' ? 'bg-green-200' : 'bg-gray-200'
              }`}
            />

            {/* Step 2 */}
            <div className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'payment'
                    ? 'bg-blue-600 text-white'
                    : step === 'review'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step === 'review' ? <CheckCircle className="w-6 h-6" /> : '2'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Pago</p>
              </div>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${
                step === 'review' ? 'bg-green-200' : 'bg-gray-200'
              }`}
            />

            {/* Step 3 */}
            <div className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'review'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                3
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Revisar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shipping Form */}
            {step === 'shipping' && (
              <form
                onSubmit={handleShippingSubmit}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Información de Envío
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            fullName: e.target.value,
                          })
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Juan Pérez"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Calle 123 #45-67, Apto 8B"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Bogotá"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          state: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Cundinamarca"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          zipCode: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="110111"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      País *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.country}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Colombia"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Continuar al Pago
                </button>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form
                onSubmit={handlePaymentSubmit}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Información de Pago
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '');
                          if (value.length <= 16 && /^\d*$/.test(value)) {
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: value
                                .replace(/(.{4})/g, '$1 ')
                                .trim(),
                            });
                          }
                        }}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre en la Tarjeta *
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardName: e.target.value.toUpperCase(),
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="JUAN PEREZ"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Expiración *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          if (value.length <= 5) {
                            setPaymentInfo({
                              ...paymentInfo,
                              expiryDate: value,
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.expiryDate
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 4) {
                              setPaymentInfo({ ...paymentInfo, cvv: value });
                            }
                          }}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Revisar Pedido
                  </button>
                </div>
              </form>
            )}

            {/* Review Step */}
            {step === 'review' && (
              <div className="space-y-6">
                {/* Shipping Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Dirección de Envío
                      </h3>
                    </div>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-semibold">{shippingInfo.fullName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.city}, {shippingInfo.state}{' '}
                      {shippingInfo.zipCode}
                    </p>
                    <p>{shippingInfo.country}</p>
                    <p className="pt-2">{shippingInfo.email}</p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Método de Pago
                      </h3>
                    </div>
                    <button
                      onClick={() => setStep('payment')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-semibold mb-1">{paymentInfo.cardName}</p>
                    <p>•••• •••• •••• {paymentInfo.cardNumber.slice(-4)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Expira {paymentInfo.expiryDate}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Productos ({items.length})
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            $
                            {(
                              (item.discount
                                ? item.price * (1 - item.discount / 100)
                                : item.price) * item.quantity
                            ).toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-4 bg-green-600 text-white font-bold text-lg rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        Confirmar Pedido
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({summary.itemCount} items)</span>
                  <span className="font-semibold">
                    ${summary.subtotal.toLocaleString('es-CO')}
                  </span>
                </div>

                {summary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuentos</span>
                    <span className="font-semibold">
                      -${summary.discount.toLocaleString('es-CO')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Envío</span>
                  <span className="font-semibold">
                    {summary.shipping === 0 ? (
                      <span className="text-green-600">GRATIS</span>
                    ) : (
                      `$${summary.shipping.toLocaleString('es-CO')}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>IVA (16%)</span>
                  <span className="font-semibold">
                    ${summary.tax.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${summary.total.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      Pago 100% Seguro
                    </p>
                    <p className="text-xs text-green-700">
                      Transacciones encriptadas y protegidas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
