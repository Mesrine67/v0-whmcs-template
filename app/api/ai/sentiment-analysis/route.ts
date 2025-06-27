import { type NextRequest, NextResponse } from "next/server"

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

// Mots-clés par catégorie
const CATEGORY_KEYWORDS = {
  support: ["support", "aide", "assistance", "équipe", "réponse", "rapide", "lent", "service client"],
  performance: ["rapide", "lent", "lag", "performance", "vitesse", "serveur", "downtime", "disponibilité"],
  pricing: ["prix", "cher", "abordable", "coût", "tarif", "gratuit", "payant", "rapport qualité"],
  fivem: ["fivem", "serveur", "joueurs", "roleplay", "mods", "scripts", "gaming"],
  hosting: ["hébergement", "site", "web", "domaine", "ssl", "cpanel"],
  vps: ["vps", "serveur privé", "root", "linux", "windows"],
}

const POSITIVE_WORDS = [
  "excellent",
  "parfait",
  "génial",
  "super",
  "fantastique",
  "recommande",
  "satisfait",
  "content",
  "rapide",
  "efficace",
  "professionnel",
  "qualité",
  "stable",
  "fiable",
  "top",
  "bravo",
]

const NEGATIVE_WORDS = [
  "mauvais",
  "nul",
  "décevant",
  "problème",
  "bug",
  "lent",
  "cher",
  "arnaque",
  "incompétent",
  "frustrant",
  "difficile",
  "compliqué",
  "instable",
  "panne",
]

const EMOTION_KEYWORDS = {
  joy: ["content", "heureux", "satisfait", "ravi", "excellent", "parfait", "génial"],
  anger: ["énervé", "furieux", "inacceptable", "scandaleux", "nul", "incompétent"],
  fear: ["inquiet", "peur", "risque", "danger", "sécurité", "problème"],
  sadness: ["déçu", "triste", "dommage", "regret", "décevant"],
  surprise: ["surpris", "inattendu", "étonnant", "incroyable"],
}

export async function POST(request: NextRequest) {
  try {
    const { text, rating, title } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Texte requis pour l'analyse" }, { status: 400 })
    }

    // Analyse du sentiment
    const analysis = await analyzeSentiment(text, rating, title)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Erreur analyse sentiment:", error)
    return NextResponse.json({ error: "Erreur lors de l'analyse" }, { status: 500 })
  }
}

async function analyzeSentiment(text: string, rating: number, title?: string): Promise<SentimentAnalysis> {
  const fullText = `${title || ""} ${text}`.toLowerCase()

  // 1. Analyse du sentiment basique
  const positiveScore = POSITIVE_WORDS.reduce((score, word) => {
    return score + (fullText.includes(word) ? 1 : 0)
  }, 0)

  const negativeScore = NEGATIVE_WORDS.reduce((score, word) => {
    return score + (fullText.includes(word) ? 1 : 0)
  }, 0)

  // Combinaison avec la note
  let sentiment: "positive" | "negative" | "neutral"
  let confidence: number

  if (rating >= 4 && positiveScore > negativeScore) {
    sentiment = "positive"
    confidence = Math.min(0.9, 0.6 + positiveScore * 0.1 + (rating - 3) * 0.1)
  } else if (rating <= 2 || negativeScore > positiveScore) {
    sentiment = "negative"
    confidence = Math.min(0.9, 0.6 + negativeScore * 0.1 + (3 - rating) * 0.1)
  } else {
    sentiment = "neutral"
    confidence = 0.5 + Math.abs(positiveScore - negativeScore) * 0.1
  }

  // 2. Analyse des émotions
  const emotions = {
    joy: calculateEmotionScore(fullText, EMOTION_KEYWORDS.joy),
    anger: calculateEmotionScore(fullText, EMOTION_KEYWORDS.anger),
    fear: calculateEmotionScore(fullText, EMOTION_KEYWORDS.fear),
    sadness: calculateEmotionScore(fullText, EMOTION_KEYWORDS.sadness),
    surprise: calculateEmotionScore(fullText, EMOTION_KEYWORDS.surprise),
  }

  // 3. Extraction des mots-clés
  const keywords = extractKeywords(fullText)

  // 4. Catégorisation
  const categories = categorizeReview(fullText)

  // 5. Niveau d'urgence
  const urgency = determineUrgency(sentiment, rating, emotions, fullText)

  // 6. Action requise
  const actionRequired = sentiment === "negative" || urgency === "high" || rating <= 2

  // 7. Réponse suggérée
  const suggestedResponse = generateSuggestedResponse(sentiment, categories, emotions, rating)

  return {
    sentiment,
    confidence,
    emotions,
    keywords,
    categories,
    urgency,
    actionRequired,
    suggestedResponse,
  }
}

function calculateEmotionScore(text: string, emotionWords: string[]): number {
  const matches = emotionWords.filter((word) => text.includes(word)).length
  return Math.min(1, matches * 0.3)
}

function extractKeywords(text: string): string[] {
  const words = text.split(/\s+/)
  const stopWords = ["le", "la", "les", "de", "du", "des", "et", "ou", "mais", "car", "donc", "or", "ni", "un", "une"]

  return words
    .filter((word) => word.length > 3 && !stopWords.includes(word))
    .filter((word) => /^[a-zA-ZÀ-ÿ]+$/.test(word))
    .slice(0, 10)
}

function categorizeReview(text: string): string[] {
  const categories: string[] = []

  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    const matches = keywords.filter((keyword) => text.includes(keyword)).length
    if (matches > 0) {
      categories.push(category)
    }
  })

  return categories.length > 0 ? categories : ["general"]
}

function determineUrgency(sentiment: string, rating: number, emotions: any, text: string): "low" | "medium" | "high" {
  if (sentiment === "negative" && rating <= 2) return "high"
  if (emotions.anger > 0.5 || text.includes("urgent") || text.includes("immédiat")) return "high"
  if (sentiment === "negative" || rating === 3) return "medium"
  return "low"
}

function generateSuggestedResponse(sentiment: string, categories: string[], emotions: any, rating: number): string {
  if (sentiment === "positive" && rating >= 4) {
    return "Merci beaucoup pour ce retour positif ! Nous sommes ravis que nos services vous satisfassent. N'hésitez pas à nous recommander à vos proches !"
  }

  if (sentiment === "negative") {
    let response = "Nous sommes désolés que votre expérience ne soit pas à la hauteur de vos attentes. "

    if (categories.includes("support")) {
      response +=
        "Concernant notre support, nous prenons note de vos remarques et travaillons à améliorer nos délais de réponse. "
    }

    if (categories.includes("performance")) {
      response += "Nous allons examiner les performances de nos serveurs pour résoudre ces problèmes. "
    }

    response += "Pouvons-nous vous contacter pour résoudre cette situation ?"
    return response
  }

  return "Merci pour votre retour. Nous prenons en compte vos commentaires pour améliorer nos services."
}
