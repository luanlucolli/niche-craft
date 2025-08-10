import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface ServicesProps {
  variant?: 'alternating' | 'grid' | 'stack';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  services: Service[];
}

export default function Services({
  variant = 'alternating',
  separator = 'none',
  title,
  subtitle,
  services,
}: ServicesProps) {
  const ImageBlock = ({
    src,
    alt,
    variant,
    isEven,
  }: {
    src: string;
    alt: string;
    variant: ServicesProps['variant'];
    isEven: boolean;
  }) => {
    // Container com proporções agradáveis e responsivas:
    // mobile: 16/10 (mais horizontal), md: 4/3, lg: 3/2
    const baseAspect =
      'aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/2]';

    const baseFrame =
      'relative rounded-xl ring-1 ring-border/50 bg-muted/40 overflow-hidden flex items-center justify-center';

    // Em grid/stack a altura antiga cortava as imagens; trocamos por aspect e contain.
    const variantClasses = {
      alternating: cn(baseAspect, baseFrame),
      grid: cn(baseAspect, baseFrame, 'mb-6'),
      stack: cn(baseAspect, baseFrame),
    } as const;

    return (
      <div
        className={cn(
          variantClasses[variant],
          variant === 'alternating' && !isEven && 'lg:order-2'
        )}
      >
        {/* A imagem ocupa toda a área mas SEM cortar */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain"
          // Tamanhos responsivos para reduzir transferência em mobile
          sizes={
            variant === 'grid'
              ? '(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw'
              : '(min-width:1024px) 600px, (min-width:768px) 50vw, 100vw'
          }
        />
      </div>
    );
  };

  const renderService = (service: Service, index: number) => {
    const isEven = index % 2 === 0;

    return (
      <div
        key={index}
        className={cn(
          'animate-fade-in-up',
          variant === 'alternating' && 'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
          variant === 'grid' && 'card-feature',
          variant === 'stack' && 'space-y-6'
        )}
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {/* Bloco da imagem */}
        {variant === 'alternating' ? (
          <ImageBlock
            src={service.image}
            alt={service.title}
            variant={variant}
            isEven={isEven}
          />
        ) : (
          <ImageBlock
            src={service.image}
            alt={service.title}
            variant={variant}
            isEven={isEven}
          />
        )}

        {/* Conteúdo de texto */}
        <div className={cn(variant === 'alternating' && !isEven && 'lg:order-1')}>
          <Heading level={3} size="lg" className="mb-4">
            {service.title}
          </Heading>

          <p className="text-body mb-6">
            {service.description}
          </p>

          <ul className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-body">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Section
      separator={separator}
      background="muted"
      paddingY="lg"
    >
      <div className="text-center mb-16">
        <Heading level={2} size="xl" centered className="mb-4">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-lead max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div
        className={cn(
          variant === 'alternating' && 'space-y-16 lg:space-y-24',
          variant === 'grid' && 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
          variant === 'stack' && 'space-y-16 max-w-4xl mx-auto'
        )}
      >
        {services.map((service, index) => renderService(service, index))}
      </div>
    </Section>
  );
}
