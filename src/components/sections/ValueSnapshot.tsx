
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
  title,
  subtitle,
  kpis,
  note,
}: ValueSnapshotProps) {
  return (
    <Section 
      separator={separator}
      background="muted"
      paddingY="lg"
      className="bg-gradient-to-br from-primary-50 via-secondary-50 to-white"
    >
      <div className="text-center mb-12">
        <Heading level={2} size="xl" centered className="mb-4 text-primary-800">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-lead max-w-3xl mx-auto text-primary-700">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className={cn(
        'grid gap-6 max-w-5xl mx-auto mb-8',
        variant === 'grid' && 'md:grid-cols-2 lg:grid-cols-4',
        variant === 'row' && 'md:grid-cols-2 lg:grid-cols-3'
      )}>
        {kpis.map((kpi, index) => {
          const IconComponent = getKPIIcon(index);
          
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-200/50 hover:shadow-xl hover:bg-white transition-all duration-300 animate-fade-in-up group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                {kpi.mode === 'estimated' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-300">
                    Estimativa
                  </span>
                )}
              </div>
              
              <div className="text-3xl font-bold text-primary-700 mb-1 group-hover:text-primary-800 transition-colors">
                {kpi.value}
              </div>
              
              <div className="text-primary-600 font-medium mb-2">
                {kpi.label}
              </div>
              
              {kpi.description && (
                <div className="text-sm text-primary-500">
                  {kpi.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {note && (
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm text-primary-600 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-primary-200 shadow-sm">
            💡 {note}
          </p>
        </div>
      )}
    </Section>
  );
}
