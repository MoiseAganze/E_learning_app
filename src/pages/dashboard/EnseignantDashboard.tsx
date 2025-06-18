import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  FileText,
  Users,
  Clock,
  Plus,
  Calendar,
  MessageSquare,
  Award,
} from "lucide-react";

const stats = [
  {
    title: "Mes Classes",
    value: "4",
    description: "Classes assignées",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Cours Publiés",
    value: "23",
    description: "Ce semestre",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Devoirs Actifs",
    value: "8",
    description: "À corriger",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Prochains Cours",
    value: "3",
    description: "Aujourd'hui",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const classesList = [
  {
    name: "6ème A - Mathématiques",
    students: 28,
    nextCourse: "Aujourd'hui 10h00",
    progress: 75,
    status: "En cours",
  },
  {
    name: "5ème B - Mathématiques",
    students: 31,
    nextCourse: "Demain 8h00",
    progress: 68,
    status: "En cours",
  },
  {
    name: "4ème C - Mathématiques",
    students: 26,
    nextCourse: "Vendredi 14h00",
    progress: 82,
    status: "En cours",
  },
];

const recentHomework = [
  {
    title: "Devoir sur les équations",
    class: "6ème A",
    dueDate: "Dans 2 jours",
    submitted: 18,
    total: 28,
    status: "pending",
  },
  {
    title: "Contrôle géométrie",
    class: "5ème B",
    dueDate: "Aujourd'hui",
    submitted: 31,
    total: 31,
    status: "completed",
  },
  {
    title: "Exercices algèbre",
    class: "4ème C",
    dueDate: "Dans 1 jour",
    submitted: 22,
    total: 26,
    status: "pending",
  },
];

export default function EnseignantDashboard() {
  return (
    <DashboardLayout userType="enseignant" userName="Prof. Marie Diallo">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mon espace enseignant
            </h1>
            <p className="text-gray-600 mt-1">
              Gérez vos cours, devoirs et évaluations
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau cours
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Créer un devoir
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
                    <p className="text-sm text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mes Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Mes Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {classesList.map((classe, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{classe.name}</h3>
                    <Badge variant="outline">{classe.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{classe.students} élèves</span>
                    <span>{classe.nextCourse}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression du programme</span>
                      <span>{classe.progress}%</span>
                    </div>
                    <Progress value={classe.progress} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Devoirs récents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Devoirs & Évaluations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentHomework.map((homework, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {homework.title}
                    </h3>
                    <Badge
                      variant={
                        homework.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {homework.status === "completed" ? "Terminé" : "En cours"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{homework.class}</span>
                    <span>{homework.dueDate}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rendus</span>
                      <span>
                        {homework.submitted}/{homework.total}
                      </span>
                    </div>
                    <Progress
                      value={(homework.submitted / homework.total) * 100}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Planning du jour */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Planning d'aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    6ème A - Mathématiques
                  </h3>
                  <p className="text-sm text-gray-600">
                    Chapitre 5 : Les fractions
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">10:00 - 11:00</p>
                  <p className="text-sm text-gray-500">Salle 204</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <Clock className="w-5 h-5 text-green-600 mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    5ème B - Mathématiques
                  </h3>
                  <p className="text-sm text-gray-600">
                    Révisions équations du 1er degré
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">14:00 - 15:00</p>
                  <p className="text-sm text-gray-500">Salle 204</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    Réunion parents d'élèves
                  </h3>
                  <p className="text-sm text-gray-600">Classe 4ème C</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-purple-600">16:00 - 17:00</p>
                  <p className="text-sm text-gray-500">Salle des profs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
