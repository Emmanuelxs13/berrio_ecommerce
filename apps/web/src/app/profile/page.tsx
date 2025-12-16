'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Package,
  Heart,
  ShoppingBag,
  Edit2,
  Save,
  X,
  LogOut,
  Camera,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Tab = 'profile' | 'addresses' | 'security' | 'orders';

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState<UserProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    birthDate: '',
    gender: '',
  });

  const [originalData, setOriginalData] = useState<UserProfileData>({
    ...profileData,
  });

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    router.push('/login?redirect=/profile');
    return null;
  }

  const handleEdit = () => {
    setOriginalData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileData({ ...originalData });
    setIsEditing(false);
  };

  const handleSave = async () => {
    // TODO: Guardar en backend
    try {
      // await updateUserProfile(profileData);
      setIsEditing(false);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Pedidos',
      value: '12',
      color: 'bg-blue-100 text-blue-600',
      link: '/orders',
    },
    {
      icon: Heart,
      label: 'Favoritos',
      value: '24',
      color: 'bg-red-100 text-red-600',
      link: '/favorites',
    },
    {
      icon: Package,
      label: 'En tránsito',
      value: '2',
      color: 'bg-green-100 text-green-600',
      link: '/orders?status=in_transit',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-4 border-white/30 overflow-hidden">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg hover:bg-gray-100 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
              <p className="text-blue-100 mb-4">{user?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  Cliente desde 2024
                </span>
                <span className="px-3 py-1 bg-yellow-400/20 backdrop-blur-sm rounded-full text-sm">
                  ⭐ Cliente Premium
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-colors border border-white/20"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Link
              key={`stat-${stat.link}`}
              href={stat.link}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Mi Perfil</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Direcciones</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === 'security'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Seguridad</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Mis Pedidos</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Información Personal
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancelar</span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Guardar</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="profile-name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing
                            ? 'border-gray-300 bg-white'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="profile-email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing
                            ? 'border-gray-300 bg-white'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="profile-phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        placeholder="+57 300 123 4567"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing
                            ? 'border-gray-300 bg-white'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-birthdate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      id="profile-birthdate"
                      value={profileData.birthDate}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          birthDate: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isEditing
                          ? 'border-gray-300 bg-white'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="profile-gender"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Género
                    </label>
                    <select
                      id="profile-gender"
                      value={profileData.gender}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          gender: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isEditing
                          ? 'border-gray-300 bg-white'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                      <option value="other">Otro</option>
                      <option value="prefer_not_to_say">
                        Prefiero no decir
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Mis Direcciones
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Agregar Dirección
                  </button>
                </div>

                {/* Address Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Casa</h3>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                          Principal
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{user?.name}</p>
                    <p>Calle 123 #45-67, Apto 8B</p>
                    <p>Bogotá, Cundinamarca 110111</p>
                    <p>Colombia</p>
                    <p className="pt-2 text-sm">+57 300 123 4567</p>
                  </div>
                </div>

                {/* Empty State for more addresses */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Agrega más direcciones
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Guarda múltiples direcciones para envíos más rápidos
                  </p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    Agregar Nueva Dirección
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Seguridad</h2>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cambiar Contraseña
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Contraseña Actual
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          id="current-password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nueva Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          id="new-password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Confirmar Nueva Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          id="confirm-password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Actualizar Contraseña
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Autenticación de Dos Factores
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Agrega una capa extra de seguridad a tu cuenta
                      </p>
                    </div>
                    <label
                      htmlFor="two-factor-auth"
                      className="relative inline-flex items-center cursor-pointer"
                    >
                      <span className="sr-only">
                        Activar autenticación de dos factores
                      </span>
                      <input
                        type="checkbox"
                        id="two-factor-auth"
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Eliminar Cuenta
                  </h3>
                  <p className="text-sm text-red-700 mb-4">
                    Esta acción es permanente y no se puede deshacer. Todos tus
                    datos serán eliminados.
                  </p>
                  <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors">
                    Eliminar mi Cuenta
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Pedidos Recientes
                  </h2>
                  <Link
                    href="/orders"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ver todos →
                  </Link>
                </div>

                {/* Recent Orders Preview */}
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div
                      key={order}
                      className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Orden #BR2024{order.toString().padStart(3, '0')}
                          </p>
                          <p className="font-semibold text-gray-900">
                            12 de Diciembre, 2024
                          </p>
                        </div>
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Entregado
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-700">
                          3 productos ·{' '}
                          <span className="font-bold">$156.000</span>
                        </p>
                        <Link
                          href={`/orders/${order}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
