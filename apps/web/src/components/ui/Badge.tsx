// components/ui/Badge.tsx
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-dark-800/50 text-dark-300 border border-dark-700',
      success:
        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      warning: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      error: 'bg-red-500/10 text-red-400 border border-red-500/20',
      info: 'bg-accent-500/10 text-accent-400 border border-accent-500/20',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
