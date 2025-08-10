
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Users, Clock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatWhatsAppUrl } from '@/lib/forms';
import { metrics } from '@/lib/metrics';

type Step = {
  title: string;
  you: string[];
  us: string[];
  duration?: string;
  icon?: string;
};

interface ProcessStepsProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  footnote?: string;
  cta?: { 
    text: string; 
    type: "whatsapp" | "href"; 
    href?: string; 
    prefillMessage?: string; 
  };
  variant?: "matrix" | "horizontal" | "vertical";
  separator?: "none" | "curve" | "wave" | "diagonal";
}

export default function ProcessSteps({
  title,
  subtitle,
  steps,
  footnote,
  cta,
  variant = "matrix",
  separator = "none",
}: ProcessStepsProps) {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as any)[iconName] || Icons.Star;
  };

  const handleCTAClick = () => {
    if (!cta) return;
    
    if (cta.type === "whatsapp") {
      const whatsappUrl = formatWhatsAppUrl(
        "5511999999999",
        cta.prefillMessage || "Olá! Quero saber mais sobre o processo."
      );
      metrics.whatsappClick("process_steps");
      window.open(whatsappUrl, "_blank");
    } else if (cta.href) {
      window.open(cta.href, "_blank");
    }
  };

  const renderMatrixVariant = () => (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead scope="col" className="font-semibold text-foreground">
                Etapa
              </TableHead>
              <TableHead scope="col" className="font-semibold text-foreground">
                Você
              </TableHead>
              <TableHead scope="col" className="font-semibold text-foreground">
                Nós
              </TableHead>
              <TableHead scope="col" className="font-semibold text-foreground">
                Prazo
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps.map((step, index) => {
              const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
              return (
                <TableRow 
                  key={index}
                  className={cn(
                    "hover:bg-gray-50/50 transition-colors",
                    index % 2 === 0 && "bg-gray-25"
                  )}
                >
                  <TableCell scope="row" className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {step.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Etapa {index + 1}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {step.you.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <User className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {step.us.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <Users className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {step.duration && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {step.duration}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {steps.map((step, index) => {
          const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
          return (
            <div key={index} className="border border-gray-100 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <span className="text-sm text-muted-foreground">Etapa {index + 1}</span>
                  </div>
                </div>
                {step.duration && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {step.duration}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" aria-hidden="true" />
                    Você
                  </h5>
                  <ul className="space-y-1">
                    {step.you.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground pl-2">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" aria-hidden="true" />
                    Nós
                  </h5>
                  <ul className="space-y-1">
                    {step.us.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground pl-2">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderHorizontalVariant = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
        return (
          <div
            key={index}
            className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-primary/20 transform -translate-y-1/2" />
            )}
            
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {index + 1}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              {step.duration && (
                <Badge variant="outline" className="flex items-center gap-1 w-fit mx-auto">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {step.duration}
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2 justify-center">
                  <User className="w-4 h-4" aria-hidden="true" />
                  Você
                </h4>
                <ul className="space-y-1 text-center">
                  {step.you.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2 justify-center">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  Nós
                </h4>
                <ul className="space-y-1 text-center">
                  {step.us.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderVerticalVariant = () => (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon ? getIcon(step.icon) : Icons.CheckCircle;
          return (
            <div
              key={index}
              className="relative flex gap-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-primary/20" />
              )}
              
              {/* Step indicator */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  {step.duration && (
                    <Badge variant="outline" className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {step.duration}
                    </Badge>
                  )}
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" aria-hidden="true" />
                      Você entrega
                    </h4>
                    <ul className="space-y-1">
                      {step.you.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" aria-hidden="true" />
                      Nós entregamos
                    </h4>
                    <ul className="space-y-1">
                      {step.us.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Section 
      separator={separator}
      background="muted"
      paddingY="lg"
    >
      <div className="text-center mb-12">
        <Heading level={2} size="xl" centered className="mb-4">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-lead max-w-3xl mx-auto text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="max-w-6xl mx-auto">
        {variant === "matrix" && renderMatrixVariant()}
        {variant === "horizontal" && renderHorizontalVariant()}
        {variant === "vertical" && renderVerticalVariant()}
      </div>
      
      <div className="text-center mt-8 space-y-4">
        {footnote && (
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            {footnote}
          </p>
        )}
        
        {cta && (
          <Button
            onClick={handleCTAClick}
            size="lg"
            className={cn(
              cta.type === "whatsapp" && "bg-[#25D366] hover:bg-[#20BA5A] text-white"
            )}
          >
            {cta.text}
          </Button>
        )}
      </div>
    </Section>
  );
}
