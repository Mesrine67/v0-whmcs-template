// tells Next.js this page must be rendered on-demand
export const dynamic = "force-dynamic"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FiveMSection } from "@/components/fivem-section"
import { PricingSection } from "@/components/pricing-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
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
