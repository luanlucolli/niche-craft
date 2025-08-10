
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  variant?: 'accordion' | 'grid' | 'simple';
  separator?: 'none' | 'wave' | 'curve' | 'diagonal';
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function FAQ({
  variant = 'accordion',
  separator = 'none',
  title,
  subtitle,
  faqs,
}: FAQProps) {
  if (variant === 'accordion') {
    return (
      <Section 
        separator={separator}
        background="default"
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
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="animate-fade-in-up border border-border rounded-lg px-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <span className="font-semibold text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-body">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    );
  }

  // Simple variant for other layouts
  return (
    <Section 
      separator={separator}
      background="default"
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
      
      <div className="max-w-4xl mx-auto space-y-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Heading level={3} size="sm" className="mb-3">
              {faq.question}
            </Heading>
            <p className="text-body">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
