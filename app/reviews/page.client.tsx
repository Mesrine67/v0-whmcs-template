"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, User, Calendar, ThumbsUp, MessageSquare, CheckCircle } from "lucide-react"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  content: string
  service: string
  verified: boolean
  helpful: number
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    service: "",
    author: "",
  })

  useEffect(() => {
    // Simulation du chargement des avis
    setTimeout(() => {
      setReviews([
        {
          id: 1,
          author: "Marie L.",
          rating: 5,
          date: "15 décembre 2024",
          title: "Excellent service d'hébergement",
          content:
            "Je suis très satisfaite du service. L'équipe est réactive et professionnelle. Mon site fonctionne parfaitement depuis 2 ans.",
          service: "Hébergement Web",
          verified: true,
          helpful: 12,
        },
        {
          id: 2,
          author: "Thomas M.",
          rating: 5,
          date: "10 décembre 2024",
          title: "Parfait pour mon serveur FiveM",
          content:
            "Configuration facile, performances excellentes. Le support technique répond rapidement. Je recommande vivement !",
          service: "Serveur FiveM",
          verified: true,
          helpful: 8,
        },
        {
          id: 3,
          author: "Sophie D.",
          rating: 4,
          date: "5 décembre 2024",
          title: "Très bon rapport qualité-prix",
          content:
            "Service fiable avec un bon support client. Quelques petites améliorations possibles mais globalement très satisfaisant.",
          service: "VPS Cloud",
          verified: true,
          helpful: 6,
        },
        {
          id: 4,
          author: "Lucas R.",
          rating: 5,
          date: "1er décembre 2024",
          title: "Support client exceptionnel",
          content:
            "J'ai eu un problème technique et l'équipe l'a résolu en moins de 30 minutes. Service client au top !",
          service: "Hébergement Web",
          verified: true,
          helpful: 15,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "0"

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      reviews.length > 0 ? (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100 : 0,
  }))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 sm:py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm sm:text-base">Chargement des avis...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">Avis Clients</h1>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Découvrez ce que nos clients pensent de nos services
            </p>
          </div>

          {/* Statistiques des avis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <CardTitle className="text-lg sm:text-xl">Note moyenne</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-2">{averageRating}</div>
                {renderStars(Math.round(Number.parseFloat(averageRating)), "lg")}
                <p className="text-muted-foreground mt-2 text-sm">Basé sur {reviews.length} avis</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Répartition des notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bouton pour laisser un avis */}
          <div className="text-center mb-8">
            <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Laisser un avis
            </Button>
          </div>

          {/* Formulaire d'avis */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Partager votre expérience</CardTitle>
                <CardDescription className="text-sm">Votre avis nous aide à améliorer nos services</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-sm font-medium">
                        Votre nom
                      </Label>
                      <Input
                        id="author"
                        placeholder="Jean Dupont"
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-medium">
                        Service utilisé
                      </Label>
                      <Input
                        id="service"
                        placeholder="Hébergement Web, VPS, etc."
                        value={newReview.service}
                        onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Note</Label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Titre de votre avis
                    </Label>
                    <Input
                      id="title"
                      placeholder="Résumez votre expérience en quelques mots"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium">
                      Votre avis détaillé
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Partagez votre expérience avec nos services..."
                      rows={4}
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Publier l'avis
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Liste des avis */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Tous les avis ({reviews.length})</h2>

            <div className="space-y-4 sm:space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-sm sm:text-base">{review.author}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Vérifié
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">{review.service}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {review.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">{review.title}</h4>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">{review.content}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Utile ({review.helpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
