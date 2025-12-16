'use client';

import { Clock } from 'lucide-react';
import { useCountdown, formatTimeUnit } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
  onExpire?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}

/**
 * Componente de temporizador de cuenta regresiva
 * Muestra días, horas, minutos y segundos restantes
 */
export function CountdownTimer({
  targetDate,
  onExpire,
  size = 'md',
  variant = 'default',
}: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  // Llamar callback si expira
  if (isExpired && onExpire) {
    onExpire();
  }

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 text-dark-400 rounded-lg">
        <Clock className="h-4 w-4" />
        <span className="font-semibold">Oferta expirada</span>
      </div>
    );
  }

  // Tamaños de fuente según prop
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const textSize = sizeClasses[size];

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold shadow-lg shadow-red-500/20">
        <Clock className="h-4 w-4" />
        <span className="text-sm">
          {days > 0 && `${days}d `}
          {formatTimeUnit(hours)}:{formatTimeUnit(minutes)}:
          {formatTimeUnit(seconds)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Días (solo si > 0) */}
      {days > 0 && (
        <>
          <div className="flex flex-col items-center bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl px-4 py-3 min-w-[70px] shadow-lg shadow-red-500/20">
            <span className={`font-black ${textSize}`}>
              {formatTimeUnit(days)}
            </span>
            <span className="text-xs font-semibold uppercase">Días</span>
          </div>
          <span className="text-2xl font-black text-dark-500">:</span>
        </>
      )}

      {/* Horas */}
      <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl px-4 py-3 min-w-[70px] shadow-lg shadow-orange-500/20">
        <span className={`font-black ${textSize}`}>
          {formatTimeUnit(hours)}
        </span>
        <span className="text-xs font-semibold uppercase">Horas</span>
      </div>

      <span className="text-2xl font-black text-dark-500">:</span>

      {/* Minutos */}
      <div className="flex flex-col items-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl px-4 py-3 min-w-[70px] shadow-lg shadow-purple-500/20">
        <span className={`font-black ${textSize}`}>
          {formatTimeUnit(minutes)}
        </span>
        <span className="text-xs font-semibold uppercase">Min</span>
      </div>

      <span className="text-2xl font-black text-dark-500">:</span>

      {/* Segundos */}
      <div className="flex flex-col items-center bg-gradient-to-br from-accent-500 to-purple-500 text-white rounded-xl px-4 py-3 min-w-[70px] shadow-lg shadow-accent-500/20 animate-pulse">
        <span className={`font-black ${textSize}`}>
          {formatTimeUnit(seconds)}
        </span>
        <span className="text-xs font-semibold uppercase">Seg</span>
      </div>
    </div>
  );
}
