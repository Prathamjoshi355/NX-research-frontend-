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
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute('content', metaDesc);
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = metaDesc;
      document.head.appendChild(m);
    }

    if (canonical) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // other tags (og, twitter, schema) omitted for brevity
  }, [title, description, canonical]);

  return null;
};

export default SEO;
