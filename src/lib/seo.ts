import siteData from '@/content/site.json';

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
  description = siteData.description,
  image = siteData.seo.ogImage,
  url = siteData.url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = siteData.author,
  keywords = siteData.keywords,
}: SEOProps = {}) {
  const fullTitle = title ? `${title} | ${siteData.title}` : siteData.title;
  const fullUrl = url.startsWith('http') ? url : `${siteData.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteData.url}${image}`;

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
        content: siteData.language,
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
        content: siteData.title,
      },
      {
        property: 'og:locale',
        content: siteData.language.replace('-', '_'),
      },
      // Twitter
      {
        name: 'twitter:card',
        content: siteData.seo.twitterCard,
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
        href: siteData.seo.favicon,
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
        name: siteData.title,
        url: siteData.url,
        logo: `${siteData.url}/logo.png`,
        description: siteData.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteData.contact.phone,
          contactType: 'customer service',
          email: siteData.contact.email,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteData.contact.address.street,
          addressLocality: siteData.contact.address.city,
          addressRegion: siteData.contact.address.state,
          postalCode: siteData.contact.address.zipCode,
          addressCountry: siteData.contact.address.country,
        },
        sameAs: Object.values(siteData.social).filter(Boolean),
        ...data,
      };

    case 'WebSite':
      return {
        ...baseData,
        name: siteData.title,
        url: siteData.url,
        description: siteData.description,
        publisher: {
          '@type': 'Organization',
          name: siteData.title,
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
          name: data.author || siteData.author,
        },
        publisher: {
          '@type': 'Organization',
          name: siteData.title,
          logo: {
            '@type': 'ImageObject',
            url: `${siteData.url}/logo.png`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        image: data.image ? `${siteData.url}${data.image}` : `${siteData.url}${siteData.seo.ogImage}`,
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
