import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import {
  GraduationCap,
  User,
  School,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Loader2,
} from "lucide-react";

const schoolTypes = [
  "École Primaire",
  "Collège",
  "Lycée",
  "Collège Lycée",
  "Université",
  "École Professionnelle",
  "Institut Supérieur",
];

const countries = [
  "Côte d'Ivoire",
  "Sénégal",
  "Mali",
  "Burkina Faso",
  "Niger",
  "Bénin",
  "Togo",
  "Guinée",
  "Madagascar",
  "Cameroun",
];

export default function RegisterAdmin() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Données utilisateur
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Données école
    schoolName: "",
    schoolType: "",
    schoolAddress: "",
    schoolCity: "",
    schoolCountry: "",
    schoolPhone: "",
    schoolEmail: "",
    directorName: "",
    directorPhone: "",
    directorEmail: "",
    foundedYear: new Date().getFullYear(),
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
      });
      return;
    }

    setLoading(true);

    try {
      const { user } = await authService.registerSchoolAdmin(formData);

      toast({
        title: "Inscription réussie !",
        description: "Votre école a été enregistrée avec succès",
      });

      // Rediriger vers le dashboard approprié
      navigate(authService.getUserDashboardPath(user.type));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="px-6 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white mr-2" />
              <span className="text-white font-bold text-xl">KINSHASA CHRISTIAN SCHOOL</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inscription Administrateur KCS
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Créez un compte administrateur pour Kinshasa Christian School.
            Cette page est réservée au personnel administratif autorisé.
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Shield className="w-4 h-4 mr-2" />
            Accès Réservé - Administration KCS
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <School className="w-6 h-6 mr-2" />
              Création de Compte Administrateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section Administrateur */}
              <div>
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informations Personnelles
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email KCS *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="prenom.nom@kcs.cd"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+243 XX XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirmer le mot de passe *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Note d'information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note :</strong> Ce compte sera créé pour Kinshasa Christian School.
                  Vous aurez accès aux fonctionnalités d'administration complètes de l'établissement.
                </p>
              </div>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <School className="w-4 h-4 mr-2" />
                      Créer le compte administrateur
                    </>
                  )}
                </Button>
                <Link to="/connexion" className="flex-1">
                  <Button variant="outline" className="w-full">
                    J'ai déjà un compte
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Informations complémentaires */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Cette page est réservée au personnel autorisé de Kinshasa Christian School.
          </p>
          <p className="mt-2">
            Pour toute question, contactez l'administration au{" "}
            <a href="tel:+243812345678" className="text-blue-600 hover:underline">
              +243 81 234 5678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
