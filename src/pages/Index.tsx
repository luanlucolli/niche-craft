
import { useEffect } from 'react';
import { generateSEO, updatePageSEO, generateStructuredData, injectStructuredData } from '@/lib/seo';
import { initAnalytics } from '@/lib/analytics';
import siteData from '@/content/site.json';
import homepageData from '@/content/homepage.json';

// Import all section components
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Services from '@/components/sections/Services';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

// Component mapping
const sectionComponents = {
  Hero,
  Features,
  Services,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} as const;

export default function Index() {
  useEffect(() => {
    // Initialize SEO
    const seoData = generateSEO({
      title: 'Início',
      description: siteData.description,
      keywords: siteData.keywords,
    });
    updatePageSEO(seoData);

    // Add structured data
    const organizationData = generateStructuredData('Organization', {});
    const websiteData = generateStructuredData('WebSite', {});
    injectStructuredData(organizationData);
    injectStructuredData(websiteData);

    // Initialize analytics
    initAnalytics();
  }, []);

  return (
    <main className="min-h-screen">
      {homepageData.sections.map((section, index) => {
        const Component = sectionComponents[section.component as keyof typeof sectionComponents];
        
        if (!Component) {
          console.warn(`Component ${section.component} not found`);
          return null;
        }

        return (
          <Component
            key={index}
            variant={section.variant}
            separator={section.separator}
            {...section.props}
          />
        );
      })}
    </main>
  );
}
