import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  locale?: string;
  schemaData?: object;
}

// lightweight SEO helper without external dependency
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://www.nxresearchh.com/og-image.jpg',
  twitterHandle = '@nxresearch',
  noIndex,
  locale,
  schemaData,
}) => {
  useEffect(() => {
    const siteTitle = 'NX Research';
    const defaultTitle = 'NX Research | Building the Next Generation of Ventures';
    document.title = title ? `${title} | ${siteTitle}` : defaultTitle;

    const metaDesc = description ||
      'NX Research builds the next generation of ventures through deep research, elite networking, and strategic innovation. Join our ecosystem today.';
    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (tag) {
        tag.content = content;
      } else {
        tag = document.createElement('meta');
        tag.name = name;
        tag.content = content;
        document.head.appendChild(tag);
      }
    };
    setMeta('description', metaDesc);
    // default robots
    setMeta('robots', noIndex ? 'noindex,follow' : 'index,follow');

    // canonical: prefer provided, otherwise build from preferred domain to avoid duplicate content
    const preferredDomain = 'https://www.nxresearchh.com';
    const builtCanonical = canonical || `${preferredDomain}${window.location.pathname}`;
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = builtCanonical;

    // Open Graph tags
    const setProperty = (prop: string, content: string) => {
      let tag = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
      if (tag) {
        tag.content = content;
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', prop);
        tag.content = content;
        document.head.appendChild(tag);
      }
    };
    const url = builtCanonical || window.location.href;
    setProperty('og:title', title ? `${title} | ${siteTitle}` : defaultTitle);
    setProperty('og:description', metaDesc);
    setProperty('og:type', ogType);
    setProperty('og:url', url);
    setProperty('og:image', ogImage);
    setProperty('og:site_name', siteTitle);
    setProperty('og:locale', locale || 'en_IN');

    // Twitter cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:creator', twitterHandle);
    setMeta('twitter:title', title ? `${title} | ${siteTitle}` : defaultTitle);
    setMeta('twitter:description', metaDesc);
    setMeta('twitter:image', ogImage);

    // Preconnect & preload important origins/assets
    const preconnect = (href: string) => {
      if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
        const l = document.createElement('link');
        l.rel = 'preconnect';
        l.href = href;
        l.crossOrigin = '';
        document.head.appendChild(l);
      }
    };
    preconnect('https://res.cloudinary.com');
    preconnect('https://fonts.gstatic.com');

    // Preload OG image when available (non-blocking, low priority)
    if (ogImage && !document.querySelector(`link[rel="preload"][href="${ogImage}"]`)) {
      const preload = document.createElement('link');
      preload.rel = 'preload';
      preload.as = 'image';
      preload.href = ogImage;
      document.head.appendChild(preload);
    }

    // JSON-LD structured data
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteTitle,
      "url": "https://www.nxresearchh.com",
      "logo": "https://www.nxresearchh.com/logo.png",
      "description": metaDesc,
      "sameAs": [
        "https://www.linkedin.com/company/nx-research",
        "https://www.instagram.com/nxresearch"
      ]
    };
    const finalSchema = schemaData || defaultSchema;
    if (script) {
      script.textContent = JSON.stringify(finalSchema);
    } else {
      script = document.createElement('script') as HTMLScriptElement;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(finalSchema);
      document.head.appendChild(script);
    }
    // end SEO update
  }, [title, description, canonical, ogType, ogImage, twitterHandle, noIndex, locale, schemaData]);

  return null;
};

export default SEO;
