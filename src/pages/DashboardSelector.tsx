import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  School,
  GraduationCap,
  Users,
  UserCheck,
  ArrowRight,
  Shield,
} from "lucide-react";

const dashboardTypes = [
  {
    type: "ecole",
    title: "École / Administration",
    description: "Gestion complète de l'établissement scolaire",
    icon: School,
    color: "blue",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    path: "/dashboard/ecole",
    features: [
      "Gestion des utilisateurs",
      "Classes et emplois du temps",
      "Résultats et bulletins",
      "Communications officielles",
      "Abonnements et paiements",
    ],
  },
  {
    type: "enseignant",
    title: "Enseignant",
    description: "Espace dédié aux professeurs",
    icon: GraduationCap,
    color: "green",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    path: "/dashboard/enseignant",
    features: [
      "Publication de cours",
      "Devoirs et examens",
      "Notation et évaluations",
      "Suivi des élèves",
      "Communication",
    ],
  },
  {
    type: "eleve",
    title: "Élève",
    description: "Espace personnel d'apprentissage",
    icon: Users,
    color: "purple",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    path: "/dashboard/eleve",
    features: [
      "Accès aux cours",
      "Emploi du temps",
      "Devoirs à rendre",
      "Notes et bulletins",
      "Notifications",
    ],
  },
  {
    type: "parent",
    title: "Parent",
    description: "Suivi de vos enfants",
    icon: UserCheck,
    color: "orange",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    path: "/dashboard/parent",
    features: [
      "Progression des enfants",
      "Notes et bulletins",
      "Présences",
      "Communication école",
      "Calendrier scolaire",
    ],
  },
];

export default function DashboardSelector() {
  const navigate = useNavigate();

  const handleDashboardSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">EA</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre espace EduAfrique
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sélectionnez le type de compte qui correspond à votre rôle dans
            l'écosystème éducatif
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            🌍 Éducation pour l'Afrique francophone
          </Badge>
        </div>

        {/* Grille des dashboards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {dashboardTypes.map((dashboard, index) => (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200"
            >
              <CardHeader className={`${dashboard.bgColor} pb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white rounded-xl">
                      <dashboard.icon
                        className={`w-8 h-8 ${dashboard.iconColor}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">
                        {dashboard.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {dashboard.description}
                      </p>
                    </div>
                  </div>
                  {dashboard.type === "ecole" && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Fonctionnalités principales :
                  </h3>
                  <ul className="space-y-2">
                    {dashboard.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${dashboard.iconColor.replace(
                            "text",
                            "bg",
                          )} mr-3`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleDashboardSelect(dashboard.path)}
                  className={`w-full bg-gradient-to-r from-${dashboard.color}-600 to-${dashboard.color}-700 hover:from-${dashboard.color}-700 hover:to-${dashboard.color}-800 text-white`}
                >
                  Accéder à mon espace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section d'aide */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-white border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Besoin d'aide ?
              </h3>
              <p className="text-gray-600 mb-4">
                Si vous ne savez pas quel espace choisir ou si vous avez
                plusieurs rôles, contactez l'administration de votre
                établissement.
              </p>
              <div className="flex space-x-3 justify-center">
                <Button variant="outline">Contacter le support</Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
