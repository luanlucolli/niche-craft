
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'narrow' | 'normal' | 'wide' | 'full';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  background?: 'default' | 'muted' | 'gradient' | 'primary';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export default function Section({
  children,
  className,
  containerSize = 'normal',
  separator = 'none',
  background = 'default',
  paddingY = 'lg',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        {
          // Responsive padding
          'py-8 sm:py-12 md:py-16': paddingY === 'sm',
          'py-12 sm:py-16 md:py-20': paddingY === 'md',
          'py-16 sm:py-20 md:py-24 lg:py-32': paddingY === 'lg',
          'py-20 sm:py-24 md:py-32 lg:py-40': paddingY === 'xl',
          
          // Background - Simplified for consistency
          'bg-white': background === 'default',
          'bg-muted': background === 'muted',
          'bg-brand-gradient': background === 'gradient',
          'bg-brand-gradient text-white': background === 'primary',
          
          // Separators
          'separator-wave': separator === 'wave',
          'separator-curve': separator === 'curve',
          'separator-diagonal': separator === 'diagonal',
        },
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
