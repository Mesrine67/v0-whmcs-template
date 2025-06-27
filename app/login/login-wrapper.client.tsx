"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

/**
 * Wrapper client pour la page de connexion.
 * Effectue un import dynamique avec SSR désactivé.
 */
const LoginPageClient = dynamic(() => import("./page.client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

const LoginWrapper: React.FC = () => <LoginPageClient />

export default LoginWrapper
