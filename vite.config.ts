import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: {
      overlay: false, // Désactive l'overlay d'erreur pour éviter les conflits
    },
    watch: {
      usePolling: true, // Améliore la détection des changements de fichiers
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Évite les erreurs de process dans le navigateur
    global: "globalThis",
  },
}));
