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
  ctaSecondary,
  image,
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

  const renderHeroBadge = () => (
    <div className="text-center mb-8">
      {badge && (
        <div className="relative inline-flex items-center">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-full blur-lg scale-110 opacity-60 animate-pulse" />
          
          {/* Main badge */}
          <div className="relative bg-gradient-to-r from-primary to-green-500 text-white px-8 py-3 rounded-full shadow-lg flex items-center gap-3 text-lg font-semibold">
            <Icons.Gift className="w-6 h-6" />
            {badge}
            <Icons.Sparkles className="w-5 h-5 opacity-80" />
          </div>
        </div>
      )}
    </div>
  );

  const renderPains = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full border border-red-200">
          <Icons.AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Problemas comuns</span>
        </div>
      </div>
      
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
  );

  const renderSteps = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
          <Icons.CheckCircle className="w-5 h-5" />
          <span className="font-medium">Nossa demonstração</span>
        </div>
      </div>

      {steps.map((step, index) => {
        const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
        return (
          <div
            key={index}
            className="group bg-gradient-to-br from-primary/5 to-green-500/5 rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
            style={{ animationDelay: `${(index + pains.length) * 0.1}s` }}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-semibold text-foreground text-lg">{step.title}</h4>
                  {step.duration && (
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200"
                    >
                      {step.duration}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCTASection = () => (
    <div className="bg-gradient-to-br from-primary/10 via-white to-green-500/10 rounded-2xl p-8 border border-primary/20 shadow-xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--primary)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--primary)_0%,_transparent_50%)]" />
      </div>
      
      <div className="relative z-10">
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {highlights.map((highlight, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-white/80 backdrop-blur-sm border-primary/30 text-primary font-medium px-3 py-1"
              >
                <Icons.Sparkles className="w-3 h-3 mr-1" />
                {highlight}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePrimaryClick}
            className={cn(
              "flex-1 max-w-xs h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
              ctaPrimary.type === "whatsapp" 
                ? "bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] text-white border-0" 
                : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            )}
          >
            {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-5 h-5 mr-2" />}
            {ctaPrimary.text}
          </Button>
          
          {ctaSecondary && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1 max-w-xs h-14 bg-white/80 backdrop-blur-sm border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300"
              onClick={() => {
                if (ctaSecondary.href.startsWith("#")) {
                  document.querySelector(ctaSecondary.href)?.scrollIntoView({ 
                    behavior: "smooth" 
                  });
                } else {
                  window.open(ctaSecondary.href, "_blank");
                }
              }}
            >
              <Icons.ArrowRight className="w-4 h-4 mr-2" />
              {ctaSecondary.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <Section separator={separator} background="muted" paddingY="lg">
        {renderHeroBadge()}
        
        <div className="text-center mb-16">
          <Heading level={2} size="xl" centered className="mb-4">
            {title}
          </Heading>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-12">
          {/* Problemas - Coluna Esquerda */}
          <div>
            {renderPains()}
          </div>

          {/* Solução + Passos - Coluna Direita */}
          <div>
            {renderSteps()}
          </div>
        </div>

        {/* CTA Section - Full Width */}
        <div className="max-w-4xl mx-auto mb-12">
          {renderCTASection()}
        </div>

        {/* Imagem da Demo */}
        {image && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200">
              <div className="bg-gray-100 rounded-lg p-2 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                    demo.exemplo.com
                  </div>
                </div>
              </div>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        )}

        {disclaimer && (
          <div className="text-center mt-12 max-w-3xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Icons.Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800 leading-relaxed">
                  {disclaimer}
                </p>
              </div>
            </div>
          </div>
        )}
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
            {renderCTAs()}
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
          {renderPains()}
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
            {renderCTAs()}
          </div>

          {image && (
            <div className="mt-8">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-lg shadow-sm border border-gray-200"
              />
            </div>
          )}
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
