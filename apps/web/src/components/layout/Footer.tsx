import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-primary-600 mb-4">Berrio</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tu tienda de electrónicos de confianza. Los mejores productos a
              los mejores precios.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Envíos
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Garantías
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">
              Suscríbete para recibir ofertas exclusivas
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
              />
              <button className="rounded-r-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Berrio Electronics. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
