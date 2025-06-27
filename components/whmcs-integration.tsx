"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Lock } from "lucide-react"

interface WHMCSUser {
  id: number
  firstname: string
  lastname: string
  email: string
  status: string
}

export function WHMCSLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<WHMCSUser | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Appel à l'API WHMCS pour l'authentification
      const response = await fetch("/api/whmcs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        // Redirection vers l'espace client WHMCS
        window.location.href = "/whmcs/clientarea.php"
      } else {
        setError(data.message || "Erreur de connexion")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center">
          <User className="h-5 w-5 mr-2" />
          Connexion Client
        </CardTitle>
        <CardDescription>Accédez à votre espace client HebergTonServ</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Se connecter
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Button variant="link" asChild>
            <a href="/whmcs/pwreset.php">Mot de passe oublié ?</a>
          </Button>
          <div className="text-sm text-muted-foreground">
            Pas encore client ?{" "}
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href="/whmcs/register.php">Créer un compte</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function WHMCSClientArea() {
  const [services, setServices] = useState([])
  const [invoices, setInvoices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupération des données client depuis WHMCS
    const fetchClientData = async () => {
      try {
        const [servicesRes, invoicesRes] = await Promise.all([
          fetch("/api/whmcs/services"),
          fetch("/api/whmcs/invoices"),
        ])

        const servicesData = await servicesRes.json()
        const invoicesData = await invoicesRes.json()

        setServices(servicesData.services || [])
        setInvoices(invoicesData.invoices || [])
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes Services</CardTitle>
          <CardDescription>Gérez vos services d'hébergement</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <div className="space-y-4">
              {services.map((service: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{service.productname}</h3>
                    <p className="text-sm text-muted-foreground">{service.domain}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        service.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Aucun service actif</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Factures Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="space-y-2">
              {invoices.slice(0, 5).map((invoice: any, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm">Facture #{invoice.invoicenum}</span>
                  <span className="text-sm font-medium">{invoice.total}€</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Aucune facture</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
