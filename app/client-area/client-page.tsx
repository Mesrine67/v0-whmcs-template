"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Server,
  Globe,
  FileText,
  Settings,
  BarChart3,
  Mail,
  CreditCard,
  Download,
  ExternalLink,
  Gamepad2,
  Database,
  Activity,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Power,
  RotateCcw,
} from "lucide-react"

export const dynamic = "force-dynamic"

interface Service {
  id: number
  name: string
  type: "hosting" | "vps" | "fivem" | "domain"
  domain: string
  status: "Active" | "Suspended" | "Pending" | "Cancelled"
  expires: string
  price: string
  nextDue: string
}

interface Invoice {
  id: string
  date: string
  amount: string
  status: "Paid" | "Unpaid" | "Overdue"
  description: string
}

interface Ticket {
  id: string
  subject: string
  status: "Open" | "Answered" | "Closed"
  priority: "Low" | "Medium" | "High"
  lastUpdate: string
}

export default function ClientAreaPage() {
  const [services, setServices] = useState<Service[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    balance: "25.50",
    status: "Active",
  })

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setServices([
        {
          id: 1,
          name: "Hébergement Web Premium",
          type: "hosting",
          domain: "monsite.com",
          status: "Active",
          expires: "15/12/2024",
          price: "9.99€",
          nextDue: "15/12/2024",
        },
        {
          id: 2,
          name: "Serveur FiveM Pro",
          type: "fivem",
          domain: "fivem.monserveur.com",
          status: "Active",
          expires: "20/01/2025",
          price: "29.99€",
          nextDue: "20/12/2024",
        },
        {
          id: 3,
          name: "VPS Cloud",
          type: "vps",
          domain: "vps.monsite.com",
          status: "Active",
          expires: "10/01/2025",
          price: "19.99€",
          nextDue: "10/12/2024",
        },
        {
          id: 4,
          name: "monsite.com",
          type: "domain",
          domain: "monsite.com",
          status: "Active",
          expires: "15/12/2025",
          price: "12.99€",
          nextDue: "15/12/2025",
        },
      ])

      setInvoices([
        {
          id: "#INV-001",
          date: "15/11/2024",
          amount: "72.96€",
          status: "Paid",
          description: "Renouvellement services mensuels",
        },
        {
          id: "#INV-002",
          date: "15/10/2024",
          amount: "72.96€",
          status: "Paid",
          description: "Renouvellement services mensuels",
        },
        {
          id: "#INV-003",
          date: "15/12/2024",
          amount: "72.96€",
          status: "Unpaid",
          description: "Renouvellement services mensuels",
        },
      ])

      setTickets([
        {
          id: "#TIC-001",
          subject: "Configuration FiveM",
          status: "Answered",
          priority: "Medium",
          lastUpdate: "Il y a 2 heures",
        },
        {
          id: "#TIC-002",
          subject: "Problème de performance",
          status: "Open",
          priority: "High",
          lastUpdate: "Il y a 1 jour",
        },
      ])

      setIsLoading(false)
    }, 1000)
  }, [])

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "hosting":
        return <Server className="h-5 w-5" />
      case "vps":
        return <Database className="h-5 w-5" />
      case "fivem":
        return <Gamepad2 className="h-5 w-5" />
      case "domain":
        return <Globe className="h-5 w-5" />
      default:
        return <Server className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Unpaid":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "Answered":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de votre espace client...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Espace Client</h1>
          <p className="text-muted-foreground">Bienvenue {user.name}, gérez vos services HebergTonServ</p>
        </div>

        {/* Alertes importantes */}
        <div className="mb-8 space-y-4">
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Votre facture #{invoices.find((inv) => inv.status === "Unpaid")?.id} est en attente de paiement.{" "}
              <Button variant="link" className="p-0 h-auto text-yellow-800 underline">
                Payer maintenant
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services Actifs</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{services.filter((s) => s.status === "Active").length}</div>
                  <p className="text-xs text-muted-foreground">+1 ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Solde Compte</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{user.balance}€</div>
                  <p className="text-xs text-muted-foreground">Crédit disponible</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets Ouverts</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "Open").length}</div>
                  <p className="text-xs text-muted-foreground">Support actif</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Factures Impayées</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {invoices.filter((i) => i.status === "Unpaid").length}
                  </div>
                  <p className="text-xs text-muted-foreground">À régler</p>
                </CardContent>
              </Card>
            </div>

            {/* Services récents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Mes Services
                </CardTitle>
                <CardDescription>Vue d'ensemble de vos services actifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          {getServiceIcon(service.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.domain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">Expire le {service.expires}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                    <div className="flex items-center space-x-3">
                      <Plus className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Commander</div>
                        <div className="text-sm text-muted-foreground">Nouveau service</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Ouvrir un ticket</div>
                        <div className="text-sm text-muted-foreground">Support technique</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Recharger</div>
                        <div className="text-sm text-muted-foreground">Ajouter du crédit</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                    <div className="flex items-center space-x-3">
                      <Download className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Télécharger</div>
                        <div className="text-sm text-muted-foreground">Factures PDF</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Services</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Commander un service
              </Button>
            </div>

            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          {getServiceIcon(service.type)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <CardDescription>{service.domain}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Prix</p>
                        <p className="text-lg font-bold">{service.price}/mois</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Prochaine échéance</p>
                        <p className="text-lg">{service.nextDue}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Expire le</p>
                        <p className="text-lg">{service.expires}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                      {service.type === "hosting" && (
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          cPanel
                        </Button>
                      )}
                      {service.type === "fivem" && (
                        <Button size="sm" variant="outline">
                          <Gamepad2 className="h-4 w-4 mr-2" />
                          Panel FiveM
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Power className="h-4 w-4 mr-2" />
                        Redémarrer
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Renouveler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Factures */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Factures</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Télécharger tout
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique des factures</CardTitle>
                <CardDescription>Toutes vos factures et paiements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{invoice.id}</h3>
                          <p className="text-sm text-muted-foreground">{invoice.description}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <div>
                          <p className="text-lg font-bold">{invoice.amount}</p>
                          <Badge className={getInvoiceStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === "Unpaid" && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Payer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support */}
          <TabsContent value="support" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Support</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau ticket
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="text-center">
                  <Mail className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">support@hebergtonserv.com</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Nous contacter
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Guides et tutoriels</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Consulter
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Activity className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">État des serveurs</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Vérifier
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mes Tickets</CardTitle>
                <CardDescription>Historique de vos demandes de support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <p className="text-sm text-muted-foreground">{ticket.id}</p>
                          <p className="text-sm text-muted-foreground">{ticket.lastUpdate}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <div className="space-y-1">
                          <Badge className={getTicketStatusColor(ticket.status)}>{ticket.status}</Badge>
                          <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compte */}
          <TabsContent value="account" className="space-y-6">
            <h2 className="text-2xl font-bold">Mon Compte</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Gérez vos informations de compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nom complet</label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Statut</label>
                      <Badge className="bg-green-100 text-green-800">{user.status}</Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Membre depuis</label>
                      <p className="text-lg">Janvier 2023</p>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier les informations
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Solde du compte</CardTitle>
                  <CardDescription>Crédit disponible</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{user.balance}€</p>
                    <p className="text-muted-foreground">Crédit disponible</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Recharger le compte
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>Paramètres de sécurité de votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mot de passe</h3>
                    <p className="text-sm text-muted-foreground">Dernière modification il y a 3 mois</p>
                  </div>
                  <Button variant="outline">Changer</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Authentification à deux facteurs</h3>
                    <p className="text-sm text-muted-foreground">Sécurisez votre compte</p>
                  </div>
                  <Button variant="outline">Activer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistiques */}
          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-2xl font-bold">Statistiques</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Serveur FiveM
                  </CardTitle>
                  <CardDescription>fivem.monserveur.com</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Joueurs connectés</span>
                      <span>45/64</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilisation CPU</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilisation RAM</span>
                      <span>6.2/8 GB</span>
                    </div>
                    <Progress value={77} className="h-2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">En ligne</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    Hébergement Web
                  </CardTitle>
                  <CardDescription>monsite.com</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Espace disque</span>
                      <span>2.1/10 GB</span>
                    </div>
                    <Progress value={21} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bande passante</span>
                      <span>45/∞ GB</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bases de données</span>
                      <span>3/10</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">En ligne</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    VPS Cloud
                  </CardTitle>
                  <CardDescription>vps.monsite.com</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilisation CPU</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilisation RAM</span>
                      <span>1.8/4 GB</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Espace disque</span>
                      <span>15/50 GB</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">En ligne</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique d'utilisation</CardTitle>
                <CardDescription>Évolution de vos ressources sur les 30 derniers jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-8 w-8 mr-2" />
                  Graphiques d'utilisation (à implémenter avec une librairie de charts)
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
