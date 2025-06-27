import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const WHMCS_URL = process.env.WHMCS_URL
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("whmcs_session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())
    const clientId = sessionData.userId

    // Récupérer les données du client en parallèle
    const [clientResponse, servicesResponse, invoicesResponse, ticketsResponse] = await Promise.all([
      // Détails du client
      fetch(`${WHMCS_URL}/includes/api.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "GetClientsDetails",
          clientid: clientId,
          identifier: WHMCS_API_IDENTIFIER!,
          secret: WHMCS_API_SECRET!,
          responsetype: "json",
        }),
      }),
      // Services du client
      fetch(`${WHMCS_URL}/includes/api.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "GetClientsProducts",
          clientid: clientId,
          identifier: WHMCS_API_IDENTIFIER!,
          secret: WHMCS_API_SECRET!,
          responsetype: "json",
        }),
      }),
      // Factures du client
      fetch(`${WHMCS_URL}/includes/api.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "GetInvoices",
          userid: clientId,
          limitnum: "10",
          identifier: WHMCS_API_IDENTIFIER!,
          secret: WHMCS_API_SECRET!,
          responsetype: "json",
        }),
      }),
      // Tickets de support
      fetch(`${WHMCS_URL}/includes/api.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "GetTickets",
          clientid: clientId,
          limitnum: "5",
          identifier: WHMCS_API_IDENTIFIER!,
          secret: WHMCS_API_SECRET!,
          responsetype: "json",
        }),
      }),
    ])

    const [clientData, servicesData, invoicesData, ticketsData] = await Promise.all([
      clientResponse.json(),
      servicesResponse.json(),
      invoicesResponse.json(),
      ticketsResponse.json(),
    ])

    // Vérifier que toutes les requêtes ont réussi
    if (clientData.result !== "success") {
      return NextResponse.json({ error: "Erreur récupération données client" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      client: {
        id: clientData.userid,
        firstName: clientData.firstname,
        lastName: clientData.lastname,
        email: clientData.email,
        status: clientData.status,
        credit: clientData.credit || "0.00",
        currency: clientData.currency || "EUR",
        dateCreated: clientData.datecreated,
        lastLogin: clientData.lastlogin,
      },
      services: servicesData.result === "success" ? servicesData.products?.product || [] : [],
      invoices: invoicesData.result === "success" ? invoicesData.invoices?.invoice || [] : [],
      tickets: ticketsData.result === "success" ? ticketsData.tickets?.ticket || [] : [],
    })
  } catch (error) {
    console.error("Erreur récupération données client:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
