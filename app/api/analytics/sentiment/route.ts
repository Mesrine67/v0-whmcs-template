import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range") || "30d"

    // Simulation de données d'analyse de sentiment
    // En production, ces données viendraient de votre base de données
    const mockData = {
      totalReviews: 156,
      sentimentDistribution: {
        positive: 98,
        negative: 23,
        neutral: 35,
      },
      emotionAnalysis: {
        joy: 0.65,
        anger: 0.15,
        fear: 0.08,
        sadness: 0.12,
        surprise: 0.25,
      },
      categoryInsights: [
        {
          category: "support",
          count: 45,
          averageRating: 4.2,
          sentiment: "positive",
        },
        {
          category: "performance",
          count: 38,
          averageRating: 4.5,
          sentiment: "positive",
        },
        {
          category: "fivem",
          count: 32,
          averageRating: 4.7,
          sentiment: "positive",
        },
        {
          category: "pricing",
          count: 28,
          averageRating: 3.8,
          sentiment: "neutral",
        },
        {
          category: "hosting",
          count: 13,
          averageRating: 3.2,
          sentiment: "negative",
        },
      ],
      urgentReviews: 5,
      trends: [
        { date: "2024-11-01", positive: 12, negative: 3, neutral: 5 },
        { date: "2024-11-02", positive: 15, negative: 2, neutral: 4 },
        { date: "2024-11-03", positive: 18, negative: 4, neutral: 6 },
        { date: "2024-11-04", positive: 14, negative: 1, neutral: 3 },
        { date: "2024-11-05", positive: 20, negative: 5, neutral: 7 },
      ],
      keywordCloud: [
        { word: "excellent", frequency: 23, sentiment: "positive" },
        { word: "rapide", frequency: 19, sentiment: "positive" },
        { word: "support", frequency: 17, sentiment: "neutral" },
        { word: "stable", frequency: 15, sentiment: "positive" },
        { word: "problème", frequency: 12, sentiment: "negative" },
        { word: "fivem", frequency: 11, sentiment: "positive" },
        { word: "performance", frequency: 10, sentiment: "positive" },
        { word: "prix", frequency: 9, sentiment: "neutral" },
        { word: "lent", frequency: 7, sentiment: "negative" },
        { word: "recommande", frequency: 14, sentiment: "positive" },
      ],
      actionableInsights: [
        {
          type: "improvement",
          message:
            "Les avis mentionnent des problèmes de performance sur l'hébergement web. Considérez une mise à niveau de l'infrastructure.",
          priority: "high" as const,
          category: "hosting",
        },
        {
          type: "opportunity",
          message: "Excellents retours sur les serveurs FiveM. Mettez en avant ce service dans votre marketing.",
          priority: "medium" as const,
          category: "fivem",
        },
        {
          type: "concern",
          message:
            "Plusieurs mentions de prix élevés. Analysez la concurrence et considérez des offres promotionnelles.",
          priority: "medium" as const,
          category: "pricing",
        },
        {
          type: "success",
          message: "Le support client reçoit d'excellents commentaires. Continuez sur cette voie !",
          priority: "low" as const,
          category: "support",
        },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Erreur récupération données sentiment:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
