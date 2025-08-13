
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
        },
        className
      )}
    >
      {/* Separador superior com gradiente */}
      {separator !== 'none' && (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-${id || Math.random()}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--brand-primary))" />
                <stop offset="100%" stopColor="hsl(var(--brand-secondary))" />
              </linearGradient>
            </defs>
            <path
              d={
                separator === 'wave'
                  ? "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  : separator === 'curve'
                  ? "M0,0V46.29c47.79,22.4,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  : "M1200 120L0 16.48 0 0 1200 0 1200 120z"
              }
              fill={`url(#gradient-${id || Math.random()})`}
            />
          </svg>
        </div>
      )}
      
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
