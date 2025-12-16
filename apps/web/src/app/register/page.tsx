'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  Check,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { registerSchema } from '@/lib/validations';
import { z } from 'zod';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  form?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    isLoading,
    error: authError,
    isAuthenticated,
  } = useAuthStore();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Calculate password strength
  useEffect(() => {
    const password = formData.password;
    if (!password) {
      setPasswordStrength({ score: 0, label: '', color: '' });
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengths = [
      { label: 'Muy débil', color: 'bg-red-500' },
      { label: 'Débil', color: 'bg-orange-500' },
      { label: 'Regular', color: 'bg-yellow-500' },
      { label: 'Buena', color: 'bg-lime-500' },
      { label: 'Muy segura', color: 'bg-green-500' },
    ];

    setPasswordStrength({
      score,
      label: strengths[score - 1]?.label || '',
      color: strengths[score - 1]?.color || '',
    });
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form with Zod
    try {
      registerSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: 'Debes aceptar los términos y condiciones' });
      return;
    }

    // Call register from store
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      // If successful, redirect to home (useEffect will handle this)
    } catch (err) {
      // Error is handled by the store and available in authError
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float [animation-delay:2s]" />
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-purple-600 rounded-lg blur opacity-50" />
                <div className="relative bg-gradient-to-r from-accent-600 to-purple-600 text-white px-3 py-2 rounded-lg font-black text-xl ring-2 ring-white/30">
                  B
                </div>
              </div>
              <div className="text-2xl font-black bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Berrio Electronics
              </div>
            </Link>

            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-purple-600 rounded-full blur-xl opacity-50" />
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-accent-600 to-purple-600 text-white">
                <ShoppingBag className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-dark-50 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-dark-300">
              Únete a la mejor tienda de electrónica
            </p>
          </div>

          {/* Form */}
          <div className="bg-dark-900/50 backdrop-blur-xl rounded-2xl shadow-xl border border-dark-800 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-dark-200"
                >
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-dark-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-700 focus:border-accent-500 focus:ring-accent-500/20'
                    } bg-dark-900/50 px-5 py-3 pl-11 text-sm text-dark-50 placeholder:text-dark-500 focus:bg-dark-900 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="Juan Pérez"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <X className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-dark-200"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-dark-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-700 focus:border-accent-500 focus:ring-accent-500/20'
                    } bg-dark-900/50 px-5 py-3 pl-11 text-sm text-dark-50 placeholder:text-dark-500 focus:bg-dark-900 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <X className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-dark-200"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-dark-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 ${
                      errors.password
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-700 focus:border-accent-500 focus:ring-accent-500/20'
                    } bg-dark-900/50 px-5 py-3 pl-11 pr-11 text-sm text-dark-50 placeholder:text-dark-500 focus:bg-dark-900 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && passwordStrength.score > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength.score
                              ? passwordStrength.color
                              : 'bg-dark-800'
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs font-semibold ${
                        passwordStrength.score >= 4
                          ? 'text-emerald-400'
                          : passwordStrength.score >= 3
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      Seguridad: {passwordStrength.label}
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <X className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-dark-300 font-semibold">
                    La contraseña debe contener:
                  </p>
                  <PasswordRequirement
                    met={formData.password.length >= 8}
                    text="Mínimo 8 caracteres"
                  />
                  <PasswordRequirement
                    met={
                      /[a-z]/.test(formData.password) &&
                      /[A-Z]/.test(formData.password)
                    }
                    text="Mayúsculas y minúsculas"
                  />
                  <PasswordRequirement
                    met={/\d/.test(formData.password)}
                    text="Al menos un número"
                  />
                  <PasswordRequirement
                    met={/[^a-zA-Z0-9]/.test(formData.password)}
                    text="Al menos un carácter especial"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-bold text-dark-200"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-dark-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full rounded-xl border-2 ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-700 focus:border-accent-500 focus:ring-accent-500/20'
                    } bg-dark-900/50 px-5 py-3 pl-11 pr-11 text-sm text-dark-50 placeholder:text-dark-500 focus:bg-dark-900 focus:outline-none focus:ring-4 transition-all`}
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <X className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-2 border-dark-600 bg-dark-800 text-accent-500 focus:ring-4 focus:ring-accent-500/20 cursor-pointer transition-all"
                    />
                  </div>
                  <span className="text-sm text-dark-300 group-hover:text-dark-100 transition-colors">
                    Acepto los{' '}
                    <Link
                      href="/terms"
                      className="font-bold text-accent-400 hover:text-accent-300 hover:underline"
                    >
                      términos y condiciones
                    </Link>{' '}
                    y la{' '}
                    <Link
                      href="/privacy"
                      className="font-bold text-accent-400 hover:text-accent-300 hover:underline"
                    >
                      política de privacidad
                    </Link>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <X className="h-4 w-4" />
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Form Error */}
              {(errors.form || authError) && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                  <p className="text-sm text-red-400 font-medium flex items-center gap-2">
                    <X className="h-5 w-5" />
                    {errors.form || authError}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-accent-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-accent-500/20 hover:shadow-xl hover:shadow-accent-500/30 focus:outline-none focus:ring-4 focus:ring-accent-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-dark-300">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href="/login"
                  className="font-bold text-accent-400 hover:text-accent-300 hover:underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-dark-900/50 backdrop-blur-sm p-4 shadow-sm border border-dark-800">
              <div className="text-2xl mb-1">🚚</div>
              <p className="text-xs font-semibold text-dark-200">
                Envío Gratis
              </p>
            </div>
            <div className="rounded-xl bg-dark-900/50 backdrop-blur-sm p-4 shadow-sm border border-dark-800">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-xs font-semibold text-dark-200">Pago Seguro</p>
            </div>
            <div className="rounded-xl bg-dark-900/50 backdrop-blur-sm p-4 shadow-sm border border-dark-800">
              <div className="text-2xl mb-1">⚡</div>
              <p className="text-xs font-semibold text-dark-200">
                Entrega Rápida
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for password requirements
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          met ? 'bg-emerald-500' : 'bg-dark-700'
        } transition-colors`}
      >
        {met && <Check className="h-3 w-3 text-white" />}
      </div>
      <p
        className={`text-xs ${
          met ? 'text-emerald-400 font-semibold' : 'text-dark-400'
        } transition-colors`}
      >
        {text}
      </p>
    </div>
  );
}
