"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Eye, Check, X, AlertTriangle, TrendingUp } from "lucide-react"

interface InternalReview {
  id: string
  rating: number
  title: string
  content: string
  email: string
  name: string
  date: string
  status: "pending" | "approved" | "rejected"
  platform: string
}

export function ReviewDashboard() {
  const [reviews, setReviews] = useState<InternalReview[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    averageRating: 0,
  })

  useEffect(() => {
    // Charger les avis depuis l'API
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/admin/reviews")
      const data = await response.json()
      setReviews(data.reviews || [])
      setStats(data.stats || stats)
    } catch (error) {
      console.error("Erreur chargement avis:", error)
    }
  }

  const handleReviewAction = async (reviewId: string, action: "approve" | "reject") => {
    try {
      await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      fetchReviews() // Recharger les données
    } catch (error) {
      console.error("Erreur action avis:", error)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Avis</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <TrendingUp className="h-4 w-4 mr-2" />
          Statistiques
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Avis</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}/5</div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des avis */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">En Attente ({stats.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approuvés</TabsTrigger>
          <TabsTrigger value="rejected">Rejetés</TabsTrigger>
          <TabsTrigger value="all">Tous</TabsTrigger>
        </TabsList>

        {["pending", "approved", "rejected", "all"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {reviews
              .filter((review) => status === "all" || review.status === status)
              .map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{review.name}</h3>
                          <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">{renderStars(review.rating)}</div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}
                    <p className="text-muted-foreground mb-4">{review.content}</p>
                    <div className="text-sm text-muted-foreground mb-4">
                      Email: {review.email} | Plateforme: {review.platform}
                    </div>

                    {review.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleReviewAction(review.id, "approve")}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approuver
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReviewAction(review.id, "reject")}>
                          <X className="h-4 w-4 mr-2" />
                          Rejeter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
