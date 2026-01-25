import { Search, Bell, Settings, User, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { motion } from "framer-motion";

interface HeaderProps {
  userType: "ecole" | "enseignant" | "eleve" | "parent";
  onMenuClick?: () => void;
}

export function Header({ userType, onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
            onClick={onMenuClick}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </motion.button>

          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
            Dashboard {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </h1>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 shrink-0">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Rechercher..." className="pl-10 w-40 lg:w-64" />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="sm" className="md:hidden p-2 h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 h-8 w-8 sm:h-10 sm:w-10"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <Badge className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 p-2 h-auto"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.type}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <Settings className="w-4 h-4 mr-2" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
