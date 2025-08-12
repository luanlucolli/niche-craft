
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
  image?: { 
    src: string; 
    alt: string; 
  };
  variant?: "split" | "cards" | "timeline";
  separator?: "none" | "wave" | "diagonal" | "curve";
}

export default function ConsultativeDemo({
  title,
  subtitle,
  pains,
  steps,
  highlights = [],
  badge,
  disclaimer,
  ctaPrimary,
  variant = "split",
  separator = "none",
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

  return (
    <Section separator={separator} background="gradient" paddingY="xl">
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-brand-gradient opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />
        
        <div className="relative z-10 text-white">
          {/* Badge Hero */}
          {badge && (
            <div className="text-center mb-8 md:mb-12">
              <div className="relative inline-flex items-center">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 animate-pulse" />
                <Badge className="relative bg-white/90 text-primary-700 px-6 py-3 text-base font-bold shadow-2xl border-0">
                  <Icons.Gift className="w-5 h-5 mr-2" />
                  {badge}
                  <Icons.Sparkles className="w-4 h-4 ml-2" />
                </Badge>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <Heading level={2} size="xl" centered className="mb-6 text-white">
              {title}
            </Heading>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Professional Layout */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            
            {/* Pain Points - Left Column */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Icons.AlertTriangle className="w-5 h-5 text-red-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Principais Desafios</h3>
                </div>
                
                <div className="space-y-4">
                  {pains.slice(0, 3).map((pain, index) => {
                    const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mt-1">
                          <Icon className="w-4 h-4 text-white/80" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{pain.title}</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{pain.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Process - Center Column */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Icons.CheckCircle className="w-5 h-5 text-green-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Como Funciona</h3>
                </div>
                
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon ? getIcon(step.icon) : Icons.ArrowRight;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white text-primary-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">{step.title}</h4>
                            {step.duration && (
                              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                                {step.duration}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/30 relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Icons.Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Demonstração Gratuita</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Veja na prática como funciona e tire todas as suas dúvidas
                    </p>
                  </div>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-white/90">
                          <Icons.Check className="w-4 h-4 text-green-300 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    onClick={handlePrimaryClick}
                    className="w-full h-12 bg-white text-primary-700 hover:bg-white/90 font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-5 h-5 mr-2" />}
                    {ctaPrimary.text}
                    <Icons.ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {disclaimer && (
                    <p className="text-xs text-white/60 mt-4 text-center leading-relaxed">
                      {disclaimer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
