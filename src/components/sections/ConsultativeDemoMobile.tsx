
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatWhatsAppUrl } from '@/lib/forms';
import { metrics } from '@/lib/metrics';

type PainPoint = { 
  icon?: string; 
  title: string; 
  description: string; 
};

type Step = { 
  title: string; 
  description: string; 
  duration?: string; 
  icon?: string; 
};

interface ConsultativeDemoProps {
  title: string;
  subtitle?: string;
  pains: PainPoint[];
  steps: Step[];
  highlights?: string[];
  badge?: string;
  disclaimer?: string;
  ctaPrimary: {
    text: string;
    type: "whatsapp" | "href";
    href?: string;
    prefillMessage?: string;
  };
  ctaSecondary?: { 
    text: string; 
    href: string; 
  };
  variant?: "split" | "cards" | "timeline";
  separator?: "none" | "wave" | "diagonal" | "curve";
  tone?: "surface-0" | "surface-1" | "surface-2" | "gradient-soft";
  pattern?: "none" | "dots" | "grid";
  separatorColor?: "auto" | "primary" | "secondary" | "muted";
}

export default function ConsultativeDemoMobile({
  title,
  subtitle,
  pains,
  steps,
  highlights = [],
  badge,
  disclaimer,
  ctaPrimary,
  ctaSecondary,
  variant = "split",
  separator = "none",
  tone = "gradient-soft",
  pattern = "dots",
  separatorColor = "auto",
}: ConsultativeDemoProps) {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as any)[iconName] || Icons.Star;
  };

  const handlePrimaryClick = () => {
    if (ctaPrimary.type === "whatsapp") {
      const whatsappUrl = formatWhatsAppUrl(
        "5511999999999",
        ctaPrimary.prefillMessage || "Olá! Quero saber mais sobre a demonstração."
      );
      metrics.whatsappClick("consultative_demo");
      window.open(whatsappUrl, "_blank");
    } else if (ctaPrimary.href) {
      window.open(ctaPrimary.href, "_blank");
    }
  };

  const handleSecondaryClick = () => {
    if (ctaSecondary?.href) {
      window.open(ctaSecondary.href, "_blank");
    }
  };

  return (
    <Section 
      separator={separator}
      tone={tone}
      pattern={pattern}
      separatorColor={separatorColor}
      paddingY="lg"
      className="overflow-hidden"
    >
      {/* Header Mobile-First */}
      <div className="text-center mb-8 sm:mb-12">
        {badge && (
          <Badge 
            className="mb-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border-brand-primary/20"
            variant="outline"
          >
            <Icons.Gift className="w-3 h-3 mr-1.5" />
            {badge}
          </Badge>
        )}
        
        <Heading level={2} size="xl" className="mb-4 px-4">
          {title}
        </Heading>
        
        {subtitle && (
          <p className="text-base leading-7 text-muted-foreground max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        )}
      </div>

      {/* Mobile Stack Layout */}
      <div className="space-y-8 sm:space-y-12">
        {/* Problemas - Mobile Stack */}
        <div className="px-4">
          <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2 mb-6">
            <Icons.AlertTriangle className="w-5 h-5" />
            Problemas comuns
          </h3>
          
          <div className="space-y-4">
            {pains.map((pain, index) => {
              const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
              return (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-ink mb-1 text-sm leading-tight">
                        {pain.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {pain.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Processo - Mobile Timeline */}
        <div className="px-4">
          <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2 mb-6">
            <Icons.CheckCircle className="w-5 h-5" />
            Nossa metodologia
          </h3>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1 mb-2">
                      <h4 className="font-semibold text-ink text-sm">
                        {step.title}
                      </h4>
                      {step.duration && (
                        <Badge 
                          variant="secondary" 
                          className="bg-green-100 text-green-700 border-green-200 text-xs self-start"
                        >
                          {step.duration}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Mobile Optimized */}
        <div className="px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            {highlights.length > 0 && (
              <div className="space-y-3 mb-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Icons.CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-ink">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-3">
              <Button
                onClick={handlePrimaryClick}
                className={cn(
                  "w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]",
                  ctaPrimary.type === "whatsapp" 
                    ? "bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] text-white border-0" 
                    : "bg-gradient-brand hover:opacity-90 text-white border-0"
                )}
              >
                {ctaPrimary.type === "whatsapp" && (
                  <Icons.MessageCircle className="w-5 h-5 mr-2" />
                )}
                {ctaPrimary.text}
                <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              {ctaSecondary && (
                <Button
                  variant="outline"
                  onClick={handleSecondaryClick}
                  className="w-full h-12 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  {ctaSecondary.text}
                </Button>
              )}
            </div>
          </div>
        </div>

        {disclaimer && (
          <div className="px-4">
            <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-4 text-center">
              <div className="flex items-start gap-3 text-sm">
                <Icons.Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 leading-relaxed text-left">
                  {disclaimer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
