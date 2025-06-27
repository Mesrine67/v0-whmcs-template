import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Globe, Database, Mail, Shield, Code } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Server,
      title: "Hébergement Web",
      description: "Hébergement partagé, VPS et serveurs dédiés avec une performance exceptionnelle",
      features: ["SSD NVMe", "Bande passante illimitée", "SSL gratuit", "Panneau de contrôle cPanel"],
    },
    {
      icon: Globe,
      title: "Noms de Domaine",
      description: "Enregistrement et gestion de domaines avec plus de 500 extensions disponibles",
      features: ["Protection WHOIS", "DNS géré", "Transfert gratuit", "Renouvellement automatique"],
    },
    {
      icon: Database,
      title: "Bases de Données",
      description: "Solutions de bases de données MySQL, PostgreSQL et MongoDB managées",
      features: ["Sauvegardes automatiques", "Haute disponibilité", "Monitoring 24/7", "Scaling automatique"],
    },
    {
      icon: Mail,
      title: "Email Professionnel",
      description: "Comptes email professionnels avec votre nom de domaine",
      features: ["Webmail moderne", "Anti-spam avancé", "Synchronisation mobile", "Stockage généreux"],
    },
    {
      icon: Shield,
      title: "Sécurité Web",
      description: "Protection complète contre les menaces en ligne",
      features: ["Firewall WAF", "Protection DDoS", "Scan de malware", "Certificats SSL"],
    },
    {
      icon: Code,
      title: "Développement",
      description: "Outils et environnements pour développeurs",
      features: ["Git intégré", "Staging automatique", "CI/CD", "Support multi-langages"],
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une gamme complète de services pour répondre à tous vos besoins en ligne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
