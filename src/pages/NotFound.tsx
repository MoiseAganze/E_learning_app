import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Construction,
  Home,
  ArrowLeft,
  Clock,
  Sparkles,
  Rocket,
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.info(
      "🚧 Fonctionnalité à venir: Tentative d'accès à:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full"
      >
        <Card className="overflow-hidden shadow-xl">
          <CardContent className="p-8">
            {/* Icône animée */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Construction className="w-10 h-10 text-white" />
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Fonctionnalité à venir
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Cette page fait partie de nos prochaines fonctionnalités. L'équipe
              Klaso travaille activement pour vous l'apporter bientôt !
            </motion.p>

            {/* URL demandée */}
            <motion.div
              className="bg-gray-50 rounded-lg p-3 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-sm text-gray-500 mb-1">Page demandée :</p>
              <code className="text-blue-600 font-mono text-sm break-all">
                {location.pathname}
              </code>
            </motion.div>

            {/* Fonctionnalités en développement */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>En développement</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Bientôt disponible</span>
                </div>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Button asChild className="flex-1">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>

              <Button variant="outline" asChild className="flex-1">
                <Link to="#" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Page précédente
                </Link>
              </Button>
            </motion.div>

            {/* Message d'encouragement */}
            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center justify-center gap-2 text-blue-700 font-medium text-sm">
                <Rocket className="w-4 h-4" />
                <span>Merci de votre patience !</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Nous construisons l'avenir de l'éducation en Afrique
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Particules décoratives */}
        <motion.div
          className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-1 h-1 bg-green-400 rounded-full opacity-60"
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;
