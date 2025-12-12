'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  Package,
  LogOut,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = useCartStore((state) => state.itemCount);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/80">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center py-2 text-sm font-medium">
        <p>
          🎉 Envío GRATIS en compras mayores a $999 MXN | 🔥 Hasta 50% OFF en
          productos seleccionados
        </p>
      </div>

      <div className="container-custom">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-2 rounded-lg font-black text-xl">
                B
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Berrio
              </div>
              <div className="text-xs text-gray-500 font-medium -mt-1">
                Electronics
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink href="/products">Productos</NavLink>
            <NavLink href="/categories">Categorías</NavLink>
            <NavLink href="/brands">Marcas</NavLink>
            <Link
              href="/offers"
              className="relative px-4 py-2 text-sm font-bold text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
            >
              <span className="relative">
                Ofertas
                <span className="absolute -top-1 -right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </span>
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full group">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar iPhone, MacBook, Samsung..."
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Wishlist - Desktop only */}
            <Link
              href="/wishlist"
              className="hidden lg:flex relative rounded-xl p-2.5 hover:bg-gray-100 transition-colors group"
              title="Lista de deseos"
            >
              <Heart className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition-colors" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-xl p-2.5 hover:bg-gray-100 transition-all group"
              title="Carrito"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              {itemCount > 0 && (
                <>
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-lg animate-scale-in">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                  <span className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-blue-400 animate-ping opacity-75" />
                </>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center space-x-2 rounded-xl px-3 py-2.5 hover:bg-gray-100 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                    {user?.name || 'Usuario'}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 -translate-y-2">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-2">
                    <DropdownLink
                      href="/profile"
                      icon={<User className="h-4 w-4" />}
                    >
                      Mi Perfil
                    </DropdownLink>
                    <DropdownLink
                      href="/orders"
                      icon={<Package className="h-4 w-4" />}
                    >
                      Mis Órdenes
                    </DropdownLink>
                    <DropdownLink
                      href="/wishlist"
                      icon={<Heart className="h-4 w-4" />}
                    >
                      Lista de Deseos
                    </DropdownLink>
                    <DropdownLink
                      href="/settings"
                      icon={<Settings className="h-4 w-4" />}
                    >
                      Configuración
                    </DropdownLink>
                  </div>
                  <div className="border-t border-gray-100 p-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <User className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden lg:hidden rounded-xl p-2.5 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 pl-11 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-1 pt-4">
              <MobileNavLink
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </MobileNavLink>
              <MobileNavLink
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categorías
              </MobileNavLink>
              <MobileNavLink
                href="/brands"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marcas
              </MobileNavLink>
              <MobileNavLink
                href="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-red-600"
              >
                🔥 Ofertas
              </MobileNavLink>
              <MobileNavLink
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
              >
                ❤️ Lista de Deseos
              </MobileNavLink>
              {isAuthenticated ? (
                <>
                  <div className="border-t pt-2 mt-2">
                    <MobileNavLink
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      👤 Mi Perfil
                    </MobileNavLink>
                    <MobileNavLink
                      href="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      📦 Mis Órdenes
                    </MobileNavLink>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mx-4 mt-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all"
                >
                  <User className="h-5 w-5" />
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Helper Components
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-3 text-sm font-semibold hover:bg-gray-100 rounded-lg transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

function DropdownLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg mx-2 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
