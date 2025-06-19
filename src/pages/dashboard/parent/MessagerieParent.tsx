import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  MessageCircle,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Video,
  Paperclip,
  Send,
  Users,
  Mail,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const conversationsData = [
  {
    id: 1,
    destinataire: "Prof. Marie Kouassi",
    role: "Enseignant Mathématiques",
    enfant: "Sarah Diallo",
    dernierMessage: "Votre fille fait d'excellents progrès en algèbre.",
    dateMessage: "2024-01-20T14:30:00",
    nonLu: false,
    statut: "actif",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    destinataire: "Direction École Lumière",
    role: "Administration",
    enfant: "Sarah Diallo",
    dernierMessage: "Réunion parents-professeurs le 25 janvier à 15h.",
    dateMessage: "2024-01-19T16:45:00",
    nonLu: true,
    statut: "important",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    destinataire: "Prof. Jean Koffi",
    role: "Enseignant Physique",
    enfant: "Kevin Diallo",
    dernierMessage: "Kevin a besoin de rattraper le cours sur les forces.",
    dateMessage: "2024-01-18T10:15:00",
    nonLu: false,
    statut: "suivi",
    avatar: "/api/placeholder/40/40",
  },
];

const messagesData = [
  {
    id: 1,
    expediteur: "Prof. Marie Kouassi",
    message:
      "Bonjour Mme Diallo, j'espère que vous allez bien. Je voulais vous informer que Sarah fait d'excellents progrès en mathématiques ce trimestre.",
    date: "2024-01-20T14:30:00",
    type: "recu",
  },
  {
    id: 2,
    expediteur: "Vous",
    message:
      "Merci beaucoup pour cette nouvelle. Pouvez-vous me dire sur quels points elle s'améliore le plus ?",
    date: "2024-01-20T14:45:00",
    type: "envoye",
  },
  {
    id: 3,
    expediteur: "Prof. Marie Kouassi",
    message:
      "Particulièrement en résolution d'équations et en géométrie. Elle participe beaucoup plus en classe aussi.",
    date: "2024-01-20T15:00:00",
    type: "recu",
  },
];

const enfantsData = [
  { id: 1, nom: "Sarah Diallo", classe: "Terminale C" },
  { id: 2, nom: "Kevin Diallo", classe: "Première D" },
];

export default function MessagerieParent() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return `Aujourd'hui ${date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 2) {
      return `Hier ${date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "important":
        return "bg-red-100 text-red-800";
      case "suivi":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <DashboardLayout userType="parent">
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
                Messagerie
              </h1>
              <p className="text-gray-600 mt-2">
                Communiquez avec l'équipe pédagogique et l'administration
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Demander RDV
              </Button>
              <Dialog
                open={isNewMessageOpen}
                onOpenChange={setIsNewMessageOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Nouveau message</DialogTitle>
                    <DialogDescription>
                      Envoyer un message à un enseignant ou à l'administration
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="enfant">Concernant l'enfant</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un enfant" />
                          </SelectTrigger>
                          <SelectContent>
                            {enfantsData.map((enfant) => (
                              <SelectItem
                                key={enfant.id}
                                value={enfant.id.toString()}
                              >
                                {enfant.nom} - {enfant.classe}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="destinataire">Destinataire</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un destinataire" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direction">Direction</SelectItem>
                            <SelectItem value="prof-math">
                              Prof. Mathématiques
                            </SelectItem>
                            <SelectItem value="prof-physique">
                              Prof. Physique
                            </SelectItem>
                            <SelectItem value="prof-francais">
                              Prof. Français
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="sujet">Sujet</Label>
                      <Input id="sujet" placeholder="Objet du message" />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Votre message..."
                        rows={5}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsNewMessageOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button onClick={() => setIsNewMessageOpen(false)}>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Messages non lus
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {conversationsData.filter((c) => c.nonLu).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Conversations actives
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {conversationsData.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Enseignants contactés
                  </p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Temps de réponse moyen
                  </p>
                  <p className="text-2xl font-bold text-gray-900">2h</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interface de messagerie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Liste des conversations */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <ScrollArea className="h-[480px]">
                <div className="space-y-2 p-4">
                  {conversationsData.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedConversation === conversation.id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {conversation.destinataire
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {conversation.destinataire}
                            </p>
                            {conversation.nonLu && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1">
                            {conversation.role} • {conversation.enfant}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.dernierMessage}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-400">
                              {formatTime(conversation.dateMessage)}
                            </p>
                            <Badge
                              className={`text-xs ${getStatutColor(conversation.statut)}`}
                            >
                              {conversation.statut}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Zone de conversation */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {conversationsData
                          .find((c) => c.id === selectedConversation)
                          ?.destinataire.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {
                          conversationsData.find(
                            (c) => c.id === selectedConversation,
                          )?.destinataire
                        }
                      </h3>
                      <p className="text-xs text-gray-500">
                        {
                          conversationsData.find(
                            (c) => c.id === selectedConversation,
                          )?.role
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="h-[380px] p-4">
                <div className="space-y-4">
                  {messagesData.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.type === "envoye"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "envoye"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.type === "envoye"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.date)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Tapez votre message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        // Logique d'envoi du message
                        setNewMessage("");
                      }
                    }}
                  />
                  <Button>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
