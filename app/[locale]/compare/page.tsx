"use client"

import { useTranslations } from "next-intl"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceComparison } from "@/components/service-comparison"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export default function ComparePage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container py-4">
          <Breadcrumbs items={[{ label: t("navigation.home"), href: "/" }, { label: "Comparateur" }]} />
        </div>
        <ServiceComparison />
      </main>
      <Footer />
    </div>
  )
}
