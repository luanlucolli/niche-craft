
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FieldProps {
  children: ReactNode;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function Field({
  children,
  label,
  hint,
  error,
  required = false,
  className,
}: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="form-hint">{hint}</p>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
