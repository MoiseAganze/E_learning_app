import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Award,
  Calendar,
  UserCheck,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const children = [
  {
    name: "Aya Traoré",
    class: "6ème A",
    average: 14.2,
    attendance: 96,
    nextParentMeeting: "15 Mars 2024",
    recentGrades: [
      { subject: "Mathématiques", grade: 15.5, date: "Il y a 2 jours" },
      { subject: "Français", grade: 13.8, date: "Il y a 3 jours" },
      { subject: "Sciences", grade: 16.2, date: "Il y a 1 semaine" },
    ],
  },
  {
    name: "Kofi Traoré",
    class: "3ème B",
    average: 12.8,
    attendance: 89,
    nextParentMeeting: "22 Mars 2024",
    recentGrades: [
      { subject: "Histoire", grade: 11.5, date: "Il y a 1 jour" },
      { subject: "Mathématiques", grade: 14.0, date: "Il y a 4 jours" },
      { subject: "Anglais", grade: 12.5, date: "Il y a 1 semaine" },
    ],
  },
];

const notifications = [
  {
    type: "absence",
    child: "Kofi Traoré",
    message: "Absence non justifiée le 8 Mars",
    time: "Il y a 2h",
    priority: "high",
  },
  {
    type: "grade",
    child: "Aya Traoré",
    message: "Nouvelle note en Mathématiques : 15.5/20",
    time: "Il y a 3h",
    priority: "medium",
  },
  {
    type: "homework",
    child: "Kofi Traoré",
    message: "Devoir de Français non remis",
    time: "Il y a 1j",
    priority: "high",
  },
  {
    type: "meeting",
    child: "Aya Traoré",
    message: "Réunion parents-professeurs programmée",
    time: "Il y a 2j",
    priority: "low",
  },
];

const upcomingEvents = [
  {
    date: "15 Mars",
    event: "Réunion parents-professeurs",
    child: "Aya Traoré",
    time: "16:00",
    type: "meeting",
  },
  {
    date: "18 Mars",
    event: "Contrôle de Mathématiques",
    child: "Kofi Traoré",
    time: "10:00",
    type: "exam",
  },
  {
    date: "22 Mars",
    event: "Réunion parents-professeurs",
    child: "Kofi Traoré",
    time: "14:00",
    type: "meeting",
  },
  {
    date: "25 Mars",
    event: "Sortie éducative - Musée",
    child: "Aya Traoré",
    time: "9:00",
    type: "activity",
  },
];

export default function ParentDashboard() {
  return (
    <DashboardLayout userType="parent" userName="M. Jean Traoré">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Espace Parents</h1>
            <p className="text-gray-600 mt-1">
              Suivez la progression de vos enfants
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacter l'école
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Calendrier
            </Button>
          </div>
        </div>

        {/* Vue d'ensemble des enfants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children.map((child, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    {child.name}
                  </div>
                  <Badge variant="outline">{child.class}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-green-700">
                      {child.average}
                    </p>
                    <p className="text-sm text-green-600">Moyenne générale</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-blue-700">
                      {child.attendance}%
                    </p>
                    <p className="text-sm text-blue-600">Présence</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Notes récentes
                  </h4>
                  <div className="space-y-2">
                    {child.recentGrades.map((grade, gradeIndex) => (
                      <div
                        key={gradeIndex}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{grade.subject}</span>
                        <div className="text-right">
                          <Badge
                            className={`${
                              grade.grade >= 15
                                ? "bg-green-100 text-green-800"
                                : grade.grade >= 12
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {grade.grade}/20
                          </Badge>
                          <p className="text-xs text-gray-500">{grade.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-gray-600">
                    Prochaine réunion
                  </span>
                  <span className="text-sm font-medium">
                    {child.nextParentMeeting}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Notifications récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.priority === "high"
                      ? "bg-red-50 border-red-500"
                      : notification.priority === "medium"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">
                      {notification.child}
                    </span>
                    <Badge
                      variant={
                        notification.priority === "high"
                          ? "destructive"
                          : notification.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      size="sm"
                    >
                      {notification.priority === "high"
                        ? "Urgent"
                        : notification.priority === "medium"
                          ? "Important"
                          : "Info"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Événements à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">
                        {event.event}
                      </h3>
                      <Badge
                        variant={
                          event.type === "meeting"
                            ? "default"
                            : event.type === "exam"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {event.type === "meeting"
                          ? "Réunion"
                          : event.type === "exam"
                            ? "Examen"
                            : "Activité"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{event.child}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium text-blue-600">{event.date}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Statistiques de progression */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Évolution des performances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="font-medium text-gray-900">{child.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mathématiques</span>
                        <span>15.5/20</span>
                      </div>
                      <Progress value={77.5} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Français</span>
                        <span>13.8/20</span>
                      </div>
                      <Progress value={69} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sciences</span>
                        <span>16.2/20</span>
                      </div>
                      <Progress value={81} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Histoire-Géo</span>
                        <span>12.4/20</span>
                      </div>
                      <Progress value={62} />
                    </div>
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
