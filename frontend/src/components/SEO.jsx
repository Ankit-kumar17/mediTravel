import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'MediTravel Assist',
  description = 'Find verified doctors, hospitals, and emergency healthcare services while traveling. Transparent pricing and multi-language support.',
  keywords = 'medical tourism, doctor finder, hospital search, healthcare travel',
  path = '/',
}) => {
  const siteUrl = 'https://meditravel-assist.vercel.app';
  const fullUrl = `${siteUrl}${path}`;
  const fullTitle = title === 'MediTravel Assist' ? title : `${title} | MediTravel Assist`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
