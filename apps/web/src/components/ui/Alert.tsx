import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
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
    container: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: 'text-blue-600',
    Icon: Info,
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-900',
    icon: 'text-green-600',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    icon: 'text-yellow-600',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-600',
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
            {title && (
              <h5 className="font-semibold mb-1">{title}</h5>
            )}
            <div className="text-sm">{children}</div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
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
