import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  variant?: 'centered' | 'split' | 'minimal';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    text: string;
    href?: string;
    type?: 'whatsapp' | 'default';
    variant?: string;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    type?: 'whatsapp' | 'default';
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
  const getWhatsAppUrl = (button: any) => {
    if (button?.type === 'whatsapp') {
      const siteData = require('@/content/site.json');
      const whatsappNumber = siteData?.contact?.whatsapp || '5511999999999';
      const prefillMessage = siteData?.contact?.prefill || 'Olá! Tenho interesse em uma landing page.';
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefillMessage)}`;
    }
    return button?.href || '#';
  };

  return (
    <Section 
      separator={separator}
      background="primary"
      paddingY="2xl"
    >
      {/* Background gradient and effects */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className="absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[200%] h-[200%] bg-primary-600 opacity-10 rounded-full blur-3xl"
          style={{ filter: 'blur(200px)' }}
        />
        <div
          className="absolute -top-1/2 left-0 transform translate-x-1/4 -translate-y-1/4 w-[150%] h-[150%] bg-primary-700 opacity-5 rounded-full blur-3xl"
          style={{ filter: 'blur(150px)' }}
        />
      </div>

      <div className={cn(
        'relative grid gap-12 items-center animate-fade-in-up',
        variant === 'centered' && 'text-center max-w-4xl mx-auto',
        variant === 'split' && 'lg:grid-cols-2',
        variant === 'minimal' && 'text-center max-w-2xl mx-auto'
      )}>
        <div className={cn(
          variant === 'split' && 'lg:order-1'
        )}>
          {subtitle && (
            <p className="text-white/80 font-semibold text-lg mb-4">
              {subtitle}
            </p>
          )}
          
          <Heading 
            level={1} 
            size="2xl" 
            className="text-white mb-6"
          >
            {title}
          </Heading>
          
          {description && (
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {primaryButton && (
              <Button
                asChild
                className="btn-hero group"
              >
                <a 
                  href={getWhatsAppUrl(primaryButton)}
                  target={primaryButton?.type === 'whatsapp' ? '_blank' : undefined}
                  rel={primaryButton?.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                >
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
                <a 
                  href={getWhatsAppUrl(secondaryButton)}
                  target={secondaryButton?.type === 'whatsapp' ? '_blank' : undefined}
                  rel={secondaryButton?.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                >
                  {secondaryButton.text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {image && (
          <div className={cn(
            'relative overflow-hidden rounded-3xl shadow-xl animate-fade-in',
            variant === 'split' && 'lg:order-2',
            variant === 'centered' && 'max-w-lg mx-auto',
            variant === 'minimal' && 'max-w-sm mx-auto'
          )}>
            <img 
              src={image.src} 
              alt={image.alt} 
              className="object-cover w-full h-full" 
            />
          </div>
        )}
      </div>
    </Section>
  );
}
