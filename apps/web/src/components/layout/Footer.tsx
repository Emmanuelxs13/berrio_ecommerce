import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Berrio
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Tu tienda de electrónicos de confianza. Los mejores productos a
              los mejores precios.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-md transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-md transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-md transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-md transition-all"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Sobre Nosotros
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Contacto
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Preguntas Frecuentes
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Envíos
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">
              Atención al Cliente
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Mis Pedidos
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Devoluciones
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Garantías
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Privacidad
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Mini */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Suscríbete para recibir ofertas exclusivas
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu email"
                className="flex-1 text-sm"
              />
              <Button
                size="md"
                variant="primary"
                className="shrink-0"
                aria-label="Suscribirse"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>
              &copy; 2024 Berrio Electronics. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="hover:text-primary-600 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/privacy"
                className="hover:text-primary-600 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/cookies"
                className="hover:text-primary-600 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
