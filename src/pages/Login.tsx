import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import {
  GraduationCap,
  Mail,
  Lock,
  Loader2,
  School,
  Users,
  UserCheck,
  User,
} from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await authService.login(email, password);

      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${user.firstName} ${user.lastName}`,
      });

      // Rediriger vers le dashboard approprié
      navigate(authService.getUserDashboardPath(user.type));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Erreur inconnue",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (
    userType: string,
    demoEmail: string,
    demoPassword: string,
  ) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);

    try {
      const { user } = await authService.login(demoEmail, demoPassword);

      toast({
        title: "Connexion démo réussie !",
        description: `Bienvenue dans l'espace ${userType}`,
      });

      navigate(authService.getUserDashboardPath(user.type));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Impossible de se connecter en mode démo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200/30 rounded-full"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="text-white font-bold text-2xl"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                EA
              </motion.span>
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            EduAfrique
          </motion.h1>
          <motion.p
            className="text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Connectez-vous à votre espace
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Badge className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                className="inline-block mr-2"
              >
                🌍
              </motion.span>
              Éducation pour l'Afrique francophone
            </Badge>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <CardHeader>
                <CardTitle className="text-center">Connexion</CardTitle>
              </CardHeader>
            </motion.div>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </motion.div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 }}
                    >
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </motion.div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connexion...
                        </>
                      ) : (
                        "Se connecter"
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>

              <Separator className="my-6" />

              {/* Comptes de démonstration */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-center text-gray-700">
                  Comptes de démonstration
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDemoLogin(
                        "École",
                        "admin@ecolelumiere.edu",
                        "admin123",
                      )
                    }
                    disabled={loading}
                    className="text-xs"
                  >
                    <School className="w-3 h-3 mr-1" />
                    École
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDemoLogin(
                        "Enseignant",
                        "marie.diallo@ecolelumiere.edu",
                        "teacher123",
                      )
                    }
                    disabled={loading}
                    className="text-xs"
                  >
                    <User className="w-3 h-3 mr-1" />
                    Enseignant
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDemoLogin(
                        "Élève",
                        "aya.traore@student.ecolelumiere.edu",
                        "student123",
                      )
                    }
                    disabled={loading}
                    className="text-xs"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Élève
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDemoLogin(
                        "Parent",
                        "jean.traore@parent.ecolelumiere.edu",
                        "parent123",
                      )
                    }
                    disabled={loading}
                    className="text-xs"
                  >
                    <UserCheck className="w-3 h-3 mr-1" />
                    Parent
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-center text-sm text-gray-600 mb-4">
                  <a href="#" className="hover:text-primary">
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Première utilisation ?{" "}
                    <Link
                      to="/inscription-admin"
                      className="text-primary hover:underline"
                    >
                      Inscrire votre école
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
