import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { dataService, Grade, Class, Subject } from "@/services/dataService";
import { authService, User } from "@/services/authService";
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Download,
  FileText,
  Calendar,
  Filter,
} from "lucide-react";

interface ClassStats {
  classId: string;
  className: string;
  averageGrade: number;
  totalStudents: number;
  subjectStats: { [subjectId: string]: number };
}

export default function Resultats() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [classStats, setClassStats] = useState<ClassStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [grades, classes, subjects, students]);

  const loadData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser?.schoolId) {
        const [schoolClasses, allSubjects, schoolStudents, allGrades] =
          await Promise.all([
            dataService.getClassesBySchool(currentUser.schoolId),
            dataService.getAllSubjects(),
            dataService.getUsersByType(currentUser.schoolId, "eleve"),
            Promise.all(
              (await dataService.getUsersByType(currentUser.schoolId, "eleve"))
                .map((student) => dataService.getGradesByStudent(student.id))
                .slice(0, 5), // Limiter pour la démo
            ).then((results) => results.flat()),
          ]);

        setClasses(schoolClasses);
        setSubjects(allSubjects);
        setStudents(schoolStudents);
        setGrades(allGrades);
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

  const calculateStats = () => {
    const stats: ClassStats[] = classes.map((cls) => {
      const classStudents = students.filter((s) => s.classId === cls.id);
      const classGrades = grades.filter((g) => g.classId === cls.id);

      // Calculer la moyenne générale de la classe
      const totalScore = classGrades.reduce((sum, grade) => {
        return sum + (grade.score / grade.maxScore) * 20;
      }, 0);
      const averageGrade =
        classGrades.length > 0 ? totalScore / classGrades.length : 0;

      // Calculer les moyennes par matière
      const subjectStats: { [subjectId: string]: number } = {};
      subjects.forEach((subject) => {
        const subjectGrades = classGrades.filter(
          (g) => g.subjectId === subject.id,
        );
        if (subjectGrades.length > 0) {
          const subjectTotal = subjectGrades.reduce((sum, grade) => {
            return sum + (grade.score / grade.maxScore) * 20;
          }, 0);
          subjectStats[subject.id] = subjectTotal / subjectGrades.length;
        }
      });

      return {
        classId: cls.id,
        className: cls.name,
        averageGrade: Math.round(averageGrade * 10) / 10,
        totalStudents: classStudents.length,
        subjectStats,
      };
    });

    setClassStats(stats);
  };

  const getFilteredGrades = () => {
    let filtered = grades;

    if (selectedClass !== "all") {
      filtered = filtered.filter((g) => g.classId === selectedClass);
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter((g) => g.subjectId === selectedSubject);
    }

    return filtered;
  };

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-blue-600 bg-blue-100";
    if (percentage >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getOverallStats = () => {
    const totalStudents = students.length;
    const totalGrades = grades.length;
    const averageScore =
      grades.length > 0
        ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 20, 0) /
          grades.length
        : 0;

    // Distribution des notes
    const excellentCount = grades.filter(
      (g) => (g.score / g.maxScore) * 20 >= 16,
    ).length;
    const goodCount = grades.filter(
      (g) =>
        (g.score / g.maxScore) * 20 >= 12 && (g.score / g.maxScore) * 20 < 16,
    ).length;
    const averageCount = grades.filter(
      (g) =>
        (g.score / g.maxScore) * 20 >= 8 && (g.score / g.maxScore) * 20 < 12,
    ).length;
    const poorCount = grades.filter(
      (g) => (g.score / g.maxScore) * 20 < 8,
    ).length;

    return {
      totalStudents,
      totalGrades,
      averageScore: Math.round(averageScore * 10) / 10,
      excellentCount,
      goodCount,
      averageCount,
      poorCount,
    };
  };

  const stats = getOverallStats();
  const filteredGrades = getFilteredGrades();

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Résultats et Bulletins
            </h1>
            <p className="text-gray-600 mt-1">
              Analysez les performances et générez les bulletins
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Exporter les résultats
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Générer les bulletins
            </Button>
          </div>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Moyenne générale
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.averageScore}/20
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Notes excellentes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.excellentCount}
                  </p>
                  <p className="text-xs text-gray-500">≥ 16/20</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total évaluations
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalGrades}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Élèves évalués
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="by-class">Par classe</TabsTrigger>
            <TabsTrigger value="by-subject">Par matière</TabsTrigger>
            <TabsTrigger value="recent">Résultats récents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Distribution des notes */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution des notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Excellent (16-20)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">
                        {stats.excellentCount}
                      </span>
                      <div className="w-32">
                        <Progress
                          value={
                            (stats.excellentCount / stats.totalGrades) * 100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>Bien (12-16)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{stats.goodCount}</span>
                      <div className="w-32">
                        <Progress
                          value={(stats.goodCount / stats.totalGrades) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span>Moyen (8-12)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{stats.averageCount}</span>
                      <div className="w-32">
                        <Progress
                          value={(stats.averageCount / stats.totalGrades) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Insuffisant (&lt;8)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{stats.poorCount}</span>
                      <div className="w-32">
                        <Progress
                          value={(stats.poorCount / stats.totalGrades) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-class" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performances par classe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classStats.map((classStat) => (
                    <div
                      key={classStat.classId}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {classStat.className}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {classStat.totalStudents} élèves
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            {classStat.averageGrade}/20
                          </p>
                          <p className="text-sm text-gray-600">Moyenne</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(classStat.subjectStats).map(
                          ([subjectId, average]) => {
                            const subject = subjects.find(
                              (s) => s.id === subjectId,
                            );
                            return (
                              <div
                                key={subjectId}
                                className="text-center p-2 bg-gray-50 rounded"
                              >
                                <p className="text-sm font-medium">
                                  {subject?.name}
                                </p>
                                <p
                                  className={`text-lg font-bold ${
                                    average >= 12
                                      ? "text-green-600"
                                      : average >= 8
                                        ? "text-orange-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {Math.round(average * 10) / 10}/20
                                </p>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-subject" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performances par matière</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => {
                    const subjectGrades = grades.filter(
                      (g) => g.subjectId === subject.id,
                    );
                    const average =
                      subjectGrades.length > 0
                        ? subjectGrades.reduce(
                            (sum, g) => sum + (g.score / g.maxScore) * 20,
                            0,
                          ) / subjectGrades.length
                        : 0;

                    return (
                      <Card key={subject.id}>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h3 className="font-medium text-gray-900 mb-2">
                              {subject.name}
                            </h3>
                            <p
                              className={`text-2xl font-bold mb-2 ${
                                average >= 12
                                  ? "text-green-600"
                                  : average >= 8
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                            >
                              {Math.round(average * 10) / 10}/20
                            </p>
                            <p className="text-sm text-gray-600">
                              {subjectGrades.length} évaluations
                            </p>
                            <Badge
                              className="mt-2"
                              style={{ backgroundColor: subject.color }}
                            >
                              Coeff. {subject.coefficient}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            {/* Filtres */}
            <Card>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Select onValueChange={setSelectedClass}>
                      <SelectTrigger>
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
                  <div className="flex-1">
                    <Select onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les matières" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les matières</SelectItem>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Résultats récents */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Évaluations récentes ({filteredGrades.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredGrades.slice(0, 10).map((grade) => {
                    const student = students.find(
                      (s) => s.id === grade.studentId,
                    );
                    const subject = subjects.find(
                      (s) => s.id === grade.subjectId,
                    );
                    const cls = classes.find((c) => c.id === grade.classId);

                    return (
                      <div
                        key={grade.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {grade.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>
                              {student?.firstName} {student?.lastName}
                            </span>
                            <span>{cls?.name}</span>
                            <span>{subject?.name}</span>
                            <span>
                              {new Date(grade.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={getGradeColor(
                              grade.score,
                              grade.maxScore,
                            )}
                          >
                            {grade.score}/{grade.maxScore}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round((grade.score / grade.maxScore) * 200) /
                              10}
                            /20
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {filteredGrades.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune évaluation trouvée
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
