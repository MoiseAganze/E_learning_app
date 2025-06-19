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
            <div className="px-4 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">Klaso</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inscrivez votre école
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Créez un compte administrateur et enregistrez votre établissement
            scolaire pour commencer à utiliser Klaso
          </p>
          <Badge className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Shield className="w-4 h-4 mr-2" />
            Compte Administrateur
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <School className="w-6 h-6 mr-2" />
              Inscription École + Administrateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section Administrateur */}
              <div>
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informations Administrateur
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
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
                      placeholder="+225 XX XX XX XX XX"
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

              <Separator />

              {/* Section École */}
              <div>
                <div className="flex items-center mb-4">
                  <School className="w-5 h-5 mr-2 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informations de l'École
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="schoolName">Nom de l'école *</Label>
                    <Input
                      id="schoolName"
                      type="text"
                      value={formData.schoolName}
                      onChange={(e) =>
                        handleInputChange("schoolName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolType">Type d'établissement *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("schoolType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir le type" />
                      </SelectTrigger>
                      <SelectContent>
                        {schoolTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="foundedYear">Année de création</Label>
                    <Input
                      id="foundedYear"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.foundedYear}
                      onChange={(e) =>
                        handleInputChange(
                          "foundedYear",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="schoolAddress">Adresse complète *</Label>
                    <Input
                      id="schoolAddress"
                      type="text"
                      value={formData.schoolAddress}
                      onChange={(e) =>
                        handleInputChange("schoolAddress", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolCity">Ville *</Label>
                    <Input
                      id="schoolCity"
                      type="text"
                      value={formData.schoolCity}
                      onChange={(e) =>
                        handleInputChange("schoolCity", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolCountry">Pays *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("schoolCountry", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir le pays" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="schoolPhone">Téléphone école *</Label>
                    <Input
                      id="schoolPhone"
                      type="tel"
                      value={formData.schoolPhone}
                      onChange={(e) =>
                        handleInputChange("schoolPhone", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolEmail">Email école *</Label>
                    <Input
                      id="schoolEmail"
                      type="email"
                      value={formData.schoolEmail}
                      onChange={(e) =>
                        handleInputChange("schoolEmail", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Section Directeur */}
              <div>
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informations du Directeur
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="directorName">
                      Nom complet du directeur *
                    </Label>
                    <Input
                      id="directorName"
                      type="text"
                      value={formData.directorName}
                      onChange={(e) =>
                        handleInputChange("directorName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="directorPhone">Téléphone directeur *</Label>
                    <Input
                      id="directorPhone"
                      type="tel"
                      value={formData.directorPhone}
                      onChange={(e) =>
                        handleInputChange("directorPhone", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="directorEmail">Email directeur *</Label>
                    <Input
                      id="directorEmail"
                      type="email"
                      value={formData.directorEmail}
                      onChange={(e) =>
                        handleInputChange("directorEmail", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
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
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      <School className="w-4 h-4 mr-2" />
                      Créer l'école et le compte
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
            En vous inscrivant, vous acceptez nos{" "}
            <a href="#" className="text-blue-600 hover:underline">
              conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-blue-600 hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
          <p className="mt-2">
            Vous bénéficiez d'un essai gratuit de 30 jours du plan Basique.
          </p>
        </div>
      </div>
    </div>
  );
}
