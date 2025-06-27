"use client"

import { useTranslations } from "next-intl"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FiveMSection } from "@/components/fivem-section"
import { PricingSection } from "@/components/pricing-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container py-4">
          <Breadcrumbs items={[{ label: t("navigation.home") }]} />
        </div>
        <HeroSection />
        <ServicesSection />
        <FiveMSection />
        <PricingSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
