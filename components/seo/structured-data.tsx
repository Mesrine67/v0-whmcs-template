import Script from "next/script"

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Service" | "Product" | "Review"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }

    if (type === "Organization") {
      return {
        ...baseData,
        name: "HebergTonServ",
        url: "https://hebergtonserv.com",
        logo: "https://hebergtonserv.com/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+33-1-23-45-67-89",
          contactType: "customer service",
          availableLanguage: ["French", "English", "Spanish", "German"],
        },
        sameAs: [
          "https://twitter.com/hebergtonserv",
          "https://facebook.com/hebergtonserv",
          "https://linkedin.com/company/hebergtonserv",
        ],
      }
    }

    if (type === "WebSite") {
      return {
        ...baseData,
        name: "HebergTonServ",
        url: "https://hebergtonserv.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://hebergtonserv.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }
    }

    return baseData
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}
