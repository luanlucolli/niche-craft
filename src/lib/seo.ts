
import { site } from '@/content/site.json';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export function generateSEO({
  title,
  description = site.description,
  image = site.seo.ogImage,
  url = site.url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = site.author,
  keywords = site.keywords,
}: SEOProps = {}) {
  const fullTitle = title ? `${title} | ${site.title}` : site.title;
  const fullUrl = url.startsWith('http') ? url : `${site.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${site.url}${image}`;

  return {
    title: fullTitle,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        name: 'keywords',
        content: keywords.join(', '),
      },
      {
        name: 'author',
        content: author,
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'language',
        content: site.language,
      },
      // Open Graph
      {
        property: 'og:title',
        content: fullTitle,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:type',
        content: type,
      },
      {
        property: 'og:url',
        content: fullUrl,
      },
      {
        property: 'og:image',
        content: fullImage,
      },
      {
        property: 'og:site_name',
        content: site.title,
      },
      {
        property: 'og:locale',
        content: site.language.replace('-', '_'),
      },
      // Twitter
      {
        name: 'twitter:card',
        content: site.seo.twitterCard,
      },
      {
        name: 'twitter:title',
        content: fullTitle,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: fullImage,
      },
      // Article specific
      ...(type === 'article' && publishedTime
        ? [
            {
              property: 'article:published_time',
              content: publishedTime,
            },
          ]
        : []),
      ...(type === 'article' && modifiedTime
        ? [
            {
              property: 'article:modified_time',
              content: modifiedTime,
            }
          ]
        : []),
      ...(type === 'article' && author
        ? [
            {
              property: 'article:author',
              content: author,
            }
          ]
        : []),
    ],
    link: [
      {
        rel: 'canonical',
        href: fullUrl,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: site.seo.favicon,
      },
    ],
  };
}

export function updatePageSEO(seoData: SEOProps) {
  const seo = generateSEO(seoData);
  
  // Update title
  document.title = seo.title;
  
  // Update or create meta tags
  seo.meta.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    
    meta.content = content;
  });
  
  // Update or create link tags
  seo.link.forEach(({ rel, href, type }) => {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    
    link.href = href;
    if (type) link.type = type;
  });
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Article', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        name: site.title,
        url: site.url,
        logo: `${site.url}/logo.png`,
        description: site.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.contact.phone,
          contactType: 'customer service',
          email: site.contact.email,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.contact.address.street,
          addressLocality: site.contact.address.city,
          addressRegion: site.contact.address.state,
          postalCode: site.contact.address.zipCode,
          addressCountry: site.contact.address.country,
        },
        sameAs: Object.values(site.social).filter(Boolean),
        ...data,
      };

    case 'WebSite':
      return {
        ...baseData,
        name: site.title,
        url: site.url,
        description: site.description,
        publisher: {
          '@type': 'Organization',
          name: site.title,
        },
        ...data,
      };

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author || site.author,
        },
        publisher: {
          '@type': 'Organization',
          name: site.title,
          logo: {
            '@type': 'ImageObject',
            url: `${site.url}/logo.png`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        image: data.image ? `${site.url}${data.image}` : `${site.url}${site.seo.ogImage}`,
        ...data,
      };

    default:
      return baseData;
  }
}

export function injectStructuredData(data: any) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
