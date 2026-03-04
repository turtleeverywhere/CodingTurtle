import { usePageContext } from 'vike-react/usePageContext'

export default function Head() {
  const pageContext = usePageContext()
  const { title, description, canonicalUrl } = pageContext.data || {}

  const defaultTitle = 'Coding Turtle | App Development & Web Services'
  const defaultDescription = 'From idea to App Store. We design, develop, and ship mobile apps and web solutions that solve real problems.'
  const siteUrl = 'https://coding-turtle.org'

  const pageTitle = title || defaultTitle
  const pageDescription = description || defaultDescription
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Coding Turtle",
    "description": "App development and web services. We build mobile apps for iOS and Android, web applications, and custom software solutions.",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.png`,
    "email": "info@coding-turtle.org",
    "serviceType": [
      "App Development",
      "Web Development",
      "Flutter Development",
      "React Native Development",
      "Swift Development"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    "name": "Coding Turtle",
    "description": "Professional app and web development services. From idea to App Store.",
    "url": siteUrl,
    "email": "info@coding-turtle.org",
    "image": `${siteUrl}/favicon.png`,
    "priceRange": "€€",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "Native and cross-platform mobile apps for iOS and Android"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom websites, web apps, and landing pages"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Coding Turtle",
    "url": siteUrl
  }

  return (
    <>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="app development, web development, flutter, ios app, android app, react native, swift, mobile apps, software development" />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteUrl}/favicon.png`} />
      <meta property="og:site_name" content="Coding Turtle" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${siteUrl}/favicon.png`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  )
}
