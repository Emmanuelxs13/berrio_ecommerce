'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  User,
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
import { useFavoritesStore } from '@/store/favorites';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchBarAdvanced } from '@/components/search/SearchBarAdvanced';
import CategoryMegaMenu from '@/components/categories/CategoryMegaMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { summary } = useCartStore();
  const favoritesCount = useFavoritesStore((state) => state.count);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-800/50 bg-dark-950/80 backdrop-blur-xl shadow-2xl shadow-dark-950/50">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-accent-600 via-purple-600 to-accent-600 text-white text-center py-2.5 text-sm font-medium">
        <p className="flex items-center justify-center gap-2">
          <span className="hidden sm:inline">🎉</span>
          <span>Envío GRATIS en compras mayores a $999 MXN</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden md:inline">
            🔥 Hasta 50% OFF en productos seleccionados
          </span>
        </p>
      </div>

      <div className="container-custom">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-accent-600 to-purple-600 text-white px-3 py-2 rounded-xl font-black text-xl shadow-lg">
                B
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-black text-gradient">Berrio</div>
              <div className="text-xs text-dark-400 font-medium -mt-1">
                Electronics
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink href="/products">Productos</NavLink>
            <CategoryMegaMenu />
            <NavLink href="/brands">Marcas</NavLink>
            <Link
              href="/offers"
              className="relative px-4 py-2 text-sm font-bold text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/10 transition-colors"
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

          {/* Search Bar - Desktop (Advanced) */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchBarAdvanced />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Wishlist - Desktop only */}
            <Link
              href="/favorites"
              className="hidden lg:flex relative rounded-xl p-2.5 hover:bg-dark-800/50 transition-colors group"
              title="Lista de deseos"
            >
              <Heart className="h-6 w-6 text-dark-300 group-hover:text-red-400 transition-colors" />
              {favoritesCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold text-white shadow-lg">
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-xl p-2.5 hover:bg-dark-800/50 transition-all group"
              title="Carrito"
            >
              <ShoppingCart className="h-6 w-6 text-dark-300 group-hover:text-accent-400 transition-colors" />
              {summary.itemCount > 0 && (
                <>
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-accent-600 to-purple-600 text-xs font-bold text-white shadow-lg animate-scale-in">
                    {summary.itemCount > 9 ? '9+' : summary.itemCount}
                  </span>
                  <span className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-accent-400 animate-ping opacity-75" />
                </>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center space-x-2 rounded-xl px-3 py-2.5 hover:bg-dark-800/50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-semibold text-dark-200 max-w-[100px] truncate">
                    {user?.name || 'Usuario'}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-900 border border-dark-800 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 -translate-y-2">
                  <div className="p-3 border-b border-dark-800">
                    <p className="text-sm font-bold text-dark-50">
                      {user?.name}
                    </p>
                    <p className="text-xs text-dark-400 truncate">
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
                      href="/favorites"
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
                  <div className="border-t border-dark-800 p-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
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
                className="hidden md:flex items-center space-x-2 rounded-xl bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-700 hover:to-purple-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-accent-500/50 transition-all hover:scale-105"
              >
                <User className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden lg:hidden rounded-xl p-2.5 hover:bg-dark-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-dark-300" />
              ) : (
                <Menu className="h-6 w-6 text-dark-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-800 animate-fade-in">
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
                className="text-red-400"
              >
                🔥 Ofertas
              </MobileNavLink>
              <MobileNavLink
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
              >
                ❤️ Lista de Deseos
              </MobileNavLink>
              {isAuthenticated ? (
                <>
                  <div className="border-t border-dark-800 pt-2 mt-2">
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
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mx-4 mt-3 px-4 py-3 bg-gradient-to-r from-accent-600 to-purple-600 text-white font-bold rounded-xl hover:from-accent-700 hover:to-purple-700 shadow-lg transition-all"
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
      className="px-4 py-2 text-sm font-semibold text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-xl transition-colors"
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
      className={`px-4 py-3 text-sm font-semibold text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-xl transition-colors ${className}`}
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
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-dark-200 hover:text-dark-50 hover:bg-dark-800/50 rounded-lg mx-2 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
