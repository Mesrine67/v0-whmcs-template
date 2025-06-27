"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const ClientAreaPageClient = dynamic(() => import("./page.client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  ),
})

export default function ClientAreaWrapper() {
  return <ClientAreaPageClient />
}
