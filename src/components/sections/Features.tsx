
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { cn } from '@/lib/utils';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  variant?: 'grid' | 'list' | 'alternating';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  features: Feature[];
}

export default function Features({
  variant = 'grid',
  separator = 'none',
  title,
  subtitle,
  features,
}: FeaturesProps) {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as any)[iconName] || Icons.Star;
  };

  const renderFeature = (feature: Feature, index: number) => {
    const Icon = getIcon(feature.icon);
    
    return (
      <div
        key={index}
        className={cn(
          'animate-fade-in-up',
          variant === 'grid' && 'card-feature text-center',
          variant === 'list' && 'flex gap-6 items-start',
          variant === 'alternating' && 'flex gap-8 items-center',
          variant === 'alternating' && index % 2 === 1 && 'flex-row-reverse'
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className={cn(
          'flex-shrink-0',
          variant === 'grid' && 'mx-auto mb-6',
          variant === 'list' && 'mt-1',
          variant === 'alternating' && 'flex-1'
        )}>
          <div className={cn(
            'inline-flex items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg',
            variant === 'grid' && 'w-16 h-16',
            variant === 'list' && 'w-12 h-12',
            variant === 'alternating' && 'w-20 h-20'
          )}>
            <Icon className={cn(
              variant === 'grid' && 'w-8 h-8',
              variant === 'list' && 'w-6 h-6',
              variant === 'alternating' && 'w-10 h-10'
            )} />
          </div>
        </div>
        
        <div className={cn(
          variant === 'alternating' && 'flex-1',
          variant === 'list' && 'flex-1'
        )}>
          <Heading 
            level={3} 
            size="sm" 
            className={cn(
              'mb-3',
              variant === 'grid' && 'text-center'
            )}
          >
            {feature.title}
          </Heading>
          <p className={cn(
            'text-body',
            variant === 'grid' && 'text-center'
          )}>
            {feature.description}
          </p>
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
        variant === 'grid' && 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8',
        variant === 'list' && 'space-y-8 max-w-4xl mx-auto',
        variant === 'alternating' && 'space-y-16 max-w-6xl mx-auto'
      )}>
        {features.map((feature, index) => renderFeature(feature, index))}
      </div>
    </Section>
  );
}
