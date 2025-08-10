
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAProps {
  variant?: 'centered' | 'split' | 'minimal';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  description?: string;
  button?: {
    text: string;
    href: string;
    variant?: string;
  };
  features?: string[];
}

export default function CTA({
  variant = 'centered',
  separator = 'none',
  title,
  subtitle,
  description,
  button,
  features,
}: CTAProps) {
  return (
    <Section 
      separator={separator}
      background="primary"
      paddingY="xl"
    >
      <div className={cn(
        'text-center animate-fade-in-up',
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
            size="xl" 
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
          
          {button && (
            <div className={cn(
              'mb-8',
              variant === 'centered' && 'flex justify-center',
              variant !== 'centered' && 'flex justify-start'
            )}>
              <Button
                asChild
                className="bg-white text-primary-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <a href={button.href}>
                  {button.text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          )}
        </div>
        
        {features && (
          <div className={cn(
            variant === 'split' && 'lg:justify-self-end',
            variant !== 'split' && 'max-w-md mx-auto'
          )}>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-white/90 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
