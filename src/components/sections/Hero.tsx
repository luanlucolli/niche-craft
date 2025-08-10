
import { ArrowRight, Play } from 'lucide-react';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  variant?: 'centered' | 'left-aligned' | 'split';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    text: string;
    href: string;
    variant?: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
    variant?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

export default function Hero({
  variant = 'centered',
  separator = 'none',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  image,
}: HeroProps) {
  const renderContent = () => (
    <div className={cn(
      'animate-fade-in-up',
      variant === 'centered' && 'text-center max-w-4xl mx-auto',
      variant === 'left-aligned' && 'text-left max-w-3xl',
      variant === 'split' && 'text-left max-w-2xl'
    )}>
      {subtitle && (
        <p className="text-primary-600 font-semibold text-lg mb-4 animate-fade-in">
          {subtitle}
        </p>
      )}
      
      <Heading level={1} size="hero" className="mb-6">
        {title}
      </Heading>
      
      {description && (
        <p className="text-lead mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {description}
        </p>
      )}
      
      {(primaryButton || secondaryButton) && (
        <div className={cn(
          'flex flex-col sm:flex-row gap-4 animate-fade-in',
          variant === 'centered' && 'justify-center',
          variant !== 'centered' && 'justify-start'
        )} style={{ animationDelay: '0.4s' }}>
          {primaryButton && (
            <Button
              asChild
              className="btn-hero group"
            >
              <a href={primaryButton.href}>
                {primaryButton.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          )}
          
          {secondaryButton && (
            <Button
              asChild
              className="btn-secondary group"
            >
              <a href={secondaryButton.href}>
                <Play className="mr-2 h-5 w-5" />
                {secondaryButton.text}
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderImage = () => {
    if (!image) return null;
    
    return (
      <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
        <img
          src={image.src}
          alt={image.alt}
          className="rounded-2xl shadow-2xl animate-float"
          style={{ animationDelay: '1s' }}
        />
      </div>
    );
  };

  return (
    <section
      className={cn(
        'relative bg-gradient-hero text-white py-section lg:py-32 overflow-hidden',
        {
          'separator-wave': separator === 'wave',
          'separator-curve': separator === 'curve', 
          'separator-diagonal': separator === 'diagonal',
        }
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      <Container size="wide" className="relative z-10">
        {variant === 'split' ? (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>{renderContent()}</div>
            {renderImage()}
          </div>
        ) : (
          <div className="space-y-12">
            {renderContent()}
            {image && (
              <div className="flex justify-center">
                {renderImage()}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
