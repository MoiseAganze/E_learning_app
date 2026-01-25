import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RegisterAdmin from "./pages/RegisterAdmin";
import {
  EcoleDashboard,
  EnseignantDashboard,
  EleveDashboard,
  ParentDashboard,
} from "./pages/dashboard";
import GestionUtilisateurs from "./pages/dashboard/ecole/GestionUtilisateurs";
import Abonnements from "./pages/dashboard/ecole/Abonnements";
import Resultats from "./pages/dashboard/ecole/Resultats";
import EmploisTemps from "./pages/dashboard/ecole/EmploisTemps";
import Communications from "./pages/dashboard/ecole/Communications";
import Bibliotheque from "./pages/dashboard/enseignant/Bibliotheque";
import CoursEleve from "./pages/dashboard/eleve/CoursEleve";
import DevoirsEnseignant from "./pages/dashboard/enseignant/DevoirsEnseignant";
import MessagerieParent from "./pages/dashboard/parent/MessagerieParent";
import QuizGamifie from "./pages/dashboard/eleve/QuizGamifie";
import Parametres from "./pages/dashboard/Parametres";
import EmploiTempsEleve from "./pages/dashboard/eleve/EmploiTempsEleve";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription-admin" element={<RegisterAdmin />} />

          {/* Routes Dashboard */}
          <Route path="/dashboard/ecole" element={<EcoleDashboard />} />
          <Route
            path="/dashboard/ecole/utilisateurs"
            element={<GestionUtilisateurs />}
          />
          <Route
            path="/dashboard/ecole/abonnements"
            element={<Abonnements />}
          />
          <Route path="/dashboard/ecole/resultats" element={<Resultats />} />
          <Route
            path="/dashboard/ecole/emplois-temps"
            element={<EmploisTemps />}
          />
          <Route
            path="/dashboard/ecole/communications"
            element={<Communications />}
          />

          <Route
            path="/dashboard/enseignant"
            element={<EnseignantDashboard />}
          />
          <Route
            path="/dashboard/enseignant/bibliotheque"
            element={<Bibliotheque />}
          />
          <Route
            path="/dashboard/enseignant/devoirs"
            element={<DevoirsEnseignant />}
          />

          <Route path="/dashboard/eleve" element={<EleveDashboard />} />
          <Route path="/dashboard/eleve/cours" element={<CoursEleve />} />
          <Route path="/dashboard/eleve/quiz" element={<QuizGamifie />} />
          <Route
            path="/dashboard/eleve/emploi-temps"
            element={<EmploiTempsEleve />}
          />

          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route
            path="/dashboard/parent/communication"
            element={<MessagerieParent />}
          />

          {/* Routes Paramètres pour tous les types d'utilisateurs */}
          <Route
            path="/dashboard/ecole/parametres"
            element={<Parametres userType="ecole" />}
          />
          <Route
            path="/dashboard/enseignant/parametres"
            element={<Parametres userType="enseignant" />}
          />
          <Route
            path="/dashboard/eleve/parametres"
            element={<Parametres userType="eleve" />}
          />
          <Route
            path="/dashboard/parent/parametres"
            element={<Parametres userType="parent" />}
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
