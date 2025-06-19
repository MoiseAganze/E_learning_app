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
    // Configuration MIME types explicite
    middlewareMode: false,
    cors: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  define: {
    // Évite les erreurs de process dans le navigateur
    global: "globalThis",
  },
  // Configuration build pour assurer les bons MIME types et Vercel
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-dialog"],
        },
      },
    },
  },
  // Assure que les modules ES sont servis correctement
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
}));
