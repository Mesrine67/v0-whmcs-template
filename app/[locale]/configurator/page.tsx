"use client"

import { useTranslations } from "next-intl"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceConfigurator } from "@/components/service-configurator"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export default function ConfiguratorPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container py-4">
          <Breadcrumbs items={[{ label: t("navigation.home"), href: "/" }, { label: "Configurateur" }]} />
        </div>
        <ServiceConfigurator />
      </main>
      <Footer />
    </div>
  )
}
