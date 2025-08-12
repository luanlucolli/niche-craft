
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
  title: string;
  subtitle?: string;
  cases: Case[];
  disclaimer?: string;
}

export default function CaseCards({
  variant = 'cards',
  separator = 'none',
  title,
  subtitle,
  cases,
  disclaimer,
}: CaseCardsProps) {
  return (
    <Section 
      separator={separator}
      background="default"
      paddingY="lg"
      className="bg-gradient-to-br from-white via-primary-50 to-secondary-50"
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
        'grid gap-8 max-w-6xl mx-auto',
        variant === 'cards' && 'md:grid-cols-2 lg:grid-cols-3',
        variant === 'list' && 'max-w-4xl space-y-8'
      )}>
        {cases.map((caseItem, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-200/50 hover:shadow-xl transition-all duration-300 animate-fade-in-up group hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 border border-primary-200">
                {caseItem.segmento}
              </span>
              
              {caseItem.type === 'estimated' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-300">
                  Estimado
                </span>
              )}
            </div>
            
            {/* Problema */}
            <div className="mb-4">
              <h4 className="font-semibold text-red-600 mb-2 text-sm">PROBLEMA</h4>
              <p className="text-primary-600 text-sm leading-relaxed">
                {caseItem.problema}
              </p>
            </div>
            
            {/* Seta */}
            <div className="flex justify-center mb-4">
              <ArrowRight className="w-5 h-5 text-primary-400" />
            </div>
            
            {/* Intervenção */}
            <div className="mb-4">
              <h4 className="font-semibold text-primary-600 mb-2 text-sm">O QUE FIZEMOS</h4>
              <p className="text-primary-600 text-sm leading-relaxed">
                {caseItem.intervencao}
              </p>
            </div>
            
            {/* Resultado */}
            <div className="mb-4">
              <h4 className="font-semibold text-secondary-600 mb-2 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                RESULTADO
              </h4>
              <p className="text-primary-800 font-medium text-sm leading-relaxed">
                {caseItem.resultado}
              </p>
            </div>
            
            {/* Tempo */}
            <div className="pt-4 border-t border-primary-200">
              <div className="flex items-center gap-2 text-sm text-primary-500">
                <Clock className="w-4 h-4" />
                <span>Entregue em {caseItem.tempo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {disclaimer && (
        <div className="text-center mt-8 max-w-3xl mx-auto">
          <p className="text-sm text-primary-600 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-300 shadow-sm">
            ⚠️ {disclaimer}
          </p>
        </div>
      )}
    </Section>
  );
}
