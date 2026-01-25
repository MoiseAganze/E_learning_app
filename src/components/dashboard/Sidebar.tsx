import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  UserCheck,
  Clock,
  Award,
  Bell,
  CreditCard,
  School,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SidebarProps {
  userType: "ecole" | "enseignant" | "eleve" | "parent";
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = {
  ecole: [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/ecole" },
    {
      icon: Users,
      label: "Gestion utilisateurs",
      href: "/dashboard/ecole/utilisateurs",
    },
    {
      icon: School,
      label: "Classes & Niveaux",
      href: "/dashboard/ecole/classes",
    },
    {
      icon: Calendar,
      label: "Emplois du temps",
      href: "/dashboard/ecole/emplois-temps",
    },
    { icon: BarChart3, label: "Résultats", href: "/dashboard/ecole/resultats" },
    {
      icon: MessageSquare,
      label: "Communications",
      href: "/dashboard/ecole/communications",
    },
    {
      icon: CreditCard,
      label: "Abonnements",
      href: "/dashboard/ecole/abonnements",
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/dashboard/ecole/parametres",
    },
  ],
  enseignant: [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/enseignant" },
    { icon: BookOpen, label: "Mes cours", href: "/dashboard/enseignant/cours" },
    {
      icon: FileText,
      label: "Devoirs & Examens",
      href: "/dashboard/enseignant/devoirs",
    },
    { icon: Award, label: "Notation", href: "/dashboard/enseignant/notation" },
    {
      icon: School,
      label: "Bibliothèque",
      href: "/dashboard/enseignant/bibliotheque",
    },
    {
      icon: BarChart3,
      label: "Progression",
      href: "/dashboard/enseignant/progression",
    },
    {
      icon: Calendar,
      label: "Emploi du temps",
      href: "/dashboard/enseignant/emploi-temps",
    },
    {
      icon: MessageSquare,
      label: "Messagerie",
      href: "/dashboard/enseignant/messagerie",
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/dashboard/enseignant/parametres",
    },
  ],
  eleve: [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/eleve" },
    { icon: BookOpen, label: "Mes cours", href: "/dashboard/eleve/cours" },
    {
      icon: Calendar,
      label: "Emploi du temps",
      href: "/dashboard/eleve/emploi-temps",
    },
    { icon: FileText, label: "Devoirs", href: "/dashboard/eleve/devoirs" },
    { icon: Award, label: "Mes notes", href: "/dashboard/eleve/notes" },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/eleve/notifications",
    },
    {
      icon: MessageSquare,
      label: "Messagerie",
      href: "/dashboard/eleve/messagerie",
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/dashboard/eleve/parametres",
    },
  ],
  parent: [
    { icon: Home, label: "Tableau de bord", href: "/dashboard/parent" },
    {
      icon: GraduationCap,
      label: "Mes enfants",
      href: "/dashboard/parent/enfants",
    },
    {
      icon: Award,
      label: "Notes & Bulletins",
      href: "/dashboard/parent/notes",
    },
    {
      icon: UserCheck,
      label: "Présences",
      href: "/dashboard/parent/presences",
    },
    {
      icon: Calendar,
      label: "Calendrier",
      href: "/dashboard/parent/calendrier",
    },
    {
      icon: MessageSquare,
      label: "Communication",
      href: "/dashboard/parent/communication",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/parent/notifications",
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/dashboard/parent/parametres",
    },
  ],
};

export function Sidebar({ userType, isOpen = false, onClose }: SidebarProps) {
  const items = menuItems[userType];
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
        <nav className="p-4 space-y-1">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Button
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "w-full justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02]",
                  location.pathname === item.href &&
                    "bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-sm",
                )}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            </motion.div>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 shadow-xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {userType === "ecole" ? "Administration" : userType}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-2">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05 + 0.1,
                    }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02] h-12",
                        location.pathname === item.href &&
                          "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-150 shadow-sm border-l-2 border-blue-500",
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                      </motion.div>
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
