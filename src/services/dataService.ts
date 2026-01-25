import usersData from "@/data/users.json";
import classesData from "@/data/classes.json";
import subjectsData from "@/data/subjects.json";
import gradesData from "@/data/grades.json";
import subscriptionsData from "@/data/subscriptions.json";
import { User } from "./authService";

export interface Class {
  id: string;
  name: string;
  level: string;
  section: string;
  schoolId: string;
  mainTeacherId: string;
  maxStudents: number;
  currentStudents: number;
  subjects: string[];
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  coefficient: number;
  color: string;
  description: string;
  levels: string[];
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  type: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  coefficient: number;
  comments: string;
}

export interface Subscription {
  id: string;
  schoolId: string;
  planId: string;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billing: string;
  maxStudents: number;
  maxTeachers: number;
  features: string[];
  limitations: string[];
}

class DataService {
  private users: User[] = usersData.users;
  private classes: Class[] = classesData.classes;
  private subjects: Subject[] = subjectsData.subjects;
  private grades: Grade[] = gradesData.grades;
  private subscriptions: Subscription[] = subscriptionsData.subscriptions;
  private plans: SubscriptionPlan[] = subscriptionsData.plans;

  // Méthodes pour les utilisateurs
  async getUsersBySchool(schoolId: string): Promise<User[]> {
    await this.simulateDelay();
    return this.users.filter((user) => user.schoolId === schoolId);
  }

  async getUsersByType(schoolId: string, type: string): Promise<User[]> {
    await this.simulateDelay();
    return this.users.filter(
      (user) => user.schoolId === schoolId && user.type === type,
    );
  }

  async addUser(userData: Partial<User>): Promise<User> {
    await this.simulateDelay();
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email!,
      type: userData.type!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      phone: userData.phone!,
      schoolId: userData.schoolId!,
      createdAt: new Date().toISOString(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await this.simulateDelay();
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) throw new Error("Utilisateur non trouvé");

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  async deleteUser(userId: string): Promise<void> {
    await this.simulateDelay();
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) throw new Error("Utilisateur non trouvé");

    this.users.splice(userIndex, 1);
  }

  // Méthodes pour les classes
  async getClassesBySchool(schoolId: string): Promise<Class[]> {
    await this.simulateDelay();
    return this.classes.filter((cls) => cls.schoolId === schoolId);
  }

  // Méthodes pour les matières
  async getAllSubjects(): Promise<Subject[]> {
    await this.simulateDelay();
    return this.subjects;
  }

  // Méthodes pour les notes
  async getGradesByStudent(studentId: string): Promise<Grade[]> {
    await this.simulateDelay();
    return this.grades.filter((grade) => grade.studentId === studentId);
  }

  async getGradesByClass(classId: string): Promise<Grade[]> {
    await this.simulateDelay();
    return this.grades.filter((grade) => grade.classId === classId);
  }

  async getGradesByTeacher(teacherId: string): Promise<Grade[]> {
    await this.simulateDelay();
    return this.grades.filter((grade) => grade.teacherId === teacherId);
  }

  // Méthodes pour les abonnements
  async getSubscriptionBySchool(
    schoolId: string,
  ): Promise<Subscription | null> {
    await this.simulateDelay();
    return this.subscriptions.find((sub) => sub.schoolId === schoolId) || null;
  }

  async getAllPlans(): Promise<SubscriptionPlan[]> {
    await this.simulateDelay();
    return this.plans;
  }

  async updateSubscription(
    schoolId: string,
    planId: string,
  ): Promise<Subscription> {
    await this.simulateDelay();
    const subIndex = this.subscriptions.findIndex(
      (sub) => sub.schoolId === schoolId,
    );

    if (subIndex === -1) {
      // Créer un nouvel abonnement
      const newSub: Subscription = {
        id: `sub_${Date.now()}`,
        schoolId,
        planId,
        status: "active",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: true,
        paymentMethod: "bank_transfer",
        totalAmount: 0,
        paidAmount: 0,
        remainingAmount: 0,
      };
      this.subscriptions.push(newSub);
      return newSub;
    } else {
      // Mettre à jour l'abonnement existant
      this.subscriptions[subIndex] = {
        ...this.subscriptions[subIndex],
        planId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      };
      return this.subscriptions[subIndex];
    }
  }

  // Méthodes statistiques
  async getSchoolStats(schoolId: string) {
    await this.simulateDelay();

    const users = await this.getUsersBySchool(schoolId);
    const classes = await this.getClassesBySchool(schoolId);

    const students = users.filter((u) => u.type === "eleve");
    const teachers = users.filter((u) => u.type === "enseignant");
    const parents = users.filter((u) => u.type === "parent");

    // Calculer la moyenne générale
    const studentGrades = await Promise.all(
      students.map((s) => this.getGradesByStudent(s.id)),
    );

    const allGrades = studentGrades.flat();
    const averageGrade =
      allGrades.length > 0
        ? allGrades.reduce(
            (sum, grade) => sum + (grade.score / grade.maxScore) * 20,
            0,
          ) / allGrades.length
        : 0;

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalParents: parents.length,
      totalClasses: classes.length,
      averageGrade: Math.round(averageGrade * 10) / 10,
      attendanceRate: 94.2, // Simulé
    };
  }

  private async simulateDelay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export const dataService = new DataService();
