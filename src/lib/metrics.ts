
import siteData from '@/content/site.json';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Só rastreia se analytics estiver habilitado
  if (!siteData.analytics?.enabled) {
    return;
  }

  // Google Analytics 4
  if (window.gtag && siteData.analytics.googleAnalytics) {
    window.gtag('event', eventName, properties);
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }

  // Console log para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event:', { eventName, properties });
  }
}

// Eventos específicos da landing page
export const metrics = {
  // WhatsApp clicks
  whatsappClick: (location: string, plan?: string) =>
    trackEvent('whatsapp_click', { location, plan }),

  // Calculator usage
  calculatorUsed: (visitas: number, taxa: number, ticket: number, leads: number, receita: number) =>
    trackEvent('calculator_used', { visitas, taxa, ticket, leads_estimados: leads, receita_estimada: receita }),

  // Section views (intersection observer)
  sectionView: (sectionName: string) =>
    trackEvent('section_view', { section_name: sectionName }),

  // Form interactions
  formFocus: (formType: string) =>
    trackEvent('form_focus', { form_type: formType }),

  // Case card interactions
  caseCardView: (segmento: string) =>
    trackEvent('case_card_view', { segmento }),

  // Trust badge interactions
  badgeHover: (badgeLabel: string) =>
    trackEvent('badge_hover', { badge_label: badgeLabel }),
};
