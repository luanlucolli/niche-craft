
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'hero' | 'xl' | 'lg' | 'md' | 'sm';
  centered?: boolean;
  className?: string;
}

export default function Heading({ 
  children, 
  level = 2, 
  size = 'lg', 
  centered = false,
  className 
}: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Component
      className={cn(
        'font-bold tracking-tight text-foreground',
        {
          // Responsive sizes
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl': size === 'hero',
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl': size === 'xl',
          'text-xl sm:text-2xl md:text-3xl lg:text-4xl': size === 'lg',
          'text-lg sm:text-xl md:text-2xl lg:text-3xl': size === 'md',
          'text-base sm:text-lg md:text-xl lg:text-2xl': size === 'sm',
          
          'text-center': centered,
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
