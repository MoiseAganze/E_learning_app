import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { dataService, Class, Subject } from "@/services/dataService";
import { authService, User } from "@/services/authService";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  BookOpen,
  Edit,
  Download,
  Filter,
} from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  room: string;
  type: "cours" | "tp" | "td" | "examen";
}

interface Schedule {
  [day: string]: TimeSlot[];
}

export default function EmploisTemps() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [schedule, setSchedule] = useState<Schedule>({});
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const timeSlots = [
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  const days = [
    { key: "monday", label: "Lundi" },
    { key: "tuesday", label: "Mardi" },
    { key: "wednesday", label: "Mercredi" },
    { key: "thursday", label: "Jeudi" },
    { key: "friday", label: "Vendredi" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser?.schoolId) {
        const [schoolClasses, allSubjects, schoolTeachers] = await Promise.all([
          dataService.getClassesBySchool(currentUser.schoolId),
          dataService.getAllSubjects(),
          dataService.getUsersByType(currentUser.schoolId, "enseignant"),
        ]);

        setClasses(schoolClasses);
        setSubjects(allSubjects);
        setTeachers(schoolTeachers);

        // Générer un emploi du temps fictif
        generateSampleSchedule(schoolClasses, allSubjects, schoolTeachers);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSampleSchedule = (
    classList: Class[],
    subjectList: Subject[],
    teacherList: User[],
  ) => {
    const sampleSchedule: Schedule = {};

    days.forEach((day) => {
      sampleSchedule[day.key] = [];

      classList.forEach((classItem) => {
        // Générer 3-4 cours par jour pour chaque classe
        const dailySlots = timeSlots.slice(
          0,
          Math.floor(Math.random() * 2) + 3,
        );

        dailySlots.forEach((timeSlot, index) => {
          const randomSubject =
            subjectList[Math.floor(Math.random() * subjectList.length)];
          const randomTeacher =
            teacherList[Math.floor(Math.random() * teacherList.length)];

          sampleSchedule[day.key].push({
            id: `${day.key}-${classItem.id}-${index}`,
            time: timeSlot,
            classId: classItem.id,
            subjectId: randomSubject.id,
            teacherId: randomTeacher.id,
            room: `Salle ${Math.floor(Math.random() * 300) + 100}`,
            type: Math.random() > 0.8 ? "tp" : "cours",
          });
        });
      });
    });

    setSchedule(sampleSchedule);
  };

  const getFilteredSchedule = () => {
    if (selectedClass === "all") return schedule;

    const filtered: Schedule = {};
    Object.keys(schedule).forEach((day) => {
      filtered[day] = schedule[day].filter(
        (slot) => slot.classId === selectedClass,
      );
    });
    return filtered;
  };

  const getSubjectInfo = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId);
  };

  const getTeacherInfo = (teacherId: string) => {
    return teachers.find((t) => t.id === teacherId);
  };

  const getClassInfo = (classId: string) => {
    return classes.find((c) => c.id === classId);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cours":
        return "bg-blue-100 text-blue-800";
      case "tp":
        return "bg-green-100 text-green-800";
      case "td":
        return "bg-purple-100 text-purple-800";
      case "examen":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStats = () => {
    const totalSlots = Object.values(schedule).reduce(
      (sum, daySlots) => sum + daySlots.length,
      0,
    );
    const totalClasses = classes.length;
    const totalSubjects = subjects.length;
    const totalTeachers = teachers.length;

    return { totalSlots, totalClasses, totalSubjects, totalTeachers };
  };

  const stats = getStats();
  const filteredSchedule = getFilteredSchedule();

  if (loading) {
    return (
      <DashboardLayout userType="ecole">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="ecole">
      <div className="space-y-6">
        {/* En-tête */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Emplois du temps
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Gérez et organisez les plannings de toutes les classes
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-sm h-9">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nouveau cours</span>
              <span className="sm:hidden">Nouveau</span>
            </Button>
            <Button variant="outline" className="text-sm h-9">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Exporter PDF</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total cours/semaine
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalSlots}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Classes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalClasses}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Matières</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalSubjects}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Enseignants
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalTeachers}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select onValueChange={setSelectedClass}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Toutes les classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Emploi du temps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Emploi du temps de la semaine
                {selectedClass !== "all" && (
                  <Badge className="ml-2" variant="outline">
                    {getClassInfo(selectedClass)?.name}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-3 bg-gray-50 text-left font-medium">
                        Horaires
                      </th>
                      {days.map((day) => (
                        <th
                          key={day.key}
                          className="border p-3 bg-gray-50 text-left font-medium min-w-48"
                        >
                          {day.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot) => (
                      <tr key={timeSlot} className="hover:bg-gray-50">
                        <td className="border p-3 font-medium text-gray-700 bg-gray-25">
                          {timeSlot}
                        </td>
                        {days.map((day) => {
                          const daySlots = filteredSchedule[day.key] || [];
                          const slot = daySlots.find(
                            (s) => s.time === timeSlot,
                          );

                          return (
                            <td key={day.key} className="border p-2 align-top">
                              {slot ? (
                                <motion.div
                                  className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-blue-900">
                                      {getSubjectInfo(slot.subjectId)?.name}
                                    </span>
                                    <Badge className={getTypeColor(slot.type)}>
                                      {slot.type.toUpperCase()}
                                    </Badge>
                                  </div>
                                  {selectedClass === "all" && (
                                    <p className="text-sm text-blue-700 mb-1">
                                      {getClassInfo(slot.classId)?.name}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    {getTeacherInfo(slot.teacherId)?.firstName}{" "}
                                    {getTeacherInfo(slot.teacherId)?.lastName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {slot.room}
                                  </p>
                                </motion.div>
                              ) : (
                                <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-300 cursor-pointer transition-colors">
                                  <Plus className="w-4 h-4" />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Légende */}
        <Card>
          <CardHeader>
            <CardTitle>Légende</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-500 rounded"></div>
                <span className="text-sm">Cours magistral</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border-l-4 border-green-500 rounded"></div>
                <span className="text-sm">Travaux pratiques</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-100 border-l-4 border-purple-500 rounded"></div>
                <span className="text-sm">Travaux dirigés</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border-l-4 border-red-500 rounded"></div>
                <span className="text-sm">Examen</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
