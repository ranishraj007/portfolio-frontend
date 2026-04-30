import { Helmet } from 'react-helmet-async';

const siteUrl = 'https://ranishrajshrestha.com/';
const title = 'Ranish Raj Shrestha | Frontend Developer in Nepal';
const description =
  'Ranish Raj Shrestha is a frontend developer and computer engineer in Kathmandu, Nepal, building React, Next.js, Tailwind CSS, Mapbox, and API-driven web applications.';
const imageUrl = `${siteUrl}logo.svg`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: 'Ranish Raj Shrestha',
      url: siteUrl,
      image: imageUrl,
      jobTitle: 'Frontend Developer',
      email: 'mailto:ranish.raj.shrestha@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Acme Engineering College',
      },
      sameAs: [
        'https://github.com/ranishraj007',
        'https://www.linkedin.com/in/ranish-raj-shrestha-89aa32207/',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'Tailwind CSS',
        'Redux Toolkit',
        'TanStack Query',
        'REST API Integration',
        'Mapbox GL JS',
        'Django REST Framework',
        'Frontend Development',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Youth Innovation Lab',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'Ranish Raj Shrestha Portfolio',
      description,
      publisher: {
        '@id': `${siteUrl}#person`,
      },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}#profile-page`,
      url: siteUrl,
      name: title,
      description,
      about: {
        '@id': `${siteUrl}#person`,
      },
      isPartOf: {
        '@id': `${siteUrl}#website`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      inLanguage: 'en',
    },
  ],
};

function SEO() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Ranish Raj Shrestha, frontend developer Nepal, React developer Kathmandu, Next.js developer, Tailwind CSS developer, Mapbox developer, computer engineer Nepal, Youth Innovation Lab"
      />
      <meta name="author" content="Ranish Raj Shrestha" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content="Ranish Raj Shrestha Portfolio" />
      <meta property="og:title" content="Ranish Raj Shrestha | Frontend Developer" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="profile:first_name" content="Ranish Raj" />
      <meta property="profile:last_name" content="Shrestha" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Ranish Raj Shrestha | Frontend Developer" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}

export default SEO;
