import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  Users,
  Clock,
  Globe,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  Key,
  Server,
  CreditCard,
} from "lucide-react"

export const dynamic = "force-dynamic"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      <main className="container py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-emerald-100 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Politique de Confidentialité
              </h1>
              <p className="text-xl text-slate-600 mb-4">Protection et traitement de vos données personnelles</p>
              <div className="flex items-center justify-center space-x-4">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  RGPD Conforme
                </Badge>
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Mise à jour : 15 décembre 2024
                </Badge>
                <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Points clés RGPD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-emerald-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-900 mb-2">Sécurité Maximale</h3>
                <p className="text-sm text-emerald-700">
                  Chiffrement AES-256 et centres de données certifiés ISO 27001
                </p>
              </CardContent>
            </Card>
            <Card className="border-teal-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-teal-900 mb-2">Vos Droits</h3>
                <p className="text-sm text-teal-700">Accès, rectification, effacement et portabilité de vos données</p>
              </CardContent>
            </Card>
            <Card className="border-cyan-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-cyan-900 mb-2">Transparence</h3>
                <p className="text-sm text-cyan-700">Traitement transparent et finalités clairement définies</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-900">
                  <Eye className="h-5 w-5 mr-2" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                  <p className="text-slate-700 leading-relaxed">
                    <strong className="text-emerald-700">HebergTonServ</strong> s'engage à protéger la confidentialité
                    et la sécurité de vos données personnelles. Cette politique explique comment nous collectons,
                    utilisons, stockons et protégeons vos informations personnelles conformément au{" "}
                    <strong>Règlement Général sur la Protection des Données (RGPD)</strong>.
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  En utilisant nos services, vous acceptez les pratiques décrites dans cette politique de
                  confidentialité.
                </p>
              </CardContent>
            </Card>

            {/* Responsable du traitement */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-900">
                  <Users className="h-5 w-5 mr-2" />
                  Responsable du traitement
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-white border border-emerald-100 rounded-lg p-6 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Informations société</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Raison sociale :</strong> HebergTonServ
                        </p>
                        <p>
                          <strong>Forme juridique :</strong> SAS
                        </p>
                        <p>
                          <strong>Capital :</strong> 10 000 euros
                        </p>
                        <p>
                          <strong>RCS :</strong> Paris 123 456 789
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3">Contact DPO</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                          <a href="mailto:dpo@hebergtonserv.com" className="text-emerald-600 hover:underline">
                            dpo@hebergtonserv.com
                          </a>
                        </div>
                        <p>123 Avenue des Champs-Élysées</p>
                        <p>75008 Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Données collectées */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-900">
                  <Database className="h-5 w-5 mr-2" />
                  Données personnelles collectées
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Identification
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Nom, prénom</li>
                      <li>• Adresse email</li>
                      <li>• Numéro de téléphone</li>
                      <li>• Adresse postale</li>
                      <li>• Date de naissance</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Facturation
                    </h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Informations de paiement</li>
                      <li>• Historique des transactions</li>
                      <li>• Adresse de facturation</li>
                      <li>• Données comptables</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <Server className="h-4 w-4 mr-2" />
                      Techniques
                    </h4>
                    <ul className="space-y-1 text-sm text-purple-700">
                      <li>• Adresse IP</li>
                      <li>• Logs de connexion</li>
                      <li>• Données d'utilisation</li>
                      <li>• Métriques de performance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vos droits */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-900">
                  <Key className="h-5 w-5 mr-2" />
                  Vos droits RGPD
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Droit d'accès",
                      description: "Obtenir une copie de vos données personnelles",
                      icon: Eye,
                      color: "blue",
                    },
                    {
                      title: "Droit de rectification",
                      description: "Corriger vos données inexactes",
                      icon: FileText,
                      color: "green",
                    },
                    {
                      title: "Droit d'effacement",
                      description: "Demander la suppression de vos données",
                      icon: AlertTriangle,
                      color: "red",
                    },
                    {
                      title: "Droit de portabilité",
                      description: "Récupérer vos données dans un format structuré",
                      icon: Download,
                      color: "purple",
                    },
                    {
                      title: "Droit d'opposition",
                      description: "Vous opposer au traitement de vos données",
                      icon: Shield,
                      color: "orange",
                    },
                    {
                      title: "Droit de limitation",
                      description: "Limiter le traitement de vos données",
                      icon: Lock,
                      color: "teal",
                    },
                  ].map((right, index) => (
                    <div
                      key={index}
                      className={`bg-${right.color}-50 border border-${right.color}-200 rounded-lg p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`h-8 w-8 rounded-lg bg-${right.color}-100 flex items-center justify-center mr-3`}
                        >
                          <right.icon className={`h-4 w-4 text-${right.color}-600`} />
                        </div>
                        <h4 className={`font-semibold text-${right.color}-800 text-sm`}>{right.title}</h4>
                      </div>
                      <p className={`text-xs text-${right.color}-700`}>{right.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-emerald-800 text-sm">
                    <strong>Comment exercer vos droits :</strong> Contactez-nous à{" "}
                    <a href="mailto:dpo@hebergtonserv.com" className="text-emerald-600 hover:underline font-medium">
                      dpo@hebergtonserv.com
                    </a>{" "}
                    avec une pièce d'identité. Réponse sous 30 jours maximum.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-900">
                  <Lock className="h-5 w-5 mr-2" />
                  Sécurité des données
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Mesures techniques</h4>
                    <div className="space-y-3">
                      {[
                        { icon: Lock, text: "Chiffrement AES-256", color: "green" },
                        { icon: Shield, text: "Authentification forte", color: "blue" },
                        { icon: Eye, text: "Surveillance 24/7", color: "purple" },
                        { icon: Database, text: "Sauvegardes chiffrées", color: "orange" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`h-6 w-6 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                            <item.icon className={`h-3 w-3 text-${item.color}-600`} />
                          </div>
                          <span className="text-sm text-slate-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Certifications</h4>
                    <div className="space-y-3">
                      {[
                        { text: "ISO 27001", badge: "Sécurité" },
                        { text: "SOC 2 Type II", badge: "Audit" },
                        { text: "GDPR Compliant", badge: "Conformité" },
                        { text: "PCI DSS", badge: "Paiements" },
                      ].map((cert, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">{cert.text}</span>
                          <Badge variant="outline" className="text-xs">
                            {cert.badge}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact et réclamations */}
            <Card className="border-emerald-100 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-2">Questions sur vos données ?</h3>
                    <p className="text-emerald-700 mb-4">
                      Notre Délégué à la Protection des Données est à votre écoute
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Contacter le DPO
                    </Button>
                    <Button variant="outline" className="border-emerald-200 hover:bg-emerald-100 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger mes données
                    </Button>
                    <Button variant="outline" className="border-emerald-200 hover:bg-emerald-100 bg-transparent">
                      <Shield className="h-4 w-4 mr-2" />
                      Signaler un problème
                    </Button>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 border border-emerald-100">
                    <p className="text-sm text-emerald-800">
                      <strong>Réclamation CNIL :</strong> Si vos droits ne sont pas respectés, vous pouvez saisir la
                      CNIL à{" "}
                      <a href="https://www.cnil.fr" className="text-emerald-600 hover:underline">
                        www.cnil.fr
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100">
            <p className="text-slate-600 mb-2">
              Pour toute question concernant cette politique de confidentialité, contactez-nous à :{" "}
              <a href="mailto:dpo@hebergtonserv.com" className="text-emerald-600 hover:underline font-medium">
                dpo@hebergtonserv.com
              </a>
            </p>
            <p className="text-sm text-slate-500">Délégué à la Protection des Données - HebergTonServ SAS</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
