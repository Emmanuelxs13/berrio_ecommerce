import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  showClose?: boolean;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-50 animate-fadeIn">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        {/* Content Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
};

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ children, className, showClose = true }, ref) => {
  const context = React.useContext(DialogContext);

  return (
    <div
      ref={ref}
      className={cn(
        'relative bg-white rounded-xl shadow-2xl',
        'w-full max-w-lg max-h-[90vh] overflow-y-auto',
        'animate-slideIn',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {showClose && (
        <button
          onClick={() => context?.onOpenChange(false)}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}
      {children}
    </div>
  );
});

DialogContent.displayName = 'DialogContent';

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h2
      className={cn(
        'text-2xl font-bold text-gray-900',
        className
      )}
    >
      {children}
    </h2>
  );
};

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn('text-gray-600 mt-2', className)}>
      {children}
    </p>
  );
};

export const DialogBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

export const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-6 pt-4 flex items-center justify-end gap-3',
        'border-t border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
};
