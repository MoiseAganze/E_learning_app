import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  BookOpen,
  Users,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Bell,
  Video,
} from "lucide-react";

const emploiDuTemps = {
  Lundi: [
    {
      heure: "08:00-09:30",
      matiere: "Mathématiques",
      professeur: "Prof. Marie Kouassi",
      salle: "Salle 201",
      type: "cours",
      couleur: "bg-blue-500",
    },
    {
      heure: "09:45-11:15",
      matiere: "Physique",
      professeur: "Prof. Jean Koffi",
      salle: "Labo Physique",
      type: "tp",
      couleur: "bg-green-500",
    },
    {
      heure: "11:30-12:30",
      matiere: "Français",
      professeur: "Prof. Aïssata Diallo",
      salle: "Salle 105",
      type: "cours",
      couleur: "bg-purple-500",
    },
    {
      heure: "14:00-15:30",
      matiere: "Histoire-Géo",
      professeur: "Prof. Mamadou Traoré",
      salle: "Salle 301",
      type: "cours",
      couleur: "bg-orange-500",
    },
  ],
  Mardi: [
    {
      heure: "08:00-09:30",
      matiere: "Chimie",
      professeur: "Prof. Fatou Camara",
      salle: "Labo Chimie",
      type: "tp",
      couleur: "bg-red-500",
    },
    {
      heure: "09:45-11:15",
      matiere: "Mathématiques",
      professeur: "Prof. Marie Kouassi",
      salle: "Salle 201",
      type: "td",
      couleur: "bg-blue-500",
    },
    {
      heure: "11:30-12:30",
      matiere: "Anglais",
      professeur: "Prof. John Smith",
      salle: "Salle 108",
      type: "cours",
      couleur: "bg-indigo-500",
    },
    {
      heure: "14:00-15:30",
      matiere: "SVT",
      professeur: "Prof. Aminata Sow",
      salle: "Salle 204",
      type: "cours",
      couleur: "bg-emerald-500",
    },
  ],
  Mercredi: [
    {
      heure: "08:00-09:30",
      matiere: "Philosophie",
      professeur: "Prof. Omar Dieng",
      salle: "Salle 107",
      type: "cours",
      couleur: "bg-yellow-500",
    },
    {
      heure: "09:45-11:15",
      matiere: "Sport",
      professeur: "Prof. Ibrahima Fall",
      salle: "Gymnase",
      type: "sport",
      couleur: "bg-teal-500",
    },
  ],
  Jeudi: [
    {
      heure: "08:00-09:30",
      matiere: "Mathématiques",
      professeur: "Prof. Marie Kouassi",
      salle: "Salle 201",
      type: "controle",
      couleur: "bg-blue-500",
    },
    {
      heure: "09:45-11:15",
      matiere: "Physique",
      professeur: "Prof. Jean Koffi",
      salle: "Salle 203",
      type: "cours",
      couleur: "bg-green-500",
    },
    {
      heure: "11:30-12:30",
      matiere: "Histoire-Géo",
      professeur: "Prof. Mamadou Traoré",
      salle: "Salle 301",
      type: "cours",
      couleur: "bg-orange-500",
    },
    {
      heure: "14:00-15:30",
      matiere: "Français",
      professeur: "Prof. Aïssata Diallo",
      salle: "Salle 105",
      type: "dissertation",
      couleur: "bg-purple-500",
    },
  ],
  Vendredi: [
    {
      heure: "08:00-09:30",
      matiere: "Chimie",
      professeur: "Prof. Fatou Camara",
      salle: "Salle 205",
      type: "cours",
      couleur: "bg-red-500",
    },
    {
      heure: "09:45-11:15",
      matiere: "SVT",
      professeur: "Prof. Aminata Sow",
      salle: "Labo SVT",
      type: "tp",
      couleur: "bg-emerald-500",
    },
    {
      heure: "11:30-12:30",
      matiere: "Anglais",
      professeur: "Prof. John Smith",
      salle: "Salle 108",
      type: "cours",
      couleur: "bg-indigo-500",
    },
  ],
};

