import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  GraduationCap,
  Heart,
  Globe,
  ChevronRight,
  CheckCircle,
  Monitor,
  Smartphone,
  Brain,
  MessageCircle,
  FileText,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">
                EduAfrique
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#fonctionnalites"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#apropos"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                À propos
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Contact
              </a>
              <Link to="/connexion">
                <Button>Se connecter</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                🌍 Éducation pour l'Afrique francophone
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transformons l'éducation en
                <span className="text-primary"> Afrique</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Une plateforme e-learning complète, intelligente et accessible
                qui révolutionne l'apprentissage pour les établissements,
                enseignants, élèves et parents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/connexion">
                  <Button size="lg" className="w-full sm:w-auto">
                    Commencer maintenant
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Gratuit pour démarrer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <Users className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-sm opacity-90">Élèves actifs</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <BookOpen className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Cours disponibles</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <GraduationCap className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">200+</div>
                    <div className="text-sm opacity-90">Enseignants</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <Globe className="h-8 w-8 mb-2" />
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm opacity-90">Pays</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="fonctionnalites"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
              Fonctionnalités principales
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Une solution complète pour tous
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme s'adapte à tous les acteurs du monde éducatif
              avec des espaces dédiés et des outils intelligents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Monitor,
                title: "Espace Administrateur",
                description:
                  "Gestion complète des inscriptions, classes, emplois du temps et statistiques",
                color: "bg-blue-500",
              },
              {
                icon: GraduationCap,
                title: "Espace Enseignant",
                description:
                  "Création de cours, suivi des élèves, évaluation et ressources pédagogiques",
                color: "bg-green-500",
              },
              {
                icon: BookOpen,
                title: "Espace Élève",
                description:
                  "Accès personnalisé aux cours, devoirs, résultats et interactions",
                color: "bg-purple-500",
              },
              {
                icon: Heart,
                title: "Espace Parent",
                description:
                  "Suivi en temps réel de la scolarité avec bulletins et notifications",
                color: "bg-pink-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-gray-50 to-white"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Assistance Intelligente (IEA)",
                description:
                  "Système d'accompagnement interactif pour aider les parents à comprendre les contenus et devoirs",
                features: [
                  "Support multilingue",
                  "Explications simplifiées",
                  "Suivi personnalisé",
                ],
              },
              {
                icon: FileText,
                title: "Bibliothèque Numérique",
                description:
                  "Accès à tous les manuels scolaires officiels et ressources complémentaires",
                features: [
                  "Manuels officiels",
                  "Ressources universitaires",
                  "Contenus multimédias",
                ],
              },
              {
                icon: Calendar,
                title: "Gestion Administrative",
                description:
                  "Numérisation complète des processus d'admission, évaluation et communication",
                features: [
                  "Inscriptions en ligne",
                  "Bulletins numériques",
                  "Alertes automatiques",
                ],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="apropos"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                Notre Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Démocratiser l'éducation en Afrique francophone
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nous commençons par la République Démocratique du Congo (RDC)
                avec une vision d'expansion dans toute l'Afrique francophone.
                Notre plateforme offre une solution modulaire et évolutive qui
                s'adapte à tous les contextes éducatifs.
              </p>
              <div className="space-y-4">
                {[
                  "Interface moderne et intuitive",
                  "Accessible même dans les zones rurales",
                  "Modèle d'abonnement flexible",
                  "Support multilingue adapté au contexte local",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <Smartphone className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Accessible partout</h3>
                    <p className="text-sm text-gray-600">
                      Sur mobile, tablette et ordinateur
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <MessageCircle className="h-8 w-8 text-accent mb-3" />
                    <h3 className="font-semibold mb-2">Communication</h3>
                    <p className="text-sm text-gray-600">
                      Échanges simplifiés entre tous les acteurs
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <Globe className="h-8 w-8 text-purple-500 mb-3" />
                    <h3 className="font-semibold mb-2">Vision globale</h3>
                    <p className="text-sm text-gray-600">
                      Expansion dans toute l'Afrique francophone
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <Brain className="h-8 w-8 text-pink-500 mb-3" />
                    <h3 className="font-semibold mb-2">Intelligence</h3>
                    <p className="text-sm text-gray-600">
                      IA pour personnaliser l'apprentissage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rejoignez la révolution éducative africaine
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Commencez dès maintenant et transformez l'expérience éducative dans
            votre établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/connexion">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                >
                  C'est parti
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white"
            >
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">EduAfrique</span>
              </div>
              <p className="text-gray-400">
                Transformons l'éducation en Afrique avec une plateforme moderne et accessible.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Pour les écoles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pour les enseignants</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pour les élèves</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pour les parents</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Formation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contactez-nous</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 contact@eduafrique.com</p>
                <p>📞 +225 27 20 12 34 56</p>
                <p>📍 Abidjan, Côte d'Ivoire</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduAfrique. Tous droits réservés. Fait avec ❤️ pour l'Afrique.</p>
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">EduAfrique</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Plateforme e-learning inclusive et évolutive dédiée à
                transformer l'éducation en Afrique francophone.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sécurité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Communauté
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduAfrique. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;