"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Server,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  Power,
  RefreshCw,
  Download,
  Eye,
  Calendar,
  Clock,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Service {
  id: string
  name: string
  type: string
  status: "active" | "suspended" | "pending"
  nextDueDate: string
  price: string
}

interface Invoice {
  id: string
  date: string
  amount: string
  status: "paid" | "unpaid" | "overdue"
  description: string
}

interface Ticket {
  id: string
  subject: string
  status: "open" | "answered" | "closed"
  priority: "low" | "medium" | "high"
  lastUpdate: string
}

export default function ClientAreaPageClient() {
  const [user, setUser] = useState<any>(null)
  const [services, setServices] = useState<Service[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [stats, setStats] = useState({
    cpu: 45,
    memory: 62,
    disk: 38,
    uptime: 99.9,
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadClientData()
  }, [])

  const loadClientData = async () => {
    try {
      // Simuler le chargement des données
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser({
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        clientId: "HTS-001234",
      })

      setServices([
        {
          id: "1",
          name: "Serveur Web Premium",
          type: "Hébergement Web",
          status: "active",
          nextDueDate: "2024-02-15",
          price: "29.99€",
        },
        {
          id: "2",
          name: "Serveur FiveM",
          type: "Serveur de Jeu",
          status: "active",
          nextDueDate: "2024-02-20",
          price: "49.99€",
        },
      ])

      setInvoices([
        {
          id: "INV-2024-001",
          date: "2024-01-15",
          amount: "29.99€",
          status: "paid",
          description: "Hébergement Web Premium - Janvier 2024",
        },
        {
          id: "INV-2024-002",
          date: "2024-01-20",
          amount: "49.99€",
          status: "paid",
          description: "Serveur FiveM - Janvier 2024",
        },
      ])

      setTickets([
        {
          id: "TKT-001",
          subject: "Problème de performance",
          status: "answered",
          priority: "medium",
          lastUpdate: "Il y a 2 heures",
        },
      ])
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      unpaid: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      open: "bg-blue-100 text-blue-800",
      answered: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
    }

    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getStatusText = (status: string) => {
    const texts = {
      active: "Actif",
      suspended: "Suspendu",
      pending: "En attente",
      paid: "Payée",
      unpaid: "Impayée",
      overdue: "En retard",
      open: "Ouvert",
      answered: "Répondu",
      closed: "Fermé",
    }

    return texts[status as keyof typeof texts] || status
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre espace client...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Client</h1>
              <p className="text-gray-600">Bienvenue, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/")}>
              Retour au site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Factures
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Compte
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Stats
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
                  <div className="text-2xl font-bold">{services.filter((s) => s.status === "active").length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Factures Impayées</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "unpaid").length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets Ouverts</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "open").length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uptime}%</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.type}</p>
                        </div>
                        <Badge className={getStatusBadge(service.status)}>{getStatusText(service.status)}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Factures Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-gray-600">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <Badge className={getStatusBadge(invoice.status)}>{getStatusText(invoice.status)}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Services</CardTitle>
                <CardDescription>Gérez vos services d'hébergement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.type}</p>
                        </div>
                        <Badge className={getStatusBadge(service.status)}>{getStatusText(service.status)}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Échéance: {service.nextDueDate}
                          </span>
                          <span className="font-medium">{service.price}/mois</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Power className="h-4 w-4 mr-1" />
                            Redémarrer
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Renouveler
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
                <CardDescription>Historique de vos factures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.description}</p>
                          <p className="text-sm text-gray-500">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{invoice.amount}</p>
                          <Badge className={getStatusBadge(invoice.status)}>{getStatusText(invoice.status)}</Badge>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
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
                <CardTitle>Support Technique</CardTitle>
                <CardDescription>Vos tickets de support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Créer un nouveau ticket
                  </Button>

                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">#{ticket.id}</p>
                          <p className="text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {ticket.lastUpdate}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusBadge(ticket.status)}>{getStatusText(ticket.status)}</Badge>
                          <p className="text-sm text-gray-600 mt-1">Priorité: {ticket.priority}</p>
                        </div>
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
                <CardTitle>Informations du Compte</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nom complet</label>
                    <p className="text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">ID Client</label>
                    <p className="text-gray-900">{user?.clientId}</p>
                  </div>
                </div>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier les informations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Utilisation CPU</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>CPU</span>
                      <span>{stats.cpu}%</span>
                    </div>
                    <Progress value={stats.cpu} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Utilisation Mémoire</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>RAM</span>
                      <span>{stats.memory}%</span>
                    </div>
                    <Progress value={stats.memory} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Espace Disque</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Disque</span>
                      <span>{stats.disk}%</span>
                    </div>
                    <Progress value={stats.disk} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disponibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.uptime}%</div>
                    <p className="text-sm text-gray-600">Uptime ce mois-ci</p>
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
