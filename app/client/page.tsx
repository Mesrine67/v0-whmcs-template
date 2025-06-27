// force this page to be rendered on demand (prevents prerender error)
export const dynamic = "force-dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Server, Globe, FileText, Settings, BarChart3, Shield, Mail } from "lucide-react"

export default function ClientAreaPage() {
  const services = [
    {
      name: "Hébergement Web Premium",
      status: "Actif",
      domain: "monsite.com",
      expires: "15/12/2024",
      type: "hosting",
    },
    {
      name: "Domaine monsite.com",
      status: "Actif",
      domain: "monsite.com",
      expires: "15/12/2024",
      type: "domain",
    },
  ]

  const recentInvoices = [
    { id: "#INV-001", date: "15/11/2024", amount: "9.99€", status: "Payée" },
    { id: "#INV-002", date: "15/10/2024", amount: "9.99€", status: "Payée" },
    { id: "#INV-003", date: "15/09/2024", amount: "9.99€", status: "Payée" },
  ]

  const quickActions = [
    { icon: Server, title: "Gérer l'hébergement", description: "Panneau de contrôle cPanel" },
    { icon: Globe, title: "Gérer les domaines", description: "DNS, redirections, sous-domaines" },
    { icon: Mail, title: "Comptes email", description: "Créer et gérer vos emails" },
    { icon: Shield, title: "Sécurité", description: "SSL, sauvegardes, protection" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Espace Client</h1>
          <p className="text-muted-foreground">Bienvenue dans votre espace personnel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services actifs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Mes Services
                </CardTitle>
                <CardDescription>Gérez vos services d'hébergement et domaines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {service.type === "hosting" ? (
                            <Server className="h-5 w-5 text-primary" />
                          ) : (
                            <Globe className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.domain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {service.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">Expire le {service.expires}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Voir tous les services
                </Button>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
                <CardDescription>Accès direct aux fonctionnalités principales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button key={index} variant="outline" className="h-auto p-4 justify-start bg-transparent">
                      <div className="flex items-center space-x-3">
                        <action.icon className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations compte */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Mon Compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Jean Dupont</p>
                  <p className="text-sm text-muted-foreground">jean.dupont@email.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Solde du compte</p>
                  <p className="text-lg font-bold text-primary">25.50€</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Modifier le profil
                </Button>
              </CardContent>
            </Card>

            {/* Factures récentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Factures Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInvoices.map((invoice, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{invoice.id}</p>
                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{invoice.amount}</p>
                        <Badge variant="secondary" className="text-xs">
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Voir toutes les factures
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Ouvrir un ticket
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Base de connaissances
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
