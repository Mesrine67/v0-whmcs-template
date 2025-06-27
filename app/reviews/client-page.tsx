"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ExternalLink, MessageSquare, ThumbsUp, Calendar, User } from "lucide-react"

export const dynamic = "force-dynamic"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  platform: "google" | "trustpilot" | "facebook" | "internal"
  verified: boolean
  helpful?: number
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: [0, 0, 0, 0, 0],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulation du chargement des avis depuis différentes plateformes
    setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: "1",
          author: "Alexandre M.",
          rating: 5,
          title: "Excellent service FiveM !",
          content:
            "Mon serveur FiveM tourne parfaitement depuis 6 mois. Support réactif et serveurs très stables. Je recommande vivement HebergTonServ !",
          date: "2024-11-15",
          platform: "google",
          verified: true,
          helpful: 12,
        },
        {
          id: "2",
          author: "Marie L.",
          rating: 5,
          title: "Parfait pour l'hébergement web",
          content: "Interface claire, performances au top et prix compétitifs. Mon site n'a jamais été aussi rapide !",
          date: "2024-11-10",
          platform: "trustpilot",
          verified: true,
          helpful: 8,
        },
        {
          id: "3",
          author: "Thomas R.",
          rating: 4,
          title: "Très bon hébergeur",
          content:
            "Service client disponible et compétent. Quelques petits ralentissements parfois mais globalement très satisfait.",
          date: "2024-11-05",
          platform: "google",
          verified: true,
          helpful: 5,
        },
        {
          id: "4",
          author: "Sophie D.",
          rating: 5,
          title: "Support exceptionnel",
          content: "J'ai eu un problème technique complexe et l'équipe a résolu le problème en moins de 2h. Bravo !",
          date: "2024-10-28",
          platform: "facebook",
          verified: true,
          helpful: 15,
        },
        {
          id: "5",
          author: "Lucas G.",
          rating: 5,
          title: "Serveur FiveM au top",
          content: "80+ joueurs simultanés sans lag, c'est du solide ! Meilleur hébergeur FiveM que j'ai testé.",
          date: "2024-10-20",
          platform: "internal",
          verified: true,
          helpful: 20,
        },
        {
          id: "6",
          author: "Emma B.",
          rating: 4,
          title: "Bon rapport qualité/prix",
          content: "Hébergement fiable et prix raisonnables. Interface d'administration intuitive.",
          date: "2024-10-15",
          platform: "trustpilot",
          verified: true,
          helpful: 7,
        },
      ]

      setReviews(mockReviews)

      // Calcul des statistiques
      const totalReviews = mockReviews.length
      const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      const ratingDistribution = [0, 0, 0, 0, 0]

      mockReviews.forEach((review) => {
        ratingDistribution[review.rating - 1]++
      })

      setStats({
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
      })

      setIsLoading(false)
    }, 1000)
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "google":
        return "🔍"
      case "trustpilot":
        return "⭐"
      case "facebook":
        return "📘"
      case "internal":
        return "💬"
      default:
        return "⭐"
    }
  }

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "google":
        return "Google Reviews"
      case "trustpilot":
        return "Trustpilot"
      case "facebook":
        return "Facebook"
      case "internal":
        return "HebergTonServ"
      default:
        return "Avis"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const filterReviewsByPlatform = (platform: string) => {
    if (platform === "all") return reviews
    return reviews.filter((review) => review.platform === platform)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des avis...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Avis Clients</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de nos services d'hébergement web et gaming
          </p>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">{stats.averageRating}/5</CardTitle>
              <div className="flex justify-center space-x-1 mb-2">{renderStars(Math.round(stats.averageRating))}</div>
              <CardDescription>Note moyenne</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">{stats.totalReviews}</CardTitle>
              <CardDescription>Avis clients</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600">98%</CardTitle>
              <CardDescription>Clients satisfaits</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Distribution des notes */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Répartition des notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(stats.ratingDistribution[rating - 1] / stats.totalReviews) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{stats.ratingDistribution[rating - 1]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liens vers les plateformes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Button variant="outline" className="h-16 bg-transparent" asChild>
            <a href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" target="_blank" rel="noopener noreferrer">
              <div className="text-center">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-sm">Laisser un avis Google</div>
              </div>
            </a>
          </Button>
          <Button variant="outline" className="h-16 bg-transparent" asChild>
            <a href="https://fr.trustpilot.com/review/hebergtonserv.com" target="_blank" rel="noopener noreferrer">
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-sm">Avis Trustpilot</div>
              </div>
            </a>
          </Button>
          <Button variant="outline" className="h-16 bg-transparent" asChild>
            <a href="https://www.facebook.com/hebergtonserv/reviews" target="_blank" rel="noopener noreferrer">
              <div className="text-center">
                <div className="text-2xl mb-1">📘</div>
                <div className="text-sm">Avis Facebook</div>
              </div>
            </a>
          </Button>
          <Button variant="outline" className="h-16 bg-transparent" asChild>
            <a href="/contact">
              <div className="text-center">
                <div className="text-2xl mb-1">💬</div>
                <div className="text-sm">Nous contacter</div>
              </div>
            </a>
          </Button>
        </div>

        {/* Avis par plateforme */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="trustpilot">Trustpilot</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="internal">HebergTonServ</TabsTrigger>
          </TabsList>

          {["all", "google", "trustpilot", "facebook", "internal"].map((platform) => (
            <TabsContent key={platform} value={platform} className="space-y-6">
              <div className="grid gap-6">
                {filterReviewsByPlatform(platform).map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{review.author}</h3>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Vérifié
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex space-x-1">{renderStars(review.rating)}</div>
                              <span className="text-sm text-muted-foreground">
                                {getPlatformIcon(review.platform)} {getPlatformName(review.platform)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(review.date).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-muted-foreground mb-4">{review.content}</p>
                      {review.helpful && (
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Utile ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Répondre
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to action */}
        <Card className="mt-12 text-center">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold mb-4">Vous êtes client HebergTonServ ?</h3>
            <p className="text-muted-foreground mb-6">
              Partagez votre expérience et aidez d'autres utilisateurs à faire leur choix
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Laisser un avis Google
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="https://fr.trustpilot.com/review/hebergtonserv.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Avis Trustpilot
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
