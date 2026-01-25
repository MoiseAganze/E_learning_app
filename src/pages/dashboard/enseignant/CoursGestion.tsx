import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  BookOpen,
  Plus,
  FileText,
  Video,
  Headphones,
  Link as LinkIcon,
  Upload,
  Eye,
  Edit,
  Trash2,
  Download,
  Play,
  Pause,
  Users,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  classId: string;
  type: "text" | "pdf" | "video" | "audio" | "link";
  content: string;
  fileUrl?: string;
  duration?: number;
  createdAt: string;
  isPublished: boolean;
  views: number;
  downloadCount: number;
}

interface CourseResource {
  id: string;
  courseId: string;
  name: string;
  type: "pdf" | "image" | "video" | "audio" | "link";
  url: string;
  size?: string;
}

export default function CoursGestion() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    subjectId: "",
    classId: "",
    type: "text" as Course["type"],
    content: "",
    fileUrl: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser?.schoolId) {
        const [allSubjects, userClasses] = await Promise.all([
          dataService.getAllSubjects(),
          dataService.getClassesBySchool(currentUser.schoolId),
        ]);

        // Filtrer les classes de l'enseignant connecté
        const teacherClasses = userClasses.filter((cls) =>
          currentUser.classes?.includes(cls.id),
        );

        setSubjects(allSubjects);
        setClasses(teacherClasses);

        // Générer des cours fictifs
        generateSampleCourses(teacherClasses, allSubjects);
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

  const generateSampleCourses = (
    classList: Class[],
    subjectList: Subject[],
  ) => {
    const sampleCourses: Course[] = [
      {
        id: "course_001",
        title: "Introduction aux fractions",
        description:
          "Cours complet sur les fractions : définition, types et opérations de base",
        subjectId: "mathematics",
        classId: classList[0]?.id || "6eme_a",
        type: "video",
        content:
          "Ce cours présente les concepts fondamentaux des fractions avec des exemples pratiques et des exercices.",
        fileUrl: "https://example.com/video1.mp4",
        duration: 1800,
        createdAt: "2024-03-10T09:00:00Z",
        isPublished: true,
        views: 45,
        downloadCount: 12,
      },
      {
        id: "course_002",
        title: "Les équations du premier degré",
        description: "Méthodes de résolution des équations à une inconnue",
        subjectId: "mathematics",
        classId: classList[1]?.id || "5eme_b",
        type: "pdf",
        content:
          "Support de cours avec théorie, exemples et exercices corrigés.",
        fileUrl: "https://example.com/equations.pdf",
        createdAt: "2024-03-08T14:30:00Z",
        isPublished: true,
        views: 32,
        downloadCount: 28,
      },
      {
        id: "course_003",
        title: "Géométrie dans l'espace",
        description: "Solides, volumes et perspectives",
        subjectId: "mathematics",
        classId: classList[2]?.id || "4eme_c",
        type: "text",
        content:
          "La géométrie dans l'espace étudie les figures à trois dimensions. Nous aborderons les prismes, pyramides, cylindres et cônes...",
        createdAt: "2024-03-07T16:00:00Z",
        isPublished: false,
        views: 0,
        downloadCount: 0,
      },
      {
        id: "course_004",
        title: "Podcast mathématiques - Histoire des nombres",
        description: "Découverte de l'évolution des systèmes de numération",
        subjectId: "mathematics",
        classId: classList[0]?.id || "6eme_a",
        type: "audio",
        content: "Podcast éducatif sur l'histoire fascinante des nombres.",
        fileUrl: "https://example.com/podcast-nombres.mp3",
        duration: 1200,
        createdAt: "2024-03-06T11:00:00Z",
        isPublished: true,
        views: 18,
        downloadCount: 5,
      },
    ];

    setCourses(sampleCourses);
  };

  const handleCreateCourse = async () => {
    try {
      const course: Course = {
        id: `course_${Date.now()}`,
        ...newCourse,
        createdAt: new Date().toISOString(),
        isPublished: false,
        views: 0,
        downloadCount: 0,
      };

      setCourses([course, ...courses]);
      setShowNewCourse(false);
      setNewCourse({
        title: "",
        description: "",
        subjectId: "",
        classId: "",
        type: "text",
        content: "",
        fileUrl: "",
      });

      toast({
        title: "Cours créé",
        description: "Votre cours a été créé avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le cours",
      });
    }
  };

  const handlePublishCourse = (courseId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, isPublished: !course.isPublished }
          : course,
      ),
    );

    toast({
      title: "Statut mis à jour",
      description: "Le statut de publication du cours a été mis à jour",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Headphones className="w-4 h-4" />;
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800";
      case "audio":
        return "bg-green-100 text-green-800";
      case "pdf":
        return "bg-blue-100 text-blue-800";
      case "link":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSubjectInfo = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId);
  };

  const getClassInfo = (classId: string) => {
    return classes.find((c) => c.id === classId);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getStats = () => {
    const total = courses.length;
    const published = courses.filter((c) => c.isPublished).length;
    const drafts = courses.filter((c) => !c.isPublished).length;
    const totalViews = courses.reduce((sum, c) => sum + c.views, 0);

    return { total, published, drafts, totalViews };
  };

  const stats = getStats();

  if (loading) {
    return (
      <DashboardLayout userType="enseignant">
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
    <DashboardLayout userType="enseignant">
      <div className="space-y-6">
        {/* En-tête */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
            <p className="text-gray-600 mt-1">
              Créez et gérez vos contenus pédagogiques multimédias
            </p>
          </div>
          <Dialog open={showNewCourse} onOpenChange={setShowNewCourse}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau cours
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un nouveau cours</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du cours</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder="Ex: Introduction aux fractions"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subjectId">Matière</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, subjectId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="classId">Classe</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, classId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Type de contenu</Label>
                  <Select
                    onValueChange={(value: Course["type"]) =>
                      setNewCourse({ ...newCourse, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type de cours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Texte</SelectItem>
                      <SelectItem value="pdf">Document PDF</SelectItem>
                      <SelectItem value="video">Vidéo</SelectItem>
                      <SelectItem value="audio">Audio/Podcast</SelectItem>
                      <SelectItem value="link">Lien externe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    placeholder="Décrivez le contenu de votre cours..."
                    rows={3}
                  />
                </div>

                {newCourse.type === "text" && (
                  <div>
                    <Label htmlFor="content">Contenu du cours</Label>
                    <Textarea
                      id="content"
                      value={newCourse.content}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, content: e.target.value })
                      }
                      placeholder="Rédigez votre cours..."
                      rows={6}
                    />
                  </div>
                )}

                {newCourse.type !== "text" && (
                  <div>
                    <Label htmlFor="fileUrl">
                      {newCourse.type === "link"
                        ? "URL du lien"
                        : "Fichier à télécharger"}
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="fileUrl"
                        value={newCourse.fileUrl}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            fileUrl: e.target.value,
                          })
                        }
                        placeholder={
                          newCourse.type === "link"
                            ? "https://..."
                            : "Sélectionner un fichier"
                        }
                      />
                      {newCourse.type !== "link" && (
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Parcourir
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleCreateCourse} className="flex-1">
                    Créer le cours
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewCourse(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                    Total cours
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Publiés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.published}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Brouillons
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.drafts}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Vues totales
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalViews}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des cours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Mes cours ({courses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getTypeColor(course.type)}>
                          {getTypeIcon(course.type)}
                          <span className="ml-1 capitalize">{course.type}</span>
                        </Badge>
                        <Badge
                          variant={course.isPublished ? "default" : "secondary"}
                        >
                          {course.isPublished ? "Publié" : "Brouillon"}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{getSubjectInfo(course.subjectId)?.name}</span>
                          <span>{getClassInfo(course.classId)?.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{course.views} vues</span>
                          <span>
                            {new Date(course.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {course.duration && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Play className="w-3 h-3 mr-1" />
                            <span>{formatDuration(course.duration)}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant={course.isPublished ? "secondary" : "default"}
                          onClick={() => handlePublishCourse(course.id)}
                        >
                          {course.isPublished ? <Pause /> : <Play />}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {courses.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun cours créé pour le moment</p>
                    <Button
                      className="mt-4"
                      onClick={() => setShowNewCourse(true)}
                    >
                      Créer votre premier cours
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
