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
  Search,
} from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { useFavoritesStore } from '@/store/favorites';
import { SearchBarAdvanced } from '@/components/search/SearchBarAdvanced';
import CategoryMegaMenu from '@/components/categories/CategoryMegaMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { summary } = useCartStore();
  const favoritesCount = useFavoritesStore((state) => state.count);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-black backdrop-blur-md border-b border-black shadow-lg shadow-black/50">
      {/* Top Bar - Elegante */}
      <div className="border-b border-elegant-wine/20">
        <div className="container-custom">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-6 text-dark-300">
              <span className="hidden md:inline">
                Envío gratis en compras superiores a $ 100.000
              </span>
              <span className="hidden lg:inline text-elegant-wine/50">|</span>
              <span className="hidden lg:inline">
                Garantía extendida disponible
              </span>
            </div>
            <div className="flex items-center gap-4 text-dark-300">
              <Link
                href="/help"
                className="hover:text-accent-500 transition-colors"
              >
                Ayuda
              </Link>
              <span className="text-elegant-wine/50">|</span>
              <Link
                href="/contact"
                className="hover:text-accent-500 transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo - Elegante y sofisticado */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-900 to-elegant-wine rounded-lg shadow-lg shadow-accent-900/50 transition-all group-hover:scale-105 group-hover:shadow-accent-900/80">
              <span className="text-white font-black text-2xl tracking-tighter">
                B
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-dark-50 tracking-tight">
                Berrio
              </div>
              <div className="text-[10px] text-accent-500 font-medium -mt-0.5 tracking-wider uppercase">
                Elite Collection
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Elegante */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/products"
              className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-dark-50 hover:bg-elegant-wine/20 rounded-lg transition-all"
            >
              Productos
            </Link>
            <CategoryMegaMenu />
            <Link
              href="/brands"
              className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-dark-50 hover:bg-elegant-wine/20 rounded-lg transition-all"
            >
              Marcas
            </Link>
            <Link
              href="/offers"
              className="relative px-4 py-2 text-sm font-medium text-accent-400 hover:text-accent-300 hover:bg-accent-900/30 rounded-lg transition-all"
            >
              {' '}
              Ofertas
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <SearchBarAdvanced />
          </div>

          {/* Actions - Iconos elegantes */}
          <div className="flex items-center gap-2">
            {/* Search - Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-dark-300 hover:text-dark-50 hover:bg-elegant-wine/20 rounded-lg transition-all"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/favorites"
              className="hidden lg:flex relative p-2 text-dark-300 hover:text-dark-50 hover:bg-elegant-wine/20 rounded-lg transition-all"
              title="Favoritos"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-900 text-[10px] font-bold text-white shadow-lg">
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart - Elegante */}
            <Link
              href="/cart"
              className="relative p-2 text-dark-300 hover:text-dark-50 hover:bg-elegant-wine/20 rounded-lg transition-all"
              title="Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              {summary.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-900 text-[10px] font-bold text-white shadow-lg">
                  {summary.itemCount > 9 ? '9+' : summary.itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-elegant-wine/20 rounded-lg transition-all">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-900 to-elegant-wine flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-dark-200 max-w-[100px] truncate">
                    {user?.name || 'Usuario'}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-elegant-navy border border-elegant-wine/30 shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-elegant-wine/20">
                    <p className="text-sm font-semibold text-dark-50">
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
                      Favoritos
                    </DropdownLink>
                    <DropdownLink
                      href="/settings"
                      icon={<Settings className="h-4 w-4" />}
                    >
                      Configuración
                    </DropdownLink>
                  </div>
                  <div className="border-t border-elegant-wine/20 p-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent-900/30 text-accent-400 transition-colors"
                    >
                      {' '}
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-900 to-elegant-wine hover:from-accent-800 hover:to-elegant-wine/90 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-accent-900/30"
              >
                <User className="h-4 w-4" />
                <span>Ingresar</span>
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-dark-400 hover:text-dark-50 hover:bg-dark-800/50 rounded-lg transition-all"
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-dark-800/50 bg-dark-900/50 p-4">
          <SearchBarAdvanced />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-dark-800/50 bg-dark-900/50">
          <div className="container-custom py-4">
            <nav className="flex flex-col gap-1">
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
                Ofertas
              </MobileNavLink>
              <MobileNavLink
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
              >
                Favoritos
              </MobileNavLink>

              {isAuthenticated ? (
                <div className="border-t border-dark-800/50 pt-2 mt-2">
                  <MobileNavLink
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi Perfil
                  </MobileNavLink>
                  <MobileNavLink
                    href="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mis Órdenes
                  </MobileNavLink>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium rounded-lg transition-all"
                >
                  <User className="h-4 w-4" />
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

// Helper Components
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
      className={`px-4 py-2 text-sm font-medium text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-lg transition-all ${className}`}
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
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-lg mx-2 transition-all"
    >
      {icon}
      {children}
    </Link>
  );
}
