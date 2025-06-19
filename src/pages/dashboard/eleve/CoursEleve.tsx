import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlayCircle,
  BookOpen,
  FileText,
  Clock,
  Star,
  Download,
  Eye,
  CheckCircle,
  Users,
  Calendar,
} from "lucide-react";

const coursData = [
  {
    id: 1,
    title: "Mathématiques - Algèbre",
    teacher: "Prof. Marie Kouassi",
    duration: "2h 30min",
    progress: 75,
    rating: 4.8,
    students: 28,
    nextLesson: "Fonctions polynômes",
    lessons: 12,
    completedLessons: 9,
    image: "/api/placeholder/300/200",
    category: "Mathématiques",
    level: "Terminale C",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Physique - Mécanique",
    teacher: "Prof. Jean Koffi",
    duration: "1h 45min",
    progress: 60,
    rating: 4.6,
    students: 32,
    nextLesson: "Lois de Newton",
    lessons: 10,
    completedLessons: 6,
    image: "/api/placeholder/300/200",
    category: "Physique",
    level: "Terminale C",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Français - Littérature",
    teacher: "Prof. Aïssata Diallo",
    duration: "2h 00min",
    progress: 40,
    rating: 4.9,
    students: 25,
    nextLesson: "Roman africain contemporain",
    lessons: 15,
    completedLessons: 6,
    image: "/api/placeholder/300/200",
    category: "Français",
    level: "Terminale A",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Histoire-Géographie",
    teacher: "Prof. Mamadou Traoré",
    duration: "1h 30min",
    progress: 85,
    rating: 4.7,
    students: 30,
    nextLesson: "Décolonisation africaine",
    lessons: 8,
    completedLessons: 7,
    image: "/api/placeholder/300/200",
    category: "Histoire-Géo",
    level: "Terminale A",
    color: "bg-orange-500",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "lesson",
    title: "Dérivées et primitives",
    subject: "Mathématiques",
    time: "Il y a 2 heures",
    status: "completed",
  },
  {
    id: 2,
    type: "assignment",
    title: "Devoir de Physique n°3",
    subject: "Physique",
    time: "Il y a 1 jour",
    status: "pending",
  },
  {
    id: 3,
    type: "quiz",
    title: "Quiz - Littérature africaine",
    subject: "Français",
    time: "Il y a 2 jours",
    status: "completed",
  },
];

export default function CoursEleve() {
  return (
    <DashboardLayout userType="eleve">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Mes Cours
              </h1>
              <p className="text-gray-600 mt-2">
                Continuez votre apprentissage avec vos cours en cours
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Planning
              </Button>
              <Button>
                <BookOpen className="w-4 h-4 mr-2" />
                Nouveau cours
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Cours en cours
                  </p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Progression moyenne
                  </p>
                  <p className="text-2xl font-bold text-gray-900">65%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Temps d'étude
                  </p>
                  <p className="text-2xl font-bold text-gray-900">8h 45min</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cours principaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Vos cours actifs
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {coursData.map((cours, index) => (
              <motion.div
                key={cours.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div
                      className={`h-32 ${cours.color} bg-gradient-to-br from-current to-transparent`}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white hover:bg-white/30">
                        {cours.level}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 text-white">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">
                          {cours.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {cours.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {cours.teacher.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">
                            {cours.teacher}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium">{cours.progress}%</span>
                        </div>
                        <Progress value={cours.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>
                            {cours.completedLessons}/{cours.lessons} leçons
                          </span>
                          <span>{cours.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {cours.students}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {cours.duration}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continuer
                        </Button>
                        <Button variant="outline" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>

                      {cours.nextLesson && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">
                            Prochaine leçon
                          </p>
                          <p className="font-medium text-gray-900">
                            {cours.nextLesson}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activités récentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.type === "lesson"
                            ? "bg-blue-100"
                            : activity.type === "assignment"
                              ? "bg-orange-100"
                              : "bg-green-100"
                        }`}
                      >
                        {activity.type === "lesson" ? (
                          <PlayCircle
                            className={`w-5 h-5 ${
                              activity.type === "lesson"
                                ? "text-blue-600"
                                : activity.type === "assignment"
                                  ? "text-orange-600"
                                  : "text-green-600"
                            }`}
                          />
                        ) : activity.type === "assignment" ? (
                          <FileText
                            className={`w-5 h-5 ${
                              activity.type === "lesson"
                                ? "text-blue-600"
                                : activity.type === "assignment"
                                  ? "text-orange-600"
                                  : "text-green-600"
                            }`}
                          />
                        ) : (
                          <CheckCircle
                            className={`w-5 h-5 ${
                              activity.type === "lesson"
                                ? "text-blue-600"
                                : activity.type === "assignment"
                                  ? "text-orange-600"
                                  : "text-green-600"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.subject} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {activity.status === "completed" ? "Terminé" : "En cours"}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
