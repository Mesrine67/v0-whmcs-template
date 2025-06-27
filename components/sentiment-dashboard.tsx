"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, AlertTriangle, Heart, Frown, Meh, Smile, Brain, Target, MessageSquare } from "lucide-react"

interface SentimentData {
  totalReviews: number
  sentimentDistribution: {
    positive: number
    negative: number
    neutral: number
  }
  emotionAnalysis: {
    joy: number
    anger: number
    fear: number
    sadness: number
    surprise: number
  }
  categoryInsights: Array<{
    category: string
    count: number
    averageRating: number
    sentiment: string
  }>
  urgentReviews: number
  trends: Array<{
    date: string
    positive: number
    negative: number
    neutral: number
  }>
  keywordCloud: Array<{
    word: string
    frequency: number
    sentiment: string
  }>
  actionableInsights: Array<{
    type: string
    message: string
    priority: "high" | "medium" | "low"
    category: string
  }>
}

export function SentimentDashboard() {
  const [data, setData] = useState<SentimentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    fetchSentimentData()
  }, [timeRange])

  const fetchSentimentData = async () => {
    try {
      const response = await fetch(`/api/analytics/sentiment?range=${timeRange}`)
      const sentimentData = await response.json()
      setData(sentimentData)
    } catch (error) {
      console.error("Erreur chargement données sentiment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Analyse des sentiments en cours...</p>
        </div>
      </div>
    )
  }

  const COLORS = {
    positive: "#10b981",
    negative: "#ef4444",
    neutral: "#6b7280",
  }

  const sentimentChartData = [
    { name: "Positif", value: data.sentimentDistribution.positive, color: COLORS.positive },
    { name: "Négatif", value: data.sentimentDistribution.negative, color: COLORS.negative },
    { name: "Neutre", value: data.sentimentDistribution.neutral, color: COLORS.neutral },
  ]

  const emotionChartData = Object.entries(data.emotionAnalysis).map(([emotion, value]) => ({
    emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    value: Math.round(value * 100),
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="h-8 w-8 mr-3 text-blue-600" />
            Analyse des Sentiments
          </h1>
          <p className="text-muted-foreground">Intelligence artificielle appliquée aux avis clients</p>
        </div>
        <div className="flex space-x-2">
          {["7d", "30d", "90d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score de Satisfaction</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((data.sentimentDistribution.positive / data.totalReviews) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {data.sentimentDistribution.positive} avis positifs sur {data.totalReviews}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avis Urgents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{data.urgentReviews}</div>
            <p className="text-xs text-muted-foreground">Nécessitent une action immédiate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-muted-foreground">Amélioration ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insights Générés</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{data.actionableInsights.length}</div>
            <p className="text-xs text-muted-foreground">Recommandations IA</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="emotions">Émotions</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="insights">Insights IA</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution des Sentiments</CardTitle>
                <CardDescription>Répartition des avis par sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse par Catégorie</CardTitle>
                <CardDescription>Performance par type de service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.categoryInsights.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{category.category}</Badge>
                        <span className="text-sm">{category.count} avis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{category.averageRating.toFixed(1)}/5</span>
                        {category.sentiment === "positive" ? (
                          <Smile className="h-4 w-4 text-green-500" />
                        ) : category.sentiment === "negative" ? (
                          <Frown className="h-4 w-4 text-red-500" />
                        ) : (
                          <Meh className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analyse des émotions */}
        <TabsContent value="emotions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Émotionnelle</CardTitle>
              <CardDescription>Détection des émotions dans les avis clients</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={emotionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="emotion" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Intensité"]} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Émotions Dominantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emotionChartData
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 3)
                  .map((emotion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{emotion.emotion}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={emotion.value} className="w-20" />
                        <span className="text-sm text-muted-foreground">{emotion.value}%</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mots-clés Fréquents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.keywordCloud.slice(0, 15).map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={
                        keyword.sentiment === "positive"
                          ? "border-green-500 text-green-700"
                          : keyword.sentiment === "negative"
                            ? "border-red-500 text-red-700"
                            : "border-gray-500"
                      }
                    >
                      {keyword.word} ({keyword.frequency})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights IA */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Recommandations IA
              </CardTitle>
              <CardDescription>Actions suggérées basées sur l'analyse des sentiments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.actionableInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge
                              className={
                                insight.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : insight.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {insight.priority}
                            </Badge>
                            <Badge variant="outline">{insight.category}</Badge>
                          </div>
                          <p className="text-sm">{insight.message}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Agir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
