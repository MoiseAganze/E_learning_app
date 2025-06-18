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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  userType: "ecole" | "enseignant" | "eleve" | "parent";
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

export function Sidebar({ userType }: SidebarProps) {
  const items = menuItems[userType];
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-1">
        {items.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleNavigation(item.href)}
            className={cn(
              "w-full justify-start text-left font-normal",
              location.pathname === item.href &&
                "bg-blue-50 text-blue-700 hover:bg-blue-100",
            )}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
