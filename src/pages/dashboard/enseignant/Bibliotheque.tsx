import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  BookOpen,
  Search,
  Download,
  Heart,
  Share2,
  Eye,
  Filter,
  Star,
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  Upload,
  Plus,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "exercice" | "fiche" | "video" | "audio" | "image";
  subject: string;
  level: string;
  author: string;
  downloadCount: number;
  rating: number;
  isFavorite: boolean;
  tags: string[];
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export default function Bibliotheque() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedSubject, selectedLevel, selectedType]);

  const loadResources = async () => {
    // Simuler le chargement des ressources
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sampleResources: Resource[] = [
      {
        id: "res_001",
        title: "Exercices sur les fractions - Niveau 6ème",
        description:
          "Collection de 25 exercices progressifs sur les fractions avec corrections détaillées",
        type: "exercice",
        subject: "Mathématiques",
        level: "6ème",
        author: "Prof. Martin Kouadio",
        downloadCount: 142,
        rating: 4.8,
        isFavorite: false,
        tags: ["fractions", "opérations", "correction"],
        fileUrl: "/resources/exercices-fractions-6eme.pdf",
        createdAt: "2024-02-15T10:00:00Z",
      },
      {
        id: "res_002",
        title: "Fiche méthode - Résolution d'équations",
        description:
          "Méthode step-by-step pour résoudre les équations du premier degré",
        type: "fiche",
        subject: "Mathématiques",
        level: "5ème",
        author: "Mme Sarah Diallo",
        downloadCount: 89,
        rating: 4.5,
        isFavorite: true,
        tags: ["équations", "méthode", "algèbre"],
        fileUrl: "/resources/fiche-equations.pdf",
        createdAt: "2024-02-10T14:30:00Z",
      },
      {
        id: "res_003",
        title: "Vidéo explicative - Théorème de Pythagore",
        description:
          "Explication animée du théorème de Pythagore avec exemples concrets",
        type: "video",
        subject: "Mathématiques",
        level: "4ème",
        author: "Dr. Amadou Koné",
        downloadCount: 256,
        rating: 4.9,
        isFavorite: false,
        tags: ["géométrie", "pythagore", "démonstration"],
        fileUrl: "/resources/pythagore-video.mp4",
        thumbnailUrl: "/resources/pythagore-thumb.jpg",
        createdAt: "2024-02-08T16:00:00Z",
      },
      {
        id: "res_004",
        title: "Podcast - Histoire des nombres",
        description:
          "Découverte ludique de l'évolution des systèmes de numération",
        type: "audio",
        subject: "Mathématiques",
        level: "6ème",
        author: "Prof. Aïcha Traoré",
        downloadCount: 67,
        rating: 4.2,
        isFavorite: true,
        tags: ["histoire", "numération", "culture"],
        fileUrl: "/resources/histoire-nombres.mp3",
        createdAt: "2024-02-05T11:00:00Z",
      },
      {
        id: "res_005",
        title: "Schémas - Figures géométriques",
        description:
          "Collection d'images vectorielles des principales figures géométriques",
        type: "image",
        subject: "Mathématiques",
        level: "5ème",
        author: "M. Bakary Camara",
        downloadCount: 178,
        rating: 4.6,
        isFavorite: false,
        tags: ["géométrie", "figures", "schémas"],
        fileUrl: "/resources/figures-geometriques.zip",
        thumbnailUrl: "/resources/figures-thumb.jpg",
        createdAt: "2024-01-28T09:15:00Z",
      },
      {
        id: "res_006",
        title: "Fiche révision - Grammaire française",
        description:
          "Synthèse complète des règles de grammaire française pour le collège",
        type: "fiche",
        subject: "Français",
        level: "4ème",
        author: "Mme Fatou Sow",
        downloadCount: 203,
        rating: 4.7,
        isFavorite: false,
        tags: ["grammaire", "règles", "révision"],
        fileUrl: "/resources/grammaire-francaise.pdf",
        createdAt: "2024-01-25T13:45:00Z",
      },
    ];

    setResources(sampleResources);
    setLoading(false);
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          resource.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter(
        (resource) => resource.subject === selectedSubject,
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(
        (resource) => resource.level === selectedLevel,
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((resource) => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  };

  const handleToggleFavorite = (resourceId: string) => {
    setResources(
      resources.map((resource) =>
        resource.id === resourceId
          ? { ...resource, isFavorite: !resource.isFavorite }
          : resource,
      ),
    );

    toast({
      title: "Favoris mis à jour",
      description: "La ressource a été ajoutée/retirée de vos favoris",
    });
  };

  const handleDownload = (resource: Resource) => {
    setResources(
      resources.map((r) =>
        r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r,
      ),
    );

    toast({
      title: "Téléchargement démarré",
      description: `${resource.title} - ${resource.type}`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Headphones className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "fiche":
        return <FileText className="w-4 h-4" />;
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
      case "image":
        return "bg-purple-100 text-purple-800";
      case "fiche":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const subjects = ["Mathématiques", "Français", "Sciences", "Histoire"];
  const levels = ["6ème", "5ème", "4ème", "3ème"];
  const types = ["exercice", "fiche", "video", "audio", "image"];

  if (loading) {
    return (
      <DashboardLayout userType="enseignant">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">
              Chargement de la bibliothèque...
            </p>
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
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Bibliothèque Pédagogique
            </h1>
            <p className="text-gray-600 mt-1">
              Ressources collaboratives partagées par la communauté enseignante
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Partager une ressource
            </Button>
          </motion.div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher des ressources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes matières" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes matières</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous niveaux</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Onglets */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Toutes ({filteredResources.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Mes favoris ({resources.filter((r) => r.isFavorite).length})
            </TabsTrigger>
            <TabsTrigger value="recent">Récentes</TabsTrigger>
            <TabsTrigger value="popular">Populaires</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className={getTypeColor(resource.type)}>
                          {getTypeIcon(resource.type)}
                          <span className="ml-1 capitalize">
                            {resource.type}
                          </span>
                        </Badge>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleToggleFavorite(resource.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              resource.isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </motion.button>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {resource.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{resource.subject}</span>
                          <span>{resource.level}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Par {resource.author}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            <span>{resource.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Download className="w-3 h-3 mr-1" />
                          <span>{resource.downloadCount} téléchargements</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Télécharger
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Aperçu
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((r) => r.isFavorite)
                .map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Same card structure */}
                    <Card className="h-full border-red-200 bg-red-50">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {resource.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <p className="text-center text-gray-500 py-8">
              Ressources récemment ajoutées
            </p>
          </TabsContent>

          <TabsContent value="popular">
            <p className="text-center text-gray-500 py-8">
              Ressources les plus téléchargées
            </p>
          </TabsContent>
        </Tabs>

        {filteredResources.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune ressource trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
