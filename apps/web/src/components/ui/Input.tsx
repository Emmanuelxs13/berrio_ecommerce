// components/ui/Input.tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-xl border border-dark-700 bg-dark-900/50 backdrop-blur-sm px-4 py-3 text-sm text-dark-50 transition-all',
            'placeholder:text-dark-500',
            'focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
