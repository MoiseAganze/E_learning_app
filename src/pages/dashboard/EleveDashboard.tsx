import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calendar,
  FileText,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
} from "lucide-react";

const stats = [
  {
    title: "Cours Suivis",
    value: "8",
    description: "Matières actives",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Devoirs à Rendre",
    value: "3",
    description: "Cette semaine",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Moyenne Générale",
    value: "14.2",
    description: "/20",
    icon: Award,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Présence",
    value: "96%",
    description: "Ce mois",
    icon: CheckCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const subjects = [
  {
    name: "Mathématiques",
    teacher: "Prof. Diallo",
    average: 15.5,
    progress: 78,
    nextClass: "Aujourd'hui 10h00",
    color: "blue",
  },
  {
    name: "Français",
    teacher: "Mme Kouadio",
    average: 13.8,
    progress: 72,
    nextClass: "Demain 8h00",
    color: "green",
  },
  {
    name: "Sciences Physiques",
    teacher: "Dr. Koné",
    average: 16.2,
    progress: 85,
    nextClass: "Vendredi 14h00",
    color: "purple",
  },
  {
    name: "Histoire-Géo",
    teacher: "M. Ouattara",
    average: 12.4,
    progress: 65,
    nextClass: "Lundi 9h00",
    color: "orange",
  },
];

const homework = [
  {
    subject: "Mathématiques",
    title: "Exercices sur les équations",
    dueDate: "Dans 2 jours",
    priority: "high",
    status: "pending",
  },
  {
    subject: "Français",
    title: "Dissertation sur Molière",
    dueDate: "Dans 4 jours",
    priority: "medium",
    status: "in_progress",
  },
  {
    subject: "Sciences Physiques",
    title: "Rapport de TP - Optique",
    dueDate: "Dans 1 semaine",
    priority: "low",
    status: "pending",
  },
];

const todaySchedule = [
  {
    time: "08:00 - 09:00",
    subject: "Français",
    teacher: "Mme Kouadio",
    room: "Salle 102",
    type: "cours",
  },
  {
    time: "10:00 - 11:00",
    subject: "Mathématiques",
    teacher: "Prof. Diallo",
    room: "Salle 204",
    type: "cours",
  },
  {
    time: "14:00 - 15:00",
    subject: "Sciences Physiques",
    teacher: "Dr. Koné",
    room: "Labo 1",
    type: "tp",
  },
  {
    time: "15:30 - 16:30",
    subject: "Histoire-Géographie",
    teacher: "M. Ouattara",
    room: "Salle 301",
    type: "cours",
  },
];

export default function EleveDashboard() {
  return (
    <DashboardLayout userType="eleve" userName="Aya Traoré">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Mon espace élève
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Suivez vos cours, devoirs et progressions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-sm h-9">
              <PlayCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Reprendre un </span>cours
            </Button>
            <Button variant="outline" className="text-sm h-9">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Mes </span>devoirs
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
          {/* Mes Matières */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Mes Matières
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {subject.name}
                    </h3>
                    <Badge
                      className={`bg-${subject.color}-100 text-${subject.color}-800`}
                    >
                      {subject.average}/20
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{subject.teacher}</span>
                    <span>{subject.nextClass}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression du programme</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Devoirs à rendre */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Devoirs à rendre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {homework.map((hw, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{hw.title}</h3>
                    <Badge
                      variant={
                        hw.priority === "high"
                          ? "destructive"
                          : hw.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {hw.priority === "high"
                        ? "Urgent"
                        : hw.priority === "medium"
                          ? "Moyen"
                          : "Faible"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{hw.subject}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {hw.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {hw.status === "pending" ? (
                        <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      )}
                      <span className="text-sm">
                        {hw.status === "pending" ? "À faire" : "En cours"}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      Ouvrir
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Emploi du temps d'aujourd'hui */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Mon emploi du temps - Aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">
                        {slot.subject}
                      </h3>
                      <Badge
                        variant={slot.type === "tp" ? "default" : "secondary"}
                      >
                        {slot.type === "tp" ? "TP" : "Cours"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{slot.teacher}</span>
                      <span>{slot.room}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-medium text-blue-600">{slot.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
