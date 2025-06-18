import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "ecole" | "enseignant" | "eleve" | "parent";
  userName?: string;
  userAvatar?: string;
}

export function DashboardLayout({
  children,
  userType,
  userName = "Utilisateur",
  userAvatar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={userName} userAvatar={userAvatar} />
      <div className="flex">
        <Sidebar userType={userType} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
