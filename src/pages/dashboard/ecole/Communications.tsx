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
import { dataService, Class } from "@/services/dataService";
import { authService, User } from "@/services/authService";
import {
  MessageSquare,
  Send,
  Plus,
  Users,
  FileText,
  Calendar,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Communication {
  id: string;
  type: "circular" | "announcement" | "meeting" | "alert";
  title: string;
  content: string;
  recipients: string[];
  recipientType: "all" | "teachers" | "students" | "parents" | "specific";
  createdAt: string;
  scheduledFor?: string;
  status: "draft" | "sent" | "scheduled";
  priority: "low" | "medium" | "high" | "urgent";
  readBy: string[];
}

export default function Communications() {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewComm, setShowNewComm] = useState(false);
  const { toast } = useToast();

  const [newComm, setNewComm] = useState({
    type: "announcement" as Communication["type"],
    title: "",
    content: "",
    recipientType: "all" as Communication["recipientType"],
    priority: "medium" as Communication["priority"],
    scheduledFor: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser?.schoolId) {
        const [schoolClasses, schoolUsers] = await Promise.all([
          dataService.getClassesBySchool(currentUser.schoolId),
          dataService.getUsersBySchool(currentUser.schoolId),
        ]);

        setClasses(schoolClasses);
        setUsers(schoolUsers);

        // Générer des communications fictives
        generateSampleCommunications();
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

  const generateSampleCommunications = () => {
    const sampleComms: Communication[] = [
      {
        id: "comm_001",
        type: "circular",
        title: "Rentrée scolaire 2024-2025",
        content:
          "Chers parents et élèves, nous avons le plaisir de vous informer que la rentrée scolaire aura lieu le lundi 2 septembre 2024. Veuillez noter les horaires suivants...",
        recipients: ["all"],
        recipientType: "all",
        createdAt: "2024-03-10T10:00:00Z",
        status: "sent",
        priority: "high",
        readBy: ["user1", "user2"],
      },
      {
        id: "comm_002",
        type: "meeting",
        title: "Réunion parents-professeurs 6ème",
        content:
          "Une réunion parents-professeurs pour les classes de 6ème est organisée le vendredi 15 mars à 18h00 en salle de conférence.",
        recipients: ["parents"],
        recipientType: "parents",
        createdAt: "2024-03-08T14:30:00Z",
        scheduledFor: "2024-03-15T18:00:00Z",
        status: "scheduled",
        priority: "medium",
        readBy: [],
      },
      {
        id: "comm_003",
        type: "alert",
        title: "Fermeture exceptionnelle",
        content:
          "En raison des conditions météorologiques défavorables, l'établissement sera fermé demain mardi 12 mars. Les cours reprendront normalement mercredi.",
        recipients: ["all"],
        recipientType: "all",
        createdAt: "2024-03-11T20:00:00Z",
        status: "sent",
        priority: "urgent",
        readBy: ["user1"],
      },
      {
        id: "comm_004",
        type: "announcement",
        title: "Nouvelle bibliothèque numérique",
        content:
          "Nous sommes heureux de vous annoncer l'ouverture de notre nouvelle bibliothèque numérique avec plus de 1000 ouvrages disponibles.",
        recipients: ["students", "teachers"],
        recipientType: "students",
        createdAt: "2024-03-09T16:00:00Z",
        status: "sent",
        priority: "low",
        readBy: [],
      },
    ];

    setCommunications(sampleComms);
  };

  const handleSendCommunication = async () => {
    try {
      const newCommunication: Communication = {
        id: `comm_${Date.now()}`,
        ...newComm,
        recipients: [newComm.recipientType],
        createdAt: new Date().toISOString(),
        status: newComm.scheduledFor ? "scheduled" : "sent",
        readBy: [],
      };

      setCommunications([newCommunication, ...communications]);
      setShowNewComm(false);
      setNewComm({
        type: "announcement",
        title: "",
        content: "",
        recipientType: "all",
        priority: "medium",
        scheduledFor: "",
      });

      toast({
        title: "Communication envoyée",
        description: "Votre message a été envoyé avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer la communication",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "circular":
        return <FileText className="w-4 h-4" />;
      case "announcement":
        return <Bell className="w-4 h-4" />;
      case "meeting":
        return <Calendar className="w-4 h-4" />;
      case "alert":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "circular":
        return "bg-blue-100 text-blue-800";
      case "announcement":
        return "bg-green-100 text-green-800";
      case "meeting":
        return "bg-purple-100 text-purple-800";
      case "alert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStats = () => {
    const total = communications.length;
    const sent = communications.filter((c) => c.status === "sent").length;
    const scheduled = communications.filter(
      (c) => c.status === "scheduled",
    ).length;
    const drafts = communications.filter((c) => c.status === "draft").length;

    return { total, sent, scheduled, drafts };
  };

  const stats = getStats();

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
          className="flex flex-col lg:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
            <p className="text-gray-600 mt-1">
              Envoyez des circulaires, annonces et organiser des réunions
            </p>
          </div>
          <Dialog open={showNewComm} onOpenChange={setShowNewComm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle communication
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nouvelle communication</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      onValueChange={(value: Communication["type"]) =>
                        setNewComm({ ...newComm, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type de communication" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Annonce</SelectItem>
                        <SelectItem value="circular">Circulaire</SelectItem>
                        <SelectItem value="meeting">Réunion</SelectItem>
                        <SelectItem value="alert">Alerte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <Select
                      onValueChange={(value: Communication["priority"]) =>
                        setNewComm({ ...newComm, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="recipients">Destinataires</Label>
                  <Select
                    onValueChange={(value: Communication["recipientType"]) =>
                      setNewComm({ ...newComm, recipientType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir les destinataires" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="teachers">Enseignants</SelectItem>
                      <SelectItem value="students">Élèves</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={newComm.title}
                    onChange={(e) =>
                      setNewComm({ ...newComm, title: e.target.value })
                    }
                    placeholder="Titre de la communication"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Message</Label>
                  <Textarea
                    id="content"
                    value={newComm.content}
                    onChange={(e) =>
                      setNewComm({ ...newComm, content: e.target.value })
                    }
                    placeholder="Contenu du message..."
                    rows={5}
                  />
                </div>

                <div>
                  <Label htmlFor="scheduledFor">
                    Programmer l'envoi (optionnel)
                  </Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={newComm.scheduledFor}
                    onChange={(e) =>
                      setNewComm({ ...newComm, scheduledFor: e.target.value })
                    }
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleSendCommunication} className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    {newComm.scheduledFor ? "Programmer" : "Envoyer"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewComm(false)}
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
                    Total envoyées
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.sent}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
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
                    Programmées
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.scheduled}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Clock className="w-6 h-6 text-blue-600" />
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
                <div className="p-3 rounded-full bg-gray-100">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total communications
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des communications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Communications récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm, index) => (
                  <motion.div
                    key={comm.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(comm.type)}
                            <h3 className="font-medium text-gray-900">
                              {comm.title}
                            </h3>
                          </div>
                          <Badge className={getTypeColor(comm.type)}>
                            {comm.type === "circular"
                              ? "Circulaire"
                              : comm.type === "announcement"
                                ? "Annonce"
                                : comm.type === "meeting"
                                  ? "Réunion"
                                  : "Alerte"}
                          </Badge>
                          <Badge className={getPriorityColor(comm.priority)}>
                            {comm.priority === "urgent"
                              ? "Urgent"
                              : comm.priority === "high"
                                ? "Élevé"
                                : comm.priority === "medium"
                                  ? "Moyen"
                                  : "Faible"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {comm.content}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            {new Date(comm.createdAt).toLocaleDateString()}{" "}
                            {new Date(comm.createdAt).toLocaleTimeString()}
                          </span>
                          <span>
                            Destinataires :{" "}
                            {comm.recipientType === "all"
                              ? "Tous"
                              : comm.recipientType === "teachers"
                                ? "Enseignants"
                                : comm.recipientType === "students"
                                  ? "Élèves"
                                  : "Parents"}
                          </span>
                          {comm.scheduledFor && (
                            <span>
                              Programmé :{" "}
                              {new Date(comm.scheduledFor).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(comm.status)}>
                          {comm.status === "sent"
                            ? "Envoyé"
                            : comm.status === "scheduled"
                              ? "Programmé"
                              : "Brouillon"}
                        </Badge>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{comm.readBy.length} lectures</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {communications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune communication trouvée
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
