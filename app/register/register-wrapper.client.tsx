"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const RegisterPageClient = dynamic(() => import("./page.client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

export default function RegisterWrapper() {
  return <RegisterPageClient />
}
