import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatWhatsAppUrl } from '@/lib/forms';
import { metrics } from '@/lib/metrics';
import ConsultativeDemoMobile from './ConsultativeDemoMobile';

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
  tone?: "surface-0" | "surface-1" | "surface-2" | "gradient-soft";
  pattern?: "none" | "dots" | "grid";
  separatorColor?: "auto" | "primary" | "secondary" | "muted";
}

export default function ConsultativeDemo(props: ConsultativeDemoProps) {
  // Use mobile component for small screens
  return (
    <>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <ConsultativeDemoMobile {...props} />
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <DesktopConsultativeDemo {...props} />
      </div>
    </>
  );
}

function DesktopConsultativeDemo({
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

  const renderHeroBadge = () => (
    <div className="text-center mb-6 sm:mb-8 md:mb-12 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={cn(
          "absolute top-0 left-1/4 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full blur-xl sm:blur-2xl md:blur-3xl",
          'bg-brand-primary/8'
        )} />
        <div className={cn(
          "absolute -top-2 sm:-top-6 right-1/3 w-8 h-8 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full blur-lg sm:blur-xl md:blur-2xl",
          'bg-brand-secondary/15'
        )} />
      </div>
      
      {badge && (
        <div className="relative inline-flex items-center px-3 sm:px-4 md:px-6">
          <div className={cn(
            "absolute inset-0 rounded-full blur-md sm:blur-lg md:blur-xl scale-105 sm:scale-110 md:scale-125 opacity-80 animate-pulse",
            'bg-gradient-to-r from-brand-primary/25 via-brand-primary/30 to-brand-secondary/25'
          )} />
          
          <div className={cn(
            "relative text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full shadow-lg sm:shadow-xl md:shadow-2xl flex items-center gap-2 sm:gap-3 text-xs sm:text-base md:text-lg font-bold border border-white/20",
            'bg-gradient-to-r from-brand-primary via-brand-primary-600 to-brand-secondary'
          )}>
            <Icons.Gift className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
            <span>{badge}</span>
            <Icons.Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5 opacity-90" />
          </div>
        </div>
      )}
    </div>
  );

  const renderImprovedCTASection = () => (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
        <div className={cn(
          "absolute -top-1 sm:-top-2 md:-top-4 -left-1 sm:-left-2 md:-left-4 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full blur-lg sm:blur-xl md:blur-2xl",
          'bg-brand-primary/12'
        )} />
        <div className={cn(
          "absolute -bottom-1 sm:-bottom-2 md:-bottom-4 -right-1 sm:-right-2 md:-right-4 w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full blur-xl sm:blur-2xl md:blur-3xl",
          'bg-brand-secondary/18'
        )} />
      </div>

      <div className={cn(
        "backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border shadow-lg sm:shadow-xl md:shadow-2xl relative overflow-hidden",
        'bg-gradient-to-br from-white via-brand-primary-50/30 to-brand-secondary-50/20 border-brand-primary/15'
      )}>
        <div className="relative z-10 text-center">
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8 justify-center">
              {highlights.map((highlight, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={cn(
                    "bg-white/95 backdrop-blur-sm font-semibold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm shadow-sm hover:bg-primary-50/80 transition-colors",
                    'border-brand-primary/30 text-brand-primary-700'
                  )}
                >
                  <Icons.CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1.5 md:mr-2" />
                  <span>{highlight}</span>
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex justify-center">
            <Button
              onClick={handlePrimaryClick}
              className={cn(
                "h-10 sm:h-12 md:h-14 lg:h-16 px-4 sm:px-6 md:px-8 lg:px-12 text-sm sm:text-base md:text-lg lg:text-xl font-bold shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto max-w-sm sm:max-w-none",
                ctaPrimary.type === "whatsapp" 
                  ? "bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#1DA851] hover:from-[#20BA5A] hover:via-[#1DA851] hover:to-[#128C7E] text-white border-0" 
                  : "bg-gradient-to-r from-brand-primary via-brand-primary-600 to-brand-secondary hover:from-brand-primary-700 hover:via-brand-primary-700 hover:to-brand-secondary-600 text-white border-0"
              )}
            >
              {ctaPrimary.type === "whatsapp" && <Icons.MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:w-5 lg:w-6 lg:h-6 mr-1.5 sm:mr-2 md:mr-3" />}
              <span>{ctaPrimary.text}</span>
              <Icons.ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-1.5 sm:ml-2 md:ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <Section 
        separator={separator}
        tone={tone}
        pattern={pattern}
        separatorColor={separatorColor}
        grid="asym-right"
        paddingY="lg"
      >
        {/* Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="text-left">
            {badge && (
              <Badge 
                className="mb-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border-brand-primary/20"
                variant="outline"
              >
                <Icons.Gift className="w-3 h-3 mr-1.5" />
                {badge}
              </Badge>
            )}
            
            <Heading level={2} size="xl" className="mb-4">
              {title}
            </Heading>
            
            {subtitle && (
              <p className="text-lg leading-7 text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
              <Icons.AlertTriangle className="w-5 h-5" />
              Problemas comuns
            </h3>
            
            <div className="grid gap-4">
              {pains.map((pain, index) => {
                const Icon = pain.icon ? getIcon(pain.icon) : Icons.AlertCircle;
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-ink mb-1">
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

          {/* Process */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-brand-primary flex items-center gap-2">
              <Icons.CheckCircle className="w-5 h-5" />
              Nossa metodologia
            </h3>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-ink">
                          {step.title}
                        </h4>
                        {step.duration && (
                          <Badge 
                            variant="secondary" 
                            className="bg-green-100 text-green-700 border-green-200 text-xs"
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
        </div>

        {/* CTA Section */}
        <div className="lg:col-span-5 flex items-center">
          <div className="w-full">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
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
                    "w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
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
        </div>

        {disclaimer && (
          <div className="lg:col-span-12 mt-8">
            <div className="bg-amber-50/60 border border-amber-200/50 rounded-lg p-4 text-center">
              <div className="flex items-start gap-3 text-sm">
                <Icons.Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 leading-relaxed">
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
      <Section 
        separator={separator} 
        tone={tone}
        pattern={pattern}
        separatorColor={separatorColor}
        paddingY="lg"
      >
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

  
  return (
    <Section 
      separator={separator} 
      tone={tone}
      pattern={pattern}
      separatorColor={separatorColor}
      paddingY="lg"
    >
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
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary/20" />
                  )}
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                    {index + 1}
                  </div>
                  
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
