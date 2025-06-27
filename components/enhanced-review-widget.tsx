"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, X, MessageSquare, Minimize2, Maximize2, Heart, Brain } from "lucide-react"

interface ReviewWidgetProps {
  isAuthenticated?: boolean
  userEmail?: string
  userName?: string
}

interface SentimentAnalysis {
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  emotions: {
    joy: number
    anger: number
    fear: number
    sadness: number
    surprise: number
  }
  keywords: string[]
  categories: string[]
  urgency: "low" | "medium" | "high"
  actionRequired: boolean
  suggestedResponse?: string
}

export function EnhancedReviewWidget({ isAuthenticated = false, userEmail = "", userName = "" }: ReviewWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentStep, setCurrentStep] = useState<
    "trigger" | "rating" | "platforms" | "internal" | "analysis" | "thanks"
  >("trigger")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const checkShouldShow = () => {
      const lastClosed = localStorage.getItem("reviewWidget_lastClosed")
      if (lastClosed) {
        const daysSinceClose = (Date.now() - Number.parseInt(lastClosed)) / (1000 * 60 * 60 * 24)
        if (daysSinceClose < 7) return false
      }

      const hasReviewed = localStorage.getItem("reviewWidget_hasReviewed")
      if (hasReviewed) return false

      const visitStart = sessionStorage.getItem("visitStart")
      if (!visitStart) {
        sessionStorage.setItem("visitStart", Date.now().toString())
        return false
      }

      const timeOnSite = Date.now() - Number.parseInt(visitStart)
      return timeOnSite > 30000
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

  const analyzeSentiment = async () => {
    if (!reviewText.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/ai/sentiment-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: reviewText,
          rating,
          title: reviewTitle,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSentimentAnalysis(data.analysis)
        setCurrentStep("analysis")
      }
    } catch (error) {
      console.error("Erreur analyse sentiment:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleInternalReviewSubmit = async () => {
    if (!reviewText.trim()) return

    // D'abord analyser le sentiment
    await analyzeSentiment()

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/reviews/internal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          title: reviewTitle,
          content: reviewText,
          email: userEmail,
          name: userName,
          sentimentAnalysis,
        }),
      })

      if (response.ok) {
        localStorage.setItem("reviewWidget_hasReviewed", "true")
        setCurrentStep("thanks")
      }
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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100"
      case "negative":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-green-600 bg-green-100"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <Card className="shadow-2xl border-2 border-blue-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">HebergTonServ</CardTitle>
                <CardDescription className="text-xs">
                  {currentStep === "analysis" ? "IA activée" : "Votre avis compte !"}
                </CardDescription>
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
            {/* Étape d'analyse IA */}
            {currentStep === "analysis" && sentimentAnalysis && (
              <div className="space-y-4">
                <div className="text-center">
                  <Brain className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm font-medium">Analyse IA de votre avis</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Sentiment détecté:</span>
                    <Badge className={getSentimentColor(sentimentAnalysis.sentiment)}>
                      {sentimentAnalysis.sentiment}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Confiance:</span>
                    <span className="text-xs">{Math.round(sentimentAnalysis.confidence * 100)}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Urgence:</span>
                    <Badge className={getUrgencyColor(sentimentAnalysis.urgency)}>{sentimentAnalysis.urgency}</Badge>
                  </div>

                  {sentimentAnalysis.categories.length > 0 && (
                    <div>
                      <span className="text-xs font-medium">Catégories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sentimentAnalysis.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {sentimentAnalysis.suggestedResponse && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-blue-800 mb-1">Réponse suggérée:</p>
                      <p className="text-xs text-blue-700">{sentimentAnalysis.suggestedResponse}</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setCurrentStep("thanks")}
                  >
                    Confirmer l'envoi
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setCurrentStep("internal")}
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            )}

            {/* Autres étapes existantes... */}
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

            {currentStep === "rating" && (
              <div className="text-center space-y-4">
                <p className="text-sm font-medium">Notez votre expérience</p>
                <div className="flex justify-center space-x-1">{renderStars(true)}</div>
                <p className="text-xs text-muted-foreground">Cliquez sur les étoiles pour noter</p>
              </div>
            )}

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
                    disabled={!reviewText.trim() || isSubmitting || isAnalyzing}
                  >
                    {isSubmitting || isAnalyzing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {isAnalyzing ? "Analyse..." : "Envoi..."}
                      </div>
                    ) : (
                      <>
                        <Brain className="h-3 w-3 mr-1" />
                        Analyser & Envoyer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "thanks" && (
              <div className="text-center space-y-4">
                <div className="text-4xl">🙏</div>
                <div>
                  <p className="text-sm font-medium text-green-600">Merci pour votre avis !</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Notre IA a analysé votre retour pour nous aider à améliorer nos services
                  </p>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent" onClick={handleClose}>
                  Fermer
                </Button>
              </div>
            )}
          </CardContent>
        )}

        {isMinimized && (
          <div className="px-4 pb-3">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-medium">Avis IA</span>
            </div>
          </div>
        )}
      </Card>

      {currentStep === "trigger" && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-pulse">
          <Heart className="h-3 w-3" />
        </Badge>
      )}
    </div>
  )
}
