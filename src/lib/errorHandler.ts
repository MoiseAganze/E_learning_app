/**
 * Gestionnaire d'erreurs pour l'application EduAfrique
 * Gère les erreurs réseau, les erreurs de développement et les services externes
 */

export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {
    this.setupGlobalHandlers();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalHandlers(): void {
    // Gestionnaire pour les promesses rejetées
    window.addEventListener("unhandledrejection", (event) => {
      this.handleUnhandledRejection(event);
    });

    // Gestionnaire pour les erreurs JavaScript
    window.addEventListener("error", (event) => {
      this.handleError(event);
    });
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    const error = event.reason;

    // Ignorer les erreurs de fetch liées au développement
    if (this.isDevServerError(error)) {
      console.warn("🔧 Dev server error ignored:", error?.message);
      event.preventDefault();
      return;
    }

    // Ignorer les erreurs de services externes
    if (this.isExternalServiceError(error)) {
      console.warn("🌐 External service error ignored:", error?.message);
      event.preventDefault();
      return;
    }

    // Logger les autres erreurs pour le debugging
    console.error("❌ Unhandled promise rejection:", error);
  }

  private handleError(event: ErrorEvent): void {
    const error = event.error;

    // Ignorer les erreurs de services externes
    if (this.isExternalServiceError(error)) {
      console.warn("🌐 External service error ignored:", error?.message);
      event.preventDefault();
      return;
    }

    // Logger les erreurs importantes
    console.error("❌ JavaScript error:", {
      message: error?.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  }

  private isDevServerError(error: any): boolean {
    if (!error?.message) return false;

    const devServerErrorPatterns = [
      "Failed to fetch",
      "NetworkError",
      "WebSocket connection",
      "HMR",
      "Hot reload",
      "@vite/client",
    ];

    return devServerErrorPatterns.some((pattern) =>
      error.message.includes(pattern),
    );
  }

  private isExternalServiceError(error: any): boolean {
    if (!error) return false;

    const externalServicePatterns = [
      "fullstory",
      "fs.js",
      "edge.fullstory.com",
      "analytics",
      "tracking",
    ];

    return externalServicePatterns.some(
      (pattern) =>
        error.message?.includes(pattern) || error.stack?.includes(pattern),
    );
  }

  /**
   * Méthode utilitaire pour logger les erreurs avec contexte
   */
  public static logError(
    context: string,
    error: Error | unknown,
    additionalInfo?: Record<string, any>,
  ): void {
    console.error(`❌ [${context}]`, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      ...additionalInfo,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Méthode utilitaire pour logger les warnings
   */
  public static logWarning(
    context: string,
    message: string,
    additionalInfo?: Record<string, any>,
  ): void {
    console.warn(`⚠️ [${context}] ${message}`, additionalInfo);
  }

  /**
   * Méthode utilitaire pour logger les infos de debug
   */
  public static logInfo(
    context: string,
    message: string,
    additionalInfo?: Record<string, any>,
  ): void {
    console.info(`ℹ️ [${context}] ${message}`, additionalInfo);
  }
}

// Initialiser le gestionnaire d'erreurs
if (typeof window !== "undefined") {
  ErrorHandler.getInstance();
}

// Exports pour l'utilisation dans l'app
export const { logError, logWarning, logInfo } = ErrorHandler;
