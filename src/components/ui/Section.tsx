
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type SectionTone = 'surface-0' | 'surface-1' | 'surface-2' | 'solid-primary' | 'solid-secondary' | 'gradient' | 'gradient-soft';
type SectionPattern = 'none' | 'dots' | 'grid';
type SectionWidth = 'default' | 'wide' | 'full';
type SectionGrid = 'none' | 'grid-12' | 'asym-left' | 'asym-right';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'narrow' | 'normal' | 'wide' | 'full';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  separatorColor?: 'auto' | 'primary' | 'secondary' | 'muted';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
  
  // Sistema de tema
  tone?: SectionTone;
  pattern?: SectionPattern;
  width?: SectionWidth;
  grid?: SectionGrid;
  
  // Props legadas (compatibilidade)
  background?: 'default' | 'muted' | 'gradient' | 'primary';
  accent?: 'primary' | 'secondary';
}

export default function Section({
  children,
  className,
  containerSize = 'normal',
  separator = 'none',
  separatorColor = 'auto',
  paddingY = 'lg',
  id,
  tone = 'surface-0',
  pattern = 'none',
  width = 'default',
  grid = 'none',
  background,
  accent = 'primary',
}: SectionProps) {
  // Mapear props legadas
  const effectiveTone = background ? mapLegacyBackground(background, accent) : tone;
  const effectiveWidth = containerSize !== 'normal' ? mapLegacyContainerSize(containerSize) : width;
  
  // Cor do separador
  const getSeparatorColor = () => {
    if (separatorColor === 'auto') {
      if (effectiveTone.includes('solid') || effectiveTone === 'gradient') {
        return 'text-white';
      }
      return 'text-brand-primary';
    }
    
    return {
      'primary': 'text-brand-primary',
      'secondary': 'text-brand-secondary',
      'muted': 'text-muted-foreground'
    }[separatorColor] || 'text-brand-primary';
  };
  
  // Classes de tema
  const getToneClasses = () => {
    switch (effectiveTone) {
      case 'surface-0':
        return 'bg-surface-0 text-ink';
      case 'surface-1':
        return 'bg-surface-1 text-ink';
      case 'surface-2':
        return 'bg-surface-2 text-ink';
      case 'solid-primary':
        return 'bg-brand-primary text-white';
      case 'solid-secondary':
        return 'bg-brand-secondary text-white';
      case 'gradient':
        return 'bg-gradient-brand text-white';
      case 'gradient-soft':
        return 'bg-gradient-brand-soft bg-radial-brand-soft text-ink';
      default:
        return 'bg-surface-0 text-ink';
    }
  };
  
  // Classes de largura
  const getWidthClasses = () => {
    switch (effectiveWidth) {
      case 'wide':
        return 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl';
      case 'full':
        return 'w-full px-4 sm:px-6 lg:px-8';
      default:
        return 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl';
    }
  };
  
  // Classes de grid
  const getGridClasses = () => {
    switch (grid) {
      case 'grid-12':
        return 'grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8';
      case 'asym-left':
        return 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8';
      case 'asym-right':
        return 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8';
      default:
        return '';
    }
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        {
          'py-8 sm:py-12 md:py-16': paddingY === 'sm',
          'py-12 sm:py-16 md:py-20': paddingY === 'md',
          'py-16 sm:py-20 md:py-24 lg:py-32': paddingY === 'lg',
          'py-20 sm:py-24 md:py-32 lg:py-40': paddingY === 'xl',
        },
        getToneClasses(),
        getSeparatorColor(),
        className
      )}
    >
      {pattern !== 'none' && (
        <div 
          className={cn(
            'absolute inset-0 pointer-events-none',
            {
              'pattern-dots': pattern === 'dots',
              'pattern-grid': pattern === 'grid',
            }
          )}
          style={{ zIndex: 1 }}
        />
      )}
      
      <div className={cn(getWidthClasses(), 'relative')} style={{ zIndex: 2 }}>
        {grid !== 'none' ? (
          <div className={getGridClasses()}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

// Funções helper para compatibilidade
function mapLegacyBackground(background: string, accent: string): SectionTone {
  switch (background) {
    case 'muted':
      return 'surface-1';
    case 'gradient':
      return 'gradient-soft';
    case 'primary':
      return accent === 'primary' ? 'solid-primary' : 'solid-secondary';
    default:
      return 'surface-0';
  }
}

function mapLegacyContainerSize(containerSize: string): SectionWidth {
  switch (containerSize) {
    case 'wide':
      return 'wide';
    case 'full':
      return 'full';
    case 'narrow':
      return 'default';
    default:
      return 'default';
  }
}
