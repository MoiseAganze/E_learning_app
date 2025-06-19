import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  FileText,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react";

const devoirsData = [
  {
    id: 1,
    title: "Devoir de Mathématiques n°3",
    classe: "Terminale C",
    matiere: "Mathématiques",
    dateCreation: "2024-01-15",
    dateEcheance: "2024-01-25",
    statut: "actif",
    rendus: 18,
    total: 25,
    type: "dissertation",
    duree: "2h",
    note: "/20",
    description: "Étude des fonctions polynômes et dérivées",
  },
  {
    id: 2,
    title: "Exercices d'Algèbre",
    classe: "Première C",
    matiere: "Mathématiques",
    dateCreation: "2024-01-12",
    dateEcheance: "2024-01-22",
    statut: "corrige",
    rendus: 22,
    total: 22,
    type: "exercices",
    duree: "1h30",
    note: "/15",
    description: "Équations du second degré",
  },
  {
    id: 3,
    title: "Contrôle de Géométrie",
    classe: "Seconde C",
    matiere: "Mathématiques",
    dateCreation: "2024-01-18",
    dateEcheance: "2024-01-28",
    statut: "brouillon",
    rendus: 0,
    total: 30,
    type: "controle",
    duree: "1h",
    note: "/10",
    description: "Triangles et théorèmes",
  },
];

const classesData = [
  { id: 1, nom: "Terminale C", eleves: 25 },
  { id: 2, nom: "Première C", eleves: 22 },
  { id: 3, nom: "Seconde C", eleves: 30 },
];

export default function DevoirsEnseignant() {
  const [activeTab, setActiveTab] = useState("liste");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getDevoirsByStatus = (status: string) => {
    return devoirsData.filter((devoir) => devoir.statut === status);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "actif":
        return "bg-blue-100 text-blue-800";
      case "corrige":
        return "bg-green-100 text-green-800";
      case "brouillon":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressPercentage = (rendus: number, total: number) => {
    return Math.round((rendus / total) * 100);
  };

  return (
    <DashboardLayout userType="enseignant">
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
                Devoirs & Examens
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos devoirs, suivez les rendus et notez vos élèves
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Calendrier
              </Button>
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau devoir
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau devoir</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations pour créer un nouveau devoir
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="titre">Titre du devoir</Label>
                        <Input
                          id="titre"
                          placeholder="Ex: Devoir de Mathématiques n°4"
                        />
                      </div>
                      <div>
                        <Label htmlFor="classe">Classe</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="terminale-c">
                              Terminale C
                            </SelectItem>
                            <SelectItem value="premiere-c">
                              Première C
                            </SelectItem>
                            <SelectItem value="seconde-c">Seconde C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de devoir" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dissertation">
                              Dissertation
                            </SelectItem>
                            <SelectItem value="exercices">Exercices</SelectItem>
                            <SelectItem value="controle">Contrôle</SelectItem>
                            <SelectItem value="examen">Examen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="duree">Durée</Label>
                        <Input id="duree" placeholder="Ex: 2h" />
                      </div>
                      <div>
                        <Label htmlFor="note">Note sur</Label>
                        <Input id="note" placeholder="Ex: 20" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="echeance">Date d'échéance</Label>
                      <Input id="echeance" type="date" />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Décrivez le contenu du devoir..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button onClick={() => setIsCreateOpen(false)}>
                      Créer le devoir
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Devoirs actifs
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {getDevoirsByStatus("actif").length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    À corriger
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    12
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Corrigés
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {getDevoirsByStatus("corrige").length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Brouillons
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {getDevoirsByStatus("brouillon").length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contenu principal avec onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="liste" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="liste">Liste des devoirs</TabsTrigger>
                <TabsTrigger value="corrections">Corrections</TabsTrigger>
                <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un devoir..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="liste" className="space-y-4">
              {devoirsData.map((devoir, index) => (
                <motion.div
                  key={devoir.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="space-y-2 min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                              {devoir.title}
                            </h3>
                            <Badge
                              className={`${getStatusColor(devoir.statut)} shrink-0 self-start sm:self-center`}
                            >
                              {devoir.statut}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{devoir.classe}</span>
                            <span>•</span>
                            <span>{devoir.type}</span>
                            <span>•</span>
                            <span>Durée: {devoir.duree}</span>
                            <span>•</span>
                            <span>Note: {devoir.note}</span>
                          </div>

                          <p className="text-gray-600">{devoir.description}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>
                                {devoir.rendus}/{devoir.total} rendus (
                                {getProgressPercentage(
                                  devoir.rendus,
                                  devoir.total,
                                )}
                                %)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>Échéance: {devoir.dateEcheance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Voir</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Modifier</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm"
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Export</span>
                          </Button>
                          {devoir.statut === "brouillon" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 p-2"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {devoir.statut === "actif" && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Progression des rendus
                            </span>
                            <span className="text-sm text-gray-600">
                              {getProgressPercentage(
                                devoir.rendus,
                                devoir.total,
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${getProgressPercentage(
                                  devoir.rendus,
                                  devoir.total,
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="corrections">
              <Card>
                <CardHeader>
                  <CardTitle>Devoirs à corriger</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Aucun devoir en attente de correction
                    </p>
                    <Button variant="outline">Voir tous les devoirs</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistiques">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques des devoirs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-gray-600 mb-4">
                      Graphiques et analyses bientôt disponibles
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
