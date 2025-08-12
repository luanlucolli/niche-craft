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

  const renderHeroBadge = () => (
    <div className="text-center mb-8 sm:mb-12 relative">
      {/* Background blue elements - responsive */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute -top-4 sm:-top-8 right-1/3 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-blue-400/10 rounded-full blur-xl sm:blur-2xl" />
      </div>
      
      {badge && (
        <div className="relative inline-flex items-center px-4 sm:px-6">
          {/* Enhanced glow effect - responsive */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-full blur-lg sm:blur-xl scale-110 sm:scale-125 opacity-70 animate-pulse" />
          
          {/* Main badge with enhanced styling - responsive */}
          <div className="relative bg-gradient-to-r from-primary via-blue-600 to-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full shadow-xl sm:shadow-2xl flex items-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-lg md:text-xl font-bold border border-white/20">
            <Icons.Gift className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
            <span className="text-xs sm:text-base md:text-lg">{badge}</span>
            <Icons.Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 opacity-90" />
          </div>
        </div>
      )}
    </div>
  );

  const renderImprovedCTASection = () => (
    <div className="relative">
      {/* Background decorative elements - responsive */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/10 rounded-full blur-xl sm:blur-2xl" />
        <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-blue-500/15 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary/5 to-blue-600/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      <div className="bg-gradient-to-br from-white via-blue-50/50 to-primary/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-primary/20 shadow-xl sm:shadow-2xl relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--primary))_0%,_transparent_25%)] opacity-5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_hsl(var(--primary))_0%,_transparent_25%)] opacity-5" />
        
        <div className="relative z-10 text-center">
          {/* Enhanced highlights - responsive */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
              {highlights.map((highlight, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-white/90 backdrop-blur-sm border-primary/40 text-primary font-semibold px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm"
                >
                  <Icons.CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{highlight}</span>
                </Badge>
              ))}
            </div>
          )}
          
          {/* Single enhanced CTA button - responsive */}
          <div className="flex justify-center">
            <Button
              onClick={handlePrimaryClick}
              className={cn(
                "h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-12 text-base sm:text-lg md:text-xl font-bold shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto",
                ctaPrimary.type === "whatsapp" 
                  ? "bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#1DA851] hover:from-[#20BA5A] hover:via-[#1DA851] hover:to-[#128C7E] text-white border-0" 
                  : "bg-gradient-to-r from-primary via-blue-600 to-primary hover:from-primary/90 hover:via-blue-600/90 hover:to-primary/90 text-white"
              )}
            >
              {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" />}
              <span className="text-sm sm:text-base md:text-lg">{ctaPrimary.text}</span>
              <Icons.ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <Section separator={separator} background="muted" paddingY="lg">
        {/* Additional blue background elements - responsive */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-2xl sm:blur-3xl transform -translate-x-1/2" />
          <div className="absolute top-3/4 right-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl transform translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-radial from-primary/3 to-transparent rounded-full" />
        </div>

        {renderHeroBadge()}
        
        <div className="text-center mb-12 sm:mb-16 relative px-4 sm:px-0">
          <Heading level={2} size="xl" centered className="mb-4 sm:mb-6">
            {title}
          </Heading>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              {subtitle}
            </p>
          )}
        </div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {/* Problems cards */}
          {pains.map((pain, index) => {
            const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
            return (
              <div
                key={`pain-${index}`}
                className="group bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl animate-fade-in-up h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground mb-2 sm:mb-3 text-sm sm:text-base md:text-lg leading-tight">{pain.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                      {pain.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Steps cards */}
          {steps.map((step, index) => {
            const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
            return (
              <div
                key={`step-${index}`}
                className="group bg-gradient-to-br from-primary/5 via-blue-50/50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary/15 hover:border-primary/25 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl animate-fade-in-up h-full flex flex-col"
                style={{ animationDelay: `${(index + pains.length) * 0.1}s` }}
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h4 className="font-bold text-foreground text-sm sm:text-base md:text-lg leading-tight">{step.title}</h4>
                      {step.duration && (
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200 text-xs self-start sm:self-auto"
                        >
                          {step.duration}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Section - responsive */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
          {renderImprovedCTASection()}
        </div>

        {disclaimer && (
          <div className="text-center mt-8 sm:mt-12 max-w-3xl mx-auto px-4 sm:px-0">
            <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <Icons.Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                <p className="text-blue-800 leading-relaxed text-sm sm:text-base md:text-lg">
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
            {renderImprovedCTASection()}
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
            {renderImprovedCTASection()}
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
