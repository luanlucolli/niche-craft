
import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .max(100, 'Email muito longo');

export const phoneSchema = z
  .string()
  .min(1, 'Telefone é obrigatório')
  .regex(/^[\d\s()\-+]+$/, 'Formato de telefone inválido')
  .min(10, 'Telefone deve ter pelo menos 10 dígitos')
  .max(20, 'Telefone muito longo')
  .transform((val) => val.replace(/\D/g, ''));

export const nameSchema = z
  .string()
  .min(1, 'Nome é obrigatório')
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(100, 'Nome muito longo')
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços');

export const messageSchema = z
  .string()
  .min(1, 'Mensagem é obrigatória')
  .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
  .max(1000, 'Mensagem muito longa');

export const subjectSchema = z
  .string()
  .min(1, 'Assunto é obrigatório')
  .min(3, 'Assunto deve ter pelo menos 3 caracteres')
  .max(100, 'Assunto muito longo');

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: subjectSchema.optional(),
  message: messageSchema,
  consent: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos'),
  // Honeypot field for spam protection
  _gotcha: z.string().max(0, 'Spam detectado').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos'),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Quote request schema
export const quoteFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: z
    .string()
    .min(1, 'Nome da empresa é obrigatório')
    .max(100, 'Nome da empresa muito longo'),
  projectType: z
    .string()
    .min(1, 'Tipo de projeto é obrigatório'),
  budget: z
    .string()
    .min(1, 'Orçamento é obrigatório'),
  timeline: z
    .string()
    .min(1, 'Prazo é obrigatório'),
  description: messageSchema,
  consent: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos'),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Callback request schema
export const callbackSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  preferredTime: z
    .string()
    .min(1, 'Horário preferido é obrigatório'),
  subject: subjectSchema.optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos'),
});

export type CallbackData = z.infer<typeof callbackSchema>;

// Validation helper functions
export function validateField<T>(
  schema: z.ZodSchema<T>,
  value: any
): { isValid: boolean; error?: string } {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors[0]?.message || 'Erro de validação',
      };
    }
    return { isValid: false, error: 'Erro de validação' };
  }
}

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: any
): { isValid: boolean; errors: Record<string, string>; data?: T } {
  try {
    const validatedData = schema.parse(data);
    return { isValid: true, errors: {}, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { form: 'Erro de validação' } };
  }
}

// Real-time validation hook helper
export function createFieldValidator<T>(schema: z.ZodSchema<T>) {
  return (value: any) => validateField(schema, value);
}

// Sanitization functions
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function capitalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Form data preparation
export function prepareFormData(data: Record<string, any>): Record<string, any> {
  const sanitized = { ...data };
  
  // Sanitize text fields
  if (sanitized.name) {
    sanitized.name = capitalizeName(sanitizeHtml(sanitized.name));
  }
  
  if (sanitized.subject) {
    sanitized.subject = sanitizeHtml(sanitized.subject);
  }
  
  if (sanitized.message) {
    sanitized.message = sanitizeHtml(sanitized.message);
  }
  
  if (sanitized.company) {
    sanitized.company = sanitizeHtml(sanitized.company);
  }
  
  // Sanitize phone
  if (sanitized.phone) {
    sanitized.phone = sanitizePhone(sanitized.phone);
  }
  
  // Remove honeypot and other security fields
  delete sanitized._gotcha;
  
  return sanitized;
}
