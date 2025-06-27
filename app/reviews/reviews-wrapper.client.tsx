"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const ReviewsPageClient = dynamic(() => import("./page.client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-600 mx-auto mb-4" />
        <p className="text-gray-600">Chargement des avis clients...</p>
      </div>
    </div>
  ),
})

export default function ReviewsWrapper() {
  return <ReviewsPageClient />
}
