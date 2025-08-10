
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  button: {
    text: string;
    href: string;
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
  const renderPlan = (plan: Plan, index: number) => (
    <div
      key={index}
      className={cn(
        'card-pricing relative',
        plan.popular && 'ring-2 ring-primary-500 scale-105 z-10',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            Mais Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-8">
        <Heading level={3} size="md" className="mb-2">
          {plan.name}
        </Heading>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">
            R$ {plan.price}
          </span>
          <span className="text-muted-foreground">
            /{plan.period}
          </span>
        </div>
        
        <p className="text-body">
          {plan.description}
        </p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <span className="text-body">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        asChild
        className={cn(
          'w-full',
          plan.popular ? 'btn-hero' : 'btn-secondary'
        )}
      >
        <a href={plan.button.href}>
          {plan.button.text}
        </a>
      </Button>
    </div>
  );

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
