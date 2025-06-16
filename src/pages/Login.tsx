import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Monitor,
  BookOpen,
  Heart,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "admin",
      title: "Administrateur",
      description: "Gestion complète de l'établissement",
      icon: Monitor,
      color: "bg-blue-500",
      features: [
        "Gestion des inscriptions",
        "Suivi des statistiques",
        "Configuration système",
      ],
    },
    {
      id: "teacher",
      title: "Enseignant",
      description: "Création et gestion des cours",
      icon: GraduationCap,
      color: "bg-green-500",
      features: [
        "Création de cours",
        "Évaluation des élèves",
        "Ressources pédagogiques",
      ],
    },
    {
      id: "student",
      title: "Élève",
      description: "Accès aux cours et devoirs",
      icon: BookOpen,
      color: "bg-purple-500",
      features: ["Mes cours", "Mes devoirs", "Mes résultats"],
    },
    {
      id: "parent",
      title: "Parent",
      description: "Suivi de la scolarité",
      icon: Heart,
      color: "bg-pink-500",
      features: ["Suivi en temps réel", "Bulletins", "Communication"],
    },
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold text-gray-900">
                EduAfrique
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre profil
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sélectionnez le type de compte qui correspond à votre rôle dans
              l'établissement
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 hover:scale-105"
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-xl ${role.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    Continuer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore de compte ?
            </p>
            <Button variant="outline" size="lg">
              Demander l'inscription à votre établissement
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentRole = roles.find((role) => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => setSelectedRole(null)}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Changer de profil
        </button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">
                EduAfrique
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${currentRole?.color} flex items-center justify-center`}
              >
                {currentRole?.icon && (
                  <currentRole.icon className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="text-left">
                <CardTitle className="text-lg">{currentRole?.title}</CardTitle>
                <CardDescription className="text-sm">
                  {currentRole?.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {selectedRole === "admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="school">Code établissement</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="school"
                        placeholder="CODE_ECOLE"
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-600">Se souvenir de moi</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>

                <Button className="w-full" size="lg">
                  Se connecter
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newEmail">Adresse e-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="newEmail"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {selectedRole !== "admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="schoolCode">
                      Code d'invitation de l'établissement
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="schoolCode"
                        placeholder="CODE_INVITATION"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Demandez ce code à votre établissement
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="rounded mt-0.5" />
                  <span className="text-gray-600">
                    J'accepte les{" "}
                    <a href="#" className="text-primary hover:underline">
                      conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a href="#" className="text-primary hover:underline">
                      politique de confidentialité
                    </a>
                  </span>
                </div>

                <Button className="w-full" size="lg">
                  Créer un compte
                </Button>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Besoin d'aide ?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contactez le support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info for Role */}
        <Card className="mt-6 bg-gradient-to-r from-primary/5 to-accent/5 border-none">
          <CardContent className="p-4">
            <div className="text-center">
              <Badge className="mb-2 bg-primary/10 text-primary">
                Accès {currentRole?.title}
              </Badge>
              <p className="text-sm text-gray-600">
                Une fois connecté, vous aurez accès à toutes les fonctionnalités
                dédiées à votre profil.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
