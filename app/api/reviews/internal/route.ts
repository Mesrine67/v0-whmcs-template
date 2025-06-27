import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { rating, title, content, email, name } = await request.json()

    // Validation des données
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Note invalide" }, { status: 400 })
    }

    if (!content || content.trim().length < 10) {
      return NextResponse.json({ error: "Le contenu de l'avis est trop court" }, { status: 400 })
    }

    // Ici vous pouvez :
    // 1. Sauvegarder en base de données
    // 2. Envoyer par email à l'équipe
    // 3. Intégrer avec votre CRM
    // 4. Déclencher des notifications

    const reviewData = {
      id: Date.now().toString(),
      rating,
      title: title || "",
      content,
      email: email || "anonyme",
      name: name || "Client anonyme",
      date: new Date().toISOString(),
      platform: "internal",
      verified: !!email,
      status: "pending", // pending, approved, rejected
    }

    // Simulation de sauvegarde
    console.log("Nouvel avis interne reçu:", reviewData)

    // Envoi d'email de notification (optionnel)
    if (rating <= 3) {
      // Avis négatif - notification immédiate à l'équipe support
      await sendNotificationEmail({
        type: "negative_review",
        data: reviewData,
      })
    }

    // Réponse de succès
    return NextResponse.json({
      success: true,
      message: "Merci pour votre avis ! Il sera examiné par notre équipe.",
      reviewId: reviewData.id,
    })
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'avis:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// Fonction utilitaire pour envoyer des notifications
async function sendNotificationEmail(notification: { type: string; data: any }) {
  // Implémentation de l'envoi d'email
  // Vous pouvez utiliser Nodemailer, SendGrid, etc.
  console.log("Notification à envoyer:", notification)
}
