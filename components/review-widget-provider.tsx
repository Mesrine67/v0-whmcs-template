"use client"

import { useState, useEffect } from "react"
import { ReviewWidget } from "./review-widget"

export function ReviewWidgetProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Vérifier l'authentification de l'utilisateur
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/whmcs/auth", {
          method: "GET",
        })

        if (response.ok) {
          const data = await response.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
            setUserEmail(data.user.email)
            setUserName(`${data.user.firstName} ${data.user.lastName}`)
          }
        }
      } catch (error) {
        console.error("Erreur vérification auth:", error)
      }
    }

    checkAuth()
  }, [])

  return <ReviewWidget isAuthenticated={isAuthenticated} userEmail={userEmail} userName={userName} />
}
