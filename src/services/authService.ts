import usersData from "@/data/users.json";
import schoolsData from "@/data/schools.json";
import { tokenService } from "./tokenService";

export interface User {
  id: string;
  email: string;
  type: "ecole" | "enseignant" | "eleve" | "parent";
  firstName: string;
  lastName: string;
  phone: string;
  schoolId: string;
  [key: string]: any;
}

export interface School {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  directorName: string;
  directorPhone: string;
  directorEmail: string;
  [key: string]: any;
}

class AuthService {
  private readonly STORAGE_KEY = "eduafrique_auth";
  private readonly SCHOOL_STORAGE_KEY = "eduafrique_school";

  // Simuler une base de données en mémoire
  private users: User[] = usersData.users;
  private schools: School[] = schoolsData.schools;

  async login(
    email: string,
    password: string,
  ): Promise<{
    user: User;
    school: School | null;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const school = this.schools.find((s) => s.id === user.schoolId);

    // Générer les tokens
    const accessToken = tokenService.generateToken({
      userId: user.id,
      email: user.email,
      type: user.type,
      schoolId: user.schoolId,
    });
    const refreshToken = tokenService.generateRefreshToken(user.id);

    // Sauvegarder les tokens
    tokenService.saveTokens(accessToken, refreshToken);

    // Sauvegarder dans localStorage (backup)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    if (school) {
      localStorage.setItem(this.SCHOOL_STORAGE_KEY, JSON.stringify(school));
    }

    return {
      user,
      school,
      tokens: { accessToken, refreshToken },
    };
  }

  async registerSchoolAdmin(userData: {
    // Données utilisateur
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    // Données école
    schoolName: string;
    schoolType: string;
    schoolAddress: string;
    schoolCity: string;
    schoolCountry: string;
    schoolPhone: string;
    schoolEmail: string;
    directorName: string;
    directorPhone: string;
    directorEmail: string;
    foundedYear: number;
  }): Promise<{ user: User; school: School }> {
    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Vérifier si l'email existe déjà
    if (this.users.find((u) => u.email === userData.email)) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Créer l'école
    const newSchool: School = {
      id: `school_${Date.now()}`,
      name: userData.schoolName,
      type: userData.schoolType,
      address: userData.schoolAddress,
      city: userData.schoolCity,
      country: userData.schoolCountry,
      phone: userData.schoolPhone,
      email: userData.schoolEmail,
      website: "",
      directorName: userData.directorName,
      directorPhone: userData.directorPhone,
      directorEmail: userData.directorEmail,
      foundedYear: userData.foundedYear,
      totalStudents: 0,
      totalTeachers: 0,
      totalClasses: 0,
      subscriptionPlan: "basic",
      subscriptionStartDate: new Date().toISOString(),
      subscriptionEndDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 30 jours
      createdAt: new Date().toISOString(),
    };

    // Créer l'utilisateur administrateur
    const newUser: User = {
      id: `admin_${Date.now()}`,
      email: userData.email,
      password: userData.password,
      type: "ecole",
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      schoolId: newSchool.id,
      createdAt: new Date().toISOString(),
    };

    // Ajouter à la "base de données"
    this.schools.push(newSchool);
    this.users.push(newUser);

    // Sauvegarder dans localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(this.SCHOOL_STORAGE_KEY, JSON.stringify(newSchool));

    // Générer les tokens pour le nouvel utilisateur
    const accessToken = tokenService.generateToken({
      userId: newUser.id,
      email: newUser.email,
      type: newUser.type,
      schoolId: newUser.schoolId,
    });
    const refreshToken = tokenService.generateRefreshToken(newUser.id);

    // Sauvegarder les tokens
    tokenService.saveTokens(accessToken, refreshToken);

    return {
      user: newUser,
      school: newSchool,
      tokens: { accessToken, refreshToken },
    };
  }

  getCurrentUser(): User | null {
    // Priorité aux tokens
    const tokenUser = tokenService.getCurrentUserFromToken();
    if (tokenUser) {
      // Récupérer les détails complets depuis les données
      const fullUser = this.users.find((u) => u.id === tokenUser.userId);
      return fullUser || null;
    }

    // Fallback localStorage
    const userData = localStorage.getItem(this.STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  getCurrentSchool(): School | null {
    const schoolData = localStorage.getItem(this.SCHOOL_STORAGE_KEY);
    return schoolData ? JSON.parse(schoolData) : null;
  }

  isAuthenticated(): boolean {
    return tokenService.isAuthenticated();
  }

  logout(): void {
    tokenService.removeTokens();
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.SCHOOL_STORAGE_KEY);
  }

  getUserDashboardPath(userType: string): string {
    switch (userType) {
      case "ecole":
        return "/dashboard/ecole";
      case "enseignant":
        return "/dashboard/enseignant";
      case "eleve":
        return "/dashboard/eleve";
      case "parent":
        return "/dashboard/parent";
      default:
        return "/";
    }
  }
}

export const authService = new AuthService();
