import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
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
  schemaData,
}) => {
  useEffect(() => {
    const siteTitle = 'NX Research';
    document.title = title ? `${title} | ${siteTitle}` : siteTitle;

    const metaDesc = description ||
      'NX Research builds the next generation of ventures through deep research, elite networking, and strategic innovation.';
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

    if (canonical) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

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
    const url = canonical || window.location.href;
    setProperty('og:title', title ? `${title} | ${siteTitle}` : siteTitle);
    setProperty('og:description', metaDesc);
    setProperty('og:type', ogType);
    setProperty('og:url', url);
    setProperty('og:image', ogImage);
    setProperty('og:site_name', siteTitle);

    // Twitter cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:creator', twitterHandle);
    setMeta('twitter:title', title ? `${title} | ${siteTitle}` : siteTitle);
    setMeta('twitter:description', metaDesc);
    setMeta('twitter:image', ogImage);

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
  }, [title, description, canonical]);

  return null;
};

export default SEO;
