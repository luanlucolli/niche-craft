
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { User, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  titulo: string;
  voce: string;
  nos: string;
  prazo: string;
}

interface ProcessTimelineProps {
  variant?: 'horizontal' | 'vertical';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  steps: Step[];
  note?: string;
}

export default function ProcessTimeline({
  variant = 'horizontal',
  separator = 'none',
  title,
  subtitle,
  steps,
  note,
}: ProcessTimelineProps) {
  return (
    <Section 
      separator={separator}
      background="muted"
      paddingY="lg"
    >
      <div className="text-center mb-12">
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
        'max-w-6xl mx-auto',
        variant === 'horizontal' && 'grid gap-8 md:grid-cols-2 lg:grid-cols-4',
        variant === 'vertical' && 'space-y-8 max-w-3xl'
      )}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up',
              variant === 'horizontal' && 'text-center',
              variant === 'vertical' && 'flex gap-6'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Step number */}
            <div className={cn(
              'w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg',
              variant === 'horizontal' && 'mx-auto mb-4',
              variant === 'vertical' && 'flex-shrink-0'
            )}>
              {index + 1}
            </div>
            
            {/* Connection line (horizontal) */}
            {variant === 'horizontal' && index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-primary-200 transform -translate-y-1/2" />
            )}
            
            <div className={cn(
              variant === 'vertical' && 'flex-1'
            )}>
              {/* Title */}
              <Heading level={3} size="sm" className="mb-4">
                {step.titulo}
              </Heading>
              
              {/* Você entrega */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">VOCÊ ENTREGA</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.voce}
                </p>
              </div>
              
              {/* Nós entregamos */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">NÓS ENTREGAMOS</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.nos}
                </p>
              </div>
              
              {/* Prazo */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{step.prazo}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {note && (
        <div className="text-center mt-8 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground bg-white/60 rounded-lg p-4 border border-gray-200">
            ⏱️ {note}
          </p>
        </div>
      )}
    </Section>
  );
}
