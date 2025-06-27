"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const ClientAreaPageClient = dynamic(() => import("./page.client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Chargement de l'espace client...</p>
      </div>
    </div>
  ),
})

export default function ClientAreaWrapper() {
  return <ClientAreaPageClient />
}
