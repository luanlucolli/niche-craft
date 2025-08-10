
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

type CtaPanel = {
  title?: string;
  bullets?: string[];
  helper?: string;
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
  emphasis?: "cta-first" | "balanced";
  ribbon?: { text: string; icon?: string; tone?: "primary" | "success" | "neutral" };
  ctaPanel?: CtaPanel;
  floatingCTAOnMobile?: boolean;
  background?: "plain" | "subtle-gradient";
  illustrationFrame?: "none" | "browser";
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
  emphasis = "cta-first",
  ribbon,
  ctaPanel,
  floatingCTAOnMobile = false,
  background = "plain",
  illustrationFrame = "none",
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

  const handleRibbonClick = () => {
    const ctaElement = document.querySelector('#cta-panel');
    if (ctaElement) {
      ctaElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderRibbon = () => {
    if (!ribbon) return null;
    
    const Icon = ribbon.icon ? getIcon(ribbon.icon) : null;
    
    return (
      <div 
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ring-1 ring-offset-1 cursor-pointer transition-all hover:scale-105",
          {
            "bg-primary/10 text-primary ring-primary/20": ribbon.tone === "primary",
            "bg-green-50 text-green-700 ring-green-200": ribbon.tone === "success",
            "bg-gray-50 text-gray-700 ring-gray-200": ribbon.tone === "neutral",
          }
        )}
        onClick={handleRibbonClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleRibbonClick()}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {ribbon.text}
      </div>
    );
  };

  const renderCtaPanel = () => (
    <div 
      id="cta-panel"
      className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl border p-6 shadow-sm animate-fade-in-up"
    >
      {ctaPanel?.title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {ctaPanel.title}
        </h3>
      )}
      
      {ctaPanel?.bullets && ctaPanel.bullets.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {ctaPanel.bullets.map((bullet, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {bullet}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Button
          onClick={handlePrimaryClick}
          className={cn(
            "flex-1 sm:flex-none",
            ctaPrimary.type === "whatsapp" && "bg-[#25D366] hover:bg-[#20BA5A] text-white"
          )}
          size="lg"
        >
          {ctaPrimary.text}
        </Button>
        
        {ctaSecondary && (
          <Button
            variant="ghost"
            size="lg"
            className="flex-1 sm:flex-none"
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

      {ctaPanel?.helper && (
        <p className="text-sm text-muted-foreground">
          {ctaPanel.helper}
        </p>
      )}
    </div>
  );

  const renderSteps = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Como funciona a demonstração
      </h3>
      
      <div className="space-y-4" style={{ counterReset: 'step-counter' }}>
        {steps.map((step, index) => {
          const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
          return (
            <div
              key={index}
              className="flex gap-4 animate-fade-in-up relative"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                counterIncrement: 'step-counter'
              }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold before:content-[counter(step-counter)]">
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-foreground">{step.title}</h4>
                  {step.duration && index === 0 && (
                    <Badge variant="outline" className="text-xs">
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
    </div>
  );

  const renderPains = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-red-600 mb-4">
        Problemas comuns
      </h3>
      
      {pains.map((pain, index) => {
        const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
        return (
          <div
            key={index}
            className="flex gap-4 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-red-500" />
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

  const renderImage = () => {
    if (!image) return null;

    const imageElement = (
      <img
        src={image.src}
        alt={image.alt}
        className="w-full object-cover rounded-lg"
      />
    );

    if (illustrationFrame === "browser") {
      return (
        <div className="bg-gray-100 rounded-lg p-3 shadow-sm border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded">
            {imageElement}
          </div>
        </div>
      );
    }

    return (
      <div className="shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {imageElement}
      </div>
    );
  };

  const sectionBackground = background === "subtle-gradient" ? "gradient" : "muted";

  return (
    <>
      <Section separator={separator} background={sectionBackground} paddingY="lg">
        <div className="text-center mb-8">
          {renderRibbon()}
          
          <Heading level={2} size="xl" centered className="mt-4 mb-4">
            {title}
          </Heading>
          
          {subtitle && (
            <p className="text-lead max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={cn(
          "grid gap-8",
          emphasis === "cta-first" 
            ? "lg:grid-cols-12 lg:gap-10" 
            : "lg:grid-cols-2 lg:gap-12"
        )}>
          {/* Ordem mobile: CTA Panel primeiro */}
          
          {/* Coluna Principal - CTA e Passos */}
          <div className={cn(
            "order-1 lg:order-1",
            emphasis === "cta-first" ? "lg:col-span-7" : ""
          )}>
            {/* CTA Panel */}
            <div className="mb-8">
              {renderCtaPanel()}
            </div>

            {/* Passos */}
            {renderSteps()}

            {/* Imagem */}
            {image && (
              <div className="mt-8">
                {renderImage()}
              </div>
            )}
          </div>

          {/* Coluna Secundária - Dores */}
          <div className={cn(
            "order-2 lg:order-2",
            emphasis === "cta-first" ? "lg:col-span-5" : ""
          )}>
            {renderPains()}
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

      {/* Floating CTA Mobile */}
      {floatingCTAOnMobile && (
        <div className="fixed bottom-4 inset-x-4 z-50 md:hidden">
          <Button
            onClick={handlePrimaryClick}
            className={cn(
              "w-full shadow-lg",
              ctaPrimary.type === "whatsapp" && "bg-[#25D366] hover:bg-[#20BA5A] text-white"
            )}
            size="lg"
          >
            {ctaPrimary.text}
          </Button>
        </div>
      )}
    </>
  );
}
