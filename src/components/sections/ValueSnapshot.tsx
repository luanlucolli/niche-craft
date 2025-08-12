
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { TrendingUp, Clock, Users, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPI {
  label: string;
  value: string;
  mode: 'measured' | 'estimated';
  description?: string;
}

interface ValueSnapshotProps {
  variant?: 'grid' | 'row';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  tone?: 'surface-0' | 'surface-1' | 'surface-2' | 'gradient-soft';
  pattern?: 'none' | 'dots' | 'grid';
  separatorColor?: 'auto' | 'primary' | 'secondary' | 'muted';
  title: string;
  subtitle?: string;
  kpis: KPI[];
  note?: string;
}

const getKPIIcon = (index: number) => {
  const icons = [TrendingUp, Users, Clock, Shield];
  return icons[index % icons.length];
};

export default function ValueSnapshot({
  variant = 'grid',
  separator = 'none',
  tone = 'surface-1',
  pattern = 'none',
  separatorColor = 'auto',
  title,
  subtitle,
  kpis,
  note,
}: ValueSnapshotProps) {
  return (
    <Section 
      separator={separator}
      tone={tone}
      pattern={pattern}
      separatorColor={separatorColor}
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
        'grid gap-6 max-w-5xl mx-auto mb-8',
        variant === 'grid' && 'sm:grid-cols-2 lg:grid-cols-4',
        variant === 'row' && 'sm:grid-cols-2 lg:grid-cols-3'
      )}>
        {kpis.map((kpi, index) => {
          const IconComponent = getKPIIcon(index);
          
          return (
            <div
              key={index}
              className="card-feature group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center group-hover:from-brand-primary group-hover:to-brand-secondary group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                </div>
                
                {kpi.mode === 'estimated' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                    Estimativa
                  </span>
                )}
              </div>
              
              <div className="text-3xl font-bold mb-1 text-ink group-hover:text-brand-primary transition-colors">
                {kpi.value}
              </div>
              
              <div className="text-muted-foreground font-medium mb-2">
                {kpi.label}
              </div>
              
              {kpi.description && (
                <div className="text-sm text-muted-foreground">
                  {kpi.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {note && (
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground bg-surface-0/60 rounded-lg p-4 border border-gray-200">
            💡 {note}
          </p>
        </div>
      )}
    </Section>
  );
}
