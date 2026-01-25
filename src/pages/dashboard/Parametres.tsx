import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Phone,
  Mail,
  MapPin,
  Settings,
  Lock,
  Smartphone,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ParametresProps {
  userType: "ecole" | "enseignant" | "eleve" | "parent";
}

export default function Parametres({ userType }: ParametresProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });
  const [theme, setTheme] = useState("system");
  const [langue, setLangue] = useState("fr");

  if (!user) return null;

  return (
    <DashboardLayout userType={userType}>
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
                Paramètres
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos préférences et paramètres de compte
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Contenu principal avec onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="profil" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profil">Profil</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="apparence">Apparence</TabsTrigger>
              <TabsTrigger value="securite">Sécurité</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>

            {/* Onglet Profil */}
            <TabsContent value="profil" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Photo de profil */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button>
                        <Camera className="w-4 h-4 mr-2" />
                        Changer la photo
                      </Button>
                      <p className="text-sm text-gray-500">
                        JPG, GIF ou PNG. Max 1MB.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Informations de base */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input id="prenom" defaultValue={user.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" defaultValue={user.lastName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        defaultValue={user.phone || "+243 99 23 35 768"}
                      />
                    </div>
                  </div>

                  {userType === "eleve" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="classe">Classe</Label>
                        <Select defaultValue="terminale-c">
                          <SelectTrigger>
                            <SelectValue />
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
                      <div className="space-y-2">
                        <Label htmlFor="numero-etudiant">
                          Numéro d'étudiant
                        </Label>
                        <Input
                          id="numero-etudiant"
                          defaultValue="ETU202401234"
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  {userType === "enseignant" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="matiere">Matière principale</Label>
                        <Select defaultValue="mathematiques">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematiques">
                              Mathématiques
                            </SelectItem>
                            <SelectItem value="physique">Physique</SelectItem>
                            <SelectItem value="francais">Français</SelectItem>
                            <SelectItem value="histoire">Histoire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="anciennete">Ancienneté</Label>
                        <Input id="anciennete" defaultValue="5 ans" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Préférences de notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Notifications par email
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recevez des notifications par email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, email: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Notifications push</Label>
                        <p className="text-sm text-gray-500">
                          Recevez des notifications sur votre navigateur
                        </p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, push: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS</Label>
                        <p className="text-sm text-gray-500">
                          Recevez des SMS pour les urgences
                        </p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, sms: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing</Label>
                        <p className="text-sm text-gray-500">
                          Recevez des nouvelles et offres spéciales
                        </p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            marketing: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Apparence */}
            <TabsContent value="apparence" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Thème et apparence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base">Thème</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "light", icon: Sun, label: "Clair" },
                        { value: "dark", icon: Moon, label: "Sombre" },
                        { value: "system", icon: Monitor, label: "Système" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            theme === option.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setTheme(option.value)}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <option.icon className="w-8 h-8" />
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base">Langue</Label>
                    <Select value={langue} onValueChange={setLangue}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="ar">🇩🇿 العربية</SelectItem>
                        <SelectItem value="sw">🇹🇿 Kiswahili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Sécurité */}
            <TabsContent value="securite" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Sécurité du compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Mot de passe</p>
                        <p className="text-sm text-gray-500">
                          Dernière modification: il y a 30 jours
                        </p>
                      </div>
                      <Button variant="outline">
                        <Lock className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">
                          Authentification à deux facteurs
                        </p>
                        <p className="text-sm text-gray-500">
                          Ajoutez une couche de sécurité supplémentaire
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Sessions actives</p>
                        <p className="text-sm text-gray-500">
                          Gérez vos sessions sur tous les appareils
                        </p>
                      </div>
                      <Button variant="outline">Gérer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Préférences */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Préférences générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Mode hors ligne</Label>
                        <p className="text-sm text-gray-500">
                          Synchroniser le contenu pour un accès hors ligne
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Données cellulaires</Label>
                        <p className="text-sm text-gray-500">
                          Utiliser les données mobiles pour la synchronisation
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Analytics</Label>
                        <p className="text-sm text-gray-500">
                          Aider à améliorer l'application
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base">Fuseau horaire</Label>
                    <Select defaultValue="africa-kinshasa">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa-kinshasa">
                          (GMT+1) Kinshasa
                        </SelectItem>
                        <SelectItem value="africa-abidjan">
                          (GMT+0) Abidjan
                        </SelectItem>
                        <SelectItem value="africa-dakar">
                          (GMT+0) Dakar
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
