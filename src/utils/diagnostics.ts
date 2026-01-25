/**
 * Utilitaires de diagnostic pour les erreurs MIME et de chargement de modules
 */

export function diagnoseMimeErrors(): void {
  // Vérifier si nous sommes dans un environnement de développement
  if (import.meta.env.DEV) {
    console.info("🔍 Diagnostic MIME - Mode développement détecté");

    // Vérifier les types MIME supportés
    const supportedTypes = [
      "application/javascript",
      "text/javascript",
      "application/x-javascript",
      "text/jsx",
      "application/typescript",
      "text/tsx",
    ];

    console.info("✅ Types MIME JavaScript supportés:", supportedTypes);

    // Vérifier l'URL de base
    console.info("🌐 URL de base:", import.meta.url);
    console.info("🏠 URL actuelle:", window.location.href);

    // Vérifier si nous sommes sur le bon port
    const expectedPort = "8080";
    const currentPort = window.location.port;

    if (currentPort !== expectedPort) {
      console.warn(
        `⚠️ Port inattendu: ${currentPort}, attendu: ${expectedPort}`,
      );
    } else {
      console.info(`✅ Port correct: ${currentPort}`);
    }

    // Tester la connectivité vers les modules
    testModuleConnectivity();
  }
}

async function testModuleConnectivity(): Promise<void> {
  try {
    // Tester le chargement du module principal
    const response = await fetch("/src/main.tsx");

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      console.info("✅ Module principal accessible");
      console.info("📄 Content-Type:", contentType);

      if (
        contentType &&
        !contentType.includes("javascript") &&
        !contentType.includes("typescript")
      ) {
        console.warn("⚠️ Content-Type inattendu pour un module:", contentType);
      }
    } else {
      console.error(
        "❌ Erreur de chargement du module principal:",
        response.status,
      );
    }
  } catch (error) {
    console.error("❌ Erreur de connectivité:", error);
  }
}

export function setupMimeErrorHandling(): void {
  // Intercepter les erreurs de chargement de modules
  window.addEventListener("error", (event) => {
    if (
      event.error &&
      event.error.message &&
      event.error.message.includes("MIME type")
    ) {
      console.error("🚨 Erreur MIME détectée:", {
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });

      // Suggestions de correction
      console.info("💡 Solutions possibles:");
      console.info("   1. Vider le cache du navigateur (Ctrl+Shift+R)");
      console.info("   2. Redémarrer le serveur de développement");
      console.info("   3. Vérifier la configuration Vite");
      console.info("   4. Tester en navigation privée");

      // Tentative de rechargement automatique après délai
      setTimeout(() => {
        if (confirm("Erreur MIME détectée. Voulez-vous recharger la page ?")) {
          window.location.reload();
        }
      }, 2000);
    }
  });
}

export function clearBrowserCache(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.info("🧹 Service Worker supprimé");
      });
    });
  }

  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
        console.info("🧹 Cache supprimé:", name);
      });
    });
  }

  console.info("🧹 Tentative de nettoyage du cache terminée");
}

// Auto-diagnostic au chargement en mode développement
if (import.meta.env.DEV) {
  diagnoseMimeErrors();
  setupMimeErrorHandling();
}
