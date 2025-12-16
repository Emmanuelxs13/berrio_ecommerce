'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
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
    <section className="relative py-16 bg-gradient-to-br from-accent-600/10 via-purple-600/10 to-accent-600/10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-accent-500/20 mb-6 animate-fade-in-up">
            <Mail className="h-8 w-8 text-accent-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up text-dark-50">
            Suscríbete a nuestro{' '}
            <span className="text-gradient">Newsletter</span>
          </h2>
          <p className="text-dark-400 text-lg mb-8 animate-fade-in-up">
            Recibe ofertas exclusivas, novedades y descuentos especiales
            directamente en tu correo
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-xl shadow-lg animate-fade-in-up">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-medium">
                ¡Gracias por suscribirte! Revisa tu correo.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in-up"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="flex-1 bg-dark-900/50 border-dark-700"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="whitespace-nowrap"
              >
                Suscribirse
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-400" />
              <span>Sin spam</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>100% gratis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
