import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReviewWidgetProvider } from "@/components/review-widget-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HebergTonServ - Hébergement Web & Gaming Professionnel",
  description:
    "Solutions d'hébergement web et serveurs FiveM haute performance. Support 24/7 et infrastructure française.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <ReviewWidgetProvider />
      </body>
    </html>
  )
}
