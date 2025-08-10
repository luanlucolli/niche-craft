
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface ServicesProps {
  variant?: 'alternating' | 'grid' | 'stack';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  services: Service[];
}

export default function Services({
  variant = 'alternating',
  separator = 'none',
  title,
  subtitle,
  services,
}: ServicesProps) {
  const renderService = (service: Service, index: number) => {
    const isEven = index % 2 === 0;
    
    return (
      <div
        key={index}
        className={cn(
          'animate-fade-in-up',
          variant === 'alternating' && 'grid lg:grid-cols-2 gap-12 items-center',
          variant === 'grid' && 'card-feature',
          variant === 'stack' && 'space-y-6'
        )}
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <div className={cn(
          variant === 'alternating' && !isEven && 'lg:order-2'
        )}>
          <img
            src={service.image}
            alt={service.title}
            className={cn(
              'rounded-2xl shadow-lg',
              variant === 'alternating' && 'w-full',
              variant === 'grid' && 'w-full h-48 object-cover mb-6',
              variant === 'stack' && 'w-full h-64 object-cover'
            )}
          />
        </div>
        
        <div className={cn(
          variant === 'alternating' && !isEven && 'lg:order-1'
        )}>
          <Heading level={3} size="lg" className="mb-4">
            {service.title}
          </Heading>
          
          <p className="text-body mb-6">
            {service.description}
          </p>
          
          <ul className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-body">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Section 
      separator={separator}
      background="muted"
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
        variant === 'alternating' && 'space-y-24',
        variant === 'grid' && 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
        variant === 'stack' && 'space-y-16 max-w-4xl mx-auto'
      )}>
        {services.map((service, index) => renderService(service, index))}
      </div>
    </Section>
  );
}
