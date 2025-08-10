
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'hero' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
  centered?: boolean;
}

export default function Heading({ 
  children, 
  level = 2, 
  size, 
  className,
  centered = false 
}: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Auto-size based on heading level if no size specified
  const defaultSize = size || (['hero', 'xl', 'lg', 'md', 'sm', 'xs'] as const)[level - 1] || 'md';
  
  return (
    <Component
      className={cn(
        'font-bold tracking-tight text-foreground',
        {
          'heading-hero': defaultSize === 'hero',
          'heading-xl': defaultSize === 'xl',
          'heading-lg': defaultSize === 'lg',
          'heading-md': defaultSize === 'md',
          'heading-sm': defaultSize === 'sm',
          'text-lg font-semibold': defaultSize === 'xs',
          'text-center': centered,
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
