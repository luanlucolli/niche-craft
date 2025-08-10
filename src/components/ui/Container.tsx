
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'narrow' | 'normal' | 'wide' | 'full';
  className?: string;
}

export default function Container({ 
  children, 
  size = 'normal', 
  className 
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-4xl': size === 'narrow',
          'max-w-6xl': size === 'normal', 
          'max-w-7xl': size === 'wide',
          'max-w-none': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
