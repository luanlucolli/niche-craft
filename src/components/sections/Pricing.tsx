
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, UserCheck, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import siteData from '@/content/site.json';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  forWho?: string;
  notForWho?: string;
  button: {
    text: string;
    href?: string;
    type?: 'whatsapp' | 'default';
  };
  popular?: boolean;
}

interface PricingProps {
  variant?: 'centered' | 'grid' | 'comparison';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  plans: Plan[];
}

export default function Pricing({
  variant = 'centered',
  separator = 'none',
  title,
  subtitle,
  plans,
}: PricingProps) {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const getWhatsAppUrl = (button: any) => {
    if (button?.type === 'whatsapp') {
      const whatsappNumber = siteData?.contact?.whatsapp || '5511999999999';
      const prefillMessage = siteData?.contact?.prefill || 'Olá! Tenho interesse em uma landing page.';
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefillMessage)}`;
    }
    return button?.href || '#';
  };

  const getPlanIcon = (index: number) => {
    switch (index) {
      case 0: return Zap;
      case 1: return Star;
      case 2: return Crown;
      default: return Star;
    }
  };

  const renderPlan = (plan: Plan, index: number) => {
    const PlanIcon = getPlanIcon(index);
    const isHovered = hoveredPlan === index;
    
    return (
      <div
        key={index}
        className={cn(
          'card-pricing relative cursor-pointer transition-all duration-500 transform-gpu',
          plan.popular && 'ring-2 ring-primary-500 scale-105 z-10',
          isHovered && !plan.popular && 'scale-105 shadow-2xl ring-2 ring-primary-300',
          'animate-fade-in-up hover:shadow-2xl group'
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
        onMouseEnter={() => setHoveredPlan(index)}
        onMouseLeave={() => setHoveredPlan(null)}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
              <Star className="w-4 h-4" />
              Mais Vendido
            </div>
          </div>
        )}

        {/* Efeito de brilho no hover */}
        <div className={cn(
          'absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500',
          'bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10',
          isHovered && 'opacity-100'
        )} />
        
        <div className="relative z-10">
          {/* Ícone do plano */}
          <div className="flex justify-center mb-6">
            <div className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
              plan.popular 
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' 
                : 'bg-primary-100 text-primary-600',
              isHovered && 'transform rotate-6 scale-110'
            )}>
              <PlanIcon className="w-8 h-8" />
            </div>
          </div>

          <div className="text-center mb-8">
            <Heading level={3} size="md" className="mb-2">
              {plan.name}
            </Heading>
            
            <div className="mb-4">
              <span className={cn(
                'text-4xl font-bold text-foreground transition-all duration-300',
                isHovered && 'text-primary-600 transform scale-110 inline-block'
              )}>
                R$ {plan.price}
              </span>
              <span className="text-muted-foreground ml-1">
                /{plan.period}
              </span>
            </div>
            
            <p className="text-body">
              {plan.description}
            </p>
          </div>
          
          <ul className="space-y-4 mb-6">
            {plan.features.map((feature, featureIndex) => (
              <li 
                key={featureIndex} 
                className={cn(
                  'flex items-start gap-3 transition-all duration-300',
                  isHovered && 'transform translate-x-1'
                )}
                style={{ 
                  animationDelay: `${0.5 + featureIndex * 0.1}s`,
                  opacity: isHovered ? 1 : 0.9
                }}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300',
                  plan.popular 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-primary-100 text-primary-600',
                  isHovered && 'scale-110 bg-green-500 text-white'
                )}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-body">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Para quem é / Para quem não é */}
          {(plan.forWho || plan.notForWho) && (
            <div className="mb-6 space-y-3 text-sm">
              {plan.forWho && (
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <UserCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-700">{plan.forWho}</span>
                </div>
              )}
              {plan.notForWho && (
                <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                  <UserX className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700">{plan.notForWho}</span>
                </div>
              )}
            </div>
          )}
          
          <Button
            asChild
            className={cn(
              'w-full transition-all duration-300 group/btn',
              plan.button?.type === 'whatsapp'
                ? 'bg-[#25D366] hover:bg-[#128C7E] text-white border-0'
                : plan.popular 
                ? 'btn-hero' 
                : 'btn-secondary hover:bg-primary-500 hover:text-white',
              isHovered && 'transform scale-105 shadow-lg'
            )}
          >
            <a 
              href={getWhatsAppUrl(plan.button)}
              target={plan.button?.type === 'whatsapp' ? '_blank' : undefined}
              rel={plan.button?.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
              className="relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">
                {plan.button.text}
              </span>
              {/* Efeito de onda no botão */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent',
                'transform -skew-x-12 -translate-x-full transition-transform duration-700',
                'group-hover/btn:translate-x-full'
              )} />
            </a>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Section 
      separator={separator}
      background="default"
      paddingY="lg"
    >
      <div className="text-center mb-16">
        <Heading level={2} size="xl" centered className="mb-4">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-lead max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className={cn(
        'grid gap-8 max-w-6xl mx-auto',
        plans.length === 1 && 'max-w-md',
        plans.length === 2 && 'md:grid-cols-2 max-w-4xl',
        plans.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3'
      )}>
        {plans.map((plan, index) => renderPlan(plan, index))}
      </div>
    </Section>
  );
}
