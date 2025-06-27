"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Search, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"

export default function ReviewsPageClient() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Jean D.",
      rating: 5,
      title: "Excellent service !",
      content:
        "Service client réactif et serveurs très performants. Je recommande vivement HebergTonServ pour tous vos besoins d'hébergement.",
      date: "2024-01-15",
      service: "Serveur Web Premium",
      helpful: 12,
      notHelpful: 1,
      response: {
        author: "Équipe HebergTonServ",
        content: "Merci Jean pour ce retour positif ! Nous sommes ravis que nos services vous donnent satisfaction.",
        date: "2024-01-16",
      },
    },
    {
      id: 2,
      author: "Marie L.",
      rating: 4,
      title: "Très bon rapport qualité/prix",
      content: "Serveur stable et prix compétitif. Quelques petits ralentissements parfois mais rien de grave.",
      date: "2024-01-10",
      service: "Serveur FiveM",
      helpful: 8,
      notHelpful: 2,
      response: null,
    },
    {
      id: 3,
      author: "Pierre M.",
      rating: 5,
      title: "Support technique au top",
      content: "J'ai eu un problème technique et l'équipe support a résolu le problème en moins de 2 heures. Bravo !",
      date: "2024-01-08",
      service: "Serveur Minecraft",
      helpful: 15,
      notHelpful: 0,
      response: {
        author: "Équipe HebergTonServ",
        content: "Merci Pierre ! Notre équipe technique est toujours là pour vous aider rapidement.",
        date: "2024-01-08",
      },
    },
  ])

  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    service: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100,
  }))

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === 0 || review.rating === filterRating
    return matchesSearch && matchesRating
  })

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      author: "Vous",
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split("T")[0],
      service: newReview.service,
      helpful: 0,
      notHelpful: 0,
      response: null,
    }
    setReviews([review, ...reviews])
    setNewReview({ rating: 5, title: "", content: "", service: "" })
    setShowReviewForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Avis Clients</h1>
            <p className="text-gray-600">Découvrez ce que nos clients pensent de nos services</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec statistiques */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Note globale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{averageRating.toFixed(1)}</div>
                  {renderStars(Math.round(averageRating))}
                  <p className="text-sm text-gray-600 mt-2">Basé sur {reviews.length} avis</p>
                </div>
                <div className="mt-6 space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par note</label>
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={0}>Toutes les notes</option>
                    <option value={5}>5 étoiles</option>
                    <option value={4}>4 étoiles</option>
                    <option value={3}>3 étoiles</option>
                    <option value={2}>2 étoiles</option>
                    <option value={1}>1 étoile</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des avis */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredReviews.length} avis trouvé{filteredReviews.length > 1 ? "s" : ""}
              </h2>
              <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Laisser un avis
              </Button>
            </div>

            {showReviewForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Laisser un avis</CardTitle>
                  <CardDescription>Partagez votre expérience avec nos services</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                      {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service concerné</label>
                      <select
                        value={newReview.service}
                        onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Sélectionner un service</option>
                        <option value="Serveur Web Premium">Serveur Web Premium</option>
                        <option value="Serveur FiveM">Serveur FiveM</option>
                        <option value="Serveur Minecraft">Serveur Minecraft</option>
                        <option value="Support technique">Support technique</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'avis</label>
                      <Input
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        placeholder="Résumez votre expérience..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Votre avis détaillé</label>
                      <Textarea
                        value={newReview.content}
                        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                        placeholder="Décrivez votre expérience en détail..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button type="submit">Publier l'avis</Button>
                      <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                        Annuler
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(review.rating)}
                          <Badge variant="outline">{review.service}</Badge>
                        </div>
                        <CardTitle className="text-lg">{review.title}</CardTitle>
                        <CardDescription>
                          Par {review.author} • {review.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{review.content}</p>

                    {review.response && (
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">Réponse officielle</Badge>
                          <span className="text-sm text-gray-600">{review.response.date}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.response.content}</p>
                        <p className="text-sm font-medium text-blue-800">— {review.response.author}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{review.helpful}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                          <ThumbsDown className="w-4 h-4" />
                          <span className="text-sm">{review.notHelpful}</span>
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">Cet avis vous a-t-il été utile ?</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
