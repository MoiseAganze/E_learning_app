import { useState, useEffect } from "react";
import { authService, User, School } from "@/services/authService";
import { tokenService } from "@/services/tokenService";

export interface AuthState {
  user: User | null;
  school: School | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    school: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Vérifier l'authentification au montage
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        const user = authService.getCurrentUser();
        const school = authService.getCurrentSchool();

        setAuthState({
          user,
          school,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState({
          user: null,
          school: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthState({
        user: null,
        school: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password);

      setAuthState({
        user: result.user,
        school: result.school,
        isAuthenticated: true,
        isLoading: false,
      });

      return result;
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const result = await authService.registerSchoolAdmin(userData);

      setAuthState({
        user: result.user,
        school: result.school,
        isAuthenticated: true,
        isLoading: false,
      });

      return result;
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      school: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const refreshToken = async () => {
    try {
      const newToken = await tokenService.refreshAccessToken();
      if (newToken) {
        await checkAuthStatus();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return false;
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    refreshToken,
    checkAuthStatus,
  };
}
