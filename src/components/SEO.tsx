import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  schemaData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://www.nxresearchh.com/og-image.jpg',
  twitterHandle = '@nxresearch',
  schemaData,
}) => {
  const siteTitle = 'NX Research';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'NX Research builds the next generation of ventures through deep research, elite networking, and strategic innovation.';
  const metaDescription = description || defaultDescription;
  const url = canonical || window.location.href;

  // Default Organization Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NX Research",
    "url": "https://www.nxresearchh.com",
    "logo": "https://www.nxresearchh.com/logo.png",
    "description": defaultDescription,
    "sameAs": [
      "https://www.linkedin.com/company/nx-research",
      "https://www.instagram.com/nxresearch"
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
