import { type NextRequest, NextResponse } from "next/server"

const WHMCS_URL = process.env.WHMCS_URL || "https://votre-domaine.com/whmcs"
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET

export async function GET(request: NextRequest) {
  try {
    // Récupération de l'ID client depuis la session ou les cookies
    const clientId = request.headers.get("x-client-id") // À adapter selon votre système d'auth

    if (!clientId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const response = await fetch(`${WHMCS_URL}/includes/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "GetClientsProducts",
        clientid: clientId,
        identifier: WHMCS_API_IDENTIFIER!,
        secret: WHMCS_API_SECRET!,
        responsetype: "json",
      }),
    })

    const data = await response.json()

    if (data.result === "success") {
      return NextResponse.json({
        success: true,
        services: data.products.product || [],
      })
    }

    return NextResponse.json({
      success: false,
      services: [],
    })
  } catch (error) {
    console.error("Erreur récupération services:", error)
    return NextResponse.json(
      {
        success: false,
        services: [],
      },
      { status: 500 },
    )
  }
}
