
import siteData from '@/content/site.json';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function initAnalytics() {
  // Google Analytics 4
  if (siteData.analytics.googleAnalytics) {
    initGoogleAnalytics(siteData.analytics.googleAnalytics);
  }

  // Plausible Analytics
  if (siteData.analytics.plausible.domain) {
    initPlausible(siteData.analytics.plausible.domain, siteData.analytics.plausible.apiHost);
  }
}

function initGoogleAnalytics(measurementId: string) {
  // Create dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  // Initialize GA4
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

function initPlausible(domain: string, apiHost?: string) {
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', domain);
  
  if (apiHost) {
    script.setAttribute('data-api', `${apiHost}/api/event`);
    script.src = `${apiHost}/js/script.js`;
  } else {
    script.src = 'https://plausible.io/js/script.js';
  }
  
  document.head.appendChild(script);
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', { eventName, properties });
  }
}

export function trackPageView(path?: string) {
  const pagePath = path || window.location.pathname;
  
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('config', siteData.analytics.googleAnalytics, {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Plausible automatically tracks page views, but we can send custom ones
  if (window.plausible) {
    window.plausible('pageview', { 
      u: window.location.href,
      props: { path: pagePath }
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Page View:', { path: pagePath, title: document.title });
  }
}

// Utility functions for common tracking events
export const analytics = {
  // User interactions
  buttonClick: (buttonText: string, location: string) => 
    trackEvent('button_click', { button_text: buttonText, location }),
  
  formSubmit: (formName: string, success: boolean) => 
    trackEvent('form_submit', { form_name: formName, success }),
  
  linkClick: (linkText: string, destination: string, external: boolean) => 
    trackEvent('link_click', { link_text: linkText, destination, external }),
  
  // Content engagement
  sectionView: (sectionName: string) => 
    trackEvent('section_view', { section_name: sectionName }),
  
  downloadStart: (fileName: string, fileType: string) => 
    trackEvent('download_start', { file_name: fileName, file_type: fileType }),
  
  videoPlay: (videoTitle: string, duration?: number) => 
    trackEvent('video_play', { video_title: videoTitle, duration }),
  
  // Business events
  contactForm: (method: string) => 
    trackEvent('contact_attempt', { method }),
  
  pricingView: (plan: string) => 
    trackEvent('pricing_view', { plan }),
  
  testimonialView: (author: string) => 
    trackEvent('testimonial_view', { author }),
};
