'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Suscríbete a nuestro Newsletter
          </h2>
          <p className="text-primary-100 mb-8">
            Recibe ofertas exclusivas, novedades y descuentos especiales
            directamente en tu correo
          </p>
          {subscribed ? (
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg">
              ¡Gracias por suscribirte! Revisa tu correo.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
