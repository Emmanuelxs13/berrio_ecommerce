'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubscribed(true);
    setEmail('');
    setIsLoading(false);

    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fadeInUp">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
            Suscríbete a nuestro Newsletter
          </h2>
          <p className="text-primary-100 text-lg mb-8 animate-fadeInUp">
            Recibe ofertas exclusivas, novedades y descuentos especiales
            directamente en tu correo
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 bg-green-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg animate-fadeInUp">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-medium">
                ¡Gracias por suscribirte! Revisa tu correo.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fadeInUp"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="flex-1 bg-white/90 backdrop-blur-sm border-0 focus:ring-white/50"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                isLoading={isLoading}
                className="whitespace-nowrap bg-white text-primary-600 hover:bg-gray-100"
              >
                Suscribirse
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
