import siteData from '@/content/site.json';

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export async function submitForm(
  data: Record<string, any>,
  endpoint?: string
): Promise<FormSubmissionResult> {
  const formEndpoint = endpoint || siteData.forms.contactEndpoint;
  
  if (!formEndpoint) {
    return {
      success: false,
      message: 'Endpoint de formulário não configurado',
      error: 'MISSING_ENDPOINT'
    };
  }

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        _subject: `Novo contato do site ${siteData.title}`,
        _replyto: data.email,
        _gotcha: '', // Honeypot field
        timestamp: new Date().toISOString(),
        source: 'landing-page',
        url: window.location.href,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      data: result,
    };
  } catch (error) {
    console.error('Form submission error:', error);
    
    return {
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.',
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
    };
  }
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Brazilian phone number formatting
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}

export function formatWhatsAppUrl(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const baseUrl = 'https://wa.me/';
  const fullPhone = cleaned.startsWith('55') ? cleaned : `55${cleaned}`;
  
  if (message) {
    return `${baseUrl}${fullPhone}?text=${encodeURIComponent(message)}`;
  }
  
  return `${baseUrl}${fullPhone}`;
}

export function createContactMessage(formData: Record<string, any>): string {
  const { name, email, phone, subject, message } = formData;
  
  return `Olá! Vim do site ${siteData.title}.

*Nome:* ${name}
*Email:* ${email}
${phone ? `*Telefone:* ${formatPhoneNumber(phone)}` : ''}
${subject ? `*Assunto:* ${subject}` : ''}

*Mensagem:*
${message}

---
Enviado em ${new Date().toLocaleString('pt-BR')}`;
}

// Validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
}

// Form state management
export interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isSuccess: boolean;
  message: string;
  errors: Record<string, string>;
}

export const initialFormState: FormState = {
  isSubmitting: false,
  isSubmitted: false,
  isSuccess: false,
  message: '',
  errors: {},
};

export function createFormHandler(
  onSuccess?: (data: any) => void,
  onError?: (error: string) => void
) {
  return async (
    data: Record<string, any>,
    setFormState: (state: Partial<FormState>) => void
  ) => {
    setFormState({ isSubmitting: true, errors: {} });

    try {
      const result = await submitForm(data);
      
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        isSuccess: result.success,
        message: result.message,
      });

      if (result.success) {
        onSuccess?.(result.data);
      } else {
        onError?.(result.error || 'Erro desconhecido');
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        isSuccess: false,
        message: 'Erro inesperado. Tente novamente.',
      });
      
      onError?.(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };
}
