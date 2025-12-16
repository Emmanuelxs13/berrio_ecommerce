import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantStyles = {
  info: {
    container:
      'bg-accent-500/10 border-accent-500/20 text-accent-200 backdrop-blur-sm',
    icon: 'text-accent-400',
    Icon: Info,
  },
  success: {
    container:
      'bg-emerald-500/10 border-emerald-500/20 text-emerald-200 backdrop-blur-sm',
    icon: 'text-emerald-400',
    Icon: CheckCircle2,
  },
  warning: {
    container:
      'bg-orange-500/10 border-orange-500/20 text-orange-200 backdrop-blur-sm',
    icon: 'text-orange-400',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-500/10 border-red-500/20 text-red-200 backdrop-blur-sm',
    icon: 'text-red-400',
    Icon: AlertCircle,
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, children, onClose, className }, ref) => {
    const { container, icon, Icon } = variantStyles[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative rounded-lg border p-4',
          'animate-fadeIn',
          container,
          className
        )}
      >
        <div className="flex gap-3">
          <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', icon)} />

          <div className="flex-1">
            {title && <h5 className="font-semibold mb-1">{title}</h5>}
            <div className="text-sm">{children}</div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Cerrar alerta"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
