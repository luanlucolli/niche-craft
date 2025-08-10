
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Shield, Zap, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import siteData from '@/content/site.json';

interface CTAProps {
  variant?: 'centered' | 'split' | 'minimal';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  description?: string;
  button?: {
    text: string;
    href?: string;
    type?: 'whatsapp' | 'default';
    variant?: string;
  };
  features?: string[];
}

// Badges de confiança
const trustBadges = [
  {
    icon: Shield,
    text: "Sem enrolação"
  },
  {
    icon: Smartphone,
    text: "Acessível"
  },
  {
    icon: Zap,
    text: "Rápido no mobile"
  }
];

export default function CTA({
  variant = 'centered',
  separator = 'none',
  title,
  subtitle,
  description,
  button,
  features,
}: CTAProps) {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      const ctaSection = document.querySelector('[data-cta-section]');
      if (ctaSection && isMobile) {
        const rect = ctaSection.getBoundingClientRect();
        setShowStickyBar(rect.bottom < window.innerHeight);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const getWhatsAppUrl = () => {
    if (button?.type === 'whatsapp') {
      const whatsappNumber = siteData?.contact?.whatsapp || '5511999999999';
      const prefillMessage = siteData?.contact?.prefill || 'Olá! Tenho interesse em uma landing page.';
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefillMessage)}`;
    }
    return button?.href || '#';
  };

  const renderButton = (className?: string) => (
    <Button
      asChild
      className={cn(
        "bg-white text-primary-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-white/30",
        className
      )}
    >
      <a 
        href={getWhatsAppUrl()}
        target={button?.type === 'whatsapp' ? '_blank' : undefined}
        rel={button?.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
      >
        {button?.text}
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </a>
    </Button>
  );

  return (
    <>
      <Section 
        separator={separator}
        background="primary"
        paddingY="xl"
        data-cta-section
      >
        <div 
          className="relative"
          role="region"
          aria-labelledby="cta-title"
          tabIndex={-1}
        >
          {/* Gradiente de fundo suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-primary-800/20 rounded-3xl" />
          
          <div className={cn(
            'relative text-center animate-fade-in-up',
            variant === 'centered' && 'max-w-4xl mx-auto',
            variant === 'split' && 'grid lg:grid-cols-2 gap-12 items-center text-left',
            variant === 'minimal' && 'max-w-2xl mx-auto'
          )}>
            <div>
              {subtitle && (
                <p className="text-white/80 font-semibold text-lg mb-4">
                  {subtitle}
                </p>
              )}
              
              <Heading 
                level={2} 
                size="lg" 
                className={cn(
                  'text-white mb-6',
                  variant === 'centered' && 'text-center',
                  variant !== 'centered' && 'text-left'
                )}
              >
                {title}
              </Heading>
              
              {description && (
                <p className={cn(
                  'text-white/90 text-lg leading-relaxed mb-8',
                  variant === 'centered' && 'text-center',
                  variant !== 'centered' && 'text-left'
                )}>
                  {description}
                </p>
              )}

              {/* Badges de confiança */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {trustBadges.map((badge, index) => {
                  const IconComponent = badge.icon;
                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm animate-fade-in"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{badge.text}</span>
                    </div>
                  );
                })}
              </div>
              
              {button && (
                <div className={cn(
                  'mb-8',
                  variant === 'centered' && 'flex justify-center',
                  variant !== 'centered' && 'flex justify-start'
                )}>
                  {renderButton()}
                </div>
              )}
            </div>
            
            {features && (
              <div className={cn(
                variant === 'split' && 'lg:justify-self-end',
                variant !== 'split' && 'max-w-md mx-auto'
              )}>
                <ul className="space-y-3" role="status" aria-live="polite">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white/90 animate-fade-in"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <Check className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Barra sticky no mobile */}
      {isMobile && showStickyBar && button && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary-600 border-t border-primary-500 p-4 shadow-2xl animate-slide-up">
          <div className="container mx-auto">
            {renderButton("w-full py-3")}
          </div>
        </div>
      )}
    </>
  );
}
