
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Case {
  segmento: string;
  problema: string;
  intervencao: string;
  resultado: string;
  tempo: string;
  type: 'measured' | 'estimated';
}

interface CaseCardsProps {
  variant?: 'cards' | 'list';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  tone?: 'surface-0' | 'surface-1' | 'surface-2' | 'gradient-soft';
  pattern?: 'none' | 'dots' | 'grid';
  separatorColor?: 'auto' | 'primary' | 'secondary' | 'muted';
  title: string;
  subtitle?: string;
  cases: Case[];
  disclaimer?: string;
}

export default function CaseCards({
  variant = 'cards',
  separator = 'diagonal',
  tone = 'surface-2',
  pattern = 'none',
  separatorColor = 'primary',
  title,
  subtitle,
  cases,
  disclaimer,
}: CaseCardsProps) {
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
        'grid gap-8 max-w-6xl mx-auto',
        variant === 'cards' && 'sm:grid-cols-2 lg:grid-cols-3',
        variant === 'list' && 'max-w-4xl space-y-8'
      )}>
        {cases.map((caseItem, index) => (
          <div
            key={index}
            className="card-feature group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border border-brand-primary/20">
                {caseItem.segmento}
              </span>
              
              {caseItem.type === 'estimated' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                  Estimado
                </span>
              )}
            </div>
            
            {/* Problema */}
            <div className="mb-4">
              <h4 className="font-semibold text-red-600 mb-2 text-sm">PROBLEMA</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {caseItem.problema}
              </p>
            </div>
            
            {/* Seta */}
            <div className="flex justify-center mb-4">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            
            {/* Intervenção */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-sm text-brand-primary">
                O QUE FIZEMOS
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {caseItem.intervencao}
              </p>
            </div>
            
            {/* Resultado */}
            <div className="mb-4">
              <h4 className="font-semibold text-green-600 mb-2 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                RESULTADO
              </h4>
              <p className="text-ink font-medium text-sm leading-relaxed">
                {caseItem.resultado}
              </p>
            </div>
            
            {/* Tempo */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Entregue em {caseItem.tempo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {disclaimer && (
        <div className="text-center mt-8 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground bg-amber-50 rounded-lg p-4 border border-amber-200">
            ⚠️ {disclaimer}
          </p>
        </div>
      )}
    </Section>
  );
}
