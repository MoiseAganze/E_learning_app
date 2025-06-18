import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <DashboardLayout userType="ecole" userName="Direction École Lumière">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord École
            </h1>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de votre établissement scolaire
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un utilisateur
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Nouvelle communication
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 text-green-700 bg-green-100"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activités récentes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Activités récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      <Badge
                        variant={
                          activity.type === "success"
                            ? "default"
                            : activity.type === "warning"
                              ? "destructive"
                              : "secondary"
                        }
                        className="mt-1"
                      >
                        {activity.type === "success"
                          ? "Nouveau"
                          : activity.type === "warning"
                            ? "Important"
                            : "Info"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Gérer les utilisateurs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Emplois du temps
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Voir les résultats
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Communications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des classes récentes */}
        <Card>
          <CardHeader>
            <CardTitle>Classes les plus actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Classe</th>
                    <th className="text-left py-2">Enseignant</th>
                    <th className="text-left py-2">Élèves</th>
                    <th className="text-left py-2">Moyenne</th>
                    <th className="text-left py-2">Présence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">6ème A</td>
                    <td className="py-3">Mme Diallo</td>
                    <td className="py-3">28</td>
                    <td className="py-3">
                      <Badge className="bg-green-100 text-green-800">
                        15.2/20
                      </Badge>
                    </td>
                    <td className="py-3">96%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">3ème B</td>
                    <td className="py-3">M. Ouattara</td>
                    <td className="py-3">31</td>
                    <td className="py-3">
                      <Badge className="bg-blue-100 text-blue-800">
                        14.8/20
                      </Badge>
                    </td>
                    <td className="py-3">94%</td>
                  </tr>
                  <tr>
                    <td className="py-3">Terminale C</td>
                    <td className="py-3">Dr. Koné</td>
                    <td className="py-3">24</td>
                    <td className="py-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        16.1/20
                      </Badge>
                    </td>
                    <td className="py-3">98%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
