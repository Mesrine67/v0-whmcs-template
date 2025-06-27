import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ReviewWidgetProvider } from "@/components/review-widget-provider"
import { StructuredData } from "@/components/seo/structured-data"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale

  const titles = {
    fr: "HebergTonServ - Hébergement Web & Gaming Professionnel",
    en: "HebergTonServ - Professional Web & Gaming Hosting",
    es: "HebergTonServ - Hosting Web y Gaming Profesional",
    de: "HebergTonServ - Professionelles Web- & Gaming-Hosting",
  }

  const descriptions = {
    fr: "Solutions d'hébergement web et serveurs FiveM haute performance. Support 24/7 et infrastructure française.",
    en: "High-performance web hosting and FiveM server solutions. 24/7 support and French infrastructure.",
    es: "Soluciones de hosting web y servidores FiveM de alto rendimiento. Soporte 24/7 e infraestructura francesa.",
    de: "Hochleistungs-Webhosting und FiveM-Server-Lösungen. 24/7-Support und französische Infrastruktur.",
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.fr,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
    keywords: "hébergement web, serveur VPS, serveur dédié, FiveM, gaming, hosting",
    authors: [{ name: "HebergTonServ" }],
    creator: "HebergTonServ",
    publisher: "HebergTonServ",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://hebergtonserv.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        es: "/es",
        de: "/de",
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.fr,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
      url: `https://hebergtonserv.com/${locale}`,
      siteName: "HebergTonServ",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "HebergTonServ - Hébergement Professionnel",
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale as keyof typeof titles] || titles.fr,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.fr,
      images: ["/og-image.jpg"],
      creator: "@hebergtonserv",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <StructuredData
          type="Organization"
          data={{
            name: "HebergTonServ",
            url: "https://hebergtonserv.com",
            logo: "https://hebergtonserv.com/logo.png",
          }}
        />
        <StructuredData
          type="WebSite"
          data={{
            name: "HebergTonServ",
            url: "https://hebergtonserv.com",
          }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ReviewWidgetProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
