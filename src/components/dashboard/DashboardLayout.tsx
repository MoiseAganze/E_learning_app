import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "ecole" | "enseignant" | "eleve" | "parent";
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType={userType} onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar
          userType={userType}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-6 lg:ml-0 w-full">{children}</main>
      </div>
    </div>
  );
}
