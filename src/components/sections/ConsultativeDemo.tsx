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

  if (variant === "split") {
    return (
      <Section separator={separator} background="gradient" paddingY="lg">
        <div className="relative max-w-7xl mx-auto">
          {/* Header with badge */}
          <div className="text-center mb-16">
            {badge && (
              <div className="inline-flex items-center mb-6">
                <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 text-lg font-semibold backdrop-blur-sm">
                  <Icons.Zap className="w-5 h-5 mr-2" />
                  {badge}
                </Badge>
              </div>
            )}
            
            <Heading level={2} size="xl" centered className="mb-6 text-white">
              {title}
            </Heading>
            {subtitle && (
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            {/* Left column - Pain points */}
            <div className="lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mr-4">
                    <Icons.AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Desafios Comuns</h3>
                </div>
                
                <div className="space-y-6">
                  {pains.map((pain, index) => {
                    const Icon = pain.icon ? getIcon(pain.icon) : Icons.X;
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-100">
                        <Icon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{pain.title}</h4>
                          <p className="text-sm text-gray-600">{pain.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Center column - Process */}
            <div className="lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <Icons.Workflow className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nossa Metodologia</h3>
                </div>
                
                <div className="space-y-6">
                  {steps.map((step, index) => {
                    const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
                    return (
                      <div key={index} className="relative">
                        {index < steps.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-8 bg-primary/20" />
                        )}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{step.title}</h4>
                              {step.duration && (
                                <Badge variant="secondary" className="text-xs">
                                  {step.duration}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column - CTA */}
            <div className="lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4">
                    <Icons.Rocket className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Comece Agora</h3>
                </div>
                
                {highlights.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">O que você recebe:</h4>
                    <div className="space-y-3">
                      {highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Icons.CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-auto">
                  <Button
                    onClick={handlePrimaryClick}
                    className={cn(
                      "w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                      ctaPrimary.type === "whatsapp" 
                        ? "bg-[#25D366] hover:bg-[#20BA5A] text-white" 
                        : "bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white"
                    )}
                  >
                    {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-5 h-5 mr-2" />}
                    {ctaPrimary.text}
                    <Icons.ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                    <Icons.Shield className="w-4 h-4 mr-2" />
                    <span>100% Gratuito • Sem Compromisso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {disclaimer && (
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start gap-3">
                  <Icons.Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{disclaimer}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    );
  }

  if (variant === "cards") {
    return (
      <Section separator={separator} background="default" paddingY="lg">
        <div className="text-center mb-12">
          {badge && (
            <Badge className="mb-4" variant="default">
              {badge}
            </Badge>
          )}
          <Heading level={2} size="xl" centered className="mb-4">
            {title}
          </Heading>
          {subtitle && (
            <p className="text-lead max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Dores em Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pains.map((pain, index) => {
            const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{pain.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pain.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Como funciona + CTA */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-6 text-center text-primary">
            Como funciona a demonstração
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                  {step.duration && (
                    <Badge variant="secondary" className="text-xs mb-2">
                      {step.duration}
                    </Badge>
                  )}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={handlePrimaryClick}
              className={cn(
                "h-12 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                ctaPrimary.type === "whatsapp" 
                  ? "bg-[#25D366] hover:bg-[#20BA5A] text-white" 
                  : "bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white"
              )}
            >
              {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-5 h-5 mr-2" />}
              {ctaPrimary.text}
              <Icons.ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {disclaimer && (
          <div className="text-center mt-8 max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-4 border border-gray-200">
              💡 {disclaimer}
            </p>
          </div>
        )}
      </Section>
    );
  }

  // variant === "timeline"
  return (
    <Section separator={separator} background="muted" paddingY="lg">
      <div className="text-center mb-12">
        {badge && (
          <Badge className="mb-4" variant="default">
            {badge}
          </Badge>
        )}
        <Heading level={2} size="xl" centered className="mb-4">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-lead max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Dores - Lista Lateral */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-red-600">
            Problemas comuns
          </h3>
          <div className="space-y-6">
            {pains.map((pain, index) => {
              const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
              return (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">{pain.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {pain.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline - 2 colunas */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 text-primary">
            Processo da demonstração
          </h3>
          
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
              return (
                <div
                  key={index}
                  className="relative flex gap-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary/20" />
                  )}
                  
                  {/* Step number & icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      {step.duration && (
                        <Badge variant="secondary" className="text-xs">
                          {step.duration}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button
              onClick={handlePrimaryClick}
              className={cn(
                "h-12 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                ctaPrimary.type === "whatsapp" 
                  ? "bg-[#25D366] hover:bg-[#20BA5A] text-white" 
                  : "bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white"
              )}
            >
              {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-5 h-5 mr-2" />}
              {ctaPrimary.text}
              <Icons.ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {disclaimer && (
        <div className="text-center mt-8 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground bg-white/60 rounded-lg p-4 border border-gray-200">
            💡 {disclaimer}
          </p>
        </div>
      )}
    </Section>
  );
}
