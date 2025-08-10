
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
        "5511999999999", // Usar o número do site.json se disponível
        ctaPrimary.prefillMessage || "Olá! Quero saber mais sobre a demonstração."
      );
      metrics.whatsappClick("consultative_demo");
      window.open(whatsappUrl, "_blank");
    } else if (ctaPrimary.href) {
      window.open(ctaPrimary.href, "_blank");
    }
  };

  const renderPains = () => (
    <div className="space-y-6">
      {pains.map((pain, index) => {
        const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
        return (
          <div
            key={index}
            className="flex gap-4 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">{pain.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pain.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSteps = () => (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
        return (
          <div
            key={index}
            className="flex gap-4 animate-fade-in-up"
            style={{ animationDelay: `${(index + pains.length) * 0.1}s` }}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
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
  );

  const renderCTAs = () => (
    <div className="space-y-4">
      {highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {highlights.map((highlight, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {highlight}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handlePrimaryClick}
          className={cn(
            "flex-1",
            ctaPrimary.type === "whatsapp" && "bg-[#25D366] hover:bg-[#20BA5A] text-white"
          )}
          size="lg"
        >
          {ctaPrimary.text}
        </Button>
        
        {ctaSecondary && (
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
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
            {ctaSecondary.text}
          </Button>
        )}
      </div>
    </div>
  );

  if (variant === "split") {
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Dores - Coluna Esquerda */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-red-600">
              Problemas comuns
            </h3>
            {renderPains()}
          </div>

          {/* Solução + CTA - Coluna Direita */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-primary">
              Como funciona a demonstração
            </h3>
            {renderSteps()}
            
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
