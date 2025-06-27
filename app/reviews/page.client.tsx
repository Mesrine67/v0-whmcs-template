"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  StarHalf,
  User,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Search,
  Award,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  service: string
  verified: boolean
  helpful: number
  notHelpful: number
  response?: {
    author: string
    content: string
    date: string
  }
}

interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  verifiedPercentage: number
}

export default function ReviewsPageClient() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Simulation du chargement des avis
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockReviews: Review[] = [
          {
            id: "1",
            author: "Marie L.",
            rating: 5,
            title: "Excellent service d'hébergement",
            content:
              "Je suis très satisfaite du service HebergTonServ. L'équipe est réactive et professionnelle. Mon site fonctionne parfaitement depuis 2 ans.",
            date: "2024-11-15",
            service: "Hébergement Web",
            verified: true,
            helpful: 12,
            notHelpful: 1,
            response: {
              author: "Équipe HebergTonServ",
              content:
                "Merci Marie pour votre confiance ! Nous sommes ravis que nos services vous donnent entière satisfaction.",
              date: "2024-11-16",
            },
          },
          {
            id: "2",
            author: "Thomas D.",
            rating: 4,
            title: "Bon rapport qualité-prix",
            content:
              "Service correct avec un bon support technique. Quelques petites coupures mais rien de grave. Je recommande pour débuter.",
            date: "2024-11-10",
            service: "VPS Cloud",
            verified: true,
            helpful: 8,
            notHelpful: 2,
          },
          {
            id: "3",
            author: "Alexandre M.",
            rating: 5,
            title: "Parfait pour FiveM",
            content:
              "Mon serveur FiveM tourne parfaitement. Configuration facile, performances au top. L'équipe m'a aidé pour l'installation.",
            date: "2024-11-08",
            service: "Serveur FiveM",
            verified: true,
            helpful: 15,
            notHelpful: 0,
          },
          {
            id: "4",
            author: "Sophie R.",
            rating: 3,
            title: "Service moyen",
            content:
              "Le service fonctionne mais j'ai eu quelques problèmes de lenteur. Le support a été réactif pour résoudre les problèmes.",
            date: "2024-11-05",
            service: "Hébergement Web",
            verified: false,
            helpful: 5,
            notHelpful: 3,
          },
          {
            id: "5",
            author: "Pierre K.",
            rating: 5,
            title: "Excellent support client",
            content:
              "J'ai eu un problème technique complexe et l'équipe a été formidable. Résolution rapide et explications claires. Bravo !",
            date: "2024-11-01",
            service: "Support Technique",
            verified: true,
            helpful: 20,
            notHelpful: 1,
          },
        ]

        const mockStats: ReviewStats = {
          totalReviews: mockReviews.length,
          averageRating: 4.4,
          ratingDistribution: {
            5: 3,
            4: 1,
            3: 1,
            2: 0,
            1: 0,
          },
          verifiedPercentage: 80,
        }

        setReviews(mockReviews)
        setStats(mockStats)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error)
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const stars = []
    const sizeClass = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-6 w-6" : "h-4 w-4"

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />)
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />)
      } else {
        stars.push(<Star key={i} className={`${sizeClass} text-gray-300`} />)
      }
    }
    return stars
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "verified" && review.verified) ||
      (filter === "5stars" && review.rating === 5) ||
      (filter === "4stars" && review.rating === 4) ||
      (filter === "3stars" && review.rating <= 3)

    const matchesSearch =
      searchTerm === "" ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "rating-high":
        return b.rating - a.rating
      case "rating-low":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulation de l'envoi de l'avis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Ajouter le nouvel avis à la liste
      const review: Review = {
        id: Date.now().toString(),
        author: "Vous",
        rating: newReview.rating,
        title: newReview.title,
        content: newReview.content,
        date: new Date().toISOString().split("T")[0],
        service: newReview.service,
        verified: false,
        helpful: 0,
        notHelpful: 0,
      }

      setReviews((prev) => [review, ...prev])
      setNewReview({ rating: 5, title: "", content: "", service: "" })
      setShowReviewForm(false)

      // Mettre à jour les statistiques
      if (stats) {
        setStats({
          ...stats,
          totalReviews: stats.totalReviews + 1,
          ratingDistribution: {
            ...stats.ratingDistribution,
            [newReview.rating]: (stats.ratingDistribution[newReview.rating] || 0) + 1,
          },
        })
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Chargement des avis clients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Avis Clients</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de nos services d'hébergement
          </p>
        </div>

        {/* Statistiques globales */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.averageRating}</div>
                <div className="flex justify-center mb-2">{renderStars(stats.averageRating, "lg")}</div>
                <p className="text-sm text-gray-600">Note moyenne</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalReviews}</div>
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600">Avis clients</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.verifiedPercentage}%</div>
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-gray-600">Avis vérifiés</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.ratingDistribution[5]}</div>
                <Award className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm text-gray-600">Avis 5 étoiles</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Distribution des notes */}
        {stats && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Répartition des notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <Progress value={(stats.ratingDistribution[rating] / stats.totalReviews) * 100} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{stats.ratingDistribution[rating]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Consulter les avis</TabsTrigger>
            <TabsTrigger value="write">Écrire un avis</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {/* Filtres et recherche */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="search">Rechercher</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Rechercher dans les avis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="filter">Filtrer par</Label>
                    <select
                      id="filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Tous les avis</option>
                      <option value="verified">Avis vérifiés</option>
                      <option value="5stars">5 étoiles</option>
                      <option value="4stars">4 étoiles</option>
                      <option value="3stars">3 étoiles et moins</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="sort">Trier par</Label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="recent">Plus récents</option>
                      <option value="oldest">Plus anciens</option>
                      <option value="rating-high">Note décroissante</option>
                      <option value="rating-low">Note croissante</option>
                      <option value="helpful">Plus utiles</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des avis */}
            <div className="space-y-6">
              {sortedReviews.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Aucun avis trouvé pour ces critères.</p>
                  </CardContent>
                </Card>
              ) : (
                sortedReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{review.author}</h3>
                              {review.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Vérifié
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">{renderStars(review.rating, "sm")}</div>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{review.service}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-lg mb-2">{review.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{review.content}</p>
                      </div>

                      {review.response && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Réponse officielle
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {new Date(review.response.date).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.response.content}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Utile ({review.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                            <ThumbsDown className="h-4 w-4" />
                            <span>Pas utile ({review.notHelpful})</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="write" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partagez votre expérience</CardTitle>
                <CardDescription>
                  Votre avis nous aide à améliorer nos services et guide les futurs clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <Label>Note globale</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= newReview.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-400"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({newReview.rating}/5)</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service">Service concerné</Label>
                    <select
                      id="service"
                      value={newReview.service}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, service: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="Hébergement Web">Hébergement Web</option>
                      <option value="VPS Cloud">VPS Cloud</option>
                      <option value="Serveur FiveM">Serveur FiveM</option>
                      <option value="Nom de domaine">Nom de domaine</option>
                      <option value="Support Technique">Support Technique</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="title">Titre de votre avis</Label>
                    <Input
                      id="title"
                      placeholder="Résumez votre expérience en quelques mots"
                      value={newReview.title}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Votre avis détaillé</Label>
                    <Textarea
                      id="content"
                      placeholder="Partagez votre expérience avec nos services..."
                      value={newReview.content}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                      rows={5}
                      required
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Votre avis sera publié après vérification. Merci de rester respectueux et constructif.
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publication en cours...
                      </>
                    ) : (
                      "Publier mon avis"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
