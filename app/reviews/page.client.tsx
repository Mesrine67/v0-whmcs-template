"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  service: string
  helpful: number
  notHelpful: number
  response?: {
    author: string
    date: string
    content: string
  }
}

export default function ReviewsPageClient() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filterService, setFilterService] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    service: "",
  })

  const [stats, setStats] = useState({
    averageRating: 4.6,
    totalReviews: 0,
    distribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  })

  useEffect(() => {
    loadReviews()
  }, [])

  useEffect(() => {
    filterReviews()
  }, [reviews, searchTerm, filterRating, filterService])

  const loadReviews = async () => {
    try {
      // Simuler le chargement des avis
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockReviews: Review[] = [
        {
          id: "1",
          author: "Marie L.",
          rating: 5,
          date: "2024-01-15",
          title: "Excellent service d'hébergement",
          content:
            "Je suis très satisfaite du service. Le support est réactif et les performances sont au rendez-vous. Je recommande vivement HebergTonServ !",
          service: "Hébergement Web",
          helpful: 12,
          notHelpful: 1,
          response: {
            author: "Équipe HebergTonServ",
            date: "2024-01-16",
            content: "Merci Marie pour ce retour positif ! Nous sommes ravis que notre service vous satisfasse.",
          },
        },
        {
          id: "2",
          author: "Thomas K.",
          rating: 4,
          date: "2024-01-10",
          title: "Bon rapport qualité-prix",
          content:
            "Service correct avec un bon rapport qualité-prix. Quelques petites coupures mais rien de dramatique. Le support répond rapidement.",
          service: "Serveur VPS",
          helpful: 8,
          notHelpful: 2,
        },
        {
          id: "3",
          author: "Sophie M.",
          rating: 5,
          date: "2024-01-08",
          title: "Parfait pour mon serveur FiveM",
          content:
            "Mon serveur FiveM tourne parfaitement depuis 6 mois. Aucun lag, excellent uptime. L'équipe technique est très compétente.",
          service: "Serveur FiveM",
          helpful: 15,
          notHelpful: 0,
          response: {
            author: "Équipe HebergTonServ",
            date: "2024-01-09",
            content:
              "Merci Sophie ! Nous sommes fiers de pouvoir offrir une expérience optimale pour les serveurs FiveM.",
          },
        },
        {
          id: "4",
          author: "Lucas R.",
          rating: 3,
          date: "2024-01-05",
          title: "Service moyen",
          content:
            "Le service fonctionne mais j'ai eu quelques problèmes de configuration au début. Le support a fini par résoudre mais cela a pris du temps.",
          service: "Hébergement Web",
          helpful: 5,
          notHelpful: 3,
        },
        {
          id: "5",
          author: "Emma D.",
          rating: 5,
          date: "2024-01-03",
          title: "Je recommande !",
          content:
            "Très bon service, interface claire et intuitive. Les prix sont compétitifs et la qualité est au rendez-vous.",
          service: "Serveur VPS",
          helpful: 10,
          notHelpful: 1,
        },
      ]

      setReviews(mockReviews)

      // Calculer les statistiques
      const total = mockReviews.length
      const sum = mockReviews.reduce((acc, review) => acc + review.rating, 0)
      const average = sum / total

      const distribution = mockReviews.reduce(
        (acc, review) => {
          acc[review.rating as keyof typeof acc]++
          return acc
        },
        { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      )

      setStats({
        averageRating: Math.round(average * 10) / 10,
        totalReviews: total,
        distribution,
      })
    } catch (error) {
      console.error("Erreur lors du chargement des avis:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterReviews = () => {
    let filtered = reviews

    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterRating !== "all") {
      filtered = filtered.filter((review) => review.rating === Number.parseInt(filterRating))
    }

    if (filterService !== "all") {
      filtered = filtered.filter((review) => review.service === filterService)
    }

    setFilteredReviews(filtered)
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    }

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour soumettre l'avis
    console.log("Nouvel avis:", newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, title: "", content: "", service: "" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des avis clients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Avis Clients</h1>
            <p className="text-gray-600 mt-2">Découvrez ce que nos clients pensent de nos services</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Note Globale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600">{stats.averageRating}</div>
                  {renderStars(Math.round(stats.averageRating), "lg")}
                  <p className="text-sm text-gray-600 mt-1">{stats.totalReviews} avis</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${(stats.distribution[rating as keyof typeof stats.distribution] / stats.totalReviews) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {stats.distribution[rating as keyof typeof stats.distribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laisser un Avis</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setShowReviewForm(!showReviewForm)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Écrire un avis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulaire d'avis */}
        {showReviewForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Votre Avis</CardTitle>
              <CardDescription>Partagez votre expérience avec nos services</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Note</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Service</label>
                    <Select
                      value={newReview.service}
                      onValueChange={(value) => setNewReview((prev) => ({ ...prev, service: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hébergement Web">Hébergement Web</SelectItem>
                        <SelectItem value="Serveur VPS">Serveur VPS</SelectItem>
                        <SelectItem value="Serveur FiveM">Serveur FiveM</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Titre</label>
                  <Input
                    value={newReview.title}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Résumez votre expérience"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Commentaire</label>
                  <Textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Décrivez votre expérience en détail"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Publier l'avis</Button>
                  <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher dans les avis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les notes</SelectItem>
                  <SelectItem value="5">5 étoiles</SelectItem>
                  <SelectItem value="4">4 étoiles</SelectItem>
                  <SelectItem value="3">3 étoiles</SelectItem>
                  <SelectItem value="2">2 étoiles</SelectItem>
                  <SelectItem value="1">1 étoile</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterService} onValueChange={setFilterService}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les services</SelectItem>
                  <SelectItem value="Hébergement Web">Hébergement Web</SelectItem>
                  <SelectItem value="Serveur VPS">Serveur VPS</SelectItem>
                  <SelectItem value="Serveur FiveM">Serveur FiveM</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des avis */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(review.rating)}
                      <Badge variant="secondary">{review.service}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{review.title}</h3>
                    <p className="text-sm text-gray-600">
                      Par {review.author} • {new Date(review.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.content}</p>

                {review.response && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Réponse officielle
                      </Badge>
                      <span className="text-sm text-gray-600 ml-2">
                        {review.response.author} • {new Date(review.response.date).toLocaleDateString("fr-FR")}
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
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis trouvé</h3>
              <p className="text-gray-600">Aucun avis ne correspond à vos critères de recherche.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
