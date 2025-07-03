"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DiscourseUser {
  id: number
  username: string
  name: string
  avatar_template: string
  admin: boolean
  moderator: boolean
  // Add other relevant user properties
}

export default function DiscourseAuth() {
  const [user, setUser] = useState<DiscourseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/discourse/user")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Failed to fetch Discourse user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogin = () => {
    window.location.href = "/api/auth/discourse/login"
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/discourse/logout", { method: "POST" })
      if (response.ok) {
        setUser(null)
      } else {
        console.error("Failed to log out from Discourse")
      }
    } catch (error) {
      console.error("Error during Discourse logout:", error)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">Chargement de l'utilisateur Discourse...</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentification Discourse</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {user ? (
          <>
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatar_template.replace('{size || "/placeholder.svg"}', "120")}
                alt={user.username}
              />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.name || user.username}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              {user.admin && <p className="text-xs text-blue-500">Administrateur</p>}
              {user.moderator && <p className="text-xs text-green-500">Modérateur</p>}
            </div>
            <Button onClick={handleLogout} className="w-full">
              Se déconnecter de Discourse
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">Connectez-vous avec votre compte Discourse.</p>
            <Button onClick={handleLogin} className="w-full">
              Se connecter avec Discourse
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
