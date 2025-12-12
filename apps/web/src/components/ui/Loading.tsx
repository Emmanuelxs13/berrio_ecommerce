import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const variantClasses = {
  primary: 'text-primary-600',
  white: 'text-white',
  gray: 'text-gray-600',
};

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    { size = 'md', variant = 'primary', text, fullScreen = false, className },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center gap-3',
          fullScreen && 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50',
          className
        )}
      >
        <Loader2
          className={cn(
            'animate-spin',
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
        {text && (
          <p
            className={cn(
              'font-medium',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-base',
              size === 'lg' && 'text-lg',
              size === 'xl' && 'text-xl',
              variant === 'white' ? 'text-white' : 'text-gray-600'
            )}
          >
            {text}
          </p>
        )}
      </div>
    );

    return content;
  }
);

Loading.displayName = 'Loading';

// Loading overlay para cubrir secciones específicas
export const LoadingOverlay: React.FC<{
  visible: boolean;
  text?: string;
}> = ({ visible, text = 'Cargando...' }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10">
      <Loading size="lg" text={text} />
    </div>
  );
};
