import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  UserPlus,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const stats = [
  {
    title: "Total Élèves",
    value: "1,247",
    change: "+12%",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Enseignants",
    value: "89",
    change: "+3%",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Classes Actives",
    value: "42",
    change: "+2",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Taux de Présence",
    value: "94.2%",
    change: "+1.5%",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

const recentActivities = [
  {
    action: "Nouvel enseignant ajouté",
    user: "Prof. Kouame",
    time: "Il y a 2h",
    type: "success",
  },
  {
    action: "Bulletin publié",
    user: "Classe de 6ème A",
    time: "Il y a 4h",
    type: "info",
  },
  {
    action: "Réunion programmée",
    user: "Parents 3ème",
    time: "Il y a 1j",
    type: "warning",
  },
];

export default function EcoleDashboard() {
  return (
    <DashboardLayout userType="ecole">
      <div className="space-y-4 lg:space-y-6">
        {/* En-tête */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Tableau de bord École
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Vue d'ensemble de votre établissement scolaire
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="outline" className="text-sm h-9">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Voir le </span>Planning
            </Button>
            <Button className="text-sm h-9">
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Ajouter </span>Utilisateur
            </Button>
          </motion.div>
        </motion.div>

        {/* Statistiques principales */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                        {stat.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div
                      className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} shrink-0`}
                    >
                      <stat.icon
                        className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Activités récentes */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {activity.action}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions rapides */}
          <div className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm h-10"
                  >
                    <Users className="w-4 h-4 mr-3" />
                    Gérer les utilisateurs
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm h-10"
                  >
                    <BookOpen className="w-4 h-4 mr-3" />
                    Consulter les résultats
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm h-10"
                  >
                    <MessageSquare className="w-4 h-4 mr-3" />
                    Envoyer une communication
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm h-10"
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    Planifier un événement
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">
                      Nouveau message
                    </p>
                    <p>Demande de réunion parent</p>
                    <p className="text-xs text-gray-400 mt-1">Il y a 1h</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">
                      Paiement reçu
                    </p>
                    <p>Frais de scolarité - Janvier</p>
                    <p className="text-xs text-gray-400 mt-1">Il y a 3h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
