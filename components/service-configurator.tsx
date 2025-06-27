"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Server, Database, Shield, Zap, Users } from "lucide-react"

interface ServiceConfig {
  type: "web" | "vps" | "dedicated"
  cpu: number
  ram: number
  storage: number
  bandwidth: number
  ssl: boolean
  backup: boolean
  monitoring: boolean
  support: "basic" | "priority" | "premium"
  location: string
}

export function ServiceConfigurator() {
  const [config, setConfig] = useState<ServiceConfig>({
    type: "web",
    cpu: 2,
    ram: 4,
    storage: 50,
    bandwidth: 1000,
    ssl: true,
    backup: false,
    monitoring: false,
    support: "basic",
    location: "france",
  })

  const [price, setPrice] = useState(0)
  const [recommendations, setRecommendations] = useState<string[]>([])

  // Calcul du prix en temps réel
  useEffect(() => {
    let basePrice = 0

    switch (config.type) {
      case "web":
        basePrice = 5
        break
      case "vps":
        basePrice = 15
        break
      case "dedicated":
        basePrice = 50
        break
    }

    // Calcul basé sur les ressources
    const cpuPrice = config.cpu * 2
    const ramPrice = config.ram * 1.5
    const storagePrice = config.storage * 0.1
    const bandwidthPrice = config.bandwidth * 0.01

    // Options supplémentaires
    const sslPrice = config.ssl ? 0 : 0 // SSL gratuit
    const backupPrice = config.backup ? 5 : 0
    const monitoringPrice = config.monitoring ? 3 : 0

    const supportPrice = {
      basic: 0,
      priority: 10,
      premium: 25,
    }[config.support]

    const totalPrice =
      basePrice +
      cpuPrice +
      ramPrice +
      storagePrice +
      bandwidthPrice +
      sslPrice +
      backupPrice +
      monitoringPrice +
      supportPrice

    setPrice(Math.round(totalPrice * 100) / 100)

    // Générer des recommandations
    const newRecommendations = []
    if (!config.backup) {
      newRecommendations.push("Nous recommandons d'activer les sauvegardes automatiques")
    }
    if (!config.monitoring) {
      newRecommendations.push("Le monitoring 24/7 vous alertera en cas de problème")
    }
    if (config.support === "basic" && config.type !== "web") {
      newRecommendations.push("Le support prioritaire est recommandé pour les serveurs VPS/Dédiés")
    }

    setRecommendations(newRecommendations)
  }, [config])

  const updateConfig = (key: keyof ServiceConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Configurateur de Services</h1>
        </div>
        <p className="text-xl text-muted-foreground">Personnalisez votre solution d'hébergement selon vos besoins</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Type de Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={config.type} onValueChange={(value) => updateConfig("type", value)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="web">Hébergement Web</TabsTrigger>
                  <TabsTrigger value="vps">Serveur VPS</TabsTrigger>
                  <TabsTrigger value="dedicated">Serveur Dédié</TabsTrigger>
                </TabsList>

                <TabsContent value="web" className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    Parfait pour les sites web, blogs et petites applications
                  </div>
                </TabsContent>
                <TabsContent value="vps" className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    Serveur virtuel avec ressources dédiées et accès root
                  </div>
                </TabsContent>
                <TabsContent value="dedicated" className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    Serveur physique entièrement dédié à vos applications
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Ressources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>CPU Cores: {config.cpu}</Label>
                <Slider
                  value={[config.cpu]}
                  onValueChange={([value]) => updateConfig("cpu", value)}
                  max={config.type === "web" ? 4 : config.type === "vps" ? 16 : 32}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>RAM: {config.ram} GB</Label>
                <Slider
                  value={[config.ram]}
                  onValueChange={([value]) => updateConfig("ram", value)}
                  max={config.type === "web" ? 16 : config.type === "vps" ? 64 : 256}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Stockage: {config.storage} GB</Label>
                <Slider
                  value={[config.storage]}
                  onValueChange={([value]) => updateConfig("storage", value)}
                  max={config.type === "web" ? 500 : config.type === "vps" ? 2000 : 8000}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Bande passante: {config.bandwidth} GB/mois</Label>
                <Slider
                  value={[config.bandwidth]}
                  onValueChange={([value]) => updateConfig("bandwidth", value)}
                  max={10000}
                  min={100}
                  step={100}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Options & Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Certificat SSL</Label>
                  <div className="text-sm text-muted-foreground">Sécurise votre site web</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Gratuit</Badge>
                  <Switch checked={config.ssl} onCheckedChange={(checked) => updateConfig("ssl", checked)} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sauvegardes automatiques</Label>
                  <div className="text-sm text-muted-foreground">Sauvegarde quotidienne de vos données</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">+5€/mois</Badge>
                  <Switch checked={config.backup} onCheckedChange={(checked) => updateConfig("backup", checked)} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Monitoring 24/7</Label>
                  <div className="text-sm text-muted-foreground">Surveillance continue de vos services</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">+3€/mois</Badge>
                  <Switch
                    checked={config.monitoring}
                    onCheckedChange={(checked) => updateConfig("monitoring", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Niveau de Support</Label>
                <Select value={config.support} onValueChange={(value) => updateConfig("support", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Support Standard (Gratuit)</SelectItem>
                    <SelectItem value="priority">Support Prioritaire (+10€/mois)</SelectItem>
                    <SelectItem value="premium">Support Premium (+25€/mois)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Localisation du serveur</Label>
                <Select value={config.location} onValueChange={(value) => updateConfig("location", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">🇫🇷 France (Paris)</SelectItem>
                    <SelectItem value="germany">🇩🇪 Allemagne (Francfort)</SelectItem>
                    <SelectItem value="netherlands">🇳🇱 Pays-Bas (Amsterdam)</SelectItem>
                    <SelectItem value="uk">🇬🇧 Royaume-Uni (Londres)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Résumé et Prix */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Résumé de Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Type:</span>
                  <Badge variant="secondary">
                    {config.type === "web" ? "Web" : config.type === "vps" ? "VPS" : "Dédié"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CPU:</span>
                  <span>{config.cpu} cores</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>RAM:</span>
                  <span>{config.ram} GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Stockage:</span>
                  <span>{config.storage} GB SSD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bande passante:</span>
                  <span>{config.bandwidth} GB</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{price}€</div>
                  <div className="text-sm text-muted-foreground">par mois</div>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Commander maintenant
              </Button>

              <div className="text-xs text-center text-muted-foreground">Garantie satisfait ou remboursé 30 jours</div>
            </CardContent>
          </Card>

          {recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recommandations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
