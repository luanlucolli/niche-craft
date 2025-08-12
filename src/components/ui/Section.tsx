
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'narrow' | 'normal' | 'wide' | 'full';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  background?: 'default' | 'muted' | 'gradient' | 'primary';
  tone?: 'soft' | 'solid';
  accent?: 'primary' | 'secondary';
  separatorColor?: 'primary' | 'secondary' | 'muted';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export default function Section({
  children,
  className,
  containerSize = 'normal',
  separator = 'none',
  background = 'default',
  tone = 'soft',
  accent = 'primary',
  separatorColor = 'primary',
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
          
          // Background with tone support
          'bg-background': background === 'default',
          'bg-muted/50': background === 'muted',
          'bg-gradient-to-br from-brand-primary-50/50 to-brand-secondary-50/30': 
            background === 'gradient' && tone === 'soft',
          'bg-gradient-to-br from-brand-primary-500 to-brand-secondary-500 text-white': 
            background === 'gradient' && tone === 'solid',
          'bg-gradient-hero text-white': background === 'primary',
          
          // Accent-based backgrounds
          'bg-brand-primary-50/30': background === 'default' && tone === 'soft' && accent === 'primary',
          'bg-brand-secondary-50/30': background === 'default' && tone === 'soft' && accent === 'secondary',
          'bg-brand-primary-500 text-white': background === 'default' && tone === 'solid' && accent === 'primary',
          'bg-brand-secondary-500 text-white': background === 'default' && tone === 'solid' && accent === 'secondary',
          
          // Separators with color support
          'separator-wave': separator === 'wave',
          'separator-curve': separator === 'curve',
          'separator-diagonal': separator === 'diagonal',
          
          // Separator colors
          'text-brand-primary-500': separatorColor === 'primary',
          'text-brand-secondary-500': separatorColor === 'secondary',
          'text-muted': separatorColor === 'muted',
        },
        className
      )}
      style={{
        // Custom CSS for separator colors using currentColor
        '--separator-color': separatorColor === 'primary' ? 'hsl(var(--brand-primary))' :
                           separatorColor === 'secondary' ? 'hsl(var(--brand-secondary))' :
                           'hsl(var(--muted))'
      } as React.CSSProperties}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
