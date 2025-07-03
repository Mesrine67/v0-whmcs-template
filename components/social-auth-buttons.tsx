"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DiscIcon as Discord, MessageSquare } from "lucide-react" // Importez les icônes

interface UserProfile {
  id: string // L'ID interne de votre BDD
  provider: string // "discourse" ou "discord"
  providerAccountId: string // L'ID du fournisseur
  username: string
  name?: string
  avatarTemplate?: string
  isAdmin: boolean
  isModerator: boolean
}

export default function SocialAuthButtons() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Pour simplifier, nous allons juste vérifier si un utilisateur est connecté via Discourse
        // Dans une application réelle, vous auriez une API /api/auth/me qui consoliderait
        // l'état de connexion de tous les fournisseurs.
        const response = await fetch("/api/auth/discourse/user") // Ou une API générique /api/auth/me
        if (response.ok) {
          const userData = await response.json()
          // Simuler le format UserProfile pour l'affichage
          setUser({
            id: "temp", // Cet ID n'est pas l'ID de la BDD ici, juste pour l'affichage
            provider: "discourse",
            providerAccountId: userData.id.toString(),
            username: userData.username,
            name: userData.name,
            avatarTemplate: userData.avatar_template,
            isAdmin: userData.admin,
            isModerator: userData.moderator,
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleDiscourseLogin = () => {
    window.location.href = "/api/auth/discourse/login"
  }

  const handleDiscordLogin = () => {
    window.location.href = "/api/auth/discord/login"
  }

  const handleLogout = async () => {
    try {
      // Déconnecter de Discourse
      await fetch("/api/auth/discourse/logout", { method: "POST" })
      // Déconnecter de Supabase (pour Discord)
      const supabase = await import("@/utils/supabase/client").then((mod) => mod.createClient())
      await supabase.auth.signOut()

      setUser(null)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">Chargement de l'utilisateur...</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentification</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {user ? (
          <>
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatarTemplate?.replace('{size || "/placeholder.svg"}', "120") || "/placeholder.svg"}
                alt={user.username}
              />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.name || user.username}</p>
              <p className="text-sm text-muted-foreground">
                @{user.username} ({user.provider})
              </p>
              {user.isAdmin && <p className="text-xs text-blue-500">Administrateur</p>}
              {user.isModerator && <p className="text-xs text-green-500">Modérateur</p>}
            </div>
            <Button onClick={handleLogout} className="w-full">
              Se déconnecter
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">Connectez-vous avec votre compte social.</p>
            <Button onClick={handleDiscourseLogin} className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" /> Se connecter avec Discourse
            </Button>
            <Button onClick={handleDiscordLogin} className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              <Discord className="mr-2 h-4 w-4" /> Se connecter avec Discord
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
