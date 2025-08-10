
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

interface TestimonialsProps {
  variant?: 'carousel' | 'grid' | 'single';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export default function Testimonials({
  variant = 'grid',
  separator = 'none',
  title,
  subtitle,
  testimonials,
}: TestimonialsProps) {
  const renderStars = (rating: number) => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-5 h-5',
            i < rating 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );

  const renderTestimonial = (testimonial: Testimonial, index: number) => (
    <div
      key={index}
      className={cn(
        'card-testimonial',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {renderStars(testimonial.rating)}
      
      <blockquote className="text-body mb-6 italic">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-foreground">
            {testimonial.author}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );

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
      
      <div className={cn(
        variant === 'grid' && 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
        variant === 'single' && 'max-w-4xl mx-auto',
        variant === 'carousel' && 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' // Simplified carousel as grid for now
      )}>
        {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
      </div>
    </Section>
  );
}
