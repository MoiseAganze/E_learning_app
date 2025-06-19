// Service de gestion des tokens JWT simulé
export interface TokenPayload {
  userId: string;
  email: string;
  type: "ecole" | "enseignant" | "eleve" | "parent";
  schoolId: string;
  iat: number;
  exp: number;
}

class TokenService {
  private readonly TOKEN_KEY = "eduafrique_token";
  private readonly REFRESH_TOKEN_KEY = "eduafrique_refresh_token";

  // Simuler la génération d'un JWT
  generateToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
    const now = Math.floor(Date.now() / 1000);
    const tokenPayload: TokenPayload = {
      ...payload,
      iat: now,
      exp: now + 24 * 60 * 60, // Expire dans 24h
    };

    // En production, utilisez une vraie librairie JWT
    const header = btoa(JSON.stringify({ typ: "JWT", alg: "HS256" }));
    const encodedPayload = btoa(JSON.stringify(tokenPayload));
    const signature = btoa(`signature_${payload.userId}_${now}`);

    return `${header}.${encodedPayload}.${signature}`;
  }

  // Simuler la génération d'un refresh token
  generateRefreshToken(userId: string): string {
    const now = Math.floor(Date.now() / 1000);
    return btoa(`refresh_${userId}_${now}_${Math.random()}`);
  }

  // Décoder un token JWT simulé
  decodeToken(token: string): TokenPayload | null {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));

      // Vérifier l'expiration
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        this.removeTokens();
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }

  // Sauvegarder les tokens
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // Récupérer le token d'accès
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Récupérer le refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    return payload !== null;
  }

  // Récupérer les informations de l'utilisateur depuis le token
  getCurrentUserFromToken(): TokenPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;

    return this.decodeToken(token);
  }

  // Supprimer les tokens
  removeTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Simuler le refresh du token
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    // En production, faites un appel API pour refresh
    // Ici on simule juste en retournant un nouveau token
    try {
      const currentUser = this.getCurrentUserFromToken();
      if (!currentUser) return null;

      const newToken = this.generateToken({
        userId: currentUser.userId,
        email: currentUser.email,
        type: currentUser.type,
        schoolId: currentUser.schoolId,
      });

      localStorage.setItem(this.TOKEN_KEY, newToken);
      return newToken;
    } catch {
      this.removeTokens();
      return null;
    }
  }
}

export const tokenService = new TokenService();
