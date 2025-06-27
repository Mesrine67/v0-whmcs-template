"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

/**
 * Wrapper client pour l’espace client.
 */
const ClientAreaPageClient = dynamic(() => import("./page.client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  ),
})

const ClientAreaWrapper: React.FC = () => <ClientAreaPageClient />

export default ClientAreaWrapper
