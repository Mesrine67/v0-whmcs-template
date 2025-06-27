import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  User,
  Server,
  Shield,
  Scale,
  AlertTriangle,
  ExternalLink,
  Download,
  Clock,
} from "lucide-react"

export const dynamic = "force-dynamic"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Header />
      <main className="container py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-violet-100 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Building className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Mentions Légales
              </h1>
              <p className="text-xl text-slate-600 mb-4">Informations légales et réglementaires</p>
              <div className="flex items-center justify-center space-x-4">
                <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200">
                  <Building className="h-3 w-3 mr-1" />
                  SAS HebergTonServ
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Mise à jour : 15 décembre 2024
                </Badge>
                <Button variant="outline" size="sm" className="border-violet-200 hover:bg-violet-50 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Informations rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-violet-900 mb-1">SAS</h3>
                <p className="text-sm text-violet-700">Société par Actions Simplifiée</p>
              </CardContent>
            </Card>
            <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-900 mb-1">Paris</h3>
                <p className="text-sm text-purple-700">Siège social France</p>
              </CardContent>
            </Card>
            <Card className="border-fuchsia-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-fuchsia-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-fuchsia-600" />
                </div>
                <h3 className="font-semibold text-fuchsia-900 mb-1">RCS</h3>
                <p className="text-sm text-fuchsia-700">Paris 123 456 789</p>
              </CardContent>
            </Card>
            <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-pink-900 mb-1">TVA</h3>
                <p className="text-sm text-pink-700">FR12345678901</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Éditeur du site */}
            <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                <CardTitle className="flex items-center text-violet-900">
                  <Building className="h-5 w-5 mr-2" />
                  Éditeur du site
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
                      <h4 className="font-semibold text-violet-800 mb-4 flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Informations société
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Raison sociale :</span>
                          <p className="font-medium text-slate-800">HebergTonServ</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Forme juridique :</span>
                          <p className="font-medium text-slate-800">SAS</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Capital social :</span>
                          <p className="font-medium text-slate-800">10 000 €</p>
                        </div>
                        <div>
                          <span className="text-slate-600">RCS :</span>
                          <p className="font-medium text-slate-800">Paris 123 456 789</p>
                        </div>
                        <div>
                          <span className="text-slate-600">SIRET :</span>
                          <p className="font-medium text-slate-800">123 456 789 00012</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Code APE :</span>
                          <p className="font-medium text-slate-800">6311Z</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-800 mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Coordonnées
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-4 w-4 text-purple-600 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-slate-800">123 Avenue des Champs-Élysées</p>
                            <p className="text-slate-600">75008 Paris, France</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-purple-600" />
                          <p className="text-sm font-medium text-slate-800">+33 1 23 45 67 89</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-purple-600" />
                          <a
                            href="mailto:contact@hebergtonserv.com"
                            className="text-sm font-medium text-purple-600 hover:underline"
                          >
                            contact@hebergtonserv.com
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="h-4 w-4 text-purple-600" />
                          <a
                            href="https://hebergtonserv.com"
                            className="text-sm font-medium text-purple-600 hover:underline"
                          >
                            hebergtonserv.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Directeur de publication */}
            <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                <CardTitle className="flex items-center text-violet-900">
                  <User className="h-5 w-5 mr-2" />
                  Directeur de publication
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-violet-800">Jean Dupont</h4>
                      <p className="text-violet-700">Président de la SAS HebergTonServ</p>
                      <a href="mailto:direction@hebergtonserv.com" className="text-violet-600 hover:underline text-sm">
                        direction@hebergtonserv.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hébergement du site */}
            <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                <CardTitle className="flex items-center text-violet-900">
                  <Server className="h-5 w-5 mr-2" />
                  Hébergement du site web
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Hébergeur principal
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-blue-900">Vercel Inc.</p>
                      <p className="text-blue-700">340 S Lemon Ave #4133</p>
                      <p className="text-blue-700">Walnut, CA 91789, USA</p>
                      <a href="https://vercel.com" className="text-blue-600 hover:underline flex items-center">
                        vercel.com
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                      <Server className="h-4 w-4 mr-2" />
                      Infrastructure serveurs
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-green-900">OVHcloud</p>
                      <p className="text-green-700">2 rue Kellermann</p>
                      <p className="text-green-700">59100 Roubaix, France</p>
                      <a href="https://ovhcloud.com" className="text-green-600 hover:underline flex items-center">
                        ovhcloud.com
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Propriété intellectuelle */}
            <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                <CardTitle className="flex items-center text-violet-900">
                  <Shield className="h-5 w-5 mr-2" />
                  Propriété intellectuelle
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <p className="text-slate-700 leading-relaxed">
                    L'ensemble du contenu de ce site web (textes, images, vidéos, logos, icônes, sons, logiciels, etc.)
                    est la propriété exclusive de <strong className="text-orange-700">HebergTonServ</strong> ou de ses
                    partenaires et est protégé par les lois françaises et internationales relatives à la propriété
                    intellectuelle.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Interdictions
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Reproduction non autorisée</li>
                      <li>• Modification du contenu</li>
                      <li>• Usage commercial sans accord</li>
                      <li>• Extraction de données</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Marques déposées
                    </h4>
                    <p className="text-sm text-green-700">
                      Les marques et logos présents sont des marques déposées de HebergTonServ ou de ses partenaires.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Médiation */}
            <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                <CardTitle className="flex items-center text-violet-900">
                  <Scale className="h-5 w-5 mr-2" />
                  Médiation de la consommation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-blue-800 mb-4">
                    Conformément à l'article L. 616-1 du Code de la consommation, nous vous informons qu'en cas de
                    litige, vous pouvez recourir gratuitement au service de médiation :
                  </p>
                  <div className="bg-white border border-blue-100 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Centre de Médiation et d'Arbitrage de Paris (CMAP)
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>39 avenue F.D. Roosevelt, 75008 Paris</p>
                      <a href="https://www.cmap.fr" className="text-blue-600 hover:underline flex items-center">
                        www.cmap.fr
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact final */}
            <Card className="border-violet-100 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-violet-900 mb-2">Questions légales ?</h3>
                    <p className="text-violet-700 mb-4">Notre équipe juridique est à votre disposition</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="bg-violet-600 hover:bg-violet-700">
                      <Mail className="h-4 w-4 mr-2" />
                      legal@hebergtonserv.com
                    </Button>
                    <Button variant="outline" className="border-violet-200 hover:bg-violet-100 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      +33 1 23 45 67 89
                    </Button>
                    <Button variant="outline" className="border-violet-200 hover:bg-violet-100 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-100">
            <p className="text-slate-600 mb-2">Dernière mise à jour des mentions légales : 15 décembre 2024</p>
            <p className="text-sm text-slate-500">
              HebergTonServ SAS - Capital 10 000€ - RCS Paris 123 456 789 - TVA FR12345678901
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