const prochainsCours = [
  {
    matiere: "Mathématiques",
    professeur: "Prof. Marie Kouassi",
    heure: "08:00",
    salle: "Salle 201",
    type: "controle",
    duree: "1h30",
    couleur: "bg-blue-500",
  },
  {
    matiere: "Physique",
    professeur: "Prof. Jean Koffi",
    heure: "09:45",
    salle: "Salle 203",
    type: "cours",
    duree: "1h30",
    couleur: "bg-green-500",
  },
];

export default function EmploiTempsEleve() {
  const [semaineSelectionnee, setSemaineSelectionnee] = useState("actuelle");
  const [jourSelectionne, setJourSelectionne] = useState("Lundi");

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "cours":
        return "Cours";
      case "tp":
        return "TP";
      case "td":
        return "TD";
      case "controle":
        return "Contrôle";
      case "sport":
        return "Sport";
      case "dissertation":
        return "Dissertation";
      default:
        return "Cours";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "controle":
        return "bg-red-100 text-red-800";
      case "tp":
        return "bg-green-100 text-green-800";
      case "td":
        return "bg-blue-100 text-blue-800";
      case "sport":
        return "bg-teal-100 text-teal-800";
      case "dissertation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                Emploi du temps
              </h1>
              <p className="text-gray-600 mt-2">
                Consultez votre planning de cours et prochaines activités
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select
                value={semaineSelectionnee}
                onValueChange={setSemaineSelectionnee}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="precedente">Semaine précédente</SelectItem>
                  <SelectItem value="actuelle">Semaine actuelle</SelectItem>
                  <SelectItem value="suivante">Semaine suivante</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Rappels
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Prochains cours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Prochains cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prochainsCours.map((cours, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-4 h-16 ${cours.couleur} rounded-lg`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {cours.matiere}
                        </h3>
                        <Badge className={getTypeColor(cours.type)}>
                          {getTypeLabel(cours.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {cours.professeur}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {cours.heure} ({cours.duree})
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {cours.salle}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation des jours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Planning de la semaine
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium px-4">
                    Semaine du 15-19 Janvier 2024
                  </span>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Navigation par onglets des jours */}
              <div className="mb-6">
                <div className="flex border-b border-gray-200">
                  {jours.map((jour) => (
                    <button
                      key={jour}
                      onClick={() => setJourSelectionne(jour)}
                      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                        jourSelectionne === jour
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {jour}
                    </button>
                  ))}
                </div>
              </div>

              {/* Affichage des cours du jour sélectionné */}
              <div className="space-y-4">
                {emploiDuTemps[
                  jourSelectionne as keyof typeof emploiDuTemps
                ]?.map((cours, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-1 h-16 ${cours.couleur} rounded-full`}
                    ></div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <h3 className="font-semibold text-gray-900">
                            {cours.matiere}
                          </h3>
                        </div>
                        <Badge className={getTypeColor(cours.type)}>
                          {getTypeLabel(cours.type)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {cours.professeur.split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {cours.professeur}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {cours.heure}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {cours.salle}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Rejoindre
                        </Button>
                        {cours.type === "controle" && (
                          <Button variant="outline" size="sm">
                            <Bell className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    Aucun cours prévu pour ce jour
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vue grille complète (optionnelle) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vue d'ensemble</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-4 min-w-[800px]">
                  <div className="font-semibold text-gray-900 p-2">
                    Horaires
                  </div>
                  {jours.map((jour) => (
                    <div
                      key={jour}
                      className="font-semibold text-gray-900 p-2 text-center"
                    >
                      {jour}
                    </div>
                  ))}

                  {/* Créneaux horaires */}
                  {[
                    "08:00-09:30",
                    "09:45-11:15",
                    "11:30-12:30",
                    "14:00-15:30",
                  ].map((creneau) => (
                    <>
                      <div
                        key={creneau}
                        className="p-2 text-sm text-gray-600 border-r"
                      >
                        {creneau}
                      </div>
                      {jours.map((jour) => {
                        const cours = emploiDuTemps[
                          jour as keyof typeof emploiDuTemps
                        ]?.find((c) => c.heure === creneau);
                        return (
                          <div key={`${jour}-${creneau}`} className="p-1">
                            {cours ? (
                              <div
                                className={`${cours.couleur} text-white p-2 rounded text-xs`}
                              >
                                <div className="font-medium">
                                  {cours.matiere}
                                </div>
                                <div className="opacity-90">{cours.salle}</div>
                              </div>
                            ) : (
                              <div className="h-12"></div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
