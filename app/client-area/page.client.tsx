"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Server,
  CreditCard,
  MessageSquare,
  User,
  BarChart3,
  Home,
  Power,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Download,
  Eye,
} from "lucide-react"

export default function ClientAreaPageClient() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Serveur Web Premium",
      type: "web",
      status: "active",
      expiry: "2024-12-15",
      price: "29.99€/mois",
    },
    {
      id: 2,
      name: "Serveur FiveM",
      type: "fivem",
      status: "active",
      expiry: "2024-11-20",
      price: "49.99€/mois",
    },
  ])

  const [invoices, setInvoices] = useState([
    {
      id: "INV-2024-001",
      date: "2024-01-15",
      amount: "29.99€",
      status: "paid",
      description: "Serveur Web Premium - Janvier 2024",
    },
    {
      id: "INV-2024-002",
      date: "2024-02-15",
      amount: "49.99€",
      status: "pending",
      description: "Serveur FiveM - Février 2024",
    },
  ])

  const [tickets, setTickets] = useState([
    {
      id: "TIC-001",
      subject: "Problème de connexion",
      status: "open",
      priority: "high",
      created: "2024-01-10",
      lastUpdate: "2024-01-12",
    },
    {
      id: "TIC-002",
      subject: "Demande d'upgrade",
      status: "closed",
      priority: "medium",
      created: "2024-01-05",
      lastUpdate: "2024-01-08",
    },
  ])

  const [stats, setStats] = useState({
    cpu: 45,
    ram: 62,
    disk: 38,
    uptime: 99.9,
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>
    }
  }

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Payée
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            En retard
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>
    }
  }

  const getTicketStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Ouvert</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Fermé</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Client</h1>
              <p className="text-gray-600">Gérez vos services et votre compte</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Télécharger factures
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau service
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Factures</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Compte</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services Actifs</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">+1 ce mois</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Factures en attente</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">49.99€ à payer</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets ouverts</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">Priorité haute</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime moyen</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services récents</CardTitle>
                  <CardDescription>Vos derniers services actifs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Server className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">Expire le {service.expiry}</p>
                        </div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières actions sur votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium">Paiement reçu</p>
                      <p className="text-sm text-gray-600">Facture INV-2024-001 - 29.99€</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Nouveau ticket</p>
                      <p className="text-sm text-gray-600">TIC-001 - Problème de connexion</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-medium">Service expirant</p>
                      <p className="text-sm text-gray-600">Serveur FiveM expire dans 30 jours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Services</CardTitle>
                <CardDescription>Gérez tous vos services hébergés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Server className="w-10 h-10 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-gray-600">Type: {service.type}</p>
                          <p className="text-sm text-gray-600">Expire le: {service.expiry}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{service.price}</p>
                          {getStatusBadge(service.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Power className="w-4 h-4 mr-1" />
                            Redémarrer
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Renouveler
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Factures</CardTitle>
                <CardDescription>Historique de vos factures et paiements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="w-10 h-10 text-green-600" />
                        <div>
                          <h3 className="font-semibold">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.description}</p>
                          <p className="text-sm text-gray-600">Date: {invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{invoice.amount}</p>
                          {getInvoiceStatusBadge(invoice.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                          {invoice.status === "pending" && (
                            <Button size="sm">
                              <CreditCard className="w-4 h-4 mr-1" />
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

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Tickets</CardTitle>
                <CardDescription>Vos demandes de support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau ticket
                  </Button>
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <MessageSquare className="w-10 h-10 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">#{ticket.id}</p>
                          <p className="text-sm text-gray-600">Créé le: {ticket.created}</p>
                          <p className="text-sm text-gray-600">Dernière mise à jour: {ticket.lastUpdate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          {getTicketStatusBadge(ticket.status)}
                          <p className="text-sm text-gray-600 mt-1">Priorité: {ticket.priority}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="Jean" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="Dupont" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="jean.dupont@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="+33 1 23 45 67 89"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button>Sauvegarder</Button>
                  <Button variant="outline">Changer mot de passe</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Utilisation CPU</CardTitle>
                  <CardDescription>Utilisation moyenne du processeur</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>CPU</span>
                      <span>{stats.cpu}%</span>
                    </div>
                    <Progress value={stats.cpu} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Utilisation RAM</CardTitle>
                  <CardDescription>Utilisation de la mémoire vive</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>RAM</span>
                      <span>{stats.ram}%</span>
                    </div>
                    <Progress value={stats.ram} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Utilisation Disque</CardTitle>
                  <CardDescription>Espace disque utilisé</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Disque</span>
                      <span>{stats.disk}%</span>
                    </div>
                    <Progress value={stats.disk} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Uptime</CardTitle>
                  <CardDescription>Disponibilité du service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.uptime}%</div>
                    <p className="text-sm text-gray-600">Ce mois</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
