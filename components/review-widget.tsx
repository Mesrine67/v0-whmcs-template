"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, X, MessageSquare, ExternalLink, Send, Minimize2, Maximize2, Heart } from "lucide-react"

interface ReviewWidgetProps {
  isAuthenticated?: boolean
  userEmail?: string
  userName?: string
}

export function ReviewWidget({ isAuthenticated = false, userEmail = "", userName = "" }: ReviewWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentStep, setCurrentStep] = useState<"trigger" | "rating" | "platforms" | "internal" | "thanks">("trigger")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Logique d'affichage du widget
  useEffect(() => {
    const checkShouldShow = () => {
      // Ne pas afficher si déjà fermé récemment
      const lastClosed = localStorage.getItem("reviewWidget_lastClosed")
      if (lastClosed) {
        const daysSinceClose = (Date.now() - Number.parseInt(lastClosed)) / (1000 * 60 * 60 * 24)
        if (daysSinceClose < 7) return false // Attendre 7 jours
      }

      // Ne pas afficher si avis déjà donné
      const hasReviewed = localStorage.getItem("reviewWidget_hasReviewed")
      if (hasReviewed) return false

      // Afficher après 30 secondes sur le site
      const visitStart = sessionStorage.getItem("visitStart")
      if (!visitStart) {
        sessionStorage.setItem("visitStart", Date.now().toString())
        return false
      }

      const timeOnSite = Date.now() - Number.parseInt(visitStart)
      return timeOnSite > 30000 // 30 secondes
    }

    const timer = setTimeout(() => {
      if (checkShouldShow()) {
        setIsVisible(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("reviewWidget_lastClosed", Date.now().toString())
  }

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
    if (selectedRating >= 4) {
      setCurrentStep("platforms")
    } else {
      setCurrentStep("internal")
    }
  }

  const handleInternalReviewSubmit = async () => {
    if (!reviewText.trim()) return

    setIsSubmitting(true)
    try {
      // Simulation d'envoi d'avis interne
      await fetch("/api/reviews/internal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          title: reviewTitle,
          content: reviewText,
          email: userEmail,
          name: userName,
        }),
      })

      localStorage.setItem("reviewWidget_hasReviewed", "true")
      setCurrentStep("thanks")
    } catch (error) {
      console.error("Erreur envoi avis:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExternalReview = (platform: string) => {
    const urls = {
      google: "https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review",
      trustpilot: "https://fr.trustpilot.com/review/hebergtonserv.com",
      facebook: "https://www.facebook.com/hebergtonserv/reviews",
    }

    window.open(urls[platform as keyof typeof urls], "_blank")
    localStorage.setItem("reviewWidget_hasReviewed", "true")
    setCurrentStep("thanks")
  }

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1
      const isFilled = interactive ? starValue <= (hoverRating || rating) : starValue <= rating

      return (
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={interactive ? () => handleRatingClick(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        />
      )
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <Card className="shadow-2xl border-2 border-blue-200 bg-white">
        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">HebergTonServ</CardTitle>
                <CardDescription className="text-xs">Votre avis compte !</CardDescription>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleClose}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="pt-0">
            {/* Étape 1: Déclencheur */}
            {currentStep === "trigger" && (
              <div className="text-center space-y-4">
                <div className="text-2xl">😊</div>
                <p className="text-sm">Comment s'est passée votre expérience avec nos services ?</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setCurrentStep("rating")}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Donner mon avis
                </Button>
              </div>
            )}

            {/* Étape 2: Notation */}
            {currentStep === "rating" && (
              <div className="text-center space-y-4">
                <p className="text-sm font-medium">Notez votre expérience</p>
                <div className="flex justify-center space-x-1">{renderStars(true)}</div>
                <p className="text-xs text-muted-foreground">Cliquez sur les étoiles pour noter</p>
              </div>
            )}

            {/* Étape 3: Plateformes externes (note >= 4) */}
            {currentStep === "platforms" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center space-x-1 mb-2">{renderStars()}</div>
                  <p className="text-sm font-medium text-green-600">Merci pour cette excellente note ! 🎉</p>
                  <p className="text-xs text-muted-foreground mt-2">Aidez d'autres clients en partageant votre avis</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleExternalReview("google")}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">🔍</span>
                      <div className="text-left">
                        <div className="text-sm font-medium">Google Reviews</div>
                        <div className="text-xs text-muted-foreground">Le plus visible</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleExternalReview("trustpilot")}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">⭐</span>
                      <div className="text-left">
                        <div className="text-sm font-medium">Trustpilot</div>
                        <div className="text-xs text-muted-foreground">Plateforme de confiance</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleExternalReview("facebook")}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">📘</span>
                      <div className="text-left">
                        <div className="text-sm font-medium">Facebook</div>
                        <div className="text-xs text-muted-foreground">Réseau social</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setCurrentStep("internal")}>
                  Ou laisser un avis privé
                </Button>
              </div>
            )}

            {/* Étape 4: Avis interne (note < 4 ou choix privé) */}
            {currentStep === "internal" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center space-x-1 mb-2">{renderStars()}</div>
                  {rating < 4 ? (
                    <p className="text-sm text-orange-600">
                      Nous sommes désolés que votre expérience ne soit pas parfaite
                    </p>
                  ) : (
                    <p className="text-sm text-blue-600">Merci pour votre retour !</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Input
                    placeholder="Titre de votre avis (optionnel)"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="text-sm"
                  />
                  <Textarea
                    placeholder="Partagez votre expérience avec nous..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="text-sm min-h-[80px] resize-none"
                  />
                  {isAuthenticated && (
                    <div className="text-xs text-muted-foreground">Connecté en tant que {userName || userEmail}</div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setCurrentStep("rating")}
                  >
                    Retour
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleInternalReviewSubmit}
                    disabled={!reviewText.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-3 w-3 mr-1" />
                        Envoyer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Étape 5: Remerciements */}
            {currentStep === "thanks" && (
              <div className="text-center space-y-4">
                <div className="text-4xl">🙏</div>
                <div>
                  <p className="text-sm font-medium text-green-600">Merci pour votre avis !</p>
                  <p className="text-xs text-muted-foreground mt-1">Votre retour nous aide à améliorer nos services</p>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent" onClick={handleClose}>
                  Fermer
                </Button>
              </div>
            )}
          </CardContent>
        )}

        {/* Indicateur minimisé */}
        {isMinimized && (
          <div className="px-4 pb-3">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-medium">Avis</span>
            </div>
          </div>
        )}
      </Card>

      {/* Badge de notification */}
      {currentStep === "trigger" && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-pulse">
          <Heart className="h-3 w-3" />
        </Badge>
      )}
    </div>
  )
}
